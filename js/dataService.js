define(["jquery"], function() {

    return {

        getMovies: function (callback) {
            $.getJSON('./data.json')
                .done(function (response) {
                    callback(response);
                })
                .fail(function (response) {
                    throw Error('Unable to load data');
                });
        }
    };

});