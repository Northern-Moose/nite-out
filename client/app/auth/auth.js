'use strict';

angular.module('nite-out.auth', ['ui.router'])

// Define our states for ui.router
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('login' , {
      url: '/login',
      templateUrl: 'app/auth/loginPage.html',
      controller: 'AuthController'
    })
    .state('signup' , {
      url: '/signup',
      templateUrl: 'app/auth/signupPage.html',
      controller: 'AuthController'
    });
}])

.controller('AuthController', ['$scope', '$state', 'AuthRequests', '$window', 'Main', function($scope, $state, AuthRequests, $window, Main) {
  console.log("AuthRequests: ", AuthRequests);
  // We handle which dialog to display here, based on which button is clicked.
  $scope.loginShown = false;
  $scope.signupShown = false;
  
  // Login button clicked, display the login dialog
  $scope.toggleLogin = function() {
    $scope.loginShown = !$scope.loginShown;
  };
  
  // Signup button clicked, display the signup dialog.  
  $scope.toggleSignup = function() {
    $scope.signupShown = !$scope.signupShown;
  };

  // Here we handle passing data to the server, all business logic is handled in
  // AuthRequests service.
  $scope.userInfo = {};
  $window.localStorage.getItem('token') ? $scope.loginStatus = true : $scope.loginStatus = false;

  // $scope.loginStatus = $window.localStorage.getItem('token');
  console.log("if: ", ($scope.loginStatus))

  $scope.postSignupData = function(data) {
    AuthRequests.signup(data);
    $scope.loginStatus = $window.localStorage.getItem('token');
  };

  $scope.getLoginData = function(data) {
    console.log("data: ", data);
    // console.log("data: ", data);
    AuthRequests.userLogin(data);
    $window.localStorage.getItem('token') ? $scope.loginStatus = true : $scope.loginStatus = false;
    $scope.loginStatus = true;
    Main.user = data.username;
    // Main.user = $window.localStorage.getItem('user');
  };

  $scope.signout = function() {
    AuthRequests.signout();
    console.log('deleted: ', $window.localStorage.getItem('token'))
    $window.localStorage.getItem('token') ? $scope.loginStatus = true : $scope.loginStatus = false;
  };
}]);

