var app = angular.module("EmployeeApp",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl: "/templates/home.html"
    })
    .when("/view", {
        templateUrl:"/templates/list.html",
        controller:'viewController'
    })
    .when("/view/:name", {
        templateUrl:"templates/list.html",
        controller:'viewController'
    })
    .when("/add", {
        templateUrl:"templates/add.html",
        controller:"viewController"
    })
    .when("/view/update/:name", {
        templateUrl:"templates/edit.html",
        controller:"viewController"
    })
    .when("/delete/:name", {
        templateUrl:"templates/list.html",
        controller:"viewController"
    });
});

