package org.gold.stratego.controller;


import org.gold.stratego.database.UserDB;
import org.gold.stratego.database.entities.User;
import org.gold.stratego.model.LoginInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for /login based on below tutorial for form submission:
 * https://spring.io/guides/gs/handling-form-submission/
 */

@Controller
public class LoginController{

    @Autowired
    UserDB userDB;

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
    @GetMapping("/loginPage")
    public String loginGet(Model model){
        model.addAttribute("loginInfo", new LoginInfo());
        return "login.html";
    }

    /**
     * Handles POST request after user has submitted data.
     * @param userName, password, session - instance of LoginInfo class with fields filled according to POST data.
     * @return
     */
    @ResponseBody
    @PostMapping("/login")
    public Map<String, String> login(@RequestParam("userName") String userName,
                                     @RequestParam("password") String password,
                                     HttpSession session) {
        Map<String, String> result = new HashMap<>();
        if(userDB.authenticateUser(userName,password)== UserDB.UserAuthenticationStatus.SUCCESSFUL){
            result.put("success", "true");
            session.setAttribute("user_name",userName);
        }else{
            result.put("success", "false");
        }
        return result;
    }


    @ResponseBody
    @GetMapping("/getSessionID")
    public String loadUserInfo(HttpSession session)throws Exception{

        System.out.println(session.getId());
        return session.getId();
    }


    @ResponseBody
    @PostMapping("/getUserName")
    public String loadMenuInfo(HttpSession session)throws Exception{
        return session.getAttribute("user_name").toString();
    }


    @GetMapping("/signup")
    public String signupGet(Model model){
        model.addAttribute("loginInfo", new LoginInfo());
        return "signup.html";
    }
    //


    @ResponseBody
    @PostMapping("/signup")
    public Map<String, String> signup(@RequestParam("userName") String userName, @RequestParam("password") String password){
        Map<String, String> hashMap = new HashMap<>();
        if( userDB.insertUser(userName, password)){
            hashMap.put("success", "true");
        }else{
            hashMap.put("success", "false");
        }
        return hashMap;
    }
}
