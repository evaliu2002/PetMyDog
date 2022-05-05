import mysql.DBUtils;
import mysql.Sql2oModel;
import com.google.gson.Gson;
import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.PutMappingRequest;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.mapper.ObjectMapper;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.pac4j.core.config.Config;
import org.pac4j.core.exception.http.HttpAction;
import org.pac4j.core.profile.ProfileManager;
import org.pac4j.core.profile.UserProfile;
import org.pac4j.jee.context.session.JEESessionStore;
import org.pac4j.oidc.client.OidcClient;
import org.pac4j.oidc.config.OidcConfiguration;
import org.pac4j.sparkjava.CallbackRoute;
import org.pac4j.sparkjava.SecurityFilter;
import org.pac4j.sparkjava.SparkHttpActionAdapter;
import org.pac4j.sparkjava.SparkWebContext;
import spark.Request;
import spark.Response;
import org.sql2o.Sql2o;
import spark.Route;

import java.io.IOException;
import java.util.*;
import static spark.Spark.*;

public class Main {
    private static DBUtils.Model model;
    private static final String HOST = "localhost";
    private static final int PORT_ONE = 9200;
    private static final String SCHEME = "http";
    private static final String INDEX = "location";
    private static RestHighLevelClient restHighLevelClient;

    public static void main(String[] args) {
        /*****************************************     Begin OAuth config     *****************************************/

        // Setup google oauth api configuration with pac4j
        final OidcConfiguration oidcConfiguration = new OidcConfiguration();
        oidcConfiguration.setClientId("205317701531-od80vq0biekitm7bq8irtfoen3fhpfo0.apps.googleusercontent.com");
        oidcConfiguration.setSecret("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");
        oidcConfiguration.setDiscoveryURI("https://accounts.google.com/.well-known/openid-configuration");
        oidcConfiguration.setUseNonce(true);
        oidcConfiguration.addCustomParam("prompt", "consent");

        // Create client with the configuration
        final OidcClient oidcClient = new OidcClient(oidcConfiguration);
        oidcClient.setAuthorizationGenerator((ctx, session, profile) -> {
            profile.addRole("ROLE_ADMIN");
            return Optional.of(profile);
        });
        oidcClient.setCallbackUrl("http://localhost:4567/callback");

        // Security configuration using google client
        Config config = new Config(oidcClient);
        config.addAuthorizer("custom", new CustomAuthorizer());
        config.setHttpActionAdapter(new DemoHttpActionAdapter());

        // Set up call back end points
        CallbackRoute callback = new CallbackRoute(config, "/hello", true);
        get("/callback", callback);
        post("/callback", callback);

        /*******************************************     End OAuth config     *****************************************/


        /*****************************************     Begin SQL config     *****************************************/

        Sql2o sql2o = new Sql2o("jdbc:mysql://34.70.199.136:3306/pmd", "root", "b4lIbLjGOvszgcLC");
        model = new Sql2oModel(sql2o);

        /*****************************************     END SQL config     *****************************************/

        /*************************************   Start Elasticsearch config   *****************************************/
        restHighLevelClient = new RestHighLevelClient(RestClient.builder(new HttpHost(HOST, PORT_ONE, SCHEME)));

        DeleteIndexRequest deleteIndexRequest = new DeleteIndexRequest(INDEX);
        try {
            restHighLevelClient.indices().delete(deleteIndexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        CreateIndexRequest createIndexRequest = new CreateIndexRequest(INDEX);
        try {
            restHighLevelClient.indices().create(createIndexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        PutMappingRequest putMappingRequest = new PutMappingRequest(INDEX);

        Map<String, Object> type = new HashMap<>();
        type.put("type", "geo_point");
        Map<String, Object> keyType = new HashMap<>();
        keyType.put("type", "keyword");

        Map<String, Object> properties = new HashMap<>();
        properties.put("location", type);
        properties.put("uid", keyType);

        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("properties", properties);
        putMappingRequest.source(jsonMap);

        try {
            restHighLevelClient.indices().putMapping(putMappingRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            System.out.println(e.getMessage());

        }

        /***************************************   End Elasticsearch config   *****************************************/



        /*******************************************   Start Security Guard   *****************************************/

        before("/hello", new SecurityFilter(config, "GoogleClient"));
        after("/callback", (Request request, Response response) -> {
            List<UserProfile> users = getProfiles(request, response);
            if (users.size() == 1) {
                UserProfile user = users.get(0);
                if (model.getUser(user.getId()) == null) {
                    String email = null;
                    String pic_link = null;
                    String username = null;
                    Map<String, Object> attributes = user.getAttributes();
                    if (attributes.containsKey("given_name") && attributes.get("given_name") != null) {
                        username = attributes.get("given_name").toString();
                    }
                    if (attributes.containsKey("email") && attributes.get("email") != null) {
                        email = attributes.get("email").toString();
                    }
                    if (attributes.containsKey("picture") && attributes.get("picture") != null) {
                        pic_link = attributes.get("picture").toString();
                    }
                    if (!model.createUser(new DBUtils.User(user.getId(), username,
                            null, email, null, pic_link, "1000-01-01 00:00:00"))) {
                        response.redirect("/login", 500);
                    }
                }
            } else {
                response.redirect("/login");
            }

        });

        /******************************************    End Security Guard     *****************************************/



        /****************************************   Start Service end pints   *****************************************/

        get("/hello", Main::getProfiles);

        get("/login", (req, res) -> {
            final SparkWebContext context = new SparkWebContext(req, res);
            HttpAction action;
            try {
                action = oidcClient.getRedirectionAction(context, JEESessionStore.INSTANCE).get();
            } catch (final HttpAction e) {
                action = e;
            }
            SparkHttpActionAdapter.INSTANCE.adapt(action, context);
            return null;
        });

        get("/profile", Main::getUserProfile);

        post("/newDog", Main::createDogProfile);

        get("/sql", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                model.updateUser("test2", "test2", "1234");
                Gson gson = new Gson();
                return gson.toJson("updated");
            }
        });

        post("/getNearbyUser", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                Gson gson = new Gson();
                DBUtils.Location loc = gson.fromJson(request.body(), DBUtils.Location.class);
                SearchSourceBuilder srb = new SearchSourceBuilder();
                QueryBuilder qb = QueryBuilders.geoDistanceQuery("location")
                        .point(loc.getLat(), loc.getLng())
                        .distance("500", DistanceUnit.METERS);
                srb.query(qb);

                SearchRequest searchRequest = new SearchRequest(INDEX);
                searchRequest.source(srb);
                List<DBUtils.UserLocation> result = new ArrayList<>();
                try {
                    SearchResponse search = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
                    SearchHits hits = search.getHits();
                    for (SearchHit hit: hits) {
                        String location = hit.getSourceAsString();
                        DBUtils.UserLocation jsonObject = gson.fromJson(location, DBUtils.UserLocation.class);
                        result.add(jsonObject);
                    }
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                }
                return gson.toJson(result);
            }
        });

        get("/updateLocation", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                Gson gson = new Gson();
                DBUtils.Location loc = gson.fromJson(request.body(), DBUtils.Location.class);


                return gson.toJson("updated");
            }
        });

        /******************************************   End Service end pints   *****************************************/
    }

    /****************************************   Start utils   *****************************************/
    private static List<UserProfile> getProfiles(Request request, Response response) {
        final SparkWebContext context = new SparkWebContext(request, response);
        final ProfileManager manager = new ProfileManager(context, JEESessionStore.INSTANCE);
        return manager.getProfiles();
    }

    private static String getUserProfile(Request request, Response response) {
        try {
            Gson gson = new Gson();
            String body = request.body();
            Map<String, String> bodyContent = gson.fromJson(body, Map.class);
            return gson.toJson(model.getUser(bodyContent.get("uid")));
        } catch (Exception e) {
            halt(500);
            return null;
        }

    }

    private static String createDogProfile(Request request, Response response) {
        Gson gson = new Gson();
        model.createDog(gson.fromJson(request.body(), DBUtils.Dog.class));
        return gson.toJson("Success");
    }
    /****************************************   End utils   *****************************************/
}