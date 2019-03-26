package com.forceclouds.ctms.admin.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/25 15:30
 */
@Controller
public class WelcomePageController {

    @RequestMapping("/")
    public String welcome(Model model) {
        return "login";
    }

    @RequestMapping("a")
    public String a(Model model) {
        return "test_table";
    }
}
