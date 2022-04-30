package mysql;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.util.List;

public class Sql2oModel implements DBUtils.Model {

    private Sql2o sql2o;

    public Sql2oModel(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public boolean existUser(String uid) {
        try (Connection conn = sql2o.open()) {
            int c = conn.createQuery("SELECT 1 FROM user WHERE uid = :uid;")
                    .addParameter("uid", uid)
                    .executeAndFetch(Integer.class)
                    .get(0);
            return c == 1;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
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
    public List<DBUtils.User> getUser(String uid) {
        String sql = "SELECT * FROM User WHERE uid = " + uid;

        try(Connection con = sql2o.open()) {
            return con.createQuery(sql).executeAndFetch(DBUtils.User.class);
        }
    }
}