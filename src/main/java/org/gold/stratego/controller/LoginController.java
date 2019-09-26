package org.gold.stratego.controller;


import org.gold.stratego.database.UserDB;
import org.gold.stratego.database.entities.User;
import org.gold.stratego.model.LoginInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

    /**
     *Test for session persistence.
     */
    //TODO: delete this
    @GetMapping("/sessiontest")
    @ResponseBody
    public Map<String, String> sestest(HttpSession session, Authentication auth){
        Map<String, String> hashMap = new HashMap<>();
        hashMap.put("id", session.getId());
        hashMap.put("name", auth.getName());
        session.setAttribute("name", auth.getName());
        //System.out.println("ID: " + session.getId());
        return hashMap;
    }

    @GetMapping("/login")
    public String loginGet(){
        //model.addAttribute("loginInfo", new LoginInfo());
        return "login.html";
    }

    /**
     * Handles POST request after user has submitted data.
     * @param loginInfo - instance of LoginInfo class with fields filled according to POST data.
     * @return
     *
    @ResponseBody
    @PostMapping("/login")
        public Map<String, String> login(@RequestParam("userName") String userName,
                                         @RequestParam("password") String password,
                                         HttpSession session) {
            Map<String, String> hashMap = new HashMap<>();
            if(userDB.authenticateUser(userName,password)== UserDB.UserAuthenticationStatus.SUCCESSFUL){
                hashMap.put("success", "true");
                //HttpSession sessoin=request.getSession();
                session.setAttribute("name",userName);
                hashMap.put("id", session.getId());

            }else{
                hashMap.put("success", "false");
            }
        return hashMap;
    }
     */


    @ResponseBody
    @GetMapping("/loadUserInfo")
    public String loadUserInfo(HttpSession session)throws Exception{

        return session.getAttribute("name").toString();
        //return session.getId();
    }


    @ResponseBody
    @PostMapping("/loadMenuInfo")
    public String loadMenuInfo(HttpSession session)throws Exception{
        return session.getAttribute("name").toString();
    }


    @GetMapping("/signup")
    public String signupGet(Model model){
        model.addAttribute("loginInfo", new LoginInfo());
        return "signup.html";
    }


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
