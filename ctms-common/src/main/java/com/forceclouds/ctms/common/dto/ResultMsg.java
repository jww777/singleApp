package com.forceclouds.ctms.common.dto;

import java.util.HashMap;
import java.util.Map;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/25 15:55
 */
public class ResultMsg {
    //状态码   0-失败    1-成功
    private int status;
    //提示信息
    private String msg;

    //用户要返回给浏览器的数据
    private Map<String, Object> extend = new HashMap<String, Object>();
    public ResultMsg add(String key,Object value){
        this.getExtend().put(key, value);
        return this;
    }
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Map<String, Object> getExtend() {
        return extend;
    }

    public void setExtend(Map<String, Object> extend) {
        this.extend = extend;
    }
    public static ResultMsg success(){
        ResultMsg result = new ResultMsg();
        result.setStatus(1);
        result.setMsg("处理成功！");
        return result;
    }

    public static ResultMsg fail(){
        ResultMsg result = new ResultMsg();
        result.setStatus(0);
        result.setMsg("处理失败！");
        return result;
    }
}
