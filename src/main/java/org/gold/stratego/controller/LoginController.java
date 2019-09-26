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
        return "login_ss.html";
    }

    @ResponseBody
    @PostMapping("/login")
    public Map<String, String> login(@RequestParam("username") String userName,
                                     @RequestParam("password") String password,
                                     HttpSession session) {
        System.out.println("Im in the handler.");
        Map<String, String> hashMap = new HashMap<>();
        UserDB.UserAuthenticationStatus status = userDB.authenticateUser(userName, password);
        if (status == UserDB.UserAuthenticationStatus.SUCCESSFUL) {
            hashMap.put("success", "true");
            session.setAttribute("auth", "true");
            session.setAttribute("name", userName);
        }
        else {
            hashMap.put("success", "false");
            session.setAttribute("auth", "false");
        }
        return hashMap;
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

        if (session.getAttribute("auth") == null)
            return "Anonymous";
        return session.getAttribute("name").toString();
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
