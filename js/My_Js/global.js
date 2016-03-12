﻿//﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉
//  此区域的代码为全局公共JS。请不要直接修改该区域中的任何代码,或在该区域中添加任何自定义代码
//  该区域大部分函数和代码库块都是以该项目实现为目标所开发的。复用性和实效性较低。请维修人员谅解
//﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍


/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
*/


//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣ Mui全局配置  ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣

mui.init({

	swipeBack: false,

	gestureConfig: {
		tap: true, //默认为true
		doubletap: true, //默认为false
		longtap: true, //默认为false 
		swipe: true, //默认为true
		drag: true, //默认为true
		hold: true, //默认为false，不监听
		release: true //默认为false，不监听
	}
});





//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣ 我的公共加载模块  ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
$(function() 
{
	//验证是否登录
	var username = localStorage.登录帐号;
	if (typeof(username) == "undefined" || username == "undefined" ) 
	{
		mui.toast("请先登陆账号");
		$("#username").text("请先登陆账号");
		mui.openWindow({
			url: "login.html", 
			id: "login"
		});
		return;
	}
	
	//固定界面的高度	
	$("#mui-content").height(Get_获取容器高度()).css({
		"overflow": "hidden"
	}); 

	//当旋转屏幕的时候，重新计算并固定界面的高度
	window.onorientationchange = function() 
	{
			$("#mui-content").height(Get_获取容器高度()).css({
					"overflow": "hidden"
			}); //固定高度		
	}
	
})










//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  辅助方法：Get_获取容器高度  ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣

Get_获取容器高度 = function() {
	var a = $("#header").height(); //头部高度
	var b = $("#footer").height(); //脚步高度
	var c = $(window).height(); //整体高度
	var d = $(window).height(); //整体宽度
	var e = d - a - b; //容器高度

	return e;
}







//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  辅助方法：窗体的高度通常是自增长的。所以该类适应的场景是高度不变的容器内  ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
$.fn.autoheight = function(opt) {
	return this.each(function() {

		var defaults = {
			m: "padding", //场景模式,包括margin模式，padding模式，height模式
			n: 12 //比例
		};

		//opt中如果存在defaults中的值，则覆盖defaults中的值 
		opt = $.extend(defaults, opt);

		var model = opt.m; //string,场景模式
		var self = $(this); //obj,目标对象
		var all_height = Get_获取容器高度(); //所在容器整体高度
		var self_height = parseInt(self.height()); //int,目前高度							
		var target_height = parseInt(opt.n * (all_height / 12)); //int,目标高度
 		

		if (self_height >= target_height) {
			self.css({
				"box-sizing": "border-box",
				"height": target_height / all_height * 100 + "%"
			}); //如果目标是变得比原来更小，那么就直接变好了
		} else {
			var value = parseInt((target_height - self_height) / 2); //int

			//alert(self_height + "," + target_height + "," +value + "," + h); 

			if (model == "padding") {
				var extrapadding = parseInt(self.height()) - parseInt(self.height());
				self.css({ 
					"box-sizing": "border-box",
					"padding-top": (value + extrapadding / 2),
					"padding-bottom": (value + extrapadding / 2)
				});

				var now_height = self.height();
				var extra = (now_height - self_height) / 2;
				if (extra > 0)
					self.css({
						"box-sizing": "border-box",
						"padding-top": (value - extra),
						"padding-bottom": (value - extra)
					});
			}

			if (model == "margin") {
				self.css({
					"box-sizing": "border-box",
					"margin-top": value,
					"margin-bottom": value
				});
			}

			if (model == "height") {
				self.css({
					"box-sizing": "border-box",					
					"height": ((value * 2) / all_height * 100) + "%"
				});
			}
		}
	})
}



