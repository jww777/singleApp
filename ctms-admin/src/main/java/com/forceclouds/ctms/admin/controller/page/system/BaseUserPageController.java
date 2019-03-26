package com.forceclouds.ctms.admin.controller.page.system;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/26 10:03
 */
@Controller
@RequestMapping("/page/baseUser/")
public class BaseUserPageController {
    /**
     * @param id
     * @Description: 编辑页面
     * @Author: jww
     * @CreateDate: 2017/11/9 16:38
     */
    @RequestMapping("edit")
    public String edit(@RequestParam(value = "id", defaultValue = "") String id,Model model) {
        return "system/user_edit";
    }
}
