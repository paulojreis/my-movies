'use strict';

var angular = require('angular');

module.exports = function () {
    return {
        restrict: 'E',
        transclude: true,
        controller: watchlistController,
        controllerAs: 'watchlistDirVM',
        bindToController: {
            limit: '<',
            filter: '<'
        },
        templateUrl: './directives/watchlist.tpl.html'
    };

    /*@ngInject*/
    function watchlistController ($scope, $element, $attrs, $transclude, WatchlistService) {
        var watchlistDirVM = this;

        watchlistDirVM.rawlist = [];
        watchlistDirVM.viewList = [];

        WatchlistService
            .getWatchlist()
            .then(function function_name (watchlist) {
                watchlistDirVM.rawlist = watchlist.list;

                angular.copy(watchlistDirVM.rawlist, watchlistDirVM.viewList);
            });

        watchlistDirVM.removeFromWatchlist = function (IMDBId) {
            WatchlistService.removeFromWatchlist(IMDBId);
            
            WatchlistService
                .getWatchlist()
                .then(function function_name (watchlist) {
                    watchlistDirVM.rawlist = watchlist.list;

                    angular.copy(watchlistDirVM.rawlist, watchlistDirVM.viewList);
                });
        };
    }
};