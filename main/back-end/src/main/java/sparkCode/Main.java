package sparkCode;

import mysql.DBUtils;
import mysql.Sql2oModel;
import com.google.gson.Gson;
import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.PutMappingRequest;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
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
import spark.*;
import org.sql2o.Sql2o;

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
    private static final long LOCATION_EXPIRE_TIME = 1000 * 60 * 15;
    private static final boolean DEPLOYMENT = false;

    public static void main(String[] args) {
        secure("keystore.jks", "eq04aqOA", null, null);

        if (DEPLOYMENT) {
            staticFiles.externalLocation("/home/wenxuanliu/deployment/public");
            port(443);
        }

        /*****************************************     Begin OAuth config     *****************************************/

        // Setup google oauth api configuration with pac4j
        final OidcConfiguration oidcConfiguration = new OidcConfiguration();
        oidcConfiguration.setClientId("105609274397-09g7pjle8328kvqbrc088b71d1aluu69.apps.googleusercontent.com");
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
        if (DEPLOYMENT) {
            oidcClient.setCallbackUrl("https://petmydog.fun/callback");
        } else {
            oidcClient.setCallbackUrl("https://localhost:4567/callback");
        }

        // Security configuration using google client
        Config config = new Config(oidcClient);
        config.addAuthorizer("custom", new CustomAuthorizer());
        config.setHttpActionAdapter(new DemoHttpActionAdapter());

        // Set up call back end points
        CallbackRoute callback = null;
        if (DEPLOYMENT) {
            callback = new CallbackRoute(config, "https://petmydog.fun", true);
        } else {
            callback = new CallbackRoute(config, "https://localhost:3000", true);
        }
        get("/callback", callback);
        post("/callback", callback);

        /*******************************************     End OAuth config     *****************************************/


        /*****************************************     Begin SQL config     *****************************************/

        Sql2o sql2o = new Sql2o("jdbc:mysql://104.154.216.86:3306/pmd", "root", "LG_.>.GHkoKM1P?Z");
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
        Map<String, Object> timeType = new HashMap<>();
        timeType.put("type", "long");

        Map<String, Object> properties = new HashMap<>();
        properties.put("location", type);
        properties.put("uid", keyType);
        properties.put("timestamp", timeType);

        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("properties", properties);
        putMappingRequest.source(jsonMap);

        try {
            restHighLevelClient.indices().putMapping(putMappingRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            System.out.println(e.getMessage());

        }

        /***************************************   End Elasticsearch config   *****************************************/


        /********************************************   Start CORS config   *******************************************/
        if (!DEPLOYMENT) {
            CorsFilter.apply();

            options("/*", (request, response) -> {

                String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
                if (accessControlRequestHeaders != null) {
                    response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
                }

                String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
                if (accessControlRequestMethod != null) {
                    response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
                }

                return "OK";
            });
        }
        /********************************************   End CORS config   *********************************************/


        /*******************************************   Start Security Guard   *****************************************/
        if (DEPLOYMENT) {
            before("/hello", new SecurityFilter(config, "GoogleClient"));
            before("/getNearbyUser", new SecurityFilter(config, "GoogleClient"));
            before("/getUserProfile", new SecurityFilter(config, "GoogleClient"));
            before("/getMyProfile", new SecurityFilter(config, "GoogleClient"));
            before("/getDogProfile", new SecurityFilter(config, "GoogleClient"));
            before("/deleteDogProfile", new SecurityFilter(config, "GoogleClient"));
            before("/meetups", new SecurityFilter(config, "GoogleClient"));
            before("/endMeetup", new SecurityFilter(config, "GoogleClient"));
            before("/rejectMeetup", new SecurityFilter(config, "GoogleClient"));
            before("/acceptMeetup", new SecurityFilter(config, "GoogleClient"));
            before("/requestMeetup", new SecurityFilter(config, "GoogleClient"));
            before("/newDog", new SecurityFilter(config, "GoogleClient"));
            before("/getOtherUserLocation", new SecurityFilter(config, "GoogleClient"));
            before("/editDogProfile", new SecurityFilter(config, "GoogleClient"));
            before("/editUserProfile", new SecurityFilter(config, "GoogleClient"));
            before("/updateLocation", new SecurityFilter(config, "GoogleClient"));
            before("/getNearbyUser", new SecurityFilter(config, "GoogleClient"));
        }
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
                            null, email, null, pic_link, "1000-01-01 00:00:00", null))) {
                        response.redirect("/login", 500);
                    }
                }
            } else {
                response.redirect("/login");
            }

        });

        /******************************************    End Security Guard     *****************************************/


        /****************************************   Start Service end pints   *****************************************/

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

        /**
         * Endpoint path: /getUserProfile
         *
         * Required parameters: {uid}
         *
         * Return json in the format:
         *  {
         *  "uid":"1000",
         *  "username":"someone",
         *  "email":"someone@email.com",
         *  "pic_link":"https://somepicture.com",
         *  "last_ping":"1000-01-01T00:00",
         *  "dogs":[
         *  {"did":"1","name":"dogName1","age":0,"gender":"male","breed":"breed1","pic_link":"pic1"},
         *  {"did":"2","name":"dogName2","age":1,"gender":"female","breed":"breed2","pic_link":"pic2"}
         *  ]
         *  }
         *
         *  400 error if no uid is given.
         */
        get("/getUserProfile", Main::getUserProfile);

        get("/getMyProfile", Main::getMyProfile);

        get("/getDogProfile", Main::getDogProfile);

        /*
         * Endpoint path: /deleteDogProfile
         *
         * Required parameters: {did}
         *
         * Return json in the format:
         *  "success"
         *
         *  400 error if no did is given.
         */
        post("/deleteDogProfile", Main::deleteDogProfile);

        /**
         * Endpoint path: /newDog
         *
         * Required parameters: {name, age, gender, breed, pic_link}
         *
         * Return json in the format:
         *  "Success"
         *
         *  400 error if the information given is incomplete.
         *  500 error if failed to add dog profile.
         */
        post("/newDog", Main::createDogProfile);

        post("/requestMeetup", Main::requestMeetup);

        post("/acceptMeetup", Main::acceptMeetup);

        post("/rejectMeetup", Main::rejectMeetup);

        /**
         * Endpoint path: /endMeetup
         *
         * Required parameters: {mid, sender, receiver, status}
         *
         * Return json in the format:
         *  "Success"
         *
         *  400 error if the meetup does not exist.
         */
        post("/endMeetup", Main::endMeetup);

        get("/meetups", Main::getMeetupRequests);

        /**
         * Endpoint path: /getNearbyUser
         *
         * Required parameters: {lat, lng}
         *
         * Return json in the format:
         * [
         *  12345678,
         *  12349876,
         *  ...,
         * ]
         *
         *  400 error if given lat or lng is not in (-90, 90) or (-180, 180).
         *  500 error if failed to get nearby user.
         */
        post("/getNearbyUser", Main::getNearbyUser);

        /**
         * Endpoint path: /updateLocation
         *
         * Required parameters: {lat, lng}
         *
         * Return json in the format:
         *  "updated"
         *
         *  400 error if parameters are invalid. TODO: throw
         *  500 error if server fail to update location.
         */
        post("/updateLocation", Main::updateLocation);

        put("/editUserProfile", Main::editUserProfile);

        /**
         * Endpoint path: /editDogProfile
         *
         * Required parameters: {did, field, value}
         *
         * Return json in the format:
         *  "Updated"
         *
         *  400 error if no did, field, or value is given.
         */
        put("/editDogProfile", Main::editDogProfile);
      
        /**
         * Endpoint path: /getOtherUserLocation
         *
         * Return json in the format:
         *  {
         *  lat: 12345678,
         *  lng: 12349876
         * }
         *
         *  400 error if no corresponding meeting is accepted.
         *  500 error if server fails.
         */
        get("/getOtherUserLocation", Main::getOtherUserLocation);

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
            String uid = request.queryParams("uid");
            DBUtils.User user = model.getUser(uid);
            List<DBUtils.Dog> dogs = model.getDogsFromUserId(uid);
            user.setDogs(dogs);
            return gson.toJson(user);
        } catch (Exception e) {
            halt(500);
            return null;
        }
    }

    private static String editUserProfile(Request request, Response response) {
        Gson gson = new Gson();
        String body = request.body();
        Map<String, String> bodyContent = gson.fromJson(body, Map.class);
        String uid = bodyContent.get("uid");
        String field = bodyContent.get("field");
        String newVal = bodyContent.get("newVal");
        if (field.equals("username")) {
            model.updateUserUsername(uid, newVal);
            return gson.toJson("Updated");
        } else if (field.equals("phone")) {
            model.updateUserPhone(uid, newVal);
            return gson.toJson("Updated");
        } else if (field.equals("email")) {
            model.updateUserEmail(uid, newVal);
            return gson.toJson("Updated");
        } else if (field.equals("bio")) {
            model.updateUserBio(uid, newVal);
            return gson.toJson("Updated");
        } else if (field.equals("pic_link")) {
            model.updateUserPic(uid, newVal);
            return gson.toJson("Updated");
        } else {
            return gson.toJson("Invalid field");
        }
    }

    private static String editDogProfile(Request request, Response response) {
        Gson gson = new Gson();
        Map<String, String> bodyContent = gson.fromJson(request.body(), Map.class);
        String did = bodyContent.get("did");
        String field = bodyContent.get("field");
        String value = bodyContent.get("value");
        switch (field) {
            default:
                return gson.toJson("Invalid field");
            case "name":
                model.updateDogName(did, value);
                return gson.toJson("Updated");
            case "age":
                model.updateDogAge(did, value);
                return gson.toJson("Updated");
            case "gender":
                model.updateDogGender(did, value);
                return gson.toJson("Updated");
            case "breed":
                model.updateDogBreed(did, value);
                return gson.toJson("Updated");
            case "pic_link":
                model.updateDogPic(did, value);
                return gson.toJson("Updated");
        }
    }

    private static String getMyProfile(Request request, Response response) {
        try {
            Gson gson = new Gson();
            String uid = getUserId(request, response);
            DBUtils.User user = model.getUser(uid);
            List<DBUtils.Dog> dogs = model.getDogsFromUserId(uid);
            user.setDogs(dogs);
            return gson.toJson(user);
        } catch (Exception e) {
            halt(500);
            return null;
        }
    }

    private static String createDogProfile(Request request, Response response) {
        Gson gson = new Gson();
        UUID uuid = UUID.randomUUID();
        String did = uuid.toString();
        DBUtils.Dog dog = gson.fromJson(request.body(), DBUtils.Dog.class);
        model.createDog(did, dog);
        String uid = getUserId(request, response);
        model.dogAndUser(did, uid);
        return gson.toJson("Success");
    }

    private static String requestMeetup(Request request, Response response) {
        Gson gson = new Gson();
        String body = request.body();
        Map<String, String> bodyContent = gson.fromJson(body, Map.class);
        // check if users exist
        String uid = getUserId(request, response);
        DBUtils.User sender = model.getUser(uid);
        DBUtils.User receiver = model.getUser(bodyContent.get("receiver"));
        if (sender == null || receiver == null) {
            return gson.toJson("User not found");
        }
        if (sender.equals(receiver)) {
            return gson.toJson("Invalid request");
        }
        // insert meeting information
        UUID id = UUID.randomUUID();
        DBUtils.MeetUp meetUp = new DBUtils.MeetUp(id.toString(),
                uid, bodyContent.get("receiver"), "Pending", null, null);
        if (!model.checkIfMeetUpExists(meetUp)) {
            model.createMeetUp(meetUp);
            return gson.toJson(id.toString());
        }
        return gson.toJson("Meeting request has been canceled");
    }

    private static String acceptMeetup(Request request, Response response) {
        return meetupRespond(request, "Accepted");
    }

    private static String rejectMeetup(Request request, Response response) {
        return meetupRespond(request, "Rejected");
    }

    private static String endMeetup(Request request, Response response) {
        return meetupRespond(request, "Ended");
    }

    private static String meetupRespond(Request request, String status) {
        Gson gson = new Gson();
        String body = request.body();
        Map<String, String> bodyContent = gson.fromJson(body, Map.class);
        String mid = bodyContent.get("mid");
        DBUtils.MeetUp m = model.getMeetUp(mid);
        if (m == null) {
            return gson.toJson("Meetup does not exist");
        }
        model.updateMeetUp(mid, status);
        return gson.toJson("Success");
    }

    private static String getMeetupRequests(Request request, Response response) {
        Gson gson = new Gson();
        String uid = getUserId(request, response);
        List<DBUtils.MeetUp> m = model.getMeetUpsForUser(uid);
        if (m.isEmpty()) {
            return gson.toJson("No meetups");
        }
        return gson.toJson(m);
    }


    private static String getDogProfile(Request request, Response response) {
        Gson gson = new Gson();
        String body = request.body();
        Map<String, String> bodyContent = gson.fromJson(body, Map.class);
        return gson.toJson(model.getDog(bodyContent.get("dogId")));
    }

    private static String deleteDogProfile(Request request, Response response) {
        Gson gson = new Gson();
        model.deleteDog(gson.fromJson(request.body(), DBUtils.Dog.class).getDid());
        return gson.toJson("Success");
    }

    private static String getUserId(Request request, Response response) {
        List<UserProfile> users = getProfiles(request, response);
        if (users.size() == 1) {
            UserProfile user = users.get(0);
            return user.getId();
        }
        return null;
    }

    private static String updateLocation(Request request, Response response) throws Exception {
        String uid = getUserId(request, response);
        Gson gson = new Gson();
        DBUtils.Location loc = gson.fromJson(request.body(), DBUtils.Location.class);

        // Update ES location
        long timestamp = System.currentTimeMillis();
        Map<String,Object> jsonMap = new HashMap<>();
        jsonMap.put("location", new GeoPoint(loc.getLat(), loc.getLng()));
        jsonMap.put("uid", uid);
        jsonMap.put("timestamp", timestamp);

        IndexRequest indexRequest = new IndexRequest(INDEX).id(uid).source(jsonMap);
        try {
            restHighLevelClient.index(indexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            System.out.println(e);
        }
        return gson.toJson("updated");
    }

    private static String getNearbyUser(Request request, Response response) throws Exception {
        Gson gson = new Gson();
        String uid = getUserId(request, response);
        DBUtils.Location loc = gson.fromJson(request.body(), DBUtils.Location.class);
        SearchSourceBuilder srb = new SearchSourceBuilder();
        QueryBuilder qb = QueryBuilders.geoDistanceQuery(INDEX)
                .point(loc.getLat(), loc.getLng())
                .distance("500", DistanceUnit.METERS);
        srb.query(qb);

        SearchRequest searchRequest = new SearchRequest(INDEX);
        searchRequest.source(srb);
        List<String> result = new ArrayList<>();
        try {
            SearchResponse search = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            SearchHits hits = search.getHits();
            for (SearchHit hit: hits) {
                String location = hit.getSourceAsString();
                DBUtils.UserLocation jsonObject = gson.fromJson(location, DBUtils.UserLocation.class);
                if (System.currentTimeMillis() - jsonObject.getTimestamp() < LOCATION_EXPIRE_TIME
                && !jsonObject.getUid().equals(uid))
                    result.add(jsonObject.getUid());
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
            halt(500, "failed to get nearby user");
        }
        return gson.toJson(result);
    }

    private static String getOtherUserLocation(Request request, Response response) {
        try {
            Gson gson = new Gson();
            String uid = getUserId(request, response);
            DBUtils.MeetUp meetup = model.getMyAcceptedMeetUp(uid);
            String thatUid = uid.equals(meetup.getSender()) ? meetup.getReceiver() : meetup.getSender();
            GetResponse thatUser = restHighLevelClient.get(new GetRequest(INDEX, thatUid), RequestOptions.DEFAULT);
            Map<String, Object> sourceAsMap = thatUser.getSourceAsMap();
            if (System.currentTimeMillis() - (long)sourceAsMap.get("timestamp") < LOCATION_EXPIRE_TIME)
                return gson.toJson(sourceAsMap.get("location"));

            halt(400, "The other user has left!");
        } catch (Exception e) {
            halt(500, "Server error");
        }
        return null;
    }

    /****************************************   End utils   *****************************************/

}

