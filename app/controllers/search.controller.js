'use strict';

/*@ngInject*/
module.exports = function ($stateParams, OMDBService, WatchlistService) {
    var searchVM = this;

    searchVM.query = $stateParams.query ? $stateParams.query : '';
    searchVM.results = [];

    searchVM.queryChanged = function () {
        searchVM.results = [];
        
        if (searchVM.query && searchVM.query.length > 2) {
            OMDBService
                .search(searchVM.query)
                .then(function (results) {
                    searchVM.results = results;
                });
        }
    };

    searchVM.addToWatchlist = function (IMDBId) {
        OMDBService
            .getMovieById(IMDBId)
            .then(function (movie) {
                WatchlistService.addToWatchlist(movie);
            });
    };

    searchVM.removeFromWatchlist = function (IMDBId) {
        WatchlistService.removeFromWatchlist(IMDBId);
    };

    searchVM.isInWatchlist = function (IMDBId) {
        return WatchlistService.isInWatchlist(IMDBId);
    };
    
    searchVM.queryChanged();
};