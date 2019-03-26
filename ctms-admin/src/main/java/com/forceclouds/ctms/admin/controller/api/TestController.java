package com.forceclouds.ctms.admin.controller.api;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forceclouds.ctms.admin.service.system.BaseUserService;
import com.forceclouds.ctms.common.dto.ResultData;
import com.forceclouds.ctms.dao.entity.system.BaseUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/20 9:26
 */
@RestController
@RequestMapping("/api/Ws/")
public class TestController {
    @Autowired
    BaseUserService baseUserService;

    @RequestMapping("getHistoryList")
    public ResultData AB(@RequestParam(value = "page", defaultValue = "1") Integer page,
                         @RequestParam(value = "rows", defaultValue = "1") Integer rows)
    {
        baseUserService.removeById("b3b821c349054ccda1588e39046cc01c");
        BaseUser baseUser = baseUserService.getById("b3b821c349054ccda1588e39046cc01c");
        IPage<HashMap<String, Object>> resultData = baseUserService.selectPageVo(new Page<>(page,rows),0);
        return ResultData.ResultDataByPage(resultData.getPages(),resultData.getTotal(),resultData.getCurrent(),resultData.getRecords());
    }
}
