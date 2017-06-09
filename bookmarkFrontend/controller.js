var app = angular.module('app', ['ui.router']);

app.component('login', {
    templateUrl: 'loginpage.html',
    controller: ['loginService', loginController]
  })

app.component('searchBook', {
  templateUrl: 'recommendations.html',
  controller: ['getBooksFromApiService', 'convertService', 'addBookToReadService', 'addBookReadService', '$state', searchBookController]
})

app.component('toRead', {
  templateUrl: 'toreadbooklist.html',
  controller: ['getToReadBooksService', 'deleteBookFromToReadService', 'changeToReadService', toReadController]
})

app.component('read', {
  templateUrl: 'readbookslist.html',
  controller: ['getReadBooksService', 'deleteBookFromReadService', readController]
})

app.component('readbook', {
  bindings: {
    book: "="
  },
  templateUrl: 'readbook.html',
  controller: ['upvoteService', 'downvoteService', readbookController]
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
  function searchBookController(getBooksFromApiService, convertService, addBookToReadService, addBookReadService, $state) {
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

    ctrl.addToRead = function(bookData) {
      console.log(bookData);
      addBookToReadService(bookData)
      .then(function(results) {
        $state.go("toRead");
      })
    }

    ctrl.addRead = function(bookData) {
      addBookReadService(bookData)
      .then(function(results) {
        $state.go("read");
      })
    }
  }

function toReadController(getToReadBooksService, deleteBookFromToReadService, changeToReadService) {
  var ctrl = this;
  getBooks();

  ctrl.delete = function(book) {
    deleteBookFromToReadService(book).then(function(result) {
      getBooks();
    })
  }

  ctrl.addToRead = function(book) {
    changeToReadService(book).then(function(result) {
      getBooks();
    })
  }

  function getBooks() {
    getToReadBooksService().then(function(books) {
      ctrl.toReadBooks = books.data.rows;
      console.log(ctrl.toReadBooks);
    })
  }
}



function readController(getReadBooksService, deleteBookFromReadService, upvoteService, downvoteService) {
var ctrl = this;
getBooks();

  ctrl.delete = function(book) {
    deleteBookFromReadService(book).then(function(result) {
      getBooks();
    })
  }

  function getBooks() {
    getReadBooksService().then(function(books) {
      ctrl.readBooks = books.data.rows;
    })
  }
}

function readbookController(upvoteService, downvoteService) {
  var ctrl = this;

  ctrl.getRating = function(num) {
    var newArr = [];
    for (var i = 1; i <= num; i++) {
      newArr.push(i);
    }
    return newArr
  }

  ctrl.downvote = function(book) {
    if (book.rating === 1) return;
    book.rating--
    downvoteService(book)
  }

  ctrl.upvote = function(book) {
    if (book.rating === 5) return;
    book.rating++
    upvoteService(book)
  }
}
