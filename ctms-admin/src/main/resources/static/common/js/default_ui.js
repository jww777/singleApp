/*layer警告框*/
confirmAjax = function (options) {
    layer.confirm(options.msg, {
        icon: 7,
        title: "提示",
        btn: ['确认', '取消'],
    }, function (index) {
        if(options.postData != null)
        {
            $.ajax({
                type: 'post',
                url: options.url,
                data:options.postData,
                contentType: "application/json; charset=utf-8",
                success:options.success
            });
        }
        //url参数方式
        if(options.param != null)
        {
            $.ajax({
                type: 'post',
                url: options.url,
                data:JSON.stringify(options.param),
                contentType: "application/json; charset=utf-8",
                success:options.success
            });
        }
        layer.close(index);//关闭layer弹出层
    }, function () {
    });
};
/**
 * @Description: 历史痕迹删除模态框
 * @param msg 删除确认信息
 * @param inputReason 修改原因文本框
 * @param divReason 修改原因div层
 * @param url ajax提交url地址
 * @param data ajax提交data数据
 * @param gridTable jqgrid表id
 * @Author: jww
 * @CreateDate: 2018/2/28 10:05
 */
confirmAjaxHistory = function (options)
{
    layer.confirm(
        options.msg, {
            icon: 3,
            title: "提示",
            btn: ['确认', '取消'],
        }, function (index) {
            layer.close(index);
            $(options.inputReason).val("");
            dialogDivOpen({
                title: "变更原因",
                maxmin: false,
                width: '500px',
                height: "300px",
                content: $(options.divReason),
                callBack: function (index2, layero) {
                    if ($(options.inputReason).val() == "")
                    {
                        dialogMsg("请输入变更原因!", 0);
                        return;
                    }
                    $.ajax({
                        type: "post",
                        url: options.url,
                        contentType: "application/json;charset=utf-8",
                        data: options.data,
                        dataType: "json",
                        success: function (result) {
                            if (result.status == 3) {
                                dialogMsg(result.msg, 0);
                                logout();
                            } else if (result.status == 0) {
                                dialogMsg(result.msg, 2);
                            } else {
                                dialogMsg(result.msg, 1);
                                $(options.gridTable).trigger("reloadGrid");
                            }
                        }
                    });
                    layer.close(index2);//关闭对话框
                }
            });
        });
};
/*弹出layer模态框-网页*/
dialogOpen = function (options) {
    layer.open({
        type: 2,
        title: options.title,
        shadeClose: true,
        shade: 0.2,
        btn: options.btnName,
        shadeClose: false,//点击遮罩关闭层
        maxmin: true, //开启最大化最小化按钮
        area: [options.width, options.height],
        content: options.url,
        /* end: function () {
             location.reload();
         }*/
     });
 };
 /*弹出layer模态框-网页-前画面刷新*/
dialogOpenRefresh = function (options) {
    layer.open({
        type: 2,
        title: options.title,
        shadeClose: true,
        shade: 0.2,
        btn: ['确定','取消'],
        shadeClose: false,//点击遮罩关闭层
        maxmin: true, //开启最大化最小化按钮
        area: [options.width, options.height],
        content: options.url,
        end: function () {
            location.reload();
        }
    });
};
/*弹出layer模态框-网页-带确认按钮和回掉函数*/
dialogOpenBack = function (options) {
    layer.open({
        type: 2,
        title: options.title,
        shadeClose: true,
        shade: 0.2,
        btn: ['确定','取消'],
        shadeClose: false,//点击遮罩关闭层
        maxmin: options.maxmin, //开启最大化最小化按钮
        area: [options.width, options.height],
        content: options.url,
        yes: function(index,layero){
            options.callBack(index,layero);
        },
        end: function () {
            options.end();
        }
    });
};
/*弹出layer模态框-层*/
dialogDivOpen = function (options) {
    layer.open({
        type: 1,
        title: options.title,
        btn: ['确定','取消'],
        move:'false',
        scrollbar: 'false',
        skin: 'layui-layer-rim', //加上边框
        area: [options.width, options.height], //宽高
        content:options.content,
        yes: function(index,layero){
            options.callBack(index,layero);
        },
        end: function (index) {
            layer.close(index);
            $(".btn").removeAttr("disabled");
        }
    });
};

/*弹出layer模态框-层*/
dialogDivOpenWithNo = function (options) {
    layer.open({
        type: 1,
        title: options.title,
        btn: ['关闭'],
        move:'false',
        scrollbar: 'false',
        skin: 'layui-layer-rim', //加上边框
        area: [options.width, options.height], //宽高
        content:options.content,
        yes: function(index,layero){
            options.callBack(index,layero);
        }
    });
};
/*操作提示信息*/
dialogMsg = function (content, type) {
    if (type == -1) {
        type = 2;
    }
    top.layer.msg(content, { icon: type, time: 2000, shift: 5,offset:['50%','50%'] });
};
/*操作提示信息时间稍微长点*/
dialogMsglong = function (content, type) {
    if (type == -1) {
        type = 2;
    }
    top.layer.msg(content, { icon: type, time: 5000, shift: 5,offset:['50%','50%'] });
};
/*验证jqgird id 是否选中*/
checkedRow = function (id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        dialogMsg('您没有选中任何数据项,请选中后再操作！', 0);
    } else if (id.split(",").length > 1) {
        isOK = false;
        dialogMsg('很抱歉,一次只能选择一条记录！', 0);
    }
    return isOK;
};
/*弹出layer模态框-网页-不带确认按钮，带回掉函数*/
dialogOpenNoButtonWithCallback = function (options) {
    layer.open({
        type: 2,
        title: options.title,
        shadeClose: true,
        shade: 0.2,
        shadeClose: false,//点击遮罩关闭层
        maxmin: true, //开启最大化最小化按钮
        area: [options.width, options.height],
        content: options.url,
        end: function () {
            options.callBack();
        }
    });
};
/*药品管理左侧二级菜单浮动效果*/
function initLeft() {
    //layout布局
    $('#layout').layout({
        applyDemoStyles: true,
        onresize: function () {
            $(window).resize()
        }
    });
    $(".profile-nav li").click(function () {
        $(".profile-nav li").removeClass("active");
        $(".profile-nav li").removeClass("hover");
        $(this).addClass("active")
        $(location).attr('href',  $(this).attr("url"));
    }).hover(function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("hover")
        }
    }, function () {
        $(this).removeClass("hover")
    })
};