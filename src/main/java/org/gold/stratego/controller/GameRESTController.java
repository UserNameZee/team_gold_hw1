package org.gold.stratego.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.gold.stratego.database.GameDB;
import org.gold.stratego.database.entities.MongoTest;

import org.gold.stratego.database.entities.Turn;
import org.gold.stratego.database.entities.Game;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Maps the REST endpoint for storing game data.
 * @author Jacob Thomas
 */

@RestController
@RequestMapping(path="/rest")
public class GameRESTController{

    @Autowired
    GameDB gameDB;


    /**
     * Endpoint which saves JSON into an object for insertion into GameDB.
     * @param game - Object which will be set with JSON data in HTTP body.
     */
    @PostMapping(path="/save_game", consumes=MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> save_game(@RequestBody Game game){
        System.out.println(game.toString());
        gameDB.repo.save(game);
        //print turn data
        //for (Turn t: game.getTurns())
        //    System.out.println(t.toString());
        return success(true);
    }

    /**
     * Endpoint which adds
     * @param turn
     * @return
     */
    @PostMapping(path="/add_turn", consumes=MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> add_turn(@RequestBody Turn turn){

        return success(true);

    }


    /**
     * DEBUG
     * method to get all games
     * @return
     */
    @GetMapping(path="/games")
    public Iterable<Game> getAllGamess() {
        return gameDB.repo.findAll();
    }

    /**
     * Creates the return object for REST methods to indicate success or failure
     * @param b - whether "success" = true or false
     * @return {success: true} or {success: false}
     */
    private static Map<String, String> success(Boolean b){
        Map<String, String> hashMap = new HashMap<>();
        hashMap.put("success", b.toString().toLowerCase());
        return hashMap;
    }

}
