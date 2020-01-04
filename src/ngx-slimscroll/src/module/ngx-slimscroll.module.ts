import { NgModule } from '@angular/core';
import { SlimScrollDirective } from '../directives/slimscroll.directive';

@NgModule({
  declarations: [
    SlimScrollDirective
  ],
  exports: [
    SlimScrollDirective
  ]
})
export class NgSlimScrollModule { }
