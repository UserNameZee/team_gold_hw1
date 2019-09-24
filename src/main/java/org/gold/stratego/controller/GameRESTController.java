package org.gold.stratego.controller;

import org.gold.stratego.database.UserDB;
import org.gold.stratego.database.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Maps the REST endpoint for storing game data.
 * @author Jacob Thomas
 */

@Controller
@RequestMapping(path="/rest")
public class GameRESTController{

    @Autowired
    UserDB userDB;

    @GetMapping(path="/users")
    public @ResponseBody Iterable<User> getAllUsers(){
        return userDB.DEBUG_getUserRepository().findAll();

    }

}
