'use strict';

module.exports = function ($http, $q) {
    var BASE_URL = 'http://www.omdbapi.com/?',
        service  = {
            search          : search,
            getMovieById    : getMovieById
        };

    function search (query) {
        var dfr = $q.defer();

        $http
            .get(_getSearchURL(query))
            .then(function (response) {
                dfr.resolve(response.data.Search);
            });

        return dfr.promise;
    }

    function getMovieById (id) {
        var dfr = $q.defer();

        $http
            .get(_getMovieByIdURL(id))
            .then(function (response) {
                dfr.resolve(response.data);
            });

        return dfr.promise;
    }

    function _getSearchURL (query) {
        return BASE_URL + 's=' + query;
    }

    function _getMovieByIdURL (id) {
        return BASE_URL + 'i=' + id + '&plot=full';
    }

    return service;
};