
var app = angular.module('myApp',['ngRoute','ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);
var assignmentDetails=[];
var data ={};

app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'index.html',
            controller  : 'AppCtrl'
        })

        // route for the assignments page
        .when('/assignments', {
            templateUrl : 'assignments.html'
        })

        // route for the submissions page
        .when('/assignments/submission', {
            templateUrl : 'assignments.html'

        })

});

app.controller('AppCtrl',['$scope','$http',
    function ($scope,$http) {

        $http.get("https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d")
            .then(function(response) {

                 $scope.info = response.data;

            });
        $scope.update = function (details) {
            console.log("inside");

         console.log("in click " +details.id)  ;

            $http.get("https://api.edmodo.com/assignment_submissions?assignment_id="+details.id+"&assignment_creator_id"
                +details.creator.id+"&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d")
                .then(function(response) {
                    $scope.panels =  $scope.assignmentInfo = response.data;
                });

            assignmentDetails = [{title:details.title ,description:details.description,due:details.due_at}];

            $scope.detailsObject =assignmentDetails;

            $scope.tab = 1;

            $scope.setTab = function(newTab){
                $scope.tab = newTab;
            };

            $scope.isSet = function(tabNum){
                return $scope.tab === tabNum;
            };


        };


    }])
