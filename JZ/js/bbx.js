/**
 * Created by zyl on 2015/11/23.
 *//*

$(document).ready(function(){
    alert("!");
    var isPc=isPC();
    var isLoaded=[];
    (function(){
        var ruleBtn = document.getElementsByClassName("active_rule")[0];
        var destination = document.getElementById("rule_txt");
        if(isPC){
            ScrollTo(ruleBtn,destination,"click")
        }else{
            ScrollTo(ruleBtn,destination,"touchstart")
        }
    })();
    $.getJSON("http://123.57.54.194:8888//bonus/?serv_type=144",function(msg){
        var isBuilt=loadData();
        function loadData(){
            var $body = $('body');
            document.title = msg.data.title;
            // hack在微信等webview中无法修改document.title的情况
            var $iframe = $('<iframe src="/favicon.ico"></iframe>');
            $iframe.on('load', function() {
                setTimeout(function() {
                    $iframe.off('load').remove();
                }, 0);
            }).appendTo($body);
            var liNode=$("<li style=\"display: none\">"+
                "                        <div class=\"goods_img lazy\">"+
                //"                            <img class=\"lazy\" src=\"http://7xl439.com2.z0.glb.qiniucdn.com/placeholder.jpg\">"+
                "                        </div>"+
                "                        <div class=\"goods_info\">"+
                "                            <div class=\"goods_title\">"+
                "                                <p class=\"goods_name\" style=\"display: none\">goods_name</p>"+
                "                                <p class=\"goods_name_box\">"+
                "                                    <span class=\"goods_num\">百宝箱一</span>"+
                "                                    <span class=\"goods_name_txt\">“居家小物”</span>"+
                "                                </p>"+
                "                            </div>"+
                "                            <div class=\"goods_txt\">"+
                "                               <p>没抓抓内含居家好件48件领取次数不限及司法收到货收到货叫刚开始内含居家好件48件，领取次数不限</p>"+
                "                            </div>"+
                "                            <div class=\"goods_money clearfix\">"+
                "                                <div class=\"goods_price\">"+
                "                                    <span class=\"source_price\" style=\"display: none\"></span>"+
                "                                    <label>¥</label>"+
                "                                    <span class=\"int_price\">"+
                "                                        1999"+
                "                                    </span>"+
                "                                    <span class=\"change_price\">"+
                "                                        .19"+
                "                                    </span>"+
                "                                    <span class=\"wan\">万</span>"+
                "                                </div>"+
                "                                <div class=\"pay_btn\">"+
                "                                    <p>立即支付</p>"+
                "                                </div>"+
                "                            </div>"+
                "                            <div class=\"find_more clearfix\">"+
                "                                <p>查看百宝箱内的礼物</p>"+
                "                                <div class=\"find_more_icon\">"+
                "                                    >"+
                "                                </div>"+
                "                            </div>"+
                "                        </div>"+
                "                    </li>");
            // var item=$(".goods_list ul li:eq(0)").remove();
            for(var i = 0;i<msg.data.live.length;i++){
                liNode.clone().appendTo(".goods_list ul");
            }
            for(var i = 0;i<msg.data.live.length;i++){
                var itemI=$(".goods_list ul li").eq(i);
                itemI.css("display","block");
                var data=msg.data.live;
                loadGoodsNormalInfo(itemI,{
                    ".goods_img":data[i].goods_image,
                    ".goods_name":data[i].short_name,
                    ".goods_money":data[i].goods_lowest_price,
                    ".goods_txt":"大理石没抓抓没抓抓啊没抓抓大理石没抓抓没抓抓啊没抓抓大理石没抓抓没抓抓啊没抓抓大理石没抓抓没抓抓啊没抓抓"
                });
                var goodsName=itemI.find(".goods_name").html();
                var goodsNum=itemI.find(".goods_num");
                var goodsNameTxt=itemI.find(".goods_name_txt");
                goodsNum.html(goodsName.substring(0,4));
                goodsNameTxt.html(goodsName.substring(4,goodsName.length));
                var sourcePrice=itemI.find("span.source_price").html();
                var formatPric=formatPrice(sourcePrice,itemI.find("span.wan").get(0));
                dividePrice(formatPric,itemI.find(".int_price"),itemI.find(".change_price"))
            }
            return true;
        }
      if(isBuilt){
          lazyloadImg(".lazy",isLoaded);
      }
    });
    (function(){
        $(window).on("scroll",function(){
           lazyloadImg(".lazy",isLoaded);
        })
    })();
});
*/
$(document).ready(function(){

})