package mysql;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class Sql2oModel implements DBUtils.Model {

    private Sql2o sql2o;

    public Sql2oModel(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public DBUtils.User getUser(String uid) {
        Connection conn = sql2o.open();
        DBUtils.User c = conn.createQuery("SELECT * FROM User WHERE uid = :uid;")
                .addParameter("uid", uid)
                .executeAndFetchFirst(DBUtils.User.class);
        return c;
    }

    @Override
    public List<DBUtils.Dog> getDogsFromUserId(String uid) {
        Connection conn = sql2o.open();
        List<DBUtils.Dog> dogIDs = conn.createQuery("SELECT did FROM BelongTo WHERE uid = :uid;")
                .addParameter("uid", uid)
                .executeAndFetch(DBUtils.Dog.class);
        List<DBUtils.Dog> dogs = new ArrayList<>();
        for (DBUtils.Dog dog : dogIDs) {
            dogs.add(conn.createQuery("SELECT * FROM Dog WHERE did = :did;")
                    .addParameter("did", dog.getDid())
                    .executeAndFetchFirst(DBUtils.Dog.class));
        }
        return dogs;
    }

    @Override
    public boolean createUser(DBUtils.User user) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("INSERT INTO User VALUES (:uid, :username, :phone, :email, :bio, :pic_link, :last_ping);")
                    .addParameter("uid", user.getUid())
                    .addParameter("username", user.getUsername())
                    .addParameter("phone", user.getPhone())
                    .addParameter("email", user.getEmail())
                    .addParameter("bio", user.getBio())
                    .addParameter("pic_link", user.getPic_link())
                    .addParameter("last_ping", user.getLast_ping())
                    .executeUpdate();
            conn.commit();
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public void updateUser(String username, String bio, String uid) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE User SET username = :username, bio = :bio WHERE uid = :uid")
                    .addParameter("username", username)
                    .addParameter("bio", bio)
                    .addParameter("uid", uid)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public DBUtils.MeetUp getMeetUp(String mid) {
        try (Connection conn = sql2o.beginTransaction()) {
            DBUtils.MeetUp c = conn.createQuery("SELECT * FROM MeetUp WHERE mid = :mid;")
                    .addParameter("mid", mid)
                    .executeAndFetchFirst(DBUtils.MeetUp.class);
            return c;
        }
    }

    @Override
    public void updateMeetUp(String mid, String status) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE MeetUp SET status= :status WHERE mid = :mid")
                    .addParameter("status", status)
                    .addParameter("mid", mid)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void createMeetUp(DBUtils.MeetUp meetUp) {
        String insert = "INSERT INTO MeetUp " +
                "VALUES (:mid, :sender, :receiver, :status)";
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery(insert)
                    .addParameter("mid", meetUp.getMid())
                    .addParameter("sender", meetUp.getSender())
                    .addParameter("receiver", meetUp.getReceiver())
                    .addParameter("status", meetUp.getStatus())
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public boolean checkIfMeetUpExists(DBUtils.MeetUp meetUp) {
        String dupeCheck = "SELECT sender FROM MeetUp";
        String receiver = meetUp.getReceiver();
        Connection conn = sql2o.open();
        List<String> senders = conn.createQuery(dupeCheck).executeAndFetch(String.class);
        for (String sender : senders) {
            if (Objects.equals(sender, receiver)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void createDog(DBUtils.Dog dog) {
        String insert = "INSERT INTO Dog " +
                "VALUES (:did, :name, :age, :gender, :breed, :pic_link)";
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery(insert)
                    .addParameter("did", dog.getDid())
                    .addParameter("name", dog.getName())
                    .addParameter("age", dog.getAge())
                    .addParameter("gender", dog.getGender())
                    .addParameter("breed", dog.getBreed())
                    .addParameter("pic_link", dog.getPic_link())
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public List<DBUtils.Dog> getDog(String did) {
        String sql = "SELECT * FROM Dog WHERE did = " + did;

        try(Connection con = sql2o.open()) {
            return con.createQuery(sql).executeAndFetch(DBUtils.Dog.class);
        }
    }

//    @Override
//    public List<DBUtils.User> getUser(String uid) {
//        String sql = "SELECT * FROM User WHERE uid = " + uid;

//        try(Connection con = sql2o.open()) {
//            return con.createQuery(sql).executeAndFetch(DBUtils.User.class);
//        }
//    }
}