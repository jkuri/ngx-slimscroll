import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSlimScrollModule } from './ngx-slimscroll/module/ngx-slimscroll.module';

import { AppComponent } from './app.component';
import { SlimScrollOptions, SLIMSCROLL_DEFAULTS } from '../public_api';

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
        alwaysVisible : false
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
