/**
 * Created by jww on 2017/12/5.
 */
//兼容bootstrap
$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('div').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
        $(element).closest('div').removeClass('has-error');
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
        if (element.is(":radio") || element.is(":checkbox")) {
            error.appendTo(element.parent().parent().parent());
        } else {
            error.appendTo(element.parent());
        }
    },
    errorClass: "help-block m-b-none",
    validClass: "help-block m-b-none"
});
//自定义固定电话验证
jQuery.validator.addMethod("isTel", function(value, element) {
    var length = value.length;
    var phone = /(^(\d{3,4}-)?\d{6,8}$)|(^(\d{3,4}-)?\d{6,8}(-\d{1,5})?$)|(\d{11})/;
    return this.optional(element) || (phone.test(value));
}, "请填写正确的固定电话");//可以自定义默认提示信息

//自定义手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var tel = /^1(3|4|5|7|8)\d{9}$/;
    return this.optional(element) || (tel.test(value));
}, "请填写正确的手机号码");//可以自定义默认提示信息

//自定义身份证号码验证 add by zhougy
jQuery.validator.addMethod("isIdNo", function(value, element) {
    var idNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return this.optional(element) || (idNo.test(value));
}, "请填写正确的身份证号码");//可以自定义默认提示信息
//自定义半角字验证 add by zhougy
jQuery.validator.addMethod("isHalf", function(value, element) {
    var notHalf = /[\u4E00-\u9FA5]+/;
    return this.optional(element) || (!notHalf.test(value));
}, "请填写半角字符");//可以自定义默认提示信息

// 邮政编码验证   add by hmli
jQuery.validator.addMethod("isZipCode", function(value, element) {
    var zipCode = /^[0-9]{6}$/;
    return this.optional(element) || (zipCode.test(value));
}, "请正确填写您的邮政编码");

//日期
jQuery.validator.addMethod("isDate", function(value, element){
    if (value == ""){
        return this.optional(element) || ("");
    }
    var ereg = /^(\d{1,4})(-)(\d{1,2})(-)(\d{1,2})$/;
    var r = value.match(ereg);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[5]);
    var result = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[5]);
    return this.optional(element) || (result);
}, "请输入正确的日期");
// 时间验证   add by geyh
jQuery.validator.addMethod("isTime", function(value, element) {
    var datePartten = /^\d{4}[-]([0][1-9]|(1[0-2]))[-]([1-9]|([012]\d)|(3[01]))([ \t\n\x0B\f\r])(([0-1]{1}[0-9]{1})|([2]{1}[0-4]{1}))([:])(([0-5]{1}[0-9]{1}|[6]{1}[0]{1}))([:])((([0-5]{1}[0-9]{1}|[6]{1}[0]{1})))$/;
    return this.optional(element) || (datePartten.test(value));
}, "请正确填写您的时间");
// 时间验证(不要秒)   add by sunzw
jQuery.validator.addMethod("isTimeNoSecond", function(value, element) {
    var datePartten = /^\d{4}[-]([0][1-9]|(1[0-2]))[-]([1-9]|([012]\d)|(3[01]))([ \t\n\x0B\f\r])(([0-1]{1}[0-9]{1})|([2]{1}[0-4]{1}))([:])(([0-5]{1}[0-9]{1}|[6]{1}[0]{1}))$/;
    return this.optional(element) || (datePartten.test(value));
}, "请正确填写您的时间");

jQuery.validator.addMethod("compareDate",function(value,element){
    var assigntime = $("#startDate").val();
    var deadlinetime = $("#endDate").val();
    var reg = new RegExp('-','g');
    assigntime = assigntime.replace(reg,'/');//正则替换
    deadlinetime = deadlinetime.replace(reg,'/');
    assigntime = new Date(parseInt(Date.parse(assigntime),10));
    deadlinetime = new Date(parseInt(Date.parse(deadlinetime),10));
    if(assigntime>deadlinetime){
        return false;
    }else{
        return true;
    }
},"<font color='#E47068'>结束日期必须大于开始日期</font>");

