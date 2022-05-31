package mysql;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.util.ArrayList;
import java.util.List;

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
    public void dogAndUser(String did, String uid) {
        Connection conn = sql2o.open();
        conn.createQuery("INSERT INTO BelongTo VALUES (:did, :uid);")
                .addParameter("did", did)
                .addParameter("uid", uid)
                .executeUpdate();
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
    public void updateUserUsername(String uid, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE User SET username = :value WHERE uid = :uid")
                    .addParameter("uid", uid)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateUserPhone(String uid, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE User SET phone = :value WHERE uid = :uid")
                    .addParameter("uid", uid)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateUserEmail(String uid, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE User SET email = :value WHERE uid = :uid")
                    .addParameter("uid", uid)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateUserBio(String uid, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE User SET bio = :value WHERE uid = :uid")
                    .addParameter("uid", uid)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateUserPic(String uid, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE User SET pic_link = :value WHERE uid = :uid")
                    .addParameter("uid", uid)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateDogName(String did, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE Dog SET name = :value WHERE did = :did")
                    .addParameter("did", did)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateDogAge(String did, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE Dog SET age = :value WHERE did = :did")
                    .addParameter("did", did)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateDogGender(String did, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE Dog SET gender = :value WHERE did = :did")
                    .addParameter("did", did)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateDogBreed(String did, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE Dog SET breed = :value WHERE did = :did")
                    .addParameter("did", did)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public void updateDogPic(String did, String value) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("UPDATE Dog SET pic_link = :value WHERE did = :did")
                    .addParameter("did", did)
                    .addParameter("value", value)
                    .executeUpdate();
            conn.commit();
        }
    }

    public boolean checkIfMeetUpExists(DBUtils.MeetUp meetUp) {
        Connection conn = sql2o.open();
        List<DBUtils.MeetUp> allReqs = new ArrayList<>();
        if (meetUp != null) {
            allReqs = conn.createQuery("SELECT * from MeetUp WHERE sender = :sender OR sender = :receiver " +
                            "OR receiver = :sender OR receiver = :receiver AND status = :status")
                    .addParameter("sender", meetUp.getSender())
                    .addParameter("receiver", meetUp.getReceiver())
                    .addParameter("status", "Accepted")
                    .executeAndFetch(DBUtils.MeetUp.class);
        }
        return allReqs.size() > 0;
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
    public List<DBUtils.MeetUp> getMeetUpsForUser(String uid) {
        try (Connection conn = sql2o.beginTransaction()) {
            List<DBUtils.MeetUp> c = conn.createQuery("SELECT * FROM MeetUp WHERE receiver = :uid OR sender = :uid;")
                    .addParameter("uid", uid)
                    .executeAndFetch(DBUtils.MeetUp.class);
            for (DBUtils.MeetUp m : c) {
                m.setSenderProfile(getUser(m.getSender()));
                m.setReceiverProfile(getUser(m.getReceiver()));
            }
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
    public void createDog(String did, DBUtils.Dog dog) {
        String insert = "INSERT INTO Dog " +
                "VALUES (:did, :name, :age, :gender, :breed, :pic_link)";
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery(insert)
                    .addParameter("did", did)
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

    @Override
    public void deleteDog(String did) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("DELETE FROM Dog WHERE did=:did")
                    .addParameter("did", did)
                    .executeUpdate();
            conn.createQuery("DELETE FROM BelongTo WHERE did=:did")
                    .addParameter("did", did)
                    .executeUpdate();
            conn.commit();
        }
    }

    @Override
    public DBUtils.MeetUp getMyAcceptedMeetUp(String uid) throws Exception {
        Connection conn = sql2o.beginTransaction();
        String query = "SELECT * FROM MeetUp WHERE (sender=:sender or receiver=:receiver) and status='Accepted';";
        DBUtils.MeetUp c = conn.createQuery(query)
                .addParameter("sender", uid)
                .addParameter("receiver", uid)
                .executeAndFetchFirst(DBUtils.MeetUp.class);
        return c;
    }
}