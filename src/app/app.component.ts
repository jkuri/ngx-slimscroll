import { Component } from '@angular/core';
import { ISlimScrollOptions } from '../ngx-slimscroll/src/classes/slimscroll-options.class';
import { SlimScrollState, ISlimScrollState } from '../ngx-slimscroll/src/classes/slimscroll-state.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  options: ISlimScrollOptions;
  secondOptions: ISlimScrollOptions;
  enableScroll = true;
  slimScrollState = new SlimScrollState();

  constructor() {
    this.options = {
      barBackground: '#fcfcfc',
      gridBackground: '#f8f8f8',
      barBorderRadius: '10',
      barWidth: '6',
      gridWidth: '2',
      alwaysVisible: true
    };
  }

  scrollChanged($event: ISlimScrollState) {
    this.slimScrollState = $event;
  }
}
