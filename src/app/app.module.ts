import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSlimScrollModule } from './ngx-slimscroll/module/ngx-slimscroll.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgSlimScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
