import org.junit.jupiter.api.Test;

import java.net.*;
import java.net.http.*;
import java.util.concurrent.atomic.AtomicReference;

public class ExampleTest {

    @Test
    void justAnExample() {
        Main main = new Main();
        main.main(new String[0]);

        String id = "101836349121923215589"; // Set this to a known ID in database

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:4567/profile?uid=" + id))
                .GET()
                .build();
        AtomicReference<String> result = new AtomicReference<>();
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenAccept(result::set)
                .join();
        assert(result.toString().contains(id));
    }
}
