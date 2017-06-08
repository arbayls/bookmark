const bookmarkApi = "http://localhost:3000";

angular.module('app')
  .service('loginService', ['$http', loginService])
  .service('addBookService', ['$http', addBookService])
  .service('getBooksFromApiService', ['$http', getBooksFromApiService])
  .service('convertService', ['$http', convertService])
  // .service('someService', ['$http'])

function loginService($http) {
  return function(loginData) {
    return $http.post(bookmarkApi + "/users/login", loginData);
  }
}

function addBookService($http) {
  return function(bookData) {
    return $http.post(bookmarkApi + "/:userId/add")
  }
}

function getBooksFromApiService($http) {
  return function(query) {
    return $http.get('https://www.goodreads.com/search/index.xml?key=GIlk8fvwqQpBvketlOTFTQ&q=' + query)
  }
}

function convertService($http) {
  return function(xml) {
    return $http.post(bookmarkApi + "/users/convert", xml)
  }
}



// const bookmarkApi = "http://localhost:3000";
//
// angular.module('app')
//   .service('loginService', service)
//
//   service.inject = ['$http', '$state'];
//
//
// function service($http, $state){
//     this.getItems = function(){
//       return $http.get('/').then(res =>{
//         return res.data
//       })
//     };
//
//         this.login = function(loginData) {
//             return $http.post(bookmarkApi + "/users/login", loginData);
//           }
//
//         this.addBook = function(bookData) {
//             return $http.post(bookmarkApi + "/users/", bookData);
//         }
//
// } //end of service master function
