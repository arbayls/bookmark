var app = angular.module('app', ['ui.router']);

app.component('login', {
    templateUrl: 'loginpage.html',
    controller: ['loginService', loginController]
  })

  function loginController(loginService) {
    var ctrl = this;

    ctrl.login = function(email, pw) {
      var loginData = {
        email: email,
        password: pw
      }
      loginService(loginData)
      .then(function(results) {
        console.log("WE DID A THING\n", results);
      })
    }
  }
