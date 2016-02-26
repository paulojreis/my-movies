'use strict';

/*@ngInject*/
module.exports = function ($state, $stateParams, OMDBService, WatchlistService) {
    var movieDetailsVM = this;

    movieDetailsVM.IMDBId = $stateParams.IMDBId;

    if (!movieDetailsVM.IMDBId) {
        $state.go('dashboard');
    }
    
    movieDetailsVM.isInWatchlist = WatchlistService.isInWatchlist(movieDetailsVM.IMDBId);

    movieDetailsVM.addToWatchlist = function () {
        WatchlistService.addToWatchlist(movieDetailsVM.movie);
        movieDetailsVM.isInWatchlist = true;
    };

    movieDetailsVM.removeFromWatchlist = function () {
        WatchlistService.removeFromWatchlist(movieDetailsVM.IMDBId);
        movieDetailsVM.isInWatchlist = false;
    };

    OMDBService
        .getMovieById(movieDetailsVM.IMDBId)
        .then(function (details) {
            movieDetailsVM.movie = details;
        });

};