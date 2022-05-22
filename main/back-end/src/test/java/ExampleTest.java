//import mysql.Sql2oModel;
//import org.junit.jupiter.api.Test;
//import org.sql2o.Sql2o;
//import sparkCode.Main;
//
//import java.net.*;
//import java.net.http.*;
//import java.util.concurrent.atomic.AtomicReference;
//
//public class ExampleTest {
//    private final String id = "101836349121923215589"; // Set this to a known ID in database
//
//    @Test
//    void justAnExample() {
//        Main main = new Main();
//        main.main(new String[0]);
//
//        HttpClient client = HttpClient.newHttpClient();
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create("http://localhost:4567/profile?uid=" + id))
//                .GET()
//                .build();
//        AtomicReference<String> result = new AtomicReference<>();
//        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
//                .thenApply(HttpResponse::body)
//                .thenAccept(result::set)
//                .join();
//        System.out.println(result);
//        assert(result.toString().contains(id));
//    }
//
//    @Test
//    void getUserFromId() {
//        Sql2o sql2o = new Sql2o("jdbc:mysql://34.70.199.136:3306/pmd", "root", "b4lIbLjGOvszgcLC");
//        Sql2oModel model = new Sql2oModel(sql2o);
//        assert(model.getUser(id).getDogs() == null);
//    }
//}
