package com.forceclouds.ctms.dao.entity.system;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author jww
 * @since 2019-03-20
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("CT_BASE_USER")
public class BaseUser implements Serializable {

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

}
