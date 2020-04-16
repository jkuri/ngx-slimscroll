import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSlimScrollModule } from '../ngx-slimscroll/src/module/ngx-slimscroll.module';

import { AppComponent } from './app.component';
import {ISlimScrollOptions, SLIMSCROLL_DEFAULTS} from '../ngx-slimscroll/src/classes/slimscroll-options.class';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgSlimScrollModule
  ],
  providers: [
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible: false
      } as ISlimScrollOptions
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
