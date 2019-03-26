/**
 * Created by jww on 2017/11/9.
 */
function getAuthorizeList(options) {
    if(options.paraMenuCode != "")
    {
        $.ajax({
            url:'/api/role/selectListRoleValue?paraMenuCode='+options.paraMenuCode+'&roleId='+options.roleId,
            type:'get',
            dataType:'json',
            success:function (result) {
                if (result.status == 1)
                {
                    //按钮html集合
                    $("#btnList button").each(function () {
                        var isView = false;//是否显示
                        //超级用户全部显示
                        if (result.extend.isAdmin)
                        {
                            isView = true;
                        }else {
                            var htmlValue = $(this).attr("flag");
                            //普通用户权限
                            $.each(result.extend.ctRoleValues,function (index,item) {
                                if (htmlValue == item.actionType)
                                {
                                    //显示按钮
                                    isView = true;
                                }
                            });
                        }
                        if (isView)
                        {
                            $(this).show();
                        }else {
                            $(this).hide();
                        }
                    });
                }
            }
        });
    }
}

//计算元素集合的总宽度
function calSumWidth(elements) {
    var width = 0;
    $(elements).each(function () {
        width += $(this).outerWidth(true);
    });
    return width;
}
//滚动到指定选项卡
function scrollToTab(element) {
    var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
    // 可视区域非tab宽度
    var tabOuterWidth = calSumWidth($(".content-tabs",window.parent.document).children().not(".J_menuTabs",window.parent.document));
    //可视区域tab宽度
    var visibleWidth = $(".content-tabs",window.parent.document).outerWidth(true) - tabOuterWidth;
    //实际滚动宽度
    var scrollVal = 0;
    if ($(".page-tabs-content",window.parent.document).outerWidth() < visibleWidth) {
        scrollVal = 0;
    } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
        if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
            scrollVal = marginLeftVal;
            var tabElement = element;
            while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content",window.parent.document).outerWidth() - visibleWidth)) {
                scrollVal -= $(tabElement).prev().outerWidth();
                tabElement = $(tabElement).prev();
            }
        }
    } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
        scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
    }
    $('.page-tabs-content',window.parent.document).animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
}

//格式化金额，例子：100,0000.00
function formatMoney(s, n) {
    /*
     * 参数说明：
     * s：要格式化的数字
     * n：保留几位小数
     * */
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

function menuItem(dataUrl,dataIndex,menuName) {
    // 获取标识数据
    var flag = true;
    if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;

    // 选项卡菜单已存在
    $('.J_menuTab',window.parent.document).each(function () {
        if ($(this).data('id') == dataUrl) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.J_menuTab',window.parent.document).removeClass('active');
                scrollToTab(this);
                // 显示tab对应的内容区
                $('.J_mainContent .J_iframe',window.parent.document).each(function () {
                    if ($(this).data('id') == dataUrl) {
                        $(this).show().siblings('.J_iframe',window.parent.document).hide();
                        return false;
                    }
                });
            }
            flag = false;
            return false;
        }
    });

    // 选项卡菜单不存在
    if (flag) {
        var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        $('.J_menuTab',window.parent.document).removeClass('active');

        // 添加选项卡对应的iframe
        var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
        $('.J_mainContent',window.parent.document).find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

        //显示loading提示
        var loading = layer.load();

        $('.J_mainContent iframe:visible',window.parent.document).load(function () {
            //iframe加载完成后隐藏loading提示
            layer.close(loading);
        });
        // 添加选项卡
        var obj = $('.J_menuTabs .page-tabs-content',window.parent.document);
        obj.append(str);
        scrollToTab($('.J_menuTab.active',window.parent.document));
    }
    return false;
}

// 关闭选项卡菜单 add by zhougy
function closeTab() {
    var curPath = window.frameElement.src;
    var data_Id = curPath.substr(curPath.indexOf("/page"));
    $('.J_menuTab[data-id="' + data_Id + '"] i', parent.document).click();
    return false;
}

// 系统登出 add by zhougy
function logout() {
    sessionStorage.clear();
    top.location.href = '/';
    return false;
}

// 关闭最外层 add by zhougy
function closeLayer() {
    parent.layer.close(parent.layer.index);
}

//合并单元格公共方法 add by XC
function Merger(gridName, CellName) {
    //得到显示到界面的id集合
    var mya = $("#" + gridName + "").getDataIDs();
    //当前显示多少条
    var length = mya.length;
    for (var i = 0; i < length-1; i++) {
        //从上到下获取一条信息
        var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]);
        //定义合并行数
        var rowSpanTaxCount = 1;
        for (var j = i + 1; j < length; j++) {
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
            var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]);
            var beforeValue = before[CellName];
            var endValue = end[CellName];
            if ( beforeValue == endValue) {
                rowSpanTaxCount++;
                $("#" + gridName + "").setCell(mya[j], CellName, '', { display: 'none' });
            } else {
                rowSpanTaxCount = 1;
                break;
            }
            $("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount);
        }
    }
}

// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: zhougy
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

