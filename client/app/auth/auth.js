'use strict';

angular.module('nite-out.auth', ['ui.router'/*, 'ngMorph'*/])

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

/////////////////////////////////////////////////
// Controllers for login and signup using ngMorph
/////////////////////////////////////////////////

/*.controller('LoginController', function($scope) {
  $scope.login = {
    trigger: 'click',
    closeEl: '.close-x',
    modal: {
      templateUrl: 'app/auth/loginPage.html',
      position: {
        top: 50%,
        left: 50%
      },
      fade: false
    }
  }
});

.controller('SignupController', function($scope) {
  $scope.signup = {
    trigger: 'click',
    closeEl: '.close-x',
    modal: {
      templateUrl: 'app/auth/signupPage.html',
      position: {
        top: 50%,
        left: 50%
      },
      fade: false
    }
  }
});*/

.controller('AuthController', ['$scope', '$state', 'AuthRequests', function($scope, $state, AuthRequests) {
  
  // We handle which dialog to display here, based on which button is clicked.
  $scope.loginShown = false;
  $scope.signupShown = false;
  
  // For login, move to use ng-morph

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
  $scope.loginStatus = AuthRequests.resolved;

  $scope.postSignupData = function(data) {
    AuthRequests.signup(data);
  };

  $scope.getLoginData = function(data) {
    AuthRequests.userLogin(data);
  };

  $scope.signout = function() {
    AuthRequests.signout();
  };
}]);

