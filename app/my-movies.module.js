'use strict';

var angular = require('angular'),
    router  = require('angular-ui-router');

angular.module('MyMovies', [ 'ui.router' ]);

angular
    .module('MyMovies')
    .config(require('./routes.config'))
    // Controllers.
    .controller('AppController',            require('./controllers/app.controller'))
    .controller('MainNavController',        require('./controllers/main-nav.controller'))
    .controller('DashboardController',      require('./controllers/dashboard.controller'))
    .controller('SearchController',         require('./controllers/search.controller'))
    .controller('WatchlistController',      require('./controllers/watchlist.controller'))
    .controller('MovieDetailsController',   require('./controllers/moviedetails.controller'))
    // Factories
    .factory(   'OMDBService',              require('./factories/omdb.factory'))
    .factory(   'WatchlistService',         require('./factories/watchlist.factory'))
    // Directives
    .directive( 'watchlist',                require('./directives/watchlist.directive'));