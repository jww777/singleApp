package com.forceclouds.ctms.admin.appinterface;

/**
 * @Description: 对象转换接口
 * @Author: jww
 * @CreateDate: 2019/3/26 13:00
 */
public interface IVOConver<S,T> {
    T convert(S s);
}
