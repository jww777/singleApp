package com.forceclouds.ctms.admin.service.system;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.forceclouds.ctms.dao.entity.system.BaseUser;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/22 15:23
 */
public interface BaseUserService extends IService<BaseUser> {
    List<HashMap<String, Object>> getList();
    IPage<HashMap<String, Object>> selectPageVo(Page page, @Param("state") Integer state);
}
