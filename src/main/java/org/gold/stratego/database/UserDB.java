package org.gold.stratego.database;
import org.gold.stratego.database.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.security.MessageDigest;
import java.util.Arrays;

/**
 * Wrapper for Spring's UserRepository
 * @author Jacob Thomas
 */
@Transactional
@Component
public class UserDB{
    /**
     * Enum used to check the result of a login attempt in method authenticateUser()
     */
    public enum UserAuthenticationStatus {
        USERNAME_NOT_FOUND,
        INVALID_PASSWORD,
        SUCCESSFUL;
    }

    public class UsernameTakenException extends Exception{

        public String toString(){
            return "The username is already taken";
        }
    }

    @Autowired
    private UserRepository userRepository;

    public void insertUser(String username, String password) throws UsernameTakenException{

        //Cannot have duplicate usernames.
        if (findUser(username) != null){
            throw new UsernameTakenException();
        }

        User user = new User();
        user.setUsername(username);
        user.setPass_hash(getHash(password));
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
     * Attempts to authenticate the given username and password
     * @param username
     * @param password
     * @return - One of three statuses (defined above as enum):
     *          USERNAME_NOT_FOUND - The username is not present in the database.
     *          INVALID_PASSWORD - Username was found, but password does not match.
     *          SUCCESSFUL - Username and password exist in the DB.
     */
    public UserAuthenticationStatus authenticateUser(String username, String password){
        User found = findUser(username);
        if (found == null)
            return UserAuthenticationStatus.USERNAME_NOT_FOUND;
        byte[] db_hash = found.getPass_hash();
        byte[] user_hash = getHash(password);
        if (!Arrays.equals(db_hash, user_hash))
            return UserAuthenticationStatus.INVALID_PASSWORD;
        return UserAuthenticationStatus.SUCCESSFUL;

    }

    /**
     * Hashes the given string.
     */
    public byte[] getHash(String entry){
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(entry.getBytes());
            return md.digest();
        } catch (Exception e){
            System.out.println("Exception occurred while hashing password.");
            return null;
        }
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