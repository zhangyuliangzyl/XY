/**
 * Created by xyhz on 2015/12/14.
 */
jzApp
    .controller('activeCtrl',function($scope){
    $("head").append($('<link rel="stylesheet" type="text/css" href="css/active.css">'));
    $("body").append($('<script src="js/active.js"></script>'));
})
    .controller('jumpCtrl',function($scope){
    $("head").append($('<link rel="stylesheet" type="text/css" href="css/jump.css">'));
    $("body").append($('<script src="js/jump.js"></script>'));
})
    .controller('showoffCtrl',function($scope){
    $("head").append($('<link rel="stylesheet" type="text/css" href="css/showoff.css">'));
    $("body").append($('<script src="js/showoff.js"></script>'));
})
    .controller('drayCtrl',function(){
        $("head").append($('<link rel="stylesheet" type="text/css" href="css/dray.css">'));
})
    .controller('bbxCtrl',function($scope,$http,$timeout){
        $("head").append($('<link rel="stylesheet" type="text/css" href="css/bbx.css">'));
        $("body").append($('<script src="js/bbx.js"></script>'));
        $http({
            method:'GET',
            url:'http://123.57.54.194:8888//bonus/?serv_type=144',
            type:'json'
        }).success(function(data,status,headers,config){
            $scope.goods=data.data.live;
            for(var i=0;i<$scope.goods.length;i++){
                $scope.goods[i].goods_num=$scope.goods[i].short_name.substring(0,4);
                $scope.goods[i].goods_namt_txt=$scope.goods[i].short_name.substring(4,$scope.goods[i].short_name.length);
                $scope.goods[i].formatPrice=ngFormatPrice($scope.goods[i].goods_lowest_price);
                var ngPrice= ngDividePrice($scope.goods[i].formatPrice);
                $scope.goods[i].intPrice=ngPrice.intPrice;
                $scope.goods[i].changePrice=ngPrice.changePrice;
                $scope.goods[i].goods_lowest_price=parseFloat($scope.goods[i].goods_lowest_price);
            }
        }).error(function(data,status,headers,config){
            consol.log("请求数据失败！");
        })
})
    .controller('silverCtrl',function(){
        $("head").append($('<link rel="stylesheet" type="text/css" href="css/silver.css">'));
        $("body").append($('<script src="js/silver.js"></script>'));
});