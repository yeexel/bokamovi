define(["jquery", "ko"], function($, ko) {

    var switchView = function(element, params) {
        $(".view").hide();
        var viewModel = ko.dataFor(element[0]);
        if (viewModel && $.isFunction(viewModel.initialize)) {
                viewModel.initialize(params, function() {
                    element.fadeIn('slow');
                });
            }
    };

    var cleanUp = function(url, element) {
        if (url !== "#/hall/:id") {
            var viewModel = ko.dataFor($("#hall")[0]);
            viewModel.reset(viewModel);
        }
    }

    return {
        switchView: switchView,
        cleanUp: cleanUp
    };

});