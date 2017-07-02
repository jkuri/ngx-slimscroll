import { Component, EventEmitter } from '@angular/core';
import { ISlimScrollOptions } from '../../ngx-slimscroll/classes/slimscroll-options.class';

@Component({
  selector: 'app-home',
  templateUrl: 'app-home.component.html'
})
export class AppHomeComponent {
  options: ISlimScrollOptions;
  imageOptions: ISlimScrollOptions;

  constructor() {
    this.options = {
      barBackground: '#C9C9C9',
      gridBackground: '#D9D9D9',
      barBorderRadius: '10',
      barWidth: '6',
      gridWidth: '2'
    };

    this.imageOptions = {
      barBackground: '#C9C9C9',
      gridBackground: '#D9D9D9',
      barBorderRadius: '10',
      barWidth: '6',
      gridWidth: '2',
      alwaysVisible: false
    };
  }
}
