define(["jquery", "sammy", "amplify", "presenter", "router.config"], function ($, Sammy, amplify, presenter, config) {
    var
        lastUrlStorageKey = "LAST_URL",
        sammy = new Sammy.Application(function () {
            //this.debug = true;
        }),
        run = function () {
            $.each(config.routes, function (i, route) {
                sammy.get(route.url, function (context) {
                    amplify.store(lastUrlStorageKey, context.path);
                    presenter.switchView(route.element, context.params);
                    presenter.cleanUp(route.url, route.element);
                    if (route.url == '#/') {
                        $("#promo").fadeIn();
                    }
                });
            });

            sammy.run(amplify.store(lastUrlStorageKey) || '#/');
        },
        navigate = function (url) {
            sammy.setLocation(url);
        };

    return {
        run: run,
        navigate: navigate
    };
});