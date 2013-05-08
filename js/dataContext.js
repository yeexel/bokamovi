define(["jquery", "ko", "dataService", "Model/model"], function($, ko, dataService, model) {

    var self = {};

    self.movies = [];
    self.cart = new model.Cart();

    self.preload = function (callback) {
        dataService.getMovies(function(dto) {
            self.movies = $.map(dto, function(movie) {
                return new model.Movie({
                    id: movie.id,
                    title: movie.title,
                    description: movie.description,
                    poster: movie.poster,
                    img1: movie.img1,
                    img2: movie.img2,
                    img3: movie.img3,
                    type: movie.type
                });
            });

            if (callback) {
                setTimeout(callback, 1000);
            }
        });
    };

    self.getMovies = function(callback) {
        callback(self.movies);
    };

    self.getCart = function(callback) {
        callback(self.cart.items);
    };

    self.addToCart = function(id, seatsBooked, callback) {
        for (var i = 0; i < self.movies.length; i++) {
            if (self.movies[i].id == id) {
                self.cart.items.push(self.movies[i]);
                self.movies[i].seatsBooked = seatsBooked;
            }
        }
        if (callback) {
                callback();
            }
    }

    self.getCachedMovieById = function (id) {
        for (var i = 0; i < self.movies.length; i++) {
            if (self.movies[i].id == id) {
                return self.movies[i];
            }
        }
    };

    self.getMovieById = function (id, callback) {
        if (callback) {
            callback(self.getCachedMovieById(id));
        }
    };

    return {
        preload: self.preload,
        getMovies: self.getMovies,
        getById: self.getMovieById,
        getCart: self.getCart,
        addToCart: self.addToCart
    };

});