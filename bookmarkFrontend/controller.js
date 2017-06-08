var app = angular.module('app', ['ui.router']);

app.component('login', {
    templateUrl: 'loginpage.html',
    controller: ['loginService', loginController]
  })

app.component('searchBook', {
  templateUrl: 'recommendations.html',
  controller: ['getBooksFromApiService', 'convertService', '$scope', searchBookController]
})
// Login
  function loginController(loginService) {
    var ctrl = this;

    ctrl.login = function(email, pw) {
      var loginData = {
        email: email,
        password: pw
      }
      loginService(loginData)
      .then(function(results) {
        console.log("Here's your login data! ", results);
      })
    }
  }

// Add a new book to a list
  function searchBookController(getBooksFromApiService, convertService, $scope) {
    var ctrl = this;
    ctrl.booksFound = [];
    ctrl.noBooks = "";

    ctrl.getBooks = function(query) {
      getBooksFromApiService(query).then(function(results) {
        convertService(results).then(function(data) {
          console.log(data.data.GoodreadsResponse.search[0].results[0].work);
          if (Array.isArray(data.data.GoodreadsResponse.search[0].results[0].work)) {
            ctrl.noBooks = "";
            ctrl.booksFound = data.data.GoodreadsResponse.search[0].results[0].work;
          } else {
            ctrl.booksFound = [];
            ctrl.noBooks = "No Books Were Found With That Criteria"
          }
        })
      })
    }

    ctrl.addBook = function(title, author, notes) {
      var bookData = {
        title: title,
        author: author,
        notes: notes,
      }
      addBookService(bookData)
      .then(function(results) {
        console.log("Here's your book stuff! ", results);
      })
    }
  }