//设置页面参照和编辑模式 add by zhougy
function setPageMode(mode) {
    if (mode == '1') {
        //编辑模式
        $("input,textarea").removeAttr("readonly").removeClass("inputBorder");
        $("select").removeAttr("disabled").removeClass("inputBorder").show();
        $("input.input-for-hidden-select").remove();
        $(":file").removeAttr("disabled").removeAttr("readonly").removeClass("inputBorder");
        $(":text").removeAttr("disabled").removeAttr("readonly").removeClass("inputBorder");
        $(":radio").removeAttr("disabled");
        $(":checkbox").removeAttr("disabled").removeAttr("readonly");
        $(".btn-update").show();
    } else {
        $(".control-label").removeClass("input-not-null");
        //参照模式
        $("input,textarea").attr("readonly", "readonly").addClass("inputBorder");
        $("textarea").attr("style", "text-align:left");
        $("select").attr("disabled", "disabled").addClass("inputBorder").hide();

        $("select:disabled").each(function(){
            $(this).before("<input type=\"text\" class=\"form-control input-for-hidden-select inputBorder\" readonly=\"readonly\" value=\"" + $(this).find("option:selected").text().replace(/请选择/, "") + "\"/>");
        });
        $(":checkbox").attr("disabled","disabled").attr("readonly", "readonly");
        $(":file").attr("disabled","disabled").attr("readonly", "readonly").addClass("inputBorder");
        $(":text").attr("disabled","disabled").attr("readonly", "readonly").addClass("inputBorder");
        $(":radio").attr("disabled","disabled");
        $(".btn-update").hide();
        // 明细中分页下拉框可选择转换
        $("select.ui-pg-selbox").removeAttr("disabled").removeClass("inputBorder").show();
        $("[dir='ltr']>input.input-for-hidden-select").remove();
    }

}

//PDF格式文件预览 add by zhougy
function previewFile(filePath) {
    window.open("/page/file/preview?filePath=" + encodeURI(filePath));
}

//预览或者下载（当前pdf文件预览）
function downloadOrPreviewFile(obj,fileName,filePath){
    if (fileName.indexOf(".pdf") > 0 || fileName.indexOf(".PDF") > 0) {
        previewFile(filePath);
    }else {
        window.location.href="/page/file/down?fileName="+fileName+"&filePath="+filePath+"";
    }
}

/**
 * anthor: hmli
 * 文本框根据输入内容自适应高度
 * {HTMLElement}   输入框元素
 * {Number}        设置光标与输入框保持的距离(默认0)
 * {Number}        设置最大高度(可选)
 */
var autoTextarea = function (elem, extra, maxHeight) {
    extra = extra || 10;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ?
            function (name) {
                var val = elem.currentStyle[name];
                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };
                return val;
            } : function (name) {
                return getComputedStyle(elem, null)[name];
            },
        minHeight = parseFloat(getStyle('height'));
    elem.style.resize = 'both';//如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值

    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};

/**
 * Created by lizh on 2018/7/18.
 */
function saveHistoryOperate(postData) {
    $.ajax({
        type: "post",
        url: "/api/study/saveHistoryOperate",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function (result) {
        }
    });
}

//刷新父窗体jqgird
function funReloadJqGrid(jqgirdId) {
    $(jqgirdId).trigger("reloadGrid");
}
//删除数据，分页处理
function actionSuccess(jqgirdId,token) {
    //当前页码
    var curpagenum = $(jqgirdId).jqGrid('getGridParam', 'page');
    //当前页一共有多少行(当前页实际显示了多少行记录)
    var rowListNum = $(jqgirdId).jqGrid('getGridParam', 'records');
    var rowNum = $(jqgirdId).jqGrid('getGridParam', 'rowNum'); //获取显示配置记录数量
    var resultNum = rowListNum % rowNum;
    if (resultNum == 1)
    {
        curpagenum--;
        //如果页数小于1，默认等于1
        if (curpagenum < 1)
        {
            curpagenum = 1;
        }
    }
    // 清空元数据
    $(jqgirdId).jqGrid("clearGridData");
    // 重新加载数据
    $(jqgirdId).jqGrid('setGridParam', {  // 重新加载数据
        page: curpagenum
    }).trigger("reloadGrid");
}
//判断字符是否为空的方法
function checkEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
//验证字符串是否是数字
function checkNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
        return true;
    }
    return false;
}
//校验是否是统一大小写
function checkCharacterBigAndSmall(startNum,endNum) {
    var boolStarNum = true;
    if ((startNum >= 65 && startNum <= 90) && (endNum >= 65 && endNum <= 90)
        ||(startNum >= 97 && startNum <= 122) && (endNum >= 97 && endNum <= 122))
    {
        boolStarNum = false;
    }
    return boolStarNum;
}
//校验字母开始编号小于结束编号
function checkStartThanEnd(startNum,endNum) {
    var isReslut = false;
    if (startNum > endNum)
    {
        isReslut = true;
    }
    return isReslut;
}

//获取周岁 add by xc 2019-01-24
function jsGetAge(strBirthday)
{
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if(nowYear == birthYear)
    {
        returnAge = 0;//同年 则为0岁
    }
    else
    {
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0)
        {
            if(nowMonth == birthMonth)
            {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge;//返回周岁年龄
}