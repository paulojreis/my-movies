'use strict';

module.exports = function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('dashboard', {
            url: '/',
            views: {
                header:     { templateUrl: 'views/main-nav.html',       controller: 'MainNavController',        controllerAs: 'mainNavVM' },
                content:    { templateUrl: 'views/dashboard.html',      controller: 'DashboardController',      controllerAs: 'dashboardVM' }
            }
        })
        .state('search', {
            url: '/search/',
             params: {
                query: null,
            },
            views: {
                header:     { templateUrl: 'views/main-nav.html',       controller: 'MainNavController',        controllerAs: 'mainNavVM' },
                content:    { templateUrl: 'views/search.html',         controller: 'SearchController',         controllerAs: 'searchVM' }
            }
        })
        .state('watchlist', {
            url: '/watchlist/',
            views: {
                header:     { templateUrl: 'views/main-nav.html',       controller: 'MainNavController',        controllerAs: 'mainNavVM' },
                content:    { templateUrl: 'views/watchlist.html',      controller: 'WatchlistController',      controllerAs: 'watchlistVM' }
            }
        })
        .state('movie', {
            url: '/movie/:IMDBId',
            views: {
                header:     { templateUrl: 'views/main-nav.html',       controller: 'MainNavController',        controllerAs: 'mainNavVM' },
                content:    { templateUrl: 'views/movie-details.html',  controller: 'MovieDetailsController',   controllerAs: 'movieDetailsVM' }
            }
        });
};