package org.gold.stratego.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HellowController{
    
    @RequestMapping("/hello")
    public String hello(){
        return "Hello Guys!";
    }
}