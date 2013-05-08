define(["jquery", "ko", "viewModel/viewModel"], function($, ko, viewModel) {

    var run = function() {
        ko.applyBindings(new viewModel.MoviesViewModel(), $("#main")[0]);
        ko.applyBindings(new viewModel.HallViewModel(), $("#hall")[0]);    
    };

    return {
        run: run
    };

});