package com.forceclouds.ctms.admin.vo.system;

import com.forceclouds.ctms.admin.appinterface.IVOConver;
import com.forceclouds.ctms.dao.entity.system.BaseUser;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/26 11:50
 */
@Data
public class BaseUserVO {
    private static final long serialVersionUID = 1L;

    private String id;

    private String userAccount;

    private String userName;

    private String userPassword;

    private String duties;

    private String title;

    private String sex;

    private String nation;

    private LocalDateTime birthday;

    private String educationId;

    private String studyArea;

    private LocalDateTime workingStart;

    private String officeTel;

    private String userMobile;

    private String fax;

    private String userEmail;

    private String gcpCertificate;

    private String officeAddress;

    private String userPhoto;

    private String backup;

    private Integer userValid;

    private String createUser;

    private LocalDateTime createTime;

    private String updateUser;

    private LocalDateTime updateTime;

    private String hisCode;

    //封装返回最终entity对象
    public BaseUser getBaseUser()
    {
        BaseUserVOConvert baseUserVOConvert = new BaseUserVOConvert();
        BaseUser baseUser = baseUserVOConvert.convert(this);
        return baseUser;
    }
    //视图对象转entity对象
    public static class BaseUserVOConvert implements IVOConver<BaseUserVO,BaseUser>{
        @Override
        public BaseUser convert(BaseUserVO baseUserVO) {
            BaseUser baseUser = new BaseUser();
            BeanUtils.copyProperties(baseUserVO,baseUser);
            return baseUser;
        }
    }
}
