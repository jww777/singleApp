$(function(){

	// 定义选择器
	var clock = $('#clock');
    var	dialog = $('#alarm-dialog').parent();
    var	alarm_set = $('#alarm-set');
    var	alarm_clear = $('#alarm-clear');

	// 数字转换用
	var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

	// 数字元素初始化
	var digits = {};

	// 时分秒位置元素
	var positions = [
		'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
	];

	// 用所需标记生成数字
	var digit_holder = clock.find('.digits');

	// 定时器
    var t = null;

    // 获取总时间
    var sumSecond = 0;

	// 生成时间格式HH:mm:ss
	$.each(positions, function(){

		// 添加":"
		if(this == ':'){
			digit_holder.append('<div class="dots">');
		} else {
			var pos = $('<div>');
			for(var i = 1; i < 8; i++){
				pos.append('<span class="d' + i + '">');
			}
			// 设定数据
			digits[this] = pos;

			// 将数据绑定到页面
			digit_holder.append(pos);
		}
	});

	// 取得服务器时间
	(function update_time(){
		// 调用java获取时间
        $.ajax({
            type: "post",
            url: "/api/user/getTime",
            data: {
                'token': localStorage.getItem("fc-ctms-token")
            },
            dataType: "json",
            success: function (result) {
                if (result.status == 1) {
					setTimeToInterFace(result.extend["strTemp"]);
                }
            }
        });
	})();

	//将服务器时间显示到页面
    function setTimeToInterFace(strTemp) {

    	// 后台取得时间以":"分割
        var timeStemp = strTemp.split(":");

        // 将时间换算成秒数
        sumSecond = parseInt(timeStemp[0])*3600 + parseInt(timeStemp[1])*60 + parseInt(timeStemp[2]);

        digits.h1.attr('class', digit_to_name[strTemp[0]]);
        digits.h2.attr('class', digit_to_name[strTemp[1]]);
        digits.m1.attr('class', digit_to_name[strTemp[3]]);
        digits.m2.attr('class', digit_to_name[strTemp[4]]);
        digits.s1.attr('class', digit_to_name[strTemp[6]]);
        digits.s2.attr('class', digit_to_name[strTemp[7]]);

        // 设定定时器，循环执行
        setInterval(function(){
            setTimeTolocal();
        },1000);
    }

    // 循环调用,实现时间同步更新
    function setTimeTolocal() {
        sumSecond += 1;
        var h = parseInt(sumSecond/3600);
        var m = parseInt((sumSecond - h*3600)/60);
        var s = (sumSecond - h*3600 - m*60)

		// 时间前补0
        if (h < 10) {
            h = "0" + h;
        }
        if (h == 24) {
            h = "00";
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        if (sumSecond == 86400) {
            sumSecond = 0;
        }

        // 获取时间字符串
        var timeStemp = h.toString() +m.toString() +s.toString() ;

        digits.h1.attr('class', digit_to_name[timeStemp[0]]);
        digits.h2.attr('class', digit_to_name[timeStemp[1]]);
        digits.m1.attr('class', digit_to_name[timeStemp[2]]);
        digits.m2.attr('class', digit_to_name[timeStemp[3]]);
        digits.s1.attr('class', digit_to_name[timeStemp[4]]);
        digits.s2.attr('class', digit_to_name[timeStemp[5]]);

    }

	// 校验btn按下
	$('#btnCorrect').click(function(){
		// Show the dialog
		dialog.trigger('show');
        document.getElementById('alert-error').innerHTML = ''
	});

    // 右上角关闭
	dialog.find('.close').click(function(){
		dialog.trigger('hide')
        document.getElementById('alert-error').innerHTML = ''
	});

	// 单击覆盖时
	dialog.click(function(e){
		// When the overlay is clicked, 
		// hide the dialog.
		if($(e.target).is('.overlay')){
			// This check is need to prevent
			// bubbled up events from hiding the dialog
			dialog.trigger('hide');
		}
	});

	// 设定btn按下
	alarm_set.click(function(){

		var valid = true;
		var tempStr = "";

		dialog.find('input').each(function(i){

			// Using the validity property in HTML5-enabled browsers:
			if(this.validity && !this.validity.valid){

				// The input field contains something other than a digit,
				// or a number less than the min value
				valid = false;
				this.focus();
				return false;
			}

            tempStr += parseInt(parseInt(this.value)) + ":";
		});

        tempStr = tempStr.substr(0, tempStr.length - 1);

		if(!valid){
            document.getElementById('alert-error').innerHTML = '请输入有效时间格式！';
			return;
		}

		// 调用java更改时间
        $.ajax({
            type: "post",
            url: "/api/user/setTime",
            data: {
                'token': localStorage.getItem("fc-ctms-token"),
                'tempStr': tempStr
            },
            dataType: "json",
            success: function (result) {
                if (result.status == 1) {
                    dialog.trigger('hide');
                    window.location.reload();
                }else{
                    dialogMsg("时间校准失败", 0);
                    window.location.reload();
                }
            }
        });
	});

	// 关闭brn按下
	alarm_clear.click(function(){
		dialog.trigger('hide');
        document.getElementById('alert-error').innerHTML = '';
	});

	// 自定义事件以保持代码干净
	dialog.on('hide',function(){

		dialog.fadeOut();
        document.getElementById('alert-error').innerHTML = ''

	}).on('show',function(){
        var hours = 0, minutes = 0, seconds = 0, tmp = 0;

		// Calculate how much time is left for the alarm to go off.
        var hours = parseInt(sumSecond/3600);
        var minutes = parseInt((sumSecond - hours*3600)/60);
        var seconds = (sumSecond - hours*3600 - minutes*60)

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (hours == 24) {
            hours = "00";
		}
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

		// Update the input fields
		dialog.find('input').eq(0).val(hours).end().eq(1).val(minutes).end().eq(2).val(seconds);

		dialog.fadeIn();

	});

});