angular.module('listModule.controller',[])
    .controller('listController',['$scope','$stateParams','listFactory', function ($scope,$stateParams,listFactory) {

        $scope.type = $stateParams.type;
        //挂载一个存放当前是否在搜索页面的变量isSearch
        $scope.isSearch = false;
        //抽象一个分页模型
        $scope.pageModel = {
            count : 6, //每页显示的条数
            current : 1,//当前是第几页
            start : 0,  //从第几条开始请求
            totalCount : 0,//一共多少条
            totalPage : 0  //一共多少页
        };

        //上一页
        $scope.goPrevious = function () {
            if($scope.pageModel.current <= 1){
                return false;
            }
            $scope.pageModel.current--;
            $scope.isSearch ?$scope.searchData($scope.searchText) : $scope.getData();
        };

        //下一页
        $scope.goNext = function () {
            if($scope.pageModel.current >= $scope.pageModel.totalPage){
                return false;
            }
            $scope.pageModel.current++;
            $scope.isSearch ?$scope.searchData($scope.searchText) : $scope.getData();
        }

        $scope.getData = function () {
            $scope.loading = true;
            $scope.isSearch = false;
            listFactory.getData({
                    count:$scope.pageModel.count,
                    start:$scope.pageModel.count * ($scope.pageModel.current - 1)
                },$scope.type,function (data) {
                    console.log(data);
                    $scope.movieList = data;
                    $scope.loading = false;
                    $scope.pageModel.totalCount = data.total;
                    $scope.pageModel.totalPage = Math.ceil(data.total / $scope.pageModel.count);
                    $scope.$apply();  //由于数据请求是异步操作，因此必须加上下面这句代码来重新渲染页面
            })
        };
        //搜索
        $scope.searchData = function (search) {
            $scope.loading = true;
            if(!$scope.isSearch) $scope.pageModel.current = 1;
            $scope.isSearch = true;
            listFactory.searchData({
                q : search,
                count:$scope.pageModel.count,
                start:$scope.pageModel.count * ($scope.pageModel.current - 1)
            },function (data) {
                console.log(data);
                $scope.movieList = data;
                $scope.loading = false;
                $scope.pageModel.totalCount = data.total;
                $scope.pageModel.totalPage = Math.ceil(data.total / $scope.pageModel.count);
                $scope.$apply();  //由于数据请求是异步操作，因此必须加上下面这句代码来重新渲染页面
            })
        }

        $scope.isActive = function (type) {
            return type === $scope.type;
        }

        $scope.getData();

        $scope.$emit("emitSearchFn",$scope.searchData);

        $scope.$emit("emitSearchFn2",$scope.isActive);

    }])
    .filter('typeFilter', function () {
        return function (input) {
            return input.join("、");
        }
    })