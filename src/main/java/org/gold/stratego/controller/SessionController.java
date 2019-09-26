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
 * Contains paths related to obtaining user session data.
 * @author Jacob Thomas
 */
@Controller
public class SessionController {
    /**
     * Use this to check if user is currently logged in
     *
     * @param session - user session
     * @return -  Username of the user if the user is logged in
     *            "Anonymous" if the user is not logged in
     *
     */
    @ResponseBody
    @GetMapping("/loadUserInfo")
    public String loadUserInfo(HttpSession session)throws Exception{

        if (session.getAttribute("name") == null)
            return "Anonymous";
        return session.getAttribute("name").toString();
    }
}