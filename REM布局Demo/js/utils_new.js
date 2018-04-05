/*动态改变根元素字体大小*/
console.log("页面进入时间", new Date().getTime())

function recalc() {
	var clientWidth = document.documentElement.clientWidth;
	//	console.log(clientWidth);
	if(!clientWidth) return;
	clientWidth = clientWidth > 420 ? 420 : clientWidth;
	clientWidth = IsPC() ? clientWidth - 20 : clientWidth;
	var rootSize = 40 * (clientWidth / 1960);
	var rootSize = Math.round(rootSize);
	document.documentElement.style.cssText += "font-size:" + (rootSize) + 'px!important';
	if(document.body) {
		document.body.style.height = window.innerHeight + "px";
	}
}

function initRecalc() {
	recalc();
	var resizeEvt = 'osrientationchange' in window ? 'orientationchange' : 'resize';
	if(!document.addEventListener) return;
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);
}

initRecalc();

//动态跳转字体为整数
$(function() {
	console.log(new Date().getTime());
	var oriFontSize = [];
	//文字元素
	var textEles = $("body *:not(img,br,hr,ul,dl,script,style,link)").filter(function() {
		var isOk = false;
		if($(this).hasClass("count")) {
			return false
		};
		$(this).contents().each(function(index, val) {
			if(!isOk && val.nodeType == 3 && (/[\w\u4e00-\u9fa5]+/g).test(val.textContent)) {
				isOk = true; //只要有文字文本就改变当前标签的font-size为整数
			}
		})
		return isOk;
	})
	//为了防止子元素继承字体大小，必须要先存在一个数组里
	textEles.each(function() {
		oriFontSize.push($(this).css("fontSize"));
	})
	textEles.each(function(index) {
		$(this).css("fontSize", parseInt(oriFontSize[index]));

	})
	console.log(new Date().getTime());
})
//是否为pc端   
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"
	];
	var flag = true;
	for(var v = 0; v < Agents.length; v++) {
		if(userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}