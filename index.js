"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var slimscroll_directive_1 = require('./src/directives/slimscroll.directive');
__export(require('./src/classes/slimscroll-options.class'));
var SlimScrollModule = (function () {
    function SlimScrollModule() {
    }
    SlimScrollModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        slimscroll_directive_1.SlimScrollDirective
                    ],
                    exports: [
                        slimscroll_directive_1.SlimScrollDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    SlimScrollModule.ctorParameters = function () { return []; };
    return SlimScrollModule;
}());
exports.SlimScrollModule = SlimScrollModule;
