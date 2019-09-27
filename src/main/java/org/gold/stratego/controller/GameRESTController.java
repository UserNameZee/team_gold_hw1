package org.gold.stratego.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.gold.stratego.database.GameRepository;
import org.gold.stratego.database.entities.MongoTest;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * Maps the REST endpoint for storing game data.
 * @author Jacob Thomas
 */

@RestController
@RequestMapping(path="/rest")
public class GameRESTController{



    @Autowired
    GameRepository gameRepository;

    @GetMapping(path="/users")
    public Iterable<MongoTest> getAllUsers(){
        return gameRepository.findAll();

    }

    @PostMapping(path="/save_game")
    public Map<String, String> save_game(@RequestParam Map<String, String> params){
        System.out.println(params.entrySet().toString());
        return success(true);
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