//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  计算器line-height自适应高度差 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
计算器_autolineheight = function() {
	var height = Get_获取容器高度() / 4;
	
	$("#calculator span").css("line-height", height + "px");

 	
	$("#go_form,#money").bind('tap',function()
	{
		$("#money").addClass("target_input"); //作为键盘输入的目标
		$("#yard").removeClass("target_input");
		$("#go_form").find(".iconfont").addClass("icon-jiesuo"); //添加提示
		$("#go_form2").find(".iconfont").removeClass("icon-jiesuo").addClass("icon-suo");
		mui.toast("您可以输入金额了");
		return false;   
	}) 
	   
	$("#go_form2,#yard").bind('tap',function(){ 
		$("#yard").addClass("target_input");  //作为键盘输入的目标
		$("#money").removeClass("target_input");
		$("#go_form2").find(".iconfont").addClass("icon-jiesuo");
		$("#go_form").find(".iconfont").removeClass("icon-jiesuo").addClass("icon-suo");
		mui.toast("您可以输入识别码了");
		return false;  
	})
	
	 
	
	$("#calculator .calculator span").bind('tap', function() 
	{
		var text = $(this).text();
		
		var myinput = $("input.target_input").eq(0); 		 
		
		if (text != "C") 
		{			
			var v = myinput.val() + text;
			
			myinput.val(v); 
			
			var reg = v.indexOf(".") >= 0?/^\d{1,3}\.?\d{0,2}$/ : /^\d{1,3}$/;
						 	 
			if (!reg.test(v))  
			{
	             myinput.val(v.substr(0,v.length - 1));
	        } 	
		}
		else 	
		{
			myinput.val('');
		}

	})
}




 
//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  悬浮球 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
assistive_mTouch = function() 
{
	
	小光点菜单(); 
	
	var assistiveLeft, assistiveTop, timerid;

	var obj = document.getElementById("assistiveTouch")

	var stickEdge = function(el) {
		var 
			header = $("#header").height() || 0, //可能有头部元素
			left = obj.offsetLeft,
			Top = obj.offsetTop,
			width = obj.outerWidth,
			height = obj.offsetHeight / 2,
			windowWith = (document.documentElement || document.body).offsetWidth;
			windowheight = Get_获取容器高度() + header;
			
						
		if(Top < header)
		{
			Top = height + header; 
			
		}
		else if(Top > parseInt(windowheight - height))
		{
			
			Top = parseInt(windowheight - height);
		}
		

		//开启以下代码段可以让小光点贴墙黏
		if (left > (windowWith - width) / 2) {
			left = windowWith - width - 2;
		} else {
			left = 0;
		}

		el.style.transition = 'all .2s';
		el.style['-webkit-transition'] = 'all .2s';
		el.style.left = left + 'px';
		el.style.top = Top + 'px';
		timerid = setTimeout(function() {
			el.style.transition = 'all .5s';
			el.style['-webkit-transition'] = 'all .5s';
		}, 100);
	};


	obj.addEventListener('tap', function() 
	{		
		Show_Menu();
	})

 

	obj.addEventListener('hold', function(e) {
		clearTimeout(timerid);

		this.style.transition = 'none';
		this.style['-webkit-transition'] = 'none';


		assistiveLeft = obj.offsetLeft;
		assistiveTop = obj.offsetTop;

		e.stopPropagation();

	})

	obj.addEventListener('drag', function(e) {
		this.style.left =(e.detail.center.x ) + 'px';
		this.style.top = (e.detail.center.y) + 'px'; 

		e.stopPropagation();
	})

	obj.addEventListener('dragend', function(e) { 
		stickEdge(this);
		e.stopPropagation();
	});

}



 
//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  光点菜单 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
Show_Menu = function() 
{
 
	layer.open
	({
		style: 'width:65%; background:rgba(0,0, 0, .6);border-radius: 20px;',
		closeBtn: 0,
		title: false,	
		shade:[0.1,"transparent"],
		shadeClose: true,
		anim:false,	//去除动画
		content: $("#xiaoguangdiancaidan").html(),
		btn: 0, //默认底部不显示任何按钮
		success:function()
		{
			$(".layermcont").css("padding","15px 20px 5px 20px"); 
		}
	}); 
	
	
	//手机充值
	mui(".mui-table-view").on('tap', '.Menu_shoujichongzhi', function() 
	{
		mui.toast("该功能暂未开放");
	})
	 
	//扫码支付
	mui(".mui-table-view").on('tap', '.Menu_saomazhifu', function()
	{ 
		mui.openWindow({
			url: "SweepYard.html",
			id: "SweepYard"			
		});
	})
	
	//微信找零
	mui(".mui-table-view").on('tap', '.Menu_weixinzhaoling', function()
	{		
		mui.openWindow({
			url: "wx.html",
			id: "wx"			
		});
	})
	
	//代缴违章
	mui(".mui-table-view").on('tap', '.Menu_daijiaoweizhang', function()
	{		
		mui.toast("该功能暂未开放");
	})
	
	
	
	//火车票
	mui(".mui-table-view").on('tap', '.Menu_huochepiao', function() 
	{
		mui.toast("该功能暂未开放");
	})
	
	//扫码支付
	mui(".mui-table-view").on('tap', '.Menu_shoujibao', function()
	{ 
		mui.openWindow({
			url: "ShouJiBao.html",
			id: "ShouJiBao"			
		});
	})
	
	//账户查询
	mui(".mui-table-view").on('tap', '.Menu_zhanghuchaxun', function()
	{				
		mui.openWindow({
			url: "QianBao_list.html",
			id: "QianBao_list"			
		});
	})
	
	//管理
	mui(".mui-table-view").on('tap', '.Menu_guanli', function()
	{		
		mui.toast("该功能暂未开放");
	})
	
	

	//返回
	mui(".mui-table-view").on('tap', '.Menu_back', function() 
	{
		mui.back();
	})
	
	//刷新	
	mui(".mui-table-view").on('tap', '.Menu_refresh', function()
	{ 
		window.location.reload();
	})
	
	//主页
	mui(".mui-table-view").on('tap', '.Menu_home', function()
	{		
		mui.openWindow({
			url: "index.html",
			id: "index"			
		});
	})
	
}


