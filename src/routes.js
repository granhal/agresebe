export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/login');
  // candidate:youCanDoIt!
  // $httpProvider.defaults.headers.common['X-CSRFToken'] = window.csrf_token;
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

  $httpProvider.interceptors.push(['$q', '$log', '$state', '$cookies', function ($q, $log, $state, $cookies) {
    // $httpProvider.defaults.headers.common['X-CSRFToken'] = $cookies.get("csrftoken");
    // const token = $cookies.get("csrftoken");
    // $httpProvider.defaults.headers.common.Authorization = `Basic ${token}`;
    $log.log("cookie", $cookies.get("csrftoken"));
    return {
      response: response => {
        $log.log(response);
        return response || $q.when(response);
      },
      responseError: rejection => {
        $log.log(rejection);
        // $state.go("login");
        if (rejection.status === 401) {
          rejection.data = {stauts: 401, descr: 'unauthorized'};
          return rejection.data;
        }

        return $q.reject(rejection);
      }
    };
  }]);

  $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('grey');

  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    }).state('blog', {
      url: '/blog',
      component: 'blog'
    });
}
