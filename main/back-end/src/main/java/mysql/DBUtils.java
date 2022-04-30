package mysql;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

public class DBUtils {
    public interface Model {
        boolean existUser(String uid);

        boolean createUser(User user);

        void updateUser(String username, String bio, String uid);
        List<User> getUser(String uid);
        void createDog(Dog dog);
    }

    @Data
    @AllArgsConstructor
    public static class User {
        private String uid;
        private String username;
        private String phone;
        private String email;
        private String bio;
        private String pic_link;
        private String last_ping;
    }

    @Data
    public class Dog {
        private String did;
        private String name;
        private int age;
        private String gender;
        private String breed;
        private String pic_link;
    }
}
