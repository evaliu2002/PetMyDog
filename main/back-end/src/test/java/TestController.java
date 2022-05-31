import com.despegar.http.client.GetMethod;
import com.despegar.http.client.HttpResponse;
import com.despegar.http.client.PostMethod;
import com.despegar.sparkjava.test.SparkServer;
import org.junit.ClassRule;
import org.junit.Test;
import spark.servlet.SparkApplication;
import sparkCode.Main;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * The test class
 *
 */
public class TestController {

    public static class TestContollerTestSparkApplication implements SparkApplication {
        @Override
        public void init() {
            Main main = new Main();
            main.main(null);
        }
    }

    @ClassRule
    public static SparkServer<TestContollerTestSparkApplication> testServer = new SparkServer<>(TestController.TestContollerTestSparkApplication.class, 4567);

    @Test
    public void test() throws Exception {
        /* The second parameter indicates whether redirects must be followed or not */
        PostMethod post = testServer.post("/requestMeetup", "{\"sender\": \"100428689288578997907\", \"receiver\": \"101836349121923215589\"}", false);
        HttpResponse httpResponse = testServer.execute(post);
        assertEquals(200, httpResponse.code());
        assertNotNull(testServer.getApplication());
    }
}