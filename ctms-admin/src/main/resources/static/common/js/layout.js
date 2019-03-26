
//加载左侧菜单
function loadMenuTree(token,userRoleId,menuType, menuCode,cliType)
{
    //发送AJAX请求
    $.ajax({
        type: "get",
        url: "/api/home/fetchMenuTree?token=" + token + '&userRoleId=' + userRoleId + '&menuType=' + menuType + '&menuCode='+ menuCode+'&cliType='+cliType,
        dataType: "json",
        success: function (result) {
            if (result.status == 1)
            {
                bindMenu(result.extend.menus,menuType);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogMsg(errorThrown, -1);
        }
    });
}
//动态构建菜单html
function bindMenu(menus,menuType) {
    var _html = '';
    $.each(menus,function(index,item){
        if (item.menuLinkUrl != null)
        {
            //获取参数串
            var finPara = buildPara(menuType,item.menuLinkUrl,item.actionType);
            _html += '<li>';
            _html += '<a class="J_menuItem" href="'+finPara+'">';
            _html += '<i class="'+item.menuIcon+'"></i>';
            _html += '<span class="nav-label">'+item.menuName+'</span>';
            _html += '</a>';
            _html += '</li>';
        }else {
            _html += '<li>';
            _html += '<a href="#">';
            _html += '<i class="'+item.menuIcon+'"></i>';
            _html += '<span class="nav-label">'+item.menuName+'</span>';
            _html += '<span class="fa arrow"></span>';
            _html += '</a>';
            if (item.navType == 1)
            {
                _html += '<ul class="nav nav-second-level">';
                _html += secondMenu(item.subMenus,menuType);
                _html += '</ul>';
            }
            _html += '</li>';
        }
    });
    $("#side-menu").append(_html);
    // MetsiMenu
    $('#side-menu').metisMenu();
}
//二级菜单
function secondMenu(subMenus,menuType) {
    var itemHtml = '';
    $.each(subMenus,function(index,item){
        //获取参数串
        var finPara = buildPara(menuType,item.menuLinkUrl,item.actionType);
        itemHtml +='<li><a class="J_menuItem"  href="'+finPara+'" data-index="0">' + item.menuName + '</a></li>';
    });
    return itemHtml;
}

//构建参数
function buildPara(curMenuType,curMenuLinkUrl,curActionType) {
    var strPara = "";
    var strFlag = "";
    if (curMenuLinkUrl.indexOf("?") > 0)
    {
        strFlag = curMenuLinkUrl + '&';
    }else {
        strFlag = curMenuLinkUrl + '?';
    }
    //项目菜单
    if (curMenuType == "1")
    {
        strPara = strFlag + 'token=' + sessionStorage.getItem("fc-ctms-token") + '&roleId='+sessionStorage.getItem("fc-ctms-roleId")+'&userRoleId=' + sessionStorage.getItem("fc-ctms-userRoleId") + '&studyId='+sessionStorage.getItem("fc-ctms-studyId")+'&actionType=' + curActionType;
    }else {
        strPara = strFlag + 'token=' + sessionStorage.getItem("fc-ctms-token") + '&roleId='+sessionStorage.getItem("fc-ctms-roleId")+'&userRoleId=' + sessionStorage.getItem("fc-ctms-userRoleId") +  '&actionType=' + curActionType;
    }
    return strPara;
}