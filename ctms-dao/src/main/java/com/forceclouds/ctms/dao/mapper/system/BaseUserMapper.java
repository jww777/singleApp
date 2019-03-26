package com.forceclouds.ctms.dao.mapper.system;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forceclouds.ctms.dao.entity.system.BaseUser;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author jww
 * @since 2019-03-20
 */
public interface BaseUserMapper extends BaseMapper<BaseUser> {
    List<HashMap<String, Object>> getList();

    IPage<HashMap<String, Object>> selectPageVo(Page page, @Param("state") Integer state);
}
