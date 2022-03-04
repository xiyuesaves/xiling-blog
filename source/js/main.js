// 启用pjax局部刷新
const pjax = new Pjax({
	selectors: [".center-block", "title"],
	cacheBust: false,
	timeout: 1000
})
// 跳转到分类
function gotoArchives(event,url) {
	event.preventDefault();
	if (url) {
		pjax.loadUrl(url);
	} else {
		let errMsg = "_(:з」∠)_";
		event.target.innerText = errMsg;
		event.target.setAttribute("title",errMsg);
	}
}
