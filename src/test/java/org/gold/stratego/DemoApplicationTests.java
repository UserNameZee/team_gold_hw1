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
	public void DBInitTest(){
	    //Ensure the repository beans are correctly loaded by Spring.
	    assertNotNull(userDB);
	    assertNotNull(userRepository);

	}



}
