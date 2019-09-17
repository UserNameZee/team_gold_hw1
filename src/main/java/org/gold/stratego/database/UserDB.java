package org.gold.stratego.database;
import org.springframework.beans.factory.annotation.Autowired;


public class UserDB{

    public static UserDB userdb = null;

    @Autowired
    private UserRepository userRepository;

    public static UserDB getUserDB(){
        if (userdb == null)
            userdb = new UserDB();
        return userdb;
    }




}