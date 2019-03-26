/**
 * Created by wyqzy on 2017/12/7.
 * 跳往项目详情
 */
function goStudyDetail(id,name) {
    var token="";
    token = sessionStorage.getItem("fc-ctms-token");
    if (!token) {
        dialogMsg("获取token失败!", 0);
        return;
    }
    if (name != ""&&name.length > 10) {
        name = name.substring(0, 10) + "...";
    }
    // var url = "/page/study/showStudyInfo?studyId=" + id+"&token="+token;
    var url = "/page/study/showStudyDraft?studyId=" + id + '&token=' + token + '&actionType=0';
    layer.open({
        type: 2,
        title: "项目详情",
        //shadeClose: true,
        shade: 0.2,
        shadeClose: false,//点击遮罩关闭层
        maxmin: true, //开启最大化最小化按钮
        area: ['97%', '95%'],
        content: url
    });
}
/**
 * Created by wyqzy on 2017/12/7.
 * 跳往药品详情
 */
function goDrugDetail(id,name) {
    var token="";
    token = sessionStorage.getItem("fc-ctms-token");
    if (!token) {
        dialogMsg("获取token失败!", 0);
        return;
    }
    if (name != ""&&name.length > 10) {
        name = name.substring(0, 10) + "...";
    }
    var url = '/page/drug/edit?id=' + id + '&studyId=0&type=0&token=' + token;
    dialogOpen(
        {
            title:name,
            url: url,
            width: '1100px',
            height: '600px'
        }
    )
}
/**
 * Created by wyqzy on 2017/12/7.
 * 跳往人员详情
 */
function goPersonDetail(id,name) { token = sessionStorage.getItem("fc-ctms-token");
    var token="";
    token = sessionStorage.getItem("fc-ctms-token");
    if (!token) {
        dialogMsg("获取token失败!", 0);
        return;
    }

    var url = "/page/study/showStudyInfo?studyId=" + id+"&token="+token;
    menuItem(url, 0, name);
}