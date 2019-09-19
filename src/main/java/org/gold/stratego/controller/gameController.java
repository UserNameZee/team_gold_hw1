package org.gold.stratego.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class gameController {

    @RequestMapping("/game")
    public String game(){
        return "game.html";
    }
}
