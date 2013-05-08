define(function() {

    var Movie = function(spec) {

        var self = {
            id: spec.id,
            title: spec.title,
            description: spec.description,
            poster: spec.poster,
            img1: spec.img1,
            img2: spec.img2,
            img3: spec.img3,
            type: spec.type
        };

        return self;

    };

    return Movie;

});