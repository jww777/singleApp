package com.forceclouds.ctms.admin.service.system.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forceclouds.ctms.admin.service.system.BaseUserService;
import com.forceclouds.ctms.dao.entity.system.BaseUser;
import com.forceclouds.ctms.dao.mapper.system.BaseUserMapper;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/22 15:24
 */
@Service
public class BaseUserServiceImpl extends ServiceImpl<BaseUserMapper, BaseUser> implements BaseUserService {
    @Override
    public BaseUser getById(Serializable id) {
        return super.getById(id);
    }

    @Override
    public List<HashMap<String, Object>> getList() {
        return baseMapper.getList();
    }

    @Override
    public IPage<HashMap<String, Object>> selectPageVo(Page page, Integer state) {
        return baseMapper.selectPageVo(page, state);
    }
}
