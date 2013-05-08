define(["dataContext", "router", "binder", "presenter"], function(dataContext, router, binder, presenter) {
    var
        initialize = function() {
            dataContext.preload(function() {
                binder.run();
                router.run();
            });
        };

    return {
        initialize: initialize
    };
});