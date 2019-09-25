package org.gold.stratego.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/return")
public class InfoController {
    /**
     * Model本身不能设置页面跳转的url地址别名或者物理跳转地址，那么我们可以通过控制器方法的返回值来设置跳转url
     * 地址别名或者物理跳转地址
     *
     * @param model
     *            一个接口， 其实现类为ExtendedModelMap，继承了ModelMap类
     * @return 跳转url地址别名或者物理跳转地址
     */
    @RequestMapping(value = "/src/main/webapp/WEB-INF/static/login.html")
    public String index1(Model model) {
        model.addAttribute("result", "后台返回index1");
        return "result";
    }
}
