package com.forceclouds.ctms.admin.controller.api.system;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.forceclouds.ctms.admin.service.system.BaseUserService;
import com.forceclouds.ctms.admin.vo.system.BaseUserVO;
import com.forceclouds.ctms.common.dto.ResultMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/26 11:51
 */
@RestController
@RequestMapping("/api/baseUser/")
public class BaseUserApiController {
    @Autowired
    BaseUserService baseUserService;

    /**
     * @param jsonData
     * @Description: 新增、修改用户
     * @Author: jww
     * @CreateDate: 2017/11/6 17:18
     */
    @PostMapping("/saveForm")
    public ResultMsg saveForm(@RequestBody String jsonData) {
        JSONObject jsonObject = JSONObject.parseObject(jsonData);
        //获取用户json,转换成 用户对象
        String jsonCtBaseUser = jsonObject.getString("ctBaseUser");
        BaseUserVO baseUserVO = JSON.parseObject(jsonCtBaseUser, new TypeReference<BaseUserVO>() {});

        baseUserService.save(baseUserVO.getBaseUser());
        return null;
    }
}
