/**
 * Created by xyhz on 2015/11/13.
 */
$(document).ready(function() {
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
    //请求数据
    loadData("http://123.57.54.194:8888//bonus/?serv_type=146");
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

            //火热进行
            try{
                for (var i = 0; i < tt.data.rule.length; i++) {
                    try{
                        var data = tt.data.rule;
                        $hot_item_i = $('.goods_rule .progress').eq(i);
                        $hot_item_i.find('.zan').html(data[i].member_num+'人点赞');
                        var price=parseFloat(data[i].sale_off).toFixed(2);
                        $hot_item_i.find('.zan_price').html('¥'+data[i].sale_off);
                    }catch(e){
                    }
                }
            }catch(e){
                //$('.comming_soon').show();
            }
        }

    };
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
            var $hot_item = $('#goods_lists .item:eq(0)');
            if(tt.data.live.length==0){
                $('.hot_list .ui-con').remove();
                $('.hot_list .comming_soon').show();
                $('.more_section').remove();
            }
            try{
                var list_len=tt.data.live.length;
                if(list_len>4){
                    list_len=4;
                }
                for (var i = 1; i < list_len; i++) {
                    $hot_item.clone().appendTo('#goods_lists .ui-con');
                }

                for (var i = 0; i < list_len; i++) {
                    var data = tt.data.live;
                    $hot_item_i = $('#goods_lists .item').eq(i);
                    if(0==i){
                        $hot_item_i = $('#goods_single .item');
                    }

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
                $('#goods_lists .item:eq(0)').remove();
            }catch(e){
                $('#goods_lists .ui-con').remove();
                //$('.comming_soon').show();
            }
        }

    };
    //点击事件
    $('div.ui-con').delegate('.item', 'click', function(event) {
        toJizanDetail($(this).attr('data-id'));
    });
    $('.join_section').on('click', function(event) {
        toJizanList();
    });
    $('.more_section').on('click', function(event) {//h5集赞列表
        location.href='http://123.57.54.194:8881/test-html/201511/1121_jizan/1121_fkjz_active/index.html';
    });

    //去app集赞列表
    function toJizanList() {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            try {
                toPraiseList();
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
                document.location = 'xinyihezi://{"type":"toPraiseList"}';
            }
        } else if (navigator.userAgent.match(/android/i)) {
            try {
                window.android_interface.navPraise();
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
                document.location = 'xinyihezi://home/openwith?nav_praise';
            }
        }

    };

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
});