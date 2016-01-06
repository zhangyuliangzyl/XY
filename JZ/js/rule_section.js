/**
 * Created by xyhz on 2015/11/21.
 */
$(document).ready(function(){
 var htmlCode ='<section class="rule_text title_line" style="background-color: #8442d8">';
     htmlCode+='<h3 style="font-size:12px;line-height: 48px"><div class="left_line"></div>参与方式<div class="right_line"></div></h3>';
     htmlCode+='<p style="font-size:12px;line-height:19px;">';
     htmlCode+='1、进入集赞活动页后，挑选喜欢的礼物点击“马上集赞”，进入集赞详情页后点击“确认参与”即可成功参与。<br>';
    htmlCode+='2、若心仪礼物尚未开始集赞，可先设置提醒，活动开始后会有短信通知。<br>';
    htmlCode+=' 3、在集赞详情页中点击“去集赞”分享此次活动，即可号召好友点赞。<br>';
    htmlCode+=' 4、所有已参与的集赞均可在“我的集赞”中查看。';
    htmlCode+=' </p>';
    htmlCode+='</section>';
    htmlCode+='<section class="join_text title_line">';
    htmlCode+='<h3 style="font-size:12px;"><div class="left_line"></div>活动规则<div class="right_line"></div></h3>';
    htmlCode+='<p style="font-size:12px;line-height:19px;">1、标有“新人专享”的礼物仅限新注册用户参与集赞。<br>';
    htmlCode+='2、当商品库存为0时，无法发起集赞。<br>';
    htmlCode+=' 3、针对一个集赞活动，每个心意盒子注册用户只能发起一次，每个微信（微博）ID只能帮忙点赞一次。<br>';
    htmlCode+='4、在活动时间内，当获得的好友点赞数达到阶段数量要求，即可解锁当前阶段相对应的优惠价，每次集赞共3个阶段。<br>';
    htmlCode+='5、活动过程中，随时可以当前优惠价确认下单，成功下单后该集赞活动即中止，不可继续集赞。<br>';
    htmlCode+=' 6、当集赞活动结束后，需在48小时内完成支付才可享有优惠价购买，过期不支付视为自动放弃。<br>';
    htmlCode+='7、完成支付后，礼物将于48小时内发出，请耐心等待。<br>';
    htmlCode+='8、心意盒子工作人员及家属不得参加活动。';
    htmlCode+='</p>';
    htmlCode+=' <span style="text-align:center;font-size:12px;font-style:normal;display:block;line-height:38px;">*本次活动最终解释权归心意盒子所有</span>';
    htmlCode+='</section>';



    $('.rule_txt').html(htmlCode);
});
//isPhone4inches = (window.screen.height==480);
//isPhone5inches = (window.screen.height==568);
//isPhone6inches = (window.screen.height==667);
//isPhone6pinches = (window.screen.height==736);