import { Component } from '@angular/core';
import { ISlimScrollOptions } from './ngx-slimscroll/classes/slimscroll-options.class';
import { SlimScrollEvent } from './ngx-slimscroll/classes/slimscroll-event.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  options: ISlimScrollOptions;
  secondOptions: ISlimScrollOptions;

  constructor() {
    this.options = {
      barBackground: '#fcfcfc',
      gridBackground: '#f8f8f8',
      barBorderRadius: '10',
      barWidth: '6',
      gridWidth: '2'
    };
  }
}
