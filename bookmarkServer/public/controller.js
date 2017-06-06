
    var app = angular.module('app', ['angularMoment', 'ui.router']);

    app.component('bookmark', {
        templateUrl: 'loginpage.html',
        controller: function(moment, $http) {
            var ctrl = this;
            ctrl.posts;
            getPosts();
            ctrl.comments = [];
            ctrl.showPost = showPost;
            ctrl.toggleForm = toggleForm;
            ctrl.addComment = addComment;

            function showPost() {
                $http.post('/api/posts', {
                    title: ctrl.newPost.title,
                    body: ctrl.newPost.body,
                    author: ctrl.newPost.author,
                    image_url: ctrl.newPost.image,
                    vote_count: 0,
                    created_at: new Date()
                    }).then(function(result) {
                      ctrl.newPost.title = null;
                      ctrl.newPost.body = null;
                      ctrl.newPost.author = null;
                      ctrl.newPost.image = null;
                      ctrl.showForm = false;
                      getPosts();
                    })
            }

            function getPosts() {
              $http.get("/api/posts").then(function(posts){
                ctrl.posts = posts.data;
              })
            }

            function addComment(post, comment) {
              console.log(comment);
                $http.post(`/api/posts/${post.id}/comments`, {
                  content: comment
                }).then(function(result) {
                  comment = null;
                  getPosts();
                });
            }

            function toggleForm() {
                ctrl.showForm = !ctrl.showForm
            }

            ctrl.upvote = function (post) {
              $http.post(`/api/posts/${post.id}/votes`, post).then(function(result) {
                  ctrl.posts[ctrl.posts.indexOf(post)].vote_count = result.data.vote_count;
                })
            }

            ctrl.downvote = function (post) {
              $http.delete(`/api/posts/${post.id}/votes`, post).then(function(result) {
                  ctrl.posts[ctrl.posts.indexOf(post)].vote_count = result.data.vote_count;
                })
            }

            controller.$inject = ['$state']

            function controller($state) {
              const vm = this

              vm.navigate = function (e) {
                e.preventDefault()
                $state.go('home')
              }
            }

        }
    })
    app.component('edit', {
        templateUrl: 'editpost.html',
        controller: function(moment, $http, $location, $state) {
            var ctrl = this;
            ctrl.posts;
            getPosts();
            ctrl.comments = [];
            ctrl.showPost = showPost;
            ctrl.toggleForm = toggleForm;
            ctrl.addComment = addComment;

            function showPost() {
                var id = $location.url().split('/')[2];
                $http.patch(`/api/posts/${id}`, {
                    title: ctrl.newPost.title,
                    body: ctrl.newPost.body,
                    author: ctrl.newPost.author,
                    image_url: ctrl.newPost.image,
                    vote_count: 0,
                    created_at: new Date()
                    }).then(function(result) {
                      ctrl.newPost.title = null;
                      ctrl.newPost.body = null;
                      ctrl.newPost.author = null;
                      ctrl.newPost.image = null;
                      ctrl.showForm = false;
                      $state.go('home');
                      // getPosts();
                    })
            }

            function getPosts() {
              $http.get("/api/posts").then(function(posts){
                ctrl.posts = posts.data;
              })
            }

            function addComment(post, comment) {
              console.log(comment);
                $http.post(`/api/posts/${post.id}/comments`, {
                  content: comment
                }).then(function(result) {
                  comment = null;
                  getPosts();
                });
            }

            function toggleForm() {
                ctrl.showForm = !ctrl.showForm
            }

            ctrl.upvote = function (post) {
              $http.post(`/api/posts/${post.id}/votes`, post).then(function(result) {
                  ctrl.posts[ctrl.posts.indexOf(post)].vote_count = result.data.vote_count;
                })
            }

            ctrl.downvote = function (post) {
              $http.delete(`/api/posts/${post.id}/votes`, post).then(function(result) {
                  ctrl.posts[ctrl.posts.indexOf(post)].vote_count = result.data.vote_count;
                })
            }

            controller.$inject = ['$state']

            function controller($state) {
              const vm = this

              vm.navigate = function (e) {
                e.preventDefault()
                $state.go('home')
              }
            }
        }
    });
