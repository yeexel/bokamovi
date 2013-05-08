define('jquery', [], function () { return window.jQuery; });
define('sammy', [], function () { return window.Sammy; });
define('ko', [], function () { return window.ko; });
define('amplify', [], function () { return window.amplify; });

require(["app"], function(app) {

    app.initialize();

});