var AUTH0_CLIENT_ID='LcdgT9ILgRt6SHNvIYGhVouB5JQdXyZT';
var AUTH0_DOMAIN='chapterserver.auth0.com';
var AUTH0_CALLBACK_URL=location.href;

(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    // auth & API
    'auth0',
    'angular-storage',
    'angular-jwt'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', 'authProvider', '$httpProvider', 'jwtInterceptorProvider'];

  function config($urlProvider, $locationProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

    authProvider.init({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      loginUrl: '/login'
    });

    authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
      console.log("Login Success");
      profilePromise.then(function(profile) {
        store.set('profile', profile);
        store.set('token', idToken);
      });
      $location.path('/');
    });

    authProvider.on('loginFailure', function() {
      alert("Error");
    });

    authProvider.on('authenticated', function($location) {
      console.log("Authenticated");

    });

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
  }

  function run($rootScope, auth, store, jwtHelper, $location) {
    FastClick.attach(document.body);
    $rootScope.$on('$locationChangeStart', function() {

      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          // Either show the login page or use the refresh token to get a new idToken
          $location.path('/');
        }
      }

    });
  }

})();
