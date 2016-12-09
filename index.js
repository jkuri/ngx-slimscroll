import { NgModule } from '@angular/core';
import { SlimScrollDirective } from './src/directives/slimscroll.directive';
export * from './src/classes/slimscroll-options.class';
export var SlimScrollModule = (function () {
    function SlimScrollModule() {
    }
    SlimScrollModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SlimScrollDirective
                    ],
                    exports: [
                        SlimScrollDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    SlimScrollModule.ctorParameters = function () { return []; };
    return SlimScrollModule;
}());
