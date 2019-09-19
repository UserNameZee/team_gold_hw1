package org.gold.stratego.controller;


import org.gold.stratego.database.entities.User;
import org.gold.stratego.model.LoginInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for /login based on below tutorial for form submission:
 * https://spring.io/guides/gs/handling-form-submission/
 */
@Controller
public class LoginController{

    /**
     * Handles GET requests to /login
     * Refer to the GreetingController.java file in the below tutorial to handle the model and attributes:
     * https://spring.io/guides/gs/handling-form-submission/
     *
     * @param model - model with attributes:
     *              username(String) - username entered by user
     *              password(String) - unencrypted password entered by user
     *
     */
    @GetMapping("/login")
    public String loginGet(Model model){
        model.addAttribute("loginInfo", new LoginInfo());
        return "login.html";
    }

    /**
     * Handles POST request after user has submitted data.
     * @param loginInfo - instance of LoginInfo class with fields filled according to POST data.
     * @return
     */
    @PostMapping("/login")
    public String login(@RequestParam("userName") String userName,
                      @RequestParam("password") String password,
                           Model model){
        LoginInfo info = new LoginInfo();
        info.setUsername(userName);
        info.setPassword(password);
        info.setStatus(true);
        model.addAttribute(info);
        model.addAttribute("information", info);
        model.addAttribute("555", "99999");
        return "redirect:info.html";
    }
}
