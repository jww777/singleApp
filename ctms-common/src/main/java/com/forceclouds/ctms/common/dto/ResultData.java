package com.forceclouds.ctms.common.dto;

import java.util.List;

/**
 * @Description:
 * @Author: jww
 * @CreateDate: 2019/3/25 15:54
 */
public class ResultData {
    private long total; //总页数
    private long records; //每页记录数
    private long page; //当前页
    private List rows; //数据集合
    public long getTotal() {
        return total;
    }
    public void setTotal(long total) {
        this.total = total;
    }
    public long getRecords() {
        return records;
    }
    public void setRecords(long records) {
        this.records = records;
    }
    public long getPage() {
        return page;
    }
    public void setPage(long page) {
        this.page = page;
    }
    public List getRows() {
        return rows;
    }
    public void setRows(List rows) {
        this.rows = rows;
    }

    /**
     * @Description: 封装分页结果集数据
     * @param pages 总页数
     * @param total 总记录数
     * @param current 当前页
     * @param records 结果集
     * @Author: jww
     * @CreateDate: 2019/3/25 16:36
     */
    public static ResultData ResultDataByPage(long pages,long total,long current,List records)
    {
        ResultData resultData = new ResultData();
        resultData.setTotal(pages);
        resultData.setRecords(total);
        resultData.setPage(current);
        resultData.setRows(records);
        return resultData;
    }
}
