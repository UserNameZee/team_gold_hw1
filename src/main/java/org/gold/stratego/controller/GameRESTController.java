package org.gold.stratego.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.gold.stratego.database.UserDB;
import org.gold.stratego.database.entities.User;

/**
 * Maps the REST endpoint for storing game data.
 * @author Jacob Thomas
 */

@Controller
@RequestMapping(path="/rest")
public class GameRESTController{

    @Autowired
    org.gold.stratego.database.GameRepository userDB;

    @GetMapping(path="/users")
    public @ResponseBody Iterable<org.gold.stratego.database.entities.MongoTest> getAllUsers(){
        return userDB.findAll();

    }

}
