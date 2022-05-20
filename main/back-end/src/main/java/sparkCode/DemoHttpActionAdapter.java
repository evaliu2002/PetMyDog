package sparkCode;

import org.pac4j.core.context.HttpConstants;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.exception.TechnicalException;
import org.pac4j.core.exception.http.HttpAction;
import org.pac4j.sparkjava.SparkHttpActionAdapter;
import spark.ModelAndView;
import spark.TemplateEngine;

import java.util.HashMap;

public class DemoHttpActionAdapter extends SparkHttpActionAdapter {

    public DemoHttpActionAdapter() {
    }

    @Override
    public Object adapt(final HttpAction action, final WebContext context) {
        if (action != null) {
            final int code = action.getCode();
            if (code == HttpConstants.UNAUTHORIZED) {
                stop(401, "Unauthorized access");
            } else if (code == HttpConstants.FORBIDDEN) {
                stop(403, "Access denied");
            } else {
                return super.adapt(action, context);
            }
        }
        throw new TechnicalException("No action provided");
    }
}