(function(){
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'home.html'
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
            })
            .when('/website',{
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/new',{
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:wid',{
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:wid/page',{
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:wid/page/new',{
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            }).when('/website/:wid/page/:pid',{
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'model',
                resolve: {
                currentUser: checkLoggedIn
                }
            }).when('/website/:wid/page/:pid/widget',{
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            }).when('/website/:wid/page/:pid/widget/new',{
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            }).when('/website/:wid/page/:pid/widget/:wgid',{
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            }).when('/website/:wid/page/:pid/widget/:wgid/search',{
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

    }

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

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
})();