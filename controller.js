
var app = angular.module('myApp',['ngRoute','ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);
var data =[];
var assignmentDetails=[];
var info ={};

/*app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'index.html',
            controller  : 'AppCtrl'
        })

        // route for the about page
        .when('/home', {
            template : '<h1>cdcd</h1>',
            controller  : 'CollapseCtrl'
        })

});*/

app.controller('AppCtrl',['$scope','$http',
    function ($scope,$http) {
        // console.log("hello");

        // get request for getting information on assignment objects

        $http.get("https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d")
            .then(function(response) {
               data= $scope.info = response.data;

               for(var i=0;i<data.length;i++){
                    console.log($scope.info[i].id);
                }

            });

//        refresh();

        // update function for updation of tabs
        $scope.update = function (id,creator_id,title,due,details) {

         // console.log(title+" "+due+" "+details);
         // console.log("in click " +id+" "+creator_id)  ;

            $http.get("https://api.edmodo.com/assignment_submissions?assignment_id="+id+"&assignment_creator_id"
                +creator_id+"&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d")
                .then(function(response) {
                 info =   $scope.assignmentInfo = response.data;

                    // for(var i=0;i<$scope.assignmentInfo.length;i++){
                    //     console.log($scope.assignmentInfo[i]);
                    // }

                });

            assignmentDetails = [{title:title ,description:details,due:due}];

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


//angular.module('mgcrea.ngStrapDocs')

app.controller('CollapseCtrl', function($scope) {

    // for(var i=0;i<info.length;i++){
    //     console.log(info[i]);
    // }
        $scope.panels = info;

        // $scope.panels.activePanel = 2;

        // $scope.multiplePanels = {
        //     activePanels: [0,1]
        // };


    });

