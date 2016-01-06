/**
 * Created by xyhz on 2015/11/13.
 */
$(document).ready(function() {
    //请求数据
    loadData("http://app.xinyihezi.com:8888//bonus/?serv_type=144");
    function loadData(url) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            timeout: 6000,
            cache: false,
            success: succFn //成功执行方法
        });
        function succFn(tt) {
           try{//分享内容meta
                var meta_html='<meta name="avatar" value="'+tt.data.share_image+'">';
                meta_html+='<meta name="desc" value="'+tt.data.share_description+'">';
                meta_html+='<meta name="title" value="'+tt.data.share_title+'">';
                meta_html+='<meta name="link" value="'+tt.data.share_url+'">';
                $(meta_html).prependTo('head');
           }catch(e){}
            
           // $('.top_img img').attr('src', tt.data.image_url);
            ////////title s//////////////////////////////////////
            var $body = $('body');
            document.title = tt.data.title;
            // hack在微信等webview中无法修改document.title的情况
            var $iframe = $('<iframe src="/favicon.ico"></iframe>');
            $iframe.on('load', function() {
                setTimeout(function() {
                    $iframe.off('load').remove();
                }, 0);
            }).appendTo($body);
            //////title e////////////////////////////////////////

            //火热进行
            var $hot_item = $('.hot_list .item:eq(0)').remove();
            if(tt.data.live.length==0){
               $('.hot_list .ui-con').remove();
               $('.hot_list .comming_soon').show();
            }
            try{ 
                for (var i = 0; i < tt.data.live.length; i++) {
                    $hot_item.clone().appendTo('.hot_list .ui-con');
                }
                for (var i = 0; i < tt.data.live.length; i++) {
                    var $hot_item_i = $('.hot_list .ui-con .item').eq(i);
                    var data = tt.data.live;
                    $hot_item_i.attr('data-id', data[i].sup_id);
                    $hot_item_i.find('.layer').css('backgroundImage', 'url(' + data[i].goods_image + ')');
                    $hot_item_i.find('.layer').find('img').attr('src', data[i].support_image);
                    $hot_item_i.find('.goods-name').html(data[i].short_name);
                    $hot_item_i.find('.hot').css('backgroundImage', 'url(' + data[i].pop_image + ')');
                    var nowPrice = parseFloat(data[i].goods_lowest_price).toFixed(2);
                    var priceInt = formatPrice(nowPrice).priceInt;
                    var priceXs = formatPrice(nowPrice).priceXs;
                    $hot_item_i.find('.nowPrice').find('b').html(priceInt);
                    $hot_item_i.find('.nowPrice').find('i').html(priceXs);
                    $hot_item_i.find('.oriPrice').find('i').html(data[i].price);
                    $hot_item_i.find('.zanNum').find('i').html(data[i].fewest_supporter);
                    // 按钮状态待定
                }
            }catch(e){ 
             $('.hot_list .ui-con').remove();
             $('.hot_list .comming_soon').show();
         }
            
            //明日上新
            var $tomorrow_item = $('.tomorrow_list .item:eq(0)').remove();
            if(tt.data.forecast.length==0){
               $('.tomorrow_list .ui-con').remove();
               $('.tomorrow_list .comming_soon').show();
            }
            try{
                for (var i = 0; i < tt.data.forecast.length; i++) {
                    $tomorrow_item.clone().appendTo('.tomorrow_list .ui-con');
                }
                for (var i = 0; i < tt.data.forecast.length; i++) {
                    var $tomorrow_item_i = $('.tomorrow_list .ui-con .item').eq(i);
                    var data1 = tt.data.forecast;
                    $tomorrow_item_i.attr('data-id', data1[i].sup_id);
                    $tomorrow_item_i.find('.layer').css('backgroundImage', 'url("' + data1[i].goods_image + '")');
                //$tomorrow_item_i.find('.layer').find('b').attr('src', data1[i].support_image);
                $tomorrow_item_i.find('.goods-name').html(data1[i].short_name);
                $tomorrow_item_i.find('.hot').html(data1[i].warn_count+'人已设置开抢提醒')
                var nowPrice = parseFloat(data1[i].goods_lowest_price).toFixed(2);
                var priceInt = formatPrice(nowPrice).priceInt;
                var priceXs = formatPrice(nowPrice).priceXs;
                $tomorrow_item_i.find('.nowPrice').find('b').html(priceInt);
                $tomorrow_item_i.find('.nowPrice').find('i').html(priceXs);
                $tomorrow_item_i.find('.oriPrice').find('i').html(data1[i].price);
                $tomorrow_item_i.find('.zanNum').find('i').html(data1[i].fewest_supporter);
                // 按钮状态待定
            }
        }catch(e){
            $('.tomorrow_list .ui-con').remove();
            $('.tomorrow_list .comming_soon').show();
        }

    }
    }
