'use strict';

var _ = require('lodash');

module.exports = function ($window, $q) {
    var STORAGE_KEY = 'mymovies';

    if (!_getStore()) {
        _initStore();
    }

    var service  = {
        getWatchlist        : getWatchlist,
        addToWatchlist      : addToWatchlist,
        removeFromWatchlist : removeFromWatchlist,
        isInWatchlist       : isInWatchlist
    };

    function getWatchlist () {
        // Although local storage access is synchronous, we'll implement
        // promise-based access (asynchronous). This will make it easier
        // to use an external data store afterwards, as the remaining
        // application code already supports asynchronous flows.
        var dfr     = $q.defer(),
            store   = _getStore();

        dfr.resolve(store);

        return dfr.promise;
    }

    function addToWatchlist (movie) {
        var now     = new Date(),
            store   = _getStore();

        movie.added = now;
        store.updated = now;

        if ( !isInWatchlist(movie.IMDBId) ) {
            store.list.push(movie);
    
            _syncStore(store);
        }
    }

    function removeFromWatchlist (IMDBId) {
        var store = _getStore();

        _.remove(store.list, { imdbID : IMDBId });
        
        _syncStore(store);
    }

    function isInWatchlist (IMDBId) {
        var store = _getStore();
        return _.some(store.list, { imdbID : IMDBId });
    }

    function _initStore () {
        var store = {
            updated : new Date(),
            list    : []
        };

        _syncStore(store);
    }

    function _getStore () {
        var store;

        try {
            store = JSON.parse( $window.localStorage.getItem(STORAGE_KEY) );
        } catch (e) {
            store = false;
        }

        return store;
    }

    function _syncStore (store) {
        $window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }
    
    return service;
};