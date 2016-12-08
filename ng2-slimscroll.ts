import { NgModule } from '@angular/core';
import { SlimScrollDirective } from './src/directives/slimscroll.directive';

export * from './src/directives/slimscroll.directive';

@NgModule({
  declarations: [SlimScrollDirective],
  exports: [SlimScrollDirective]
})
export class SlimScrollModule { }

