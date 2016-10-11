angular.module('detailModule.service',[])
    .factory('detailFactory',['crossService','configConstant', function (crossService, configConstant) {
        return {
            getDetailData : function (params,id,fn) {
                var url = configConstant.SERVER_PATH+"v2/movie/subject/"+id;
                crossService.getJsonp(url,params, function (data) {
                    fn(data);
                });
            }
        }
    }])