define(["jquery", "ko", "dataContext", "router"], function($, ko, dataContext, router) {

    var MoviesViewModel = function() {

        var self = this;

        self.movies = ko.observableArray([]);
        self.items = ko.observableArray([]);

        self.filter = ko.observable('');

        self.timeType = ['now', 'soon'];

        self.initialize = function (params, callback) {
            self.movies([]);
            dataContext.getMovies(function(movies) {
                self.movies(movies);
                if ($.isFunction(callback)) {
                    callback();
                }
            });
            self.items([]);
            dataContext.getCart(function(items) {
                self.items(items);
                if ($.isFunction(callback)) {
                    callback();
                }
            });
        };

        self.del = function(item) {
            self.items.remove(item);
        };

        self.timeFilter = ko.computed(function () {
            var result = [];
            $.each(self.timeType, function (i, v) {
                result.push({
                    type: v,
                    isSelected: ko.observable(true)
                });
            });
            return result;
        });

        self.filteredMovies = ko.computed(function() {

            var filter = self.filter().toLowerCase();
                return ko.utils.arrayFilter(self.movies(), function(movie) {
                    var result = movie.title.toLowerCase().indexOf(filter) != -1 || !filter;
                    $.each(self.timeFilter(), function (i, v) {
                        if (v.type == movie.type && !v.isSelected()) {
                            result = false;
                        }
                    });
                    return result;
                });
        });

        self.save = function() {
            var dataToSave = $.map(self.items(), function(item) {
                return item ? { id: item.id, movieTitle: item.title, seatsBooked: item.seatsBooked } : undefined;
            });

            alert("Could now send this to server: " + JSON.stringify(dataToSave));
            router.navigate("#/");
            self.items.removeAll();
            self.filter('');
        };

        return {
            initialize: self.initialize,
            movies: self.movies,
            items: self.items,
            timeFilter: self.timeFilter,
            filteredMovies: self.filteredMovies,
            filter: self.filter,
            del: self.del,
            save: self.save
        };

    };

    return MoviesViewModel;

});