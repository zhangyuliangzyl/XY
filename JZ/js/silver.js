$(document).ready(function(){
    function makeSilver(duration,intervalTime){
        function addSilver(){
            var silverNode=$('<div class="dot"></div>');
            $(".silver").append(silverNode);
            setTimeout(function(){
                silverNode.remove();
            },duration);//这里控制节点删除时间，需要与动画时间相同
        }
        setInterval(addSilver,intervalTime);//这里控制波纹间隔时间，越小波纹越多
    }
    makeSilver(5000,1500);
});