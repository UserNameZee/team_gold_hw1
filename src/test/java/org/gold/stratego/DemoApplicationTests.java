package org.gold.stratego;

import org.gold.stratego.database.UserRepository;
import org.gold.stratego.database.entities.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.ContextConfiguration;
import org.gold.stratego.database.UserDB;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.ApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

    @Autowired
    private UserDB userDB;

    @Autowired
    private UserRepository userRepository;

	@Test
	public void contextLoads() {
	}

	/**
	 * Tests initialization of the UserDB wrapper on the Spring userRepository
	 */
	@Test
	public void DB_InitTest(){
	    //Ensure the repository beans are correctly loaded by Spring.
	    assertNotNull(userDB);
	    assertNotNull(userRepository);

	}

    /**
     * Below are CRUD tests for UserDB
     */
    //Test insertion
	@Test
    public void DB_CRUDTests(){
	    //TODO: update this test with hashing
	    String username = "test_user_john123456";
	    String password = "test_user_password";

	    userDB.insertUser(username, password);
        System.out.println("*** DB_CRUDTest: CREATE: Test user inserted.");

	    System.out.println("*** DB_CRUDTest: RETRIEVE: Retrieving test user...");
	    User found = userDB.findUser(username);
	    assertNotNull(found);
	    assertEquals(found.getUsername(), username);
	    System.out.println("*** DB_CRUDTest: RETRIEVE: Test user retrieved.");

	    found.setUsername(username.toUpperCase());
	    userDB.updateUser(found);
        System.out.println("*** DB_CRUDTest: UPDATE: Test user username updated.");
        User found_updated = userDB.findUser(username.toUpperCase());
        assertNotNull(found_updated);
        assertEquals(found_updated.getUsername(), username.toUpperCase());

        System.out.println("*** DB_CRUDTest: DELETE: Attempting to delete test user.");
        userDB.deleteUser(username.toUpperCase());
        assertNull(userDB.findUser(username.toUpperCase()));

    }




}
