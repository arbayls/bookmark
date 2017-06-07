const bookmarkApi = "http://localhost:3000";

angular.module('app')
  .service('loginService', service).service('bookService', service)

  service.inject = ['$http', '$state'];


function service($http, $state){
    this.getItems = function(){
      return $http.get('/').then(res =>{
        return res.data
      })
    };

        this.login = function(loginData) {
            return $http.post(bookmarkApi + "/users/login", loginData);
          }

        this.addBook = function(bookData) {
            return $http.post(bookmarkApi + "/users/", bookData);
        }

} //end of service master function