//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  侧滑菜单 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
QQ_offCanvas = function() 
{
	
	菜单部分(); //加载必要的html
		
	var Main = mui('#Main'); //侧滑容器父节点
	Main[0].classList.add('mui-scalable'); //动画效果的类
	Main.offCanvas().refresh();		
	mui('#offCanvasSideScroll').scroll();
	
	//关闭侧滑菜单
	document.getElementById('offCanvasHide').addEventListener('tap', function()
	{
		Main.offCanvas('close');//关闭侧滑菜单
	});
	
	
	
	//退出登录
	$("#quit").bind("tap", function() 
	{
		var btnArray = ['否', '是'];
		mui.confirm('你确定要退出？', '温馨提示', btnArray, function(e) {
			if (e.index == 1) 
			{
				localStorage.removeItem("登录帐号");
				localStorage.removeItem("auto");
				 
				mui.openWindow
				 ({ 
						url:"login.html",
						id:"login"  
				}); 
			}
		})
	})
	
	
	//钱包流水
	$("#qianbaoliushui").bind("tap",function()
	{
		
		mui.openWindow({
			url: "QianBao_list.html",
			id: "QianBao_list.html"			
		});
	})
	
	
	//业务流水
	$("#yewuliusuhi").bind("tap",function()
	{
		mui.openWindow({
			url: "Super_List.html?new=" + Math.random(0,10),
			id: "Super_List.html"			
		});
	})
}





//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  左滑返回的箭头 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
LeftPageGOBack = function() 
{
	
	var leftpageobj = $("#leftpage");
	  
	var Touch_Hold_X = null; //起始坐标

	var Native_left = $("#leftpage").offset().left || -66;	//-66
	

	document.addEventListener("hold", function(e) {
		Touch_Hold_X = e.detail.center.x;
	});
 
	document.addEventListener("dragend", function(e) 
	{
		$("#leftpage").attr("data-working","false");
		
		var left = $("#leftpage").offset().left;


		if (left >= 0)  
		{
			mui.back();
		}
		 
		  
		$("#leftpage").animate({
			left: Native_left + "px"			
		},"fast"); 
		
		
		return; 
	});
	
	document.addEventListener("drag", function(e) 
	{
		$("#leftpage").attr("data-working","true");

		var x = e.detail.center.x - Touch_Hold_X; //拖动的距离
				
		if (x > 0) //说明是向右拖的
		{ 
			var left = Native_left + x; //箭头当前的Left坐标  			
			
			if (left < 0) //未达到最大值
			{
				$("#leftpage").css({
					"left": left
				});
			}
			else	//达到最大值
			{		 
				$("#leftpage").css({
					"left": "0px" 	//当left==0时完全箭头展开
				});		
			}
		} 
		else 
		{
			$("#leftpage").css({
				"left": Native_left + "px"
			});						 
		}	
	})
}






//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  获取url第一个参数的值 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
get_urlpara = function()
{
		var urlinfo = window.location.href; //获取当前页面的url
		var len = urlinfo.length; //获取url的长度
		var offset = urlinfo.indexOf("?"); //设置参数字符串开始的位置
		var newsid = "";
		
		
		
		if(offset >= 0)
		{
			var newsidinfo = urlinfo.substr(offset, len) //取出参数字符串 这里会获得类似“id=1”这样的字符串
			var newsids = newsidinfo.split("="); //对获得的参数字符串按照“=”进行分割			
			var newsname = newsids[0]; //得到参数名字
			newsid = decodeURI(newsids[1]); //得到参数值	,记得转义
			
			
			
			if(newsid.toString() == "undefined")
			{
				newsid = "";
			}
			
		}	
		
		
		return newsid;
		
}



 


