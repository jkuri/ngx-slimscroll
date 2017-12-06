import { NgModule } from '@angular/core';
import { SlimScrollDirective } from '../directives/slimscroll.directive';
import { SlimScrollService } from './../services/slim-scroll.service';

@NgModule({
  declarations: [
    SlimScrollDirective
  ],
  providers: [
    SlimScrollService
  ],
  exports: [
    SlimScrollDirective
  ]
})
export class NgSlimScrollModule {
  constructor(public slimScrollerService: SlimScrollService) { }
}
