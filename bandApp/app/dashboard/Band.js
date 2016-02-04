var app;
(function (app) {
    var domain;
    (function (domain) {
        var Band = (function () {
            function Band() {
            }
            return Band;
        })();
        domain.Band = Band;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=Band.js.map