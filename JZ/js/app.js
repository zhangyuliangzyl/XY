/**
 * Created by xyhz on 2015/12/14.
 */
var jzApp=angular.module("jzApp",[
    'ngRoute','ngAnimate'
]);
jzApp.config(function($routeProvider){
    $routeProvider.when('/active',{
        templateUrl:'tpls/active.html',
        controller:'activeCtrl',
        replace:true
    }).when('/jump',{
        templateUrl:'tpls/jump.html',
        controller:'jumpCtrl',
        replace:true
    }).when('/showoff',{
        templateUrl:'tpls/showoff.html',
        controller:'showoffCtrl',
        replace:true
    }).when('/test',{
        templateUrl:'tpls/test.html',
            controller:'showoffCtrl',
            replace:true
    }).when('/bbx',{
        templateUrl:'tpls/bbx.html',
        controller:'bbxCtrl',
        replace:true
    }).when('/dray',{
        templateUrl:'tpls/dray.html',
        controller:'drayCtrl',
        replace:true
    }).when('/silver',{
        templateUrl:'tpls/silver.html',
        controller:'silverCtrl',
        replace:true
    })
});
jzApp.factory("loadService",[
    '$q','$http',
    function($q,$http){
        var getData=function(){
            var deferred=$q.defer();
            $http.get('http://123.57.54.194:8888//bonus/?serv_type=144')
                .success(function(data){
                deferred.resolve(data);
            })
                .error(function(reason){
                    deferred.reject(reason);
                });
            return deferred.promise;
        };
        return{
            getData:getData
        };
    }
]);