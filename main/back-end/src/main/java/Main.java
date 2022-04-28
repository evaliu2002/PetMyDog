import mysql.DBUtils;
import mysql.Sql2oModel;
import com.google.gson.Gson;
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
import java.util.*;

import static spark.Spark.*;


public class Main {
    private static DBUtils.Model model;

    public static void main(String[] args) {

        /*****************************************     Begin OAuth config     *****************************************/

        // Setup google oauth api configuration with pac4j
        final OidcConfiguration oidcConfiguration = new OidcConfiguration();
        oidcConfiguration.setClientId("215324184605-v64ebk4kddt6aufdkmbaf0iv38doeqdb.apps.googleusercontent.com");
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


        /*******************************************   Start Security Guard   *****************************************/

        before("/hello", new SecurityFilter(config, "GoogleClient"));

        /******************************************    End Security Guard     *****************************************/



        /****************************************   Start Service end pints   *****************************************/

        get("/hello", (req, res) -> getProfiles(req, res));
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

        get("/profile", (req, res) -> getUserProfile(req, res));
        post("/newDog", (req, res) -> createDogProfile(req, res));
        get("/sql", new Route() {
            @Override
            public Object handle(Request request, Response response) throws Exception {
                model.updateUser("test2", "test2", "1234");
                Gson gson = new Gson();
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
        Gson gson = new Gson();
        String body = request.body();
        Map<String, String> bodyContent = gson.fromJson(body, Map.class);
        return gson.toJson(model.getUser(bodyContent.get("uid")));
    }

    private static String createDogProfile(Request request, Response response) {
        Gson gson = new Gson();
        model.createDog(gson.fromJson(request.body(), DBUtils.Dog.class));
        //model.createDog("4567", "dog", 10, "female", "lab", "test_link");
        return gson.toJson("Success");
    }
    /****************************************   End utils   *****************************************/
}