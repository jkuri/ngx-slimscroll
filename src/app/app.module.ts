import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSlimScrollModule, ISlimScrollOptions, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { AppComponent } from './app.component';

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
