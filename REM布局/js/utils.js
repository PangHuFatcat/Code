/*动态改变根元素字体大小*/
function recalc() {
	var clientWidth =window.innerWidth ||document.documentElement.clientWidth;
	if(!clientWidth) return;
	var rootSize = 40 * (clientWidth / 1920);
	document.documentElement.style.fontSize = (rootSize) + 'px';
}
function initRecalc() {
	recalc();
	var resizeEvt = 'osrientationchange' in window ? 'orientationchange' : 'resize';
	if(!document.addEventListener) return;
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);
}
initRecalc();