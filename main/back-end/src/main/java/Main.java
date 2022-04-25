import com.github.scribejava.apis.GoogleApi20;
import org.pac4j.core.authorization.authorizer.RequireAnyRoleAuthorizer;
import org.pac4j.core.config.Config;
import org.pac4j.oidc.client.OidcClient;
import org.pac4j.oidc.config.OidcConfiguration;
import org.pac4j.oauth.client.Google2Client;
import org.pac4j.oauth.client.OAuth20Client;
import org.pac4j.oauth.config.OAuth20Configuration;
import org.pac4j.oauth.profile.google2.Google2ProfileDefinition;
import org.pac4j.sparkjava.SecurityFilter;
import spark.template.mustache.MustacheTemplateEngine;
import org.pac4j.jee.context.session.JEESessionStore;



import java.util.Optional;

import static spark.Spark.*;


public class Main {
    public static void main(String[] args) {
        final OidcConfiguration oidcConfiguration = new OidcConfiguration();
        oidcConfiguration.setClientId("215324184605-v64ebk4kddt6aufdkmbaf0iv38doeqdb.apps.googleusercontent.com");
        oidcConfiguration.setSecret("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");
        oidcConfiguration.setDiscoveryURI("https://accounts.google.com/.well-known/openid-configuration");
        oidcConfiguration.setUseNonce(true);

        oidcConfiguration.addCustomParam("prompt", "consent");
        final OidcClient oidcClient = new OidcClient(oidcConfiguration);
        oidcClient.setAuthorizationGenerator((ctx, session, profile) -> {
            profile.addRole("ROLE_ADMIN");
            return Optional.of(profile);
        });

        Config config = new Config(oidcClient);
        config.addAuthorizer("admin", new RequireAnyRoleAuthorizer("ROLE_ADMIN"));
        config.addAuthorizer("custom", new CustomAuthorizer());
        config.setHttpActionAdapter(new DemoHttpActionAdapter(new MustacheTemplateEngine()));

        before("/hello", new SecurityFilter(config, "GoogleClient"));
        get("/hello", (req, res) -> "Hello World");
        get("/callback", (req, res) -> "Hello World again");

    }
}