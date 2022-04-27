package mysql;

import lombok.Data;

public class DBUtils {
    public interface Model {
        void updateUser(String username, String bio, String uid);
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
}
