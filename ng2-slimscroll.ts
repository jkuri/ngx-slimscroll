import { NgModule } from '@angular/core';
import { SlimScroll } from './src/directives/slimscroll.directive';

export * from './src/directives/slimscroll.directive';

@NgModule({
  declarations: [SlimScroll],
  exports: [SlimScroll]
})
export class SlimScrollModule { }
