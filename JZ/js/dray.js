/**
 * Created by xyhz on 2015/12/24.
 */
$(document).ready(function(){
    function dray(id){
        var ispc=isPC();
        var keyBox=document.getElementById(id);
        var disX= 0,
            disY= 0;
        //PC端拖拽
        if(ispc){
            (function() {
                keyBox.onmousedown = function (ev) {
                    var e = ev || window.event;
                    disX = e.clientX - keyBox.offsetLeft;
                    disY = e.clientY - keyBox.offsetTop;
                    document.onmousemove = function (ev) {
                        var e = ev || window.event;
                        var l = e.clientX - disX,
                            t = e.clientY - disY;
                        if (l < 0) {
                            l = 0
                        }
                        else if (l > document.documentElement.clientWidth - keyBox.offsetWidth) {
                            l = document.documentElement.clientWidth - keyBox.offsetWidth
                        }
                        if (t < 0) {
                            t = 0
                        }
                        else if (t > document.documentElement.clientHeight - keyBox.offsetHeight) {
                            t = document.documentElement.clientHeight - keyBox.offsetHeight
                        }
                        keyBox.style.left = l + "px";
                        keyBox.style.top = t + "px";
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    };
                    document.onmouseup = function (ev) {
                        var e = ev = window.event;
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                    return false;
                }
            })();
        }
        //移动端拖拽
        if(!ispc){
            $('body').on('touchmove touchstart', function (event) {
                event.preventDefault();
            });
            var moveStart=false;
            (function(){
                function touchInBox(ev){
                    var e = ev || window.event;
                    disX = e.touches[0].clientX - keyBox.offsetLeft;
                    disY = e.touches[0].clientY - keyBox.offsetTop;
                    moveStart=true;
                }
                function touchMoveBox(ev){
                    var e = ev || window.event;
                    if(moveStart){
                        var l=e.touches[0].clientX - disX,
                            t=e.touches[0].clientY - disY;
                    }
                    if (l < 0) {
                        l = 0
                    }
                    else if (l > document.documentElement.clientWidth - keyBox.offsetWidth) {
                        l = document.documentElement.clientWidth - keyBox.offsetWidth
                    }
                    if (t < 0) {
                        t = 0
                    }
                    else if (t > document.documentElement.clientHeight - keyBox.offsetHeight) {
                        t = document.documentElement.clientHeight - keyBox.offsetHeight
                    }
                    keyBox.style.left = l + "px";
                    keyBox.style.top = t + "px";
                }
                keyBox.addEventListener('touchend',function(){
                    moveStart = false;
                });
                keyBox.addEventListener('touchstart',touchInBox);
                keyBox.addEventListener('touchmove',touchMoveBox);
            })();
        }
    }
dray("key_box");
});