//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  时间Javascript类库 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}



//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  Javascript时间美化类库 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣

function timeFormat(time) {
	var date = new Date(time),
		curDate = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		curYear = curDate.getFullYear(),
		curHour = curDate.getHours(),
		timeStr;

	if (year < curYear) {
		timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
	} else {
		var pastTime = curDate - date,
			pastH = pastTime / 3600000;

		if (pastH > curHour) {
			timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
		} else if (pastH >= 1) {
			timeStr = '今天 ' + hour + ':' + minute + '分';
		} else {
			var pastM = curDate.getMinutes() - minute;
			if (pastM > 1) {
				timeStr = pastM + '分钟前';
			} else {
				timeStr = '刚刚';
			}
		}
	}
	return timeStr;
}
 



//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  涟漪特效 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
涟漪特效 = function()
{
    $('body').on('tap', function (e) 
    {  
            var left = e.originalEvent.detail.center.x;
            var top = e.originalEvent.detail.center.y;
              
            $("body").append('<div class="dot" style="top:' + top + 'px;left:' + left + 'px;"></div>')
            setTimeout(function () {
                $('.dot:first').remove();
            }, 1500);              
    });  
}




//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  Guid ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
function newGuid()
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
    }
    return guid.replace(/-/g,"");     
}





//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  菜单部分html加载 ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣
菜单部分 = function()
{
	var caidan = "<!--菜单部分-->"+
"			<aside id=\"offCanvasSide\" class=\"mui-off-canvas-right\">"+
"							<div id=\"offCanvasSideScroll\" class=\"mui-scroll-wrapper\">"+
"								 <div class=\"mui-scroll\">"+
"		                            "+
"		                            <div class=\"content\" style=\"margin:20px 0px 20px 20px\">"+
"		                    			<a class=\"mui-navigate-right\">"+
"											<img class=\"mui-media-object mui-pull-left head-img\" id=\"head-img\" width=\"50px\" style=\"margin-right: 10px;\" src=\"Images/logo.png\">"+
"											<div class=\"mui-media-body\" style=\"margin-left: 20px;\">"+
"												<h3  style=\"color:#fff\"><span id=\"username\"></span><span id=\"quit\" class=\"mui-pull-right mui-h6\" style=\"color:#fff;margin-right: 10px;display: block;height:70px;width: 100px;text-align: right;\"><i class=\"iconfont\">&#xe605;</i></span></h3>	"+
"												<p class=\'mui-ellipsis\' style=\"color:#fff\"> 金额: ￥ 00.00</p>"+
"											</div>"+
"										</a>"+
"		                           </div>   "+
"									 <p style=\"margin: 10px 15px;\">"+
"		                                <button id=\"offCanvasHide\" type=\"button\" class=\"mui-btn mui-btn-danger mui-btn-block\" style=\"padding: 5px 20px;\">关闭侧滑菜单</button>"+
"		                            </p>"+
"									<ul class=\"mui-table-view mui-table-view-chevron mui-table-view-inverted\">"+
"										<li class=\"mui-table-view-cell\">"+
"											<a class=\"mui-navigate-right\">"+
"												 <i class=\"iconfont\">&#xe61f;</i> 手机充值"+
"											</a>"+
"										</li> "+
"										<li class=\"mui-table-view-cell\">"+
"											<a class=\"mui-navigate-right\">"+
"												<i class=\"iconfont\">&#xe61c;</i> 扫码支付"+
"											</a>"+
"										</li>"+
"										<li class=\"mui-table-view-cell\">"+
"											<a class=\"mui-navigate-right\">"+
"												<i class=\"iconfont\">&#xe61a;</i> 微信找零"+
"											</a>"+
"										</li>"+
"										<li class=\"mui-table-view-cell\">"+
"											<a class=\"mui-navigate-right\">"+
"												<i class=\"iconfont\">&#xe600;</i> 代缴违章"+
"											</a>"+
"										</li>"+
"										<li class=\"mui-table-view-cell\">"+
"											<a class=\"mui-navigate-right\">"+
"												<i class=\"iconfont\">&#xe619;</i> 火车票"+
"											</a>"+
"										</li>"+
"										<li class=\"mui-table-view-cell\">"+
"											<a class=\"mui-navigate-right\">"+
"												<i class=\"iconfont\">&#xe61e;</i> 收寄宝"+
"											</a>"+
"										</li>"+
"										<li class=\"mui-table-view-cell\" id=\"qianbaoliushui\">"+
"									<a class=\"mui-navigate-right\">"+
"										<i class=\"iconfont\">&#xe602;</i> 钱包流水"+
"									</a>"+
"								</li>"+
"										<li id=\"yewuliusuhi\" class=\"mui-table-view-cell\">"+
"											<a class=\"mui-navigate-right\">"+
"												<i class=\"iconfont\">&#xe60a;</i> 业务流水"+
"											</a>"+
"										</li>								"+
"									</ul>	"+
"										<div  class=\"footer\">"+
"										    <div class=\"container\">"+
"										        <p>企业合作 | 合作事宜 | 版权投诉</p>"+
"										        <p>粤ICP备12345678. © 2009-2016 彩洋科技. Powered by Lee.</p>"+
"										    </div>"+
"										</div>"+
"								</div>"+
"								"+
"							</div>"+
"							"+
"			</aside>";
  
 
	var size = $("asign").size();
	if(size == 0)
	{
		$("#Main").append(caidan);
		$("#username").text(localStorage.登录帐号);	//绑定用户名 
	}

}




//╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣  小光点菜单的Htnl ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣

小光点菜单 = function()
{
	var caidan = "<div style=\"display:none\" id=\"xiaoguangdiancaidan\">		"+
"	        <ul class=\"mui-table-view mui-grid-view mui-grid-9\">"+
"	           <li id=\"Menu_shoujichongzhi\" class=\"mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3\"><a href=\"#\">"+
"		                <i class=\"iconfont\">&#xe61f;</i>"+
"		                <div class=\"mui-media-body\">手机充值</div></a></li>	         "+
"	           <li class=\"Menu_saomazhifu mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3\"><a href=\"#\">"+
"	                   <i class=\"iconfont\">&#xe61c;</i>	"+
"	                    <div class=\"mui-media-body\">扫码支付</div></a></li>"+
"	            <li class=\"Menu_weixinzhaoling mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3\"><a href=\"#\">"+
"	                     <i class=\"iconfont\">&#xe61a;</i>"+
"	                    <div class=\"mui-media-body\">微信找零</div></a></li>"+
"	            <li class=\"Menu_daijiaoweizhang mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3\"><a href=\"#\">"+
"	                    <i class=\"iconfont\">&#xe600;</i>"+
"	                    <div class=\"mui-media-body\">代缴违章</div></a></li>"+
"	            <li class=\"Menu_huochepiao mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3\"><a href=\"#\">"+
"	                    <i class=\"iconfont\">&#xe619;</i>"+
"	                    <div class=\"mui-media-body\">火车票</div></a></li>"+
"	            <li class=\"Menu_shoujibao mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3\"><a href=\"#\">"+
"	                    <i class=\"iconfont\">&#xe61e;</i>"+
"	                    <div class=\"mui-media-body\">收寄宝</div></a></li>"+
"	            <li class=\"Menu_zhanghuchaxun mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3\"><a href=\"#\">"+
"	                   <i class=\"iconfont\">&#xe602;</i>"+
"	                    <div class=\"mui-media-body\">账户查询</div></a></li>"+
"	            <li  class=\"Menu_guanli mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3\"><a href=\"#\">"+
"	                    <i class=\"iconfont\">&#xe617;</i>"+
"	                    <div class=\"mui-media-body\">管理</div></a></li>  "+
"	                     "+
"	          <li class=\"clear\" style=\"height:1px;width:100%;background: #fff;\"></li>"+
"	           "+
"	           <li  class=\"Menu_back mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4\"><a href=\"#\">"+
"		                <span class=\"mui-icon mui-icon-undo\"></span>"+
"		                <div class=\"mui-media-body\">返回</div></a> "+
"              </li>  "+
"	           <li class=\"Menu_home mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4\"><a href=\"#\">"+
"	                    <span class=\" mui-icon mui-icon-home-filled\"></span>"+
"	                    <div class=\" mui-media-body\">主页</div></a></li>"+
"               <li  class=\"Menu_refresh mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4\"><a href=\"#\">"+
"		                <span class=\"mui-icon mui-icon-loop\"></span>"+
"		                <div class=\"mui-media-body\">刷新</div></a>"+
"               </li>  "+
"	        </ul>   	    "+
"</div>   ";

	
	var size = $("#xiaoguangdiancaidan").size();
	
	if(size == 0)
	{
		$("body").append(caidan);			
	}

}
