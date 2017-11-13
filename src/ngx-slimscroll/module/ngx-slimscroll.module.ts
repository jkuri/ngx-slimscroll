import {ModuleWithProviders, NgModule} from '@angular/core';
import {SLIM_SCROLL_GOLBAL_CONFIG, SlimScrollDirective} from '../directives/slimscroll.directive';
import {SlimScrollOptions} from '../classes/slimscroll-options.class';

@NgModule({
  declarations: [
    SlimScrollDirective
  ],
  exports: [
    SlimScrollDirective
  ]
})
export class NgSlimScrollModule {

  static withGlobalConfig(options: SlimScrollOptions): ModuleWithProviders {
    return {
      ngModule: NgSlimScrollModule,
      providers: [
          {provide: SLIM_SCROLL_GOLBAL_CONFIG, useValue: options}
      ]
    };
  }
}
