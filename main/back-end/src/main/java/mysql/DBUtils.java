package mysql;

import lombok.Data;

import java.util.List;

public class DBUtils {
    public interface Model {
        void updateUser(String username, String bio, String uid);
        List<User> getUser(String uid);
        void createDog(String dogid, String dogname, int age, String gender, String breed, String pic);
    }

    @Data
    public class User {
        private String uid;
        private String username;
        private int phone;
        private String email;
        private String bio;
        private String pic_link;
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
