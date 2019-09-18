package org.gold.stratego.database;
import org.gold.stratego.database.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Wrapper for Spring's UserRepository
 * @author Jacob Thomas
 */
@Transactional
@Component
public class UserDB{

    @Autowired
    private UserRepository userRepository;

    public void insertUser(String username, String password){
        //TODO: hash the password
        User user = new User();
        user.setUsername(username);
        user.setPass_hash(password);

        userRepository.save(user);
    }

    public User findUser(String username){
        List<User> results = userRepository.findUserByUsername(username);
        if (results.size() == 0)
            return null;
        return results.get(0);
    }

    public void updateUser(User user){
        userRepository.save(user);
    }

    public void deleteUser(String username){
        userRepository.deleteByUsername(username);
    }

    /**
     * Do not use this in the main code!
     * For debugging/testing only.
     *
     */
    public UserRepository DEBUG_getUserRepository(){
        return userRepository;
    }




}