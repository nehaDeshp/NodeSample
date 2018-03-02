app.controller('viewController', function ($scope, $http, $routeParams) {
    $scope.getEmployees = function () {
        $http.get("http://127.0.0.1:3000/view/").then(
            function (response) {
                console.log(response);
                $scope.fetchData = response.data;
            })

    }
    $scope.getEmployeesByName = function () {
        url = "http://127.0.0.1:3000/view/" + $scope.searchText;
        $http.get(url).then(
            function (response) {
                console.log(response);
                var prop = []
                prop.push(response.data);
                $scope.fetchData = prop;
                console.log($scope.fetchData)
            })
    }
    $scope.addUser = function () {
        $scope.success = ""
        var parameters = {
            "name": $scope.ename,
            "salary": $scope.sal,
            "dept": $scope.dname,
            "area": $scope.addr,
            "contact": $scope.cntct,
            "status": $scope.status
        };
        var url = "http://127.0.0.1:3000/add/";
        $http.post(url, parameters)
            .then(
                function (response) {
                    $scope.success = true
                    console.log("success");
                },
                function (response) {
                    $scope.success = false
                    console.log("response");
                });
    }
    $scope.delete = function(user){
        var url = "http://127.0.0.1:3000/delete/"+user.name;

        $http.delete(url,user)
        .then(function(response){
            console.log("deleted");
        },
        function(response){
            console.log("not deleted");
        });
    }
    $scope.update = function(user){ 
        $scope.user = user;
        alert("User:",user);
        $scope.url = "http://127.0.0.1:3000/update/"+user.name;
        alert($scope.url)
        alert($scope);
    }
    $scope.startUpdate = function(){
        // console.log("In start Update",$scope.url)
        // $scope.sal="";
        // $scope.dname="";
        // $scope.addr="";
        // $scope.cntct="";
        // $scope.status="";

        console.log($routeParams)
        var parameters = {
            "salary": $scope.sal,
            "dept": $scope.dname,
            "area": $scope.addr,
            "contact": $scope.cntct,
            "status": $scope.status
        };
        console.log("data:",parameters)
        $http.put("http://127.0.0.1:3000/view/update/"+$routeParams.name,parameters)
        .then(function(response){
            console.log("updated");
        },
        function(response){
            console.log("not updated");
        });
    }
})