$('div.ui-con').delegate('.item', 'click', function(event) {
        toJizanDetail($(this).attr('data-id'));
    });

    //去app集赞详情
    function toJizanDetail(sup_id) {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            try {
                 toPraiseDetail(sup_id);
            } catch(e) {
            var loadDateTime = new Date();
            window.setTimeout(function() {
                    var timeOutDateTime = new Date();
                    if (timeOutDateTime - loadDateTime < 1500) {
                         location.href='http://app.xinyihezi.com:8881/download/html/index.html';
                    } else {
                        window.close();
                    }
                },  
                1000);
           document.location = 'xinyihezi://{"type":"toPraiseDetail","parameter":'+sup_id+'}';
           } 
        } else if (navigator.userAgent.match(/android/i)) {
            try {
                 window.android_interface.navPraiseDetail(sup_id)
            } catch(e) {
            var loadDateTime = new Date();
            window.setTimeout(function() {
                    var timeOutDateTime = new Date();
                    if (timeOutDateTime - loadDateTime < 1500) {
                         location.href='http://app.xinyihezi.com:8881/download/html/index.html';
                    } else {
                        window.close();
                    }
                },
                1000);
            document.location = 'xinyihezi://home/openwith?nav_praise_detail='+sup_id;
           }  
        }
        
    };
    
   

    //切换
    $('#hot_btn').on('click', function(event) {
        $(this).css('backgroundColor', '#d000dc');
        $('.hot_list').show();
        $('#tomorrow_btn').css('backgroundColor', '#7e33c0');
        $('.tomorrow_list').hide();
    });
    $('#tomorrow_btn').on('click', function(event) {
        $(this).css('backgroundColor', '#d000dc');
        $('.hot_list').hide();
        $('#hot_btn').css('backgroundColor', '#7e33c0');
        $('.tomorrow_list').show();
    });
    //格式化价格
    function formatPrice(oriPrice) {
        var priceInt = Math.floor(oriPrice);
        var priceXs;
        var oriPriceString=oriPrice.toString();
        priceXs =oriPriceString.split('.')[1];
        return {
            'priceInt': priceInt,
            'priceXs': priceXs
        };
    };

    //更多
    $.ajax({
        url: 'http://app.xinyihezi.com:8888/activity/?search_type=5',
        type: 'GET',
        dataType: 'json',
        timeout: 6000,
        cache: false,
        success: function(tt) {
            
            var $li_item = $('.more_list ul li:eq(0)').remove();
            for (var i = 0; i < tt.data.live.length; i++) {
                $li_item.clone().appendTo('.more_list ul');
            }
            for (var i = 0; i < tt.data.live.length; i++) {
                var $li_item_i = $('.more_list ul li').eq(i);
                var dt = tt.data.live;
                $li_item_i.css('backgroundImage', 'url(' + dt[i].image_url + ')');
                $li_item_i.find('p').html(dt[i].title);
                var fuli_detail_url='http://app.xinyihezi.com:8881/business/welfare_x/html/index.html?wel_id='+dt[i].table_id+'&show_invite=1';
                $li_item_i.attr('data-src',fuli_detail_url);
                $li_item_i.on('click', function(event) {
                    location.href=$(this).attr('data-src');
                });
            }
        }
    });

        
});