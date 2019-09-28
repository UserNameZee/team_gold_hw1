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
import javax.servlet.http.HttpSession;

import org.gold.stratego.database.GameDB;
import org.gold.stratego.database.entities.MongoTest;
import org.gold.stratego.database.entities.Turn;
import org.gold.stratego.database.entities.Game;
import org.gold.stratego.controller.SessionController;

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
    SessionController sc;

    @Autowired
    GameDB gameDB;

    @Autowired
    org.gold.stratego.database.GameRepository repo;

    @GetMapping(path="/anontest")
    public Map<String, String> anontest(HttpSession session) throws Exception{
        Map<String,String> map = success(true);
        map.put("anon", new Boolean(sc.userIsAnonymous(session)).toString());
        return map;
    }


    /**
     * Saves a Game into the GameDB
     * Only saves games if the user is logged in.
     * @param game - Object which will be set with JSON data in HTTP body.
     */
    @PostMapping(path="/save_game", consumes=MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> save_game(@RequestBody Game game, HttpSession session) throws Exception{
        if (sc.userIsAnonymous(session))
            return success(false, "User is anonymous");
        gameDB.addGame(game);
        return success(true);
    }

    /**
     * Adds the turn data to the current active Game document. The ID of the current game is acquired from the
     * current session.
     * @param turn
     * @param session
     * @return Success if turn is successfully added to DB.
     *         Failure if user is anonymous
     *         or
     *         User has no active games
     */
    @PostMapping(path="/add_turn", consumes=MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> add_turn(@RequestBody Turn turn, HttpSession session) throws Exception{
        if (sc.userIsAnonymous(session))
            return success(false, "User is anonymous.");
        String currentUser = sc.loadUserInfo(session);
        Game active = gameDB.getActiveGame(currentUser);
        if (active == null)
            return success(false, "No active games for current user: ");
        active.getTurns().add(turn);
        gameDB.updateGame(active);
        return success(true);

    }

    /**
     * Returns all games in the history of current logged in user.
     * @param session current session
     * @return Array of Games in JSON format that are associated with current user
     *         Nothing if user is Anonymous.
     */
    @GetMapping(path="/games")
    public Iterable<Game> getUserGames(HttpSession session)throws Exception{
        Map<String, Object> hashMap = new HashMap<>();
        String username = sc.loadUserInfo(session);
        if (username.equals("Anonymous"))
            return null;
        return gameDB.findAllGames(username);
    }


    /**
     * DEBUG
     * method to get all games
     * @return
     */
    @GetMapping(path="/allgames")
    public Iterable<Game> getAllGames() {
        return repo.findAll();
    }

    //Below methods are not endpoints.

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

    private static Map<String, String> success(Boolean b, String details){
        Map<String, String> map = success(b);
        map.put("details", details);
        return map;
    }

}
