package org.gold.stratego.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/return")
public class InfoController {

    @RequestMapping(value = "/login.html")
    public String index1(Model model) {
        model.addAttribute("result", "后台返回index1");
        return "result";

}
