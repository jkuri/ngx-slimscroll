import { NgModule } from '@angular/core';
import { SlimScrollDirective } from './src/directives/slimscroll.directive';

@NgModule({
  declarations: [
    SlimScrollDirective
  ],
  exports: [
    SlimScrollDirective
  ]
})
export class SlimScrollModule { }

export { ISlimScrollOptions, SlimScrollOptions } from './src/directives/slimscroll.directive';
