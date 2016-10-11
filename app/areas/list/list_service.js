angular.module('listModule.service',[])
    .factory('listFactory',['$http','crossService','configConstant', function ($http,crossService,configConstant) {
        return {
            getData : function (params,type,fn) {
                var url = configConstant.SERVER_PATH+"v2/movie/"+type;
                crossService.getJsonp(url,params, function (data) {
                    fn(data);
                });
            },
            searchData : function(params,fn){
                var url = configConstant.SERVER_PATH+"v2/movie/search";
                crossService.getJsonp(url,params,function(data){
                    fn(data);
                })
            }
        }
    }])
