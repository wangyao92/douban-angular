angular.module('detailModule.controller',[])
    .controller('detailController',['$scope','$stateParams','detailFactory', function ($scope,$stateParams,detailFactory) {
        //电影id
        $scope.id = $stateParams.id;
        $scope.getDetail = function () {
            $scope.loading = true;
            detailFactory.getDetailData({},$scope.id,function(data){
                $scope.detail = data;
                $scope.loading = false;
                $scope.$apply();
                console.log(data);
            });
        }
        $scope.getDetail();
    }])