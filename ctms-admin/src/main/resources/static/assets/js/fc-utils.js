/**
 * Created by tony on 2017/5/1.
 */
var fc_utils = {
    logout: function () {
        sessionStorage.clear();
        window.location.href = "/page/user/logout";
    },
    //构建页面左侧边栏
    buildSideBar: function () {
        let curUrl = document.location.href;
        let index = 0;

        let researchId = sessionStorage.getItem("fc-ctms-researchId");
        let menus = JSON.parse(sessionStorage.getItem("fc-ctms-leftMenus"));
        let menusHtmlArr = [];
        let isActive = false;
        let isOpen = false;
        for (let x in menus) {
            isOpen = false;
            if (menus[x].sub_menus) {
                //有子menu
                let subMenusHtmlArr = [];
                for (let y in menus[x].sub_menus) {
                    isActive = false;
                    let subMenu = (menus[x].sub_menus)[y];
                    if (fc_utils.getMenuFlg(researchId, subMenu) == "0") {
                        continue;
                    }
                    let menuHref = "";
                    //无子menu
                    if (!subMenu.menu_uri) {
                        menuHref = "javascript:alert('功能开发中，敬请期待!');";
                    } else {
                        if (curUrl.indexOf(subMenu.menu_uri) > 0) {
                            isActive = true;
                            isOpen = true;
                        }
                        menuHref = "fc_utils.directTo('" + subMenu.menu_uri + "',{researchId:'" + researchId + "'";
                        menuHref = menuHref + "})";
                    }
                    subMenusHtmlArr.push('<li class="' + ((isActive)?'active':' ') + '"><a style="text-decoration:none;" href="javascript:void(0)" onclick="' + menuHref + '">' + subMenu.sub_menu_name + '</a><b class="arrow"></b></li>');
                }

                if (subMenusHtmlArr && subMenusHtmlArr.length > 0) {
                    let menuHtml = '<li class="' + ((isOpen)?'active open':' ') + '"><a href="#" style="text-decoration:none;" class="dropdown-toggle"><span class="menu-text">' + menus[x].menu_name + '&nbsp;</span><b class="arrow fa fa-angle-down"></b></a><b class="arrow"></b><ul class="submenu">' + subMenusHtmlArr.join('')
                        + '</ul></li>';
                    menusHtmlArr.push(menuHtml);
                }
            } else {
                isActive = false;
                //无子menu
                if (fc_utils.getMenuFlg(researchId, menus[x]) == "0") {
                    continue;
                }
                let menuHref = '';
                if (!menus[x].menu_uri) {
                    menuHref = "javascript:alert('功能开发中，敬请期待!');";
                } else {
                    menuHref = "fc_utils.directTo('" + menus[x].menu_uri + "',{researchId:'" + researchId + "'})";
                }

                if (curUrl.indexOf(menus[x].menu_uri) > 0) {
                    isActive = true;
                }
                menusHtmlArr.push('<li class="' + ((isActive)?'active':' ') + '"><a style="text-decoration:none;" href="javascript:void(0)" onclick="' + menuHref + '"><span class="menu-text">' + menus[x].menu_name + '</span></a><b class="arrow"></b></li>');
            }
        }
        let sidebarHtml =
            '<div id="sidebar" class="sidebar responsive ace-save-state">\
                <script type="text/javascript">\
                    try{ace.settings.loadState(\'sidebar\')}catch(e){}\
                </script>\
                <ul class="nav nav-list">' +
            menusHtmlArr.join(" ") +
            '</ul><!-- /.nav-list -->\
            <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">\
                <i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>\
            </div>\
        </div>';
        $("div.main-content").before(sidebarHtml);
    },
    resetPassword:function () {
        this.directTo('/page/user/resetpassword', {});
    },
    // 跳转个人信息
    information:function () {
        // 个人跳转
       // window.location.href = "/page/user/resetperson?token=" + localStorage.getItem("fc-edc-token");
        fc_utils.directTo('/page/user/resetperson', {
        });
    },
    //构建页面头部包括menu
    buildPageHeader: function () {
        window.document.onkeydown = function(e)
        {
            let k = (window.event || e).keyCode;
            if(k == 116) {
                window.event.keyCode = 0;
                window.event.returnValue= false;
            }
        };
        window.document.oncontextmenu = function() {return false;};
        let researchId = localStorage.getItem("fc-ctms-researchId");
        let menus = JSON.parse(localStorage.getItem("fc-ctms-menus"));
        var sex = localStorage.getItem("fc-ctms-sex");
        var upicture = localStorage.getItem("fc-ctms-picture");
        var nnname = localStorage.getItem("fc-ctms-userName");
        if (!upicture) {
            upicture = '/images/avatars/' + 'default.jpg';
        }

        let menusHtmlArr = [];
        if (researchId) {
            //menusHtmlArr.push('<li><a style="text-decoration:none;" href="javascript:void(0)" onclick="fc_utils.directTo(\'/page/user/showMyPortal\', {researchId:' + localStorage.getItem("fc-ctms-researchId") + '})" >首页</a></li>');
        }
        else {
            //menusHtmlArr.push('<li><a style="text-decoration:none;" href="javascript:void(0)" onclick="fc_utils.directTo(\'/page/research/showMyResearchManage\', {})" >首页</a></li>');
        }

        for (let x in menus) {
            if (menus[x].sub_menus) {
                //有子menu
                let subMenusHtmlArr = [];
                for (let y in menus[x].sub_menus) {
                    let subMenu = (menus[x].sub_menus)[y];
                    if (fc_utils.getMenuFlg(researchId, subMenu) == "0") {
                        continue;
                    }
                    let menuHref = "";
                    //无子menu
                    if (!subMenu.menu_uri) {
                        menuHref = "javascript:alert('功能开发中，敬请期待!');";
                    } else {
                        menuHref = "fc_utils.directTo('" + subMenu.menu_uri + "',{researchId:'" + researchId + "'";
                        if (subMenu.menu_uri == "/page/research/showMyResearchOperate") {
                            if (!researchId || researchId == "") {
                                menuHref = menuHref + ",opType:1"
                            }
                            else {
                                menuHref = menuHref + ",opType:2";
                            }
                        }
                        menuHref = menuHref + "})";
                    }
                    subMenusHtmlArr.push('<li><a style="text-decoration:none;" href="javascript:void(0)" onclick="' + menuHref + '">' + subMenu.sub_menu_name + '</a></li>');
                }

                if (subMenusHtmlArr && subMenusHtmlArr.length > 0) {
                    let menuHtml = '<li><a href="#" style="text-decoration:none;" class="dropdown-toggle" data-toggle="dropdown">' + menus[x].menu_name + '&nbsp;<i class="ace-icon fa fa-angle-down bigger-110"></i></a><ul class="dropdown-menu dropdown-light-blue dropdown-caret">' + subMenusHtmlArr.join('')
                        + '</ul></li>';
                    menusHtmlArr.push(menuHtml);
                }

            } else {
                //无子menu
                if (fc_utils.getMenuFlg(researchId, menus[x]) == "0") {
                    continue;
                }
                let menuHref = '';
                if (!menus[x].menu_uri) {
                    menuHref = "javascript:alert('功能开发中，敬请期待!');";
                } else {
                    menuHref = "fc_utils.directTo('" + menus[x].menu_uri + "',{researchId:'" + researchId + "'})";
                }
                menusHtmlArr.push('<li><a style="text-decoration:none;" href="javascript:void(0)" onclick="' + menuHref + '">' + menus[x].menu_name + '</a></li>');
            }
        }
        // var menuDiv = '<div class="navbar navbar-default navbar-collapse h-navbar ace-save-state"><nav role="navigation" class="navbar-menu pull-left collapse navbar-collapse"><ul class="nav navbar-nav">' +
        //     menusHtmlArr.join('') + '</ul></nav></div>';
        // $("body").prepend(pageHeader + menuDiv);
        let userType = localStorage.getItem("fc-ctms-userType");
        let link = "";
        // if (userType == "1") {
        //     link = "";
        // } else {
        //     link = "<li class='green'><a href='javascript:void(0)' onclick='fc_utils.directTo(\"/page/research/showMyResearchManage\", {})'>研究切换</a></li>";
        // }
        if (!researchId) {
            link = "";
        } else {
            //link = "<li class='green'><a href='javascript:void(0)' onclick='fc_utils.directTo(\"/page/research/showMyResearchManage\", {})'>研究切换</a></li>";
        }
        let menuDiv = '<nav role="navigation" class="navbar-menu pull-left collapse navbar-collapse"><ul class="nav navbar-nav">' + menusHtmlArr.join('') + '</ul></nav>';
        let pageHeader = '<div class="ace-save-state navbar navbar-default" id="navbar"><div class="ace-save-state navbar-container" id="navbar-container"><div class="navbar-header pull-left"><span style="text-decoration:none;" href="javascript:void(0)" class="navbar-brand"><small><img style="height:25px;" src="/images/edc/logo.png">' +
            '</small></span></div><div class="navbar-header navbar-buttons pull-right" role="navigation"><ul class="ace-nav nav">' + link +
            '<li class="dropdown-modal blue"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><img id="avatar" class="nav-user-photo" /><span class="user-info"><small>你好，' + localStorage.getItem("fc-ctms-userName") + '</small>' +
            localStorage.getItem("fc-ctms-roleName") +
            '</span><i class="fa ace-icon fa-caret-down"></i></a><ul class="dropdown-caret dropdown-close dropdown-menu dropdown-menu-right dropdown-yellow user-menu">' +
            '<li><a href="javascript:void(0)" onclick="fc_utils.resetPassword()"><i class="ace-icon fa fa-key"></i> 修改登录密码</a></li>' +
            '<li><a href="javascript:void(0)" onclick="fc_utils.information()"><i class="ace-icon fa fa-key"></i> 个人信息管理</a></li>' +
            '<li><a href="javascript:void(0)" onclick="fc_utils.logout()"><i class="fa ace-icon fa-power-off"></i> 注销</a></ul></ul></div></div>' + menuDiv + '</div>';
        $("body").prepend(pageHeader);
        $("#avatar").attr('alt',nnname);
        $("#avatar").attr('src',upicture);
    },
    //构建页面头部包括menu
    buildPageHeaderInside: function (researchName) {
        window.document.onkeydown = function(e)
        {
            let k = (window.event || e).keyCode;
            if(k == 116) {
                window.event.keyCode = 0;
                window.event.returnValue= false;
            }
        };
        window.document.oncontextmenu = function() {return false;};
        let researchId = localStorage.getItem("fc-ctms-researchId");
        let menus = JSON.parse(localStorage.getItem("fc-ctms-menus"));
        var sex = localStorage.getItem("fc-ctms-sex");
        var upicture = localStorage.getItem("fc-ctms-picture");
        var nnname = localStorage.getItem("fc-ctms-userName");
        if (!upicture) {
            upicture = '/images/avatars/' + 'default.jpg';
        }

        let menusHtmlArr = [];
        if (researchId) {
            //menusHtmlArr.push('<li><a style="text-decoration:none;" href="javascript:void(0)" onclick="fc_utils.directTo(\'/page/user/showMyPortal\', {researchId:' + localStorage.getItem("fc-ctms-researchId") + '})" >首页</a></li>');
        }
        else {
            //menusHtmlArr.push('<li><a style="text-decoration:none;" href="javascript:void(0)" onclick="fc_utils.directTo(\'/page/research/showMyResearchManage\', {})" >首页</a></li>');
        }

        let menuDiv = '<div style="height: 50px; display: flex; justify-content: center; align-items: center; color: #ffffff; font-size: 130%; font-weight: lighter;">项目名称：'+ researchName + '</div>';
        let pageHeader = '<div class="ace-save-state navbar navbar-default" id="navbar"><div class="ace-save-state navbar-container" id="navbar-container"><div class="navbar-header pull-left"><span style="text-decoration:none;" href="javascript:void(0)" class="navbar-brand"><small><img style="height:25px;" src="/images/edc/logo.png">' +
            '</small></span></div><div class="pull-right" style="height: 50px; display: flex; justify-content: center; align-items: center;"><button class="btn btn-white btn-info" onclick="window.close();">关闭</button></div></div>' + menuDiv + '</div>';
        $("body").prepend(pageHeader);
        $("#avatar").attr('alt',nnname);
        $("#avatar").attr('src',upicture);
    },
    //字符串空处理
    strToNotNull: function (str) {
        if (!str || str === 'null') {
            str = '';
        }
        return str;
    },
    //字符串空处理
    fetchFieldTypeName: function (code) {
        var codeMap = {
            0: '标签',
            1: '文本',
            2: '长文本',
            3: '日期',
            4: '时间',
            5: '单选(横向)',
            6: '单选(纵向)',
            7: '复选(横向)',
            8: '复选(纵向)',
            9: '整数',
            10: '小数',
            11: '下拉菜单',
            12: '横线'
        };
        return codeMap[code];
    },
    //手机号check
    isMobile: function (mobile) {
        return (/^1\d{10}$/.test(mobile));
    },

    //密码合法check
    isPassword: function (password) {
        return (/^[0-9A-Za-z]{6,12}$/.test(password));
    },

    //验证码check
    isValidateNo: function (validateNo) {
        return (/^\d{5}$/.test(validateNo));
    },

    // 只允许输入整数
    fieldOnlyInt: function (inputEle) {
        this.hasChecked = false;
        inputEle.value = inputEle.value.replace(/\D/g, '');
    },

    // 只允许输入小数
    fieldOnlyDigit: function (inputEle) {
        this.hasChecked = false;
        inputEle.value = inputEle.value.replace(/[^\d\.]/g, '');
    },

    // 数字字段onblur
    hasChecked: false,
    fieldCheckOnBlur: function (inputEle, vMin, vMax, digit) {
        if (this.hasChecked) {
            return false;
        }
        this.hasChecked = true;
        if (!this.fieldCheckRange(inputEle.value, vMin, vMax)) {
            if (vMin && vMax) {
                alert('请输入范围在' + vMin + '到' + vMax + '的数值');
                return false;
            } else if (vMin) {
                alert('请输入不小于' + vMin + '的数值');
                return false;
            } else if (vMax) {
                alert('请输入不大于' + vMax + '的数值');
                return false;
            }
        }
        if (digit && !this.fieldCheckFloat(inputEle.value, digit)) {
            alert('请输入小数点后' + digit + '位的小数');
            return false;
        }
    },
    // CRF字段日期check
    fieldCheckDate: function (inputEle) {
        this.hasChecked = false;
        let dateString = inputEle.value;
        if (dateString && dateString.toLowerCase().indexOf('uk') < 0) {
            if (!(/^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/).test(dateString)) {
                alert('日期格式不正确，请修正。');
                return false;
            }
            let dateTime = new Date(dateString.replace(/-/g,"/")).getTime();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            let tomorrowLong = new Date(tomorrow.Format("yyyy-MM-dd").replace(/-/g,"/")).getTime();
            if (dateTime >= tomorrowLong) {
                alert('日期不能超过今天，请核实。');
                return false;
            }
        }
    },
    // CRF字段长度Check
    fieldCheckLength: function (value, fieldLength) {
        if ((typeof(value) != "undefined") && (value.toString().length > fieldLength)) {
            return false;
        }
        return true;
    },
    // CRF字段数值check
    fieldCheckNumber: function (value) {
        var regex = /^(-)?\d+(\.\d+)?$/;
        return (regex.test(value));
    },
    // CRF字段范围Check(值必须是数值)
    fieldCheckRange: function (value, vMin, vMax) {
        if (!value) {
            return true;
        }
        if (vMin && parseFloat(value) < parseFloat(vMin)) {
            return false;
        }
        if (vMax && parseFloat(value) > parseFloat(vMax)) {
            return false;
        }
        return true;
    },
    // CRF字段精确度check
    // vFloat: 精确度，保留几位小数
    fieldCheckFloat: function (value, vFloat) {
        if (!value) {
            return true;
        }
        let reg = '^\\d+(\\.\\d{1,' + vFloat + '})?$';
        let patt = new RegExp(reg);
        return (patt.test(value));
    },
    /**
     * 跳转处理
     * @param url
     * @param params
     * @param windowName 打开新的window名称
     */
    directTo: function (url, params, windowName) {
        $("#directToNewUrl").remove();
        var hiddenForm = $("<form id='directToNewUrl' action='" + url + "' method='post'></form>");
        // 添加token
        hiddenForm.append("<input type='hidden' name='token' value='" + localStorage.getItem("fc-ctms-token") + "' />");
        for (var key in params) {
            hiddenForm.append("<input type='hidden' name='" + key + "' value='" + params[key] + "' />");
        }
        $("body").append(hiddenForm);
        windowName = windowName || "";
        if (windowName != "") {
            $("#directToNewUrl").attr('target', windowName);
        };
        hiddenForm.submit();
    },

    getMenuFlg: function (researchId, menus) {
        let retult = "0";
        if ((researchId && researchId != "") || menus.research_flg == "0") {
            retult = "1"
        }
        return retult;
    },

    // set value
    setValueJs: function (strId, strName, targetId, contet) {
        var arrLists = strId.split("#");
        var arrNameLists = strName.split("#");
        var contetTemp = contet;
        for (let x in arrLists) {
            var crf_field_id = 'crf_field_' + arrLists[x];
            if (!$("#" + crf_field_id).children($("input")).val()) {
                return false;
            }
        }
        var flgStr = true;
        for (let x in arrNameLists) {
            flgStr = true;
            var strName_field = arrNameLists[x];
            var crf_field_id = 'crf_field_' + arrLists[x];
            while (flgStr) {
                if (contetTemp.indexOf(strName_field) < 0) {
                    flgStr = false;
                } else {
                    contetTemp = contetTemp.replace(strName_field, $("#" + crf_field_id).children($("input")).val());
                }
            }
        }
        var fieldId = 'crf_field_' + targetId;
        $("#" + fieldId).children($("input")).val(eval(contetTemp));
    },

    // set active
    setActiveJs: function (strId, strtape, strName, targetId, contet) {
        var arrLists = strId.split("#");
        var arrNameLists = strName.split("#");
        var arrTapeLists = strtape.split("#");
        var contetTemp = contet;
        var flgStr = true;
        for (let x in arrNameLists) {
            flgStr = true;
            var strName_field = arrNameLists[x];
            var crf_field_id = 'crf_field_' + arrLists[x];
            while (flgStr) {
                if (contetTemp.indexOf(strName_field) < 0) {
                    flgStr = false;
                } else {
                    if (parseInt(arrTapeLists[x]) == 1
                        || parseInt(arrTapeLists[x]) == 3
                        || parseInt(arrTapeLists[x]) == 4
                        || parseInt(arrTapeLists[x]) == 9
                        || parseInt(arrTapeLists[x]) == 10) {
                        if ($("#" + crf_field_id).children($("input")).val()) {
                            contetTemp = contetTemp.replace(strName_field, '"' +  $("#" + crf_field_id).children($("input")).val() + '"');
                        } else {
                            contetTemp = contetTemp.replace(strName_field, '""');
                        }
                    }
                    if (parseInt(arrTapeLists[x]) == 2) {
                        if ($("#" + crf_field_id).children($("textarea")).val()) {
                            contetTemp = contetTemp.replace(strName_field, '"' +   $("#" + crf_field_id).children($("textarea")).val() + '"');
                        } else {
                            contetTemp = contetTemp.replace(strName_field, '""');
                        }
                    }
                    if (parseInt(arrTapeLists[x]) == 5) {
                        var varTemp = '';
                        $("#" + crf_field_id).children($("label")).children($("input")).each(function(){
                            if (this.checked) {
                                varTemp = this.value;
                            }
                        });
                        if (varTemp) {
                            contetTemp = contetTemp.replace(strName_field, '"' + varTemp + '"');
                        } else {
                            contetTemp = contetTemp.replace(strName_field, '""');
                        }
                    }
                    if (parseInt(arrTapeLists[x]) == 6) {
                        var varTemp = '';
                        $("#" + crf_field_id).children($("div")).children($("label")).children($("input")).each(function(){
                            if (this.checked) {
                                varTemp = this.value;
                            }
                        });
                        if (varTemp) {
                            contetTemp = contetTemp.replace(strName_field, '"' + varTemp + '"');
                        } else {
                            contetTemp = contetTemp.replace(strName_field, '""');
                        }
                    }
                    if (parseInt(arrTapeLists[x]) == 7) {
                        var varTemp = '';
                        $("#" + crf_field_id).children($("label")).children($("input")).each(function(){
                            if (this.checked) {
                                varTemp = varTemp + this.value + '@@@@@';
                            }
                        });
                        if (varTemp) {
                            contetTemp = contetTemp.replace(strName_field, '"' + varTemp + '"');
                        } else {
                            contetTemp = contetTemp.replace(strName_field, '""');
                        }
                    }
                    if (parseInt(arrTapeLists[x]) == 8) {
                        var varTemp = '';
                        $("#" + crf_field_id).children($("div")).children($("label")).children($("input")).each(function(){
                            if (this.checked) {
                                varTemp = varTemp + this.value + '@@@@@';
                            }
                        });
                        if (varTemp) {
                            contetTemp = contetTemp.replace(strName_field, '"' + varTemp + '"');
                        } else {
                            contetTemp = contetTemp.replace(strName_field, '""');
                        }
                    }
                    if (parseInt(arrTapeLists[x]) == 11) {
                        if ($("#" + crf_field_id).children($("select")).val()) {
                            contetTemp = contetTemp.replace(strName_field, '"' +   $("#" + crf_field_id).children($("input")).val() + '"');
                        } else {
                            contetTemp = contetTemp.replace(strName_field, '""');
                        }
                    }
                }
            }
        }
        var fieldId = 'crf_field_' + targetId;
        if (eval(contetTemp)) {
            $("#" + fieldId).children($("input")).attr("disabled", "disabled");
            $("#" + fieldId).children($("select")).attr("disabled", "disabled");
            $("#" + fieldId).children($("textarea")).attr("disabled", "disabled");
            $("#" + fieldId).children($("label")).children($("input")).attr("disabled", "disabled");
            $("#" + fieldId).children($("div")).children($("label")).children($("input")).attr("disabled", "disabled");
        } else {
            $("#" + fieldId).children($("input")).removeAttr("disabled");
            $("#" + fieldId).children($("select")).removeAttr("disabled");
            $("#" + fieldId).children($("textarea")).removeAttr("disabled");
            $("#" + fieldId).children($("label")).children($("input")).removeAttr("disabled");
            $("#" + fieldId).children($("div")).children($("label")).children($("input")).removeAttr("disabled");
        }
    }



};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};