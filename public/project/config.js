(function(){
    angular
        .module('ConcertFever')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/home',{
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkUserOrAnonymous
                }
            })
            .when('/login',{
            templateUrl: 'views/user/templates/login.view.client.html',
            controller: 'LoginController',
            controllerAs: 'model'
            })
            .when('/register',{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            }).when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            }).when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'AdminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            }).when('/admin/post', {
                templateUrl: 'views/admin/templates/admin-posts.view.client.html',
                controller: 'AdminPostsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            }).when('/activity', {
                templateUrl: 'views/user/templates/activity.view.client.html',
                controller: 'ActivityController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/search',{
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'SearchController',
                controllerAs: 'model'
            }).when('/following',{
                templateUrl: 'views/user/templates/following.view.client.html',
                controller: 'FollowingController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            }).when('/artist/:artistId/event',{
            templateUrl: 'views/event/templates/event-list.view.client.html',
            controller: 'EventListController',
            controllerAs: 'model',
            }).when('/artist/:artistId/event/:eventId',{
            templateUrl: 'views/event/templates/event-info.view.client.html',
            controller: 'EventInfoController',
            controllerAs: 'model',
            resolve: {
                currentUser: checkLoggedIn
            }
            }).when('/artist/:artistId/event/:eventId/post',{
            templateUrl: 'views/post/templates/post-new.view.client.html',
            controller: 'NewPostController',
            controllerAs: 'model',
            resolve: {
                currentUser: checkLoggedIn
            }
            }).when('/artist/:artistId/event/:eventId/post/:postId',{
            templateUrl: 'views/post/templates/post-edit.view.client.html',
            controller: 'EditPostController',
            controllerAs: 'model',
            resolve: {
                currentUser: checkLoggedIn
            }
            }).when('/myevents',{
            templateUrl: 'views/event/templates/my-events.view.client.html',
            controller: 'MyEventsController',
            controllerAs: 'model',
            resolve: {
                currentUser: checkLoggedIn
            }
            });

        function checkLoggedIn(UserService, $q, $location) {
            var deferred = $q.defer();

            UserService
                .loggedin()
                .then(function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url('/login');
                    } else {
                        deferred.resolve(user);
                    }
                });

            return deferred.promise;
        }
        function checkUserOrAnonymous(UserService, $q, $location) {
            var deferred = $q.defer();

            UserService
                .loggedin()
                .then(function (user) {
                    if(user === '0') {
                        /*deferred.reject();
                        $location.url('/login');*/
                        var user = {
                            anonymous:true
                        }
                        deferred.resolve(user)
                    } else {
                        user.anonymous = false
                        deferred.resolve(user);
                    }
                });

            return deferred.promise;
        }

        function checkAdmin(UserService, $q, $location) {
            var deferred = $q.defer();

            UserService
                .checkAdmin()
                .then(function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url('/home');
                    } else {
                        deferred.resolve(user);
                    }
                });

            return deferred.promise;
        }
    }
})();