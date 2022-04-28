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
    public void updateUser(String username, String bio, String uid) {
        try (Connection conn = sql2o.beginTransaction()) {
            conn.createQuery("SELECT * FROM User");
            conn.createQuery("UPDATE User SET username = :username, bio = :bio WHERE uid = :uid")
                    .addParameter("username", username)
                    .addParameter("bio", bio)
                    .addParameter("uid", uid)
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

    @Override
    public List<DBUtils.Dog> getDog(String did) {
        String sql = "SELECT * FROM Dog WHERE did = " + did;

        try(Connection con = sql2o.open()) {
            return con.createQuery(sql).executeAndFetch(DBUtils.Dog.class);
        }
    }
}