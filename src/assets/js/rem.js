//适配手机端rem  ----ios有bug 不建议使用
var rootResize=function(){
    var baseFontSize = 100;
    var baseWidth = 640;
    var minWidth=320;
    var clientWidth = document.documentElement.clientWidth || window.innerWidth;
    var innerWidth = Math.max(Math.min(clientWidth, baseWidth), minWidth);

    var rem = clientWidth/(baseWidth/baseFontSize);
    if(innerWidth==640||innerWidth==320){
        rem=innerWidth/(baseWidth/baseFontSize)
    }

    document.querySelector('html').style.fontSize = rem + 'px';
};
rootResize();
window.onresize=function(){rootResize()};