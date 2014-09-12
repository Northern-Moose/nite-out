'use strict';

angular.module('nite-out.auth', ['ui.router'])

// Define our states for ui.router
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('login' , {
      url: '/login',
      templateUrl: 'app/auth/loginPage.html',
      controller: 'authController'
    })
    .state('signup' , {
      url: '/signup',
      templateUrl: 'app/auth/signupPage.html',
      controller: 'authController'
    });
}])

.controller('authController', ['$scope', '$state', 'authRequests', function($scope, $state, authRequests) {
  
  // We handle which dialog to display here, based on which button is clicked
  $scope.loginShown = false;
  $scope.signupShown = false;
  
  // Login button clicked, display the login dialog
  $scope.toggleLogin = function() {
    $scope.loginShown = !$scope.loginShown;
  };
  
  // Signup button clicked, display the signup dialog
  $scope.toggleSignup = function() {
    $scope.signupShown = !$scope.signupShown;
  };

  // Here we handle passing data to the server, all business logic is handled in
  // authRequests service
  $scope.userInfo = {};
  $scope.loginStatus = authRequests.resolved;

  $scope.postSignupData = function(data) {
    authRequests.signup(data);
  };

  $scope.getLoginData = function(data) {
    authRequests.userLogin(data);
  };

  $scope.signout = function() {
    authRequests.signout();
  };
}]);
