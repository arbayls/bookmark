const bookmarkApi = "http://localhost:3000";

angular.module('app')
  .service('loginService', ['$http', loginService])

function loginService($http) {
  return function(loginData) {
    return $http.post(bookmarkApi + "/users/login", loginData);
  }
}
