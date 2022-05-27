package mysql;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

public class DBUtils {
    public interface Model {

        boolean createUser(User user);
        void updateUser(String username, String bio, String uid);
        void updateUserUsername(String uid, String value);
        void updateUserPhone(String uid, String value);
        void updateUserEmail(String uid, String value);
        void updateUserBio(String uid, String value);
        void updateUserPic(String uid, String value);
        void updateDogName(String did, String value);
        void updateDogAge(String did, String value);
        void updateDogGender(String did, String value);
        void updateDogBreed(String did, String value);
        void updateDogPic(String did, String value);
        User getUser(String uid);
        void createDog(String did, Dog dog);
        void dogAndUser(String did, String uid);

        List<Dog> getDog(String did);

        List<DBUtils.Dog> getDogsFromUserId(String uid);

        MeetUp getMeetUp(String mid);
        void updateMeetUp(String mid, String status);
        void createMeetUp(MeetUp meetUp);
        boolean checkIfMeetUpExists(MeetUp meetUp);
        List<DBUtils.MeetUp> getMeetUpsForUser(String uid);
        void deleteDog(String did);

        MeetUp getMyAcceptedMeetUp(String mid) throws Exception;
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
        private List<Dog> dogs;
    }

    @Data
    @AllArgsConstructor
    public static class MeetUp {
        private String mid;
        private String sender;
        private String receiver;
        private String status;
        private User senderProfile;
        private User receiverProfile;
    }

    @Data
    public class Dog {
        private String did;
        private String name;
        private String age;
        private String gender;
        private String breed;
        private String pic_link;
    }

    @Data
    public class BelongTo {
        private String uid;
        private String did;
    }

    @Data
    public class ExistUserResult {
        private int exist;
    }

    @Data
    public class Location {
        private double lng;
        private double lat;
    }

    @Data
    @AllArgsConstructor
    public static class UserLocation {
        private Location location;
        private String uid;
        private long timestamp;
    }
}

