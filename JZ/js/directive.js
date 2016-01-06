/**
 * Created by xyhz on 2015/12/14.
 */
jzApp.directive("lazyLoad",['$timeout',function($timeout){
   return{
       restrict:'A',
       link:function(scope,ele,attrs){
           var timeout=$timeout(function(){
               lazyloadImg(".lazy");
           },0);
           $(window).on("scroll",function(){
               lazyloadImg(".lazy");
           })
       }
   }
}]);
jzApp.directive("dray",function($timeout){
  return{
      restrict:'A',
      link:function(scope,ele,attrs){
          dray(attrs.id);
      }
  }
});
jzApp
    .directive('lazySrc', ['$window', '$document', function($window, $document){
        var doc = $document[0],
            body = doc.body,
            win = $window,
            $win = angular.element(win),
            uid = 0,
            elements = {};

        function getUid(el){
            return el.__uid || (el.__uid = '' + ++uid);
        }

        function getWindowOffset(){
            var t,//文档对象
                //获取窗口横向滚动条滚动距离
                pageXOffset = (typeof win.pageXOffset == 'number') ? win.pageXOffset : (((t = doc.documentElement) || (t = body.parentNode)) && typeof t.ScrollLeft == 'number' ? t : body).ScrollLeft,
                //获取窗口垂直滚动条滚动距离
                pageYOffset = (typeof win.pageYOffset == 'number') ? win.pageYOffset : (((t = doc.documentElement) || (t = body.parentNode)) && typeof t.ScrollTop == 'number' ? t : body).ScrollTop;
            return {
                offsetX: pageXOffset,
                offsetY: pageYOffset
            };
        }

        function isVisible(iElement){
            var elem = iElement[0],
                elemRect = elem.getBoundingClientRect(),// 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
                windowOffset = getWindowOffset(),
                winOffsetX = windowOffset.offsetX,//窗口横向滚动条距离
                winOffsetY = windowOffset.offsetY,//窗口纵向滚动条距离
                elemWidth = elemRect.width,//元素宽度
                elemHeight = elemRect.height,//元素高度
                elemOffsetX = elemRect.left + winOffsetX,//元素距离文档左边距离
                elemOffsetY = elemRect.top + winOffsetY,//元素距离文档上边距离
                viewWidth = Math.max(doc.documentElement.clientWidth, win.innerWidth || 0),//视口宽度
                viewHeight = Math.max(doc.documentElement.clientHeight, win.innerHeight || 0),//视口高度
                xVisible,
                yVisible;

            if(elemOffsetY <= winOffsetY){//如果元素在第一屏可见，纵向
                if(elemOffsetY + elemHeight >= winOffsetY){//并且元素在垂直滚动条滚动后可见
                    yVisible = true;
                }
            }else if(elemOffsetY >= winOffsetY){//如果元素在第一屏不可见，纵向
                if(elemOffsetY <= winOffsetY + viewHeight){//并且元素在垂直滚动条滚动后可见
                    yVisible = true;
                }
            }

            if(elemOffsetX <= winOffsetX){//元素第一屏可见，横向
                if(elemOffsetX + elemWidth >= winOffsetX){//并且元素在水平滚动条滚动后可见
                    xVisible = true;
                }
            }else if(elemOffsetX >= winOffsetX){//元素第一屏不可见，纵向
                if(elemOffsetX <= winOffsetX + viewWidth){//并且元素在水平滚动条滚动后可见
                    xVisible = true;
                }
            }

            return xVisible && yVisible;
        };

        function checkImage(){
            Object.keys(elements).forEach(function(key){
                var obj = elements[key],
                    iElement = obj.iElement,
                    $scope = obj.$scope;
                if(isVisible(iElement)){
                    iElement.attr('src', $scope.lazySrc);
                }
            });
        }

        $win.bind('scroll', checkImage);
        $win.bind('resize', checkImage);

        function onLoad(){
            var $el = angular.element(this),
                uid = getUid($el);

            $el.css('opacity', 1);

            if(elements.hasOwnProperty(uid)){
                delete elements[uid];
            }
        }

        return {
            restrict: 'A',
            scope: {
                lazySrc: '@'
            },
            link: function($scope, iElement){

                iElement.bind('load', onLoad);

                $scope.$watch('lazySrc', function(){
                    if(isVisible(iElement)){
                        iElement.attr('src', $scope.lazySrc);
                    }else{
                        var uid = getUid(iElement);
                        iElement.css({
                            'background-color': '#fff',
                            'opacity': 0,
                            '-webkit-transition': 'opacity 1s',
                            'transition': 'opacity 1s'
                        });
                        elements[uid] = {
                            iElement: iElement,
                            $scope: $scope
                        };
                    }
                });

                $scope.$on('$destroy', function(){ //清除配置,不然scroll会重复请求在Controller中监听$destory事件，这个事件会在页面发生跳转的时候触发。
                                                   //在页面跳转之后，这个页面监听的一些全局事件，比如window.scroll事件在下一页scroll的时候还会继续被触发
                                                   //在这个事件的回调中，清除当前页面的监听或者一些参数保证下面的页面不会再触发当前页面的事件回调
                    iElement.unbind('load');
                    var uid = getUid(iElement);
                    if(elements.hasOwnProperty(uid)){
                        delete elements[uid];
                    }
                });
            }
        };
    }]);