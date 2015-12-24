/* 
 *功能：载入商品通用信息
 *参数1:item  商品节点
 *参数2:
 *	{
 * 		ImgDivSelector:imgUrl;可包含背景的节点或包含img标签的节点
 * 		goodsNameSelector:nameUrl;
 * 		goodsPriceSelector:priceUrl;包含span.source_price的节点
 * 		goodsDscSelector:dscUrl;包含p的Div节点
 *	}
 *时间：2015-11-25
 * */
    function loadGoodsNormalInfo(item, normalGoodsObject) {
        var keys = [];
        for (var keyI in normalGoodsObject) {
            keys.push(keyI);
        }
        if(item.find(keys[0]).find('img').prop("tagName")){
            item.find(keys[0]).find('img').attr("data-original", normalGoodsObject[keys[0]]);
        }else{
            item.find(keys[0]).attr("data-original", normalGoodsObject[keys[0]]);
        }

        item.find(keys[1]).html(normalGoodsObject[keys[1]]);
		if (keys[2]){
			item.find(keys[2]).find("span.source_price").html(normalGoodsObject[keys[2]]);
		}      
        if (keys[3]) {
            item.find(keys[3]).find('p').html(normalGoodsObject[keys[3]]);
        }
    }
/*
 *功能：处理超价钱字符串，没超过万元精确到小数点后两位，超过万元返回“万”为单位的浮点数，精确到小数点后两位即百位
 *参数：原始价钱（字符串）
		货币单位（万）节点
 *输入：字符串型价钱 单位节点
 *输出：返回处理后的字符串型价钱 及单位是否显示（NG除外）
 *时间：2015-11-25
 */
	function formatPrice(priceStr,postfixNode){
    var divideIndex=p
	riceStr.indexOf(".");
    if(divideIndex<0){
        priceStr=priceStr+".00";
        divideIndex=priceStr.indexOf(".")
    }
    var changePrice=priceStr.substr(divideIndex+1,priceStr.length);
    var intPrice=priceStr.substr(0,divideIndex);
    if(intPrice.length>=5){
        changePrice=intPrice.substr(intPrice.length-4,intPrice.length);
        intPrice=intPrice.substr(0,intPrice.length-4);
        var priceOverThousands=intPrice+"."+changePrice;
        divideIndex=priceOverThousands.indexOf(".");
        priceOverThousands=parseFloat(priceOverThousands).toFixed(2);
        postfixNode.style.display="inline";
        return priceOverThousands.toString();
    }else{
        if(changePrice.length==1){
            changePrice+="0";
        }
        if(changePrice.length==0){
            changePrice+="00";
        }
        if(changePrice.length>2){
            changePrice=changePrice.substr(0,2);
        }
        changePrice="."+changePrice;
        return (intPrice+changePrice)
    }
}
function ngFormatPrice(priceStr){
    var divideIndex=priceStr.indexOf(".");
    if(divideIndex<0){
        priceStr=priceStr+".00";
        divideIndex=priceStr.indexOf(".")
    }
    var changePrice=priceStr.substr(divideIndex+1,priceStr.length);
    var intPrice=priceStr.substr(0,divideIndex);
    if(intPrice.length>=5){
        changePrice=intPrice.substr(intPrice.length-4,intPrice.length);
        intPrice=intPrice.substr(0,intPrice.length-4);
        var priceOverThousands=intPrice+"."+changePrice;
        divideIndex=priceOverThousands.indexOf(".");
        priceOverThousands=parseFloat(priceOverThousands).toFixed(2);
        return priceOverThousands.toString();
    }else{
        if(changePrice.length==1){
            changePrice+="0";
        }
        if(changePrice.length==0){
            changePrice+="00";
        }
        if(changePrice.length>2){
            changePrice=changePrice.substr(0,2);
        }
        changePrice="."+changePrice;
        return (intPrice+changePrice)
    }
}
/*
 *功能：将价钱分为整数和零钱两部分插入整数节点和零钱节点 精确到两位小数,(ng返回处理后的对象)
 *输入：原始价钱 整数节点 零钱节点
 *输出：插入节点的值为字符串类型
 (ng对象{
	 intPrice:,
	 changePrice
 })
 *时间：2015-11-26
 */
function dividePrice(sourcePrice,intPriceNode,changePriceNode){
    var priceSrc=parseFloat(sourcePrice).toFixed(2);
    var intPrice=parseInt(sourcePrice).toString();
    var changePrice="."+(priceSrc*100)%(intPrice*100);
    if(changePrice.length==1){
        changePrice="."+"00";
    }
    if(changePrice.length==2){
        changePrice=changePrice+"0";
    }
   try {
       intPriceNode.html(intPrice);
       changePriceNode.html(changePrice);
   }catch(e) {
       intPriceNode.innerHTML = intPrice;
       changePriceNode.innerHTML = changePrice;
   }
}
function ngDividePrice(sourcePrice,intPriceModel,changePriceModel){
    var priceSrc=parseFloat(sourcePrice).toFixed(2);
    var intPrice=parseInt(sourcePrice).toString();
    var changePrice="."+(priceSrc*100)%(intPrice*100);
    if(changePrice.length==1){
        changePrice="."+"00";
    }
    if(changePrice.length==2){
        changePrice=changePrice+"0";
    }
    try {
        return{
            'intPrice':intPrice,
            'changePrice':changePrice
        }
    }catch(e) {
        alert("尝试ngDividePrice失败！")
    }
}
/*是否PC端
*返回 true:是PC端，false:不是PC端
 */
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
/*
 *功能：瞬间滚屏
 *输入：触发事件DOM 目的地DOM 触发事件类型
 *注：必须为JS DOM节点不能为Jquery节点，JQ节点请get(0)
 */
 function ScrollTo(btnNode,destinationNode,eventType){
        function toDestination(){
            destinationNode.scrollIntoView();
        }
        var handler=function(){
            toDestination()
        };
        btnNode.addEventListener(eventType,handler,false);
 }
/*
* if the target is in your eye
* */
function isOnScreen(Node){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = Node.offset();
    bounds.right = bounds.left + Node.outerWidth();
    bounds.bottom = bounds.top + Node.outerHeight();
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
}

/*
* load the lazy image
* the img must save the rrue url in the attribute "data-original"
* notice:do not add the 'lazy' class to div and img node both.
* */
var isloadedFlag=[];
function lazyloadImg(imagesSelector){
    var imgList=$(imagesSelector);

    for(var i=0;i<imgList.length;i++){
        var itemImg=$(imgList[i]);
        if(isOnScreen(itemImg)&&!isloadedFlag[i]&&itemImg.prop("tagName").toLowerCase()=="img"){
            isloadedFlag[i]=true;
            itemImg.attr("src",itemImg.attr("data-original"));
            itemImg.fadeOut(0);
            itemImg.fadeIn(1000);
        }else if(isOnScreen(itemImg)&&!isloadedFlag[i]&&itemImg.prop("tagName").toLowerCase()==="div"){
            isloadedFlag[i]=true;
            var imgUrl=itemImg.attr('data-original');
            itemImg.css("background-image",'url('+imgUrl+')');
            itemImg.fadeOut(0);
            itemImg.fadeIn(1000);
        }
    }
}
/*拖拽
*参数：被拖拽的元素ID
*/
function dray(id){
    var ispc=isPC();
    var keyBox=document.getElementById(id);
    var disX= 0,
        disY= 0;
    /*pc端拖拽*/
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
    /*移动端拖拽*/
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