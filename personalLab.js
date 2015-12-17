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
 *输入：字符串型价钱 单位节点
 *输出：返回处理后的字符串型价钱 及单位是否显示
 *时间：2015-11-25
 */
	function formatPrice(priceStr,postfixNode){
    var divideIndex=priceStr.indexOf(".");
    if(divideIndex<0){
        priceStr=priceStr+".00";
        divideIndex=priceStr.indexOf(".")
    }
    var changePrice=priceStr.substr(divideIndex+1,priceStr.length);//零钱部分
    var intPrice=priceStr.substr(0,divideIndex);//整数部分
    if(intPrice.length>=5){
        changePrice=intPrice.substr(intPrice.length-4,intPrice.length);
        intPrice=intPrice.substr(0,intPrice.length-4);
        var priceOverThousands=intPrice+"."+changePrice;
        divideIndex=priceOverThousands.indexOf(".");
        /*��������*/
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
/*
 *功能：将价钱分为整数和零钱两部分插入整数节点和零钱节点 精确到两位小数
 *输入：原始价钱 整数节点 零钱节点
 *输出：插入节点的值为字符串类型
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
* */
function lazyloadImg(imagesSelector,isloadedFlag){
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