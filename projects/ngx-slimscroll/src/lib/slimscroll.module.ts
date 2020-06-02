import { NgModule } from '@angular/core';
import { SlimScrollDirective } from './slimscroll.directive';

@NgModule({
  declarations: [
    SlimScrollDirective
  ],
  exports: [
    SlimScrollDirective
  ]
})
export class NgSlimScrollModule { }
