package org.gold.stratego.database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

/**
 * Wrapper for Spring's UserRepository
 * @author Jacob Thomas
 */
@Component
public class UserDB{

    @Autowired
    private UserRepository userRepository;

    /**
     * Do not use this in the main code!
     * For debugging/testing only.
     *
     */
    public UserRepository DEBUG_getUserRepository(){
        return userRepository;
    }




}