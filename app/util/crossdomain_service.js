//跨域通用方法
angular.module('crossModule.service',[])
    .service('crossService',['$window', function ($window) {
        this.getJsonp = function (url,params,fn) {
            //处理回调函数挂载问题,不能重复导致覆盖
            var cbName = "jsonp_"+((Math.random()*Math.random()).toString().substr(2)),
                scriptElement,
                queryString;
            //将该函数名挂载到window下
            $window[cbName] = function (data) {
                fn(data);
                // 不断创建标签，最终可能太多，尤其是spa永远不会刷新页面，那标签就会越来越多，所以可以在这个脚本执行完成过后移除
                if(scriptElement) $window.document.body.removeChild(scriptElement);
            };

            //组合url地址,将params对象转换为以&连接的字符串形式
            //{key1:val, key2:val} => key1=val&key2=val
            queryString = "";
            for(var k in params){
                queryString += k + "=" +params[k] + "&";
            }
            //将回调函数名拼接上
            queryString += "callback="+ cbName;
            url = url + "?" +queryString;
            // 2. 创建一个script标签，并将src设置为url地址
            scriptElement = $window.document.createElement('script');
            scriptElement.src = url;
            // 3. appendChild(执行)
            $window.document.body.appendChild(scriptElement);
        }
    }]);