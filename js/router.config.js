define(["jquery"], function($) {
    return {
        routes: [
            {
                url: "#/",
                element: $("#promo")
            },
            {
                url: "#/showcase",
                element: $("#main")
            },
            {
                url: "#/hall/:id",
                element: $("#hall")
            }
        ]
    };
});