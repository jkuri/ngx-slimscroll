import { Component, EventEmitter, OnInit } from '@angular/core';
import { ISlimScrollOptions } from '../../ngx-slimscroll/classes/slimscroll-options.class';
import { SlimScrollEvent } from '../../ngx-slimscroll/classes/slimscroll-event.class';

@Component({
  selector: 'app-home',
  templateUrl: 'app-home.component.html'
})
export class AppHomeComponent implements OnInit {
  options: ISlimScrollOptions;
  secondOptions: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  constructor() {
    this.options = {
      barBackground: '#C9C9C9',
      gridBackground: '#D9D9D9',
      barBorderRadius: '10',
      barWidth: '6',
      gridWidth: '2'
    };

    this.secondOptions = {
      barBackground: '#000',
      gridBackground: '#DDDDDD',
      barBorderRadius: '0',
      barWidth: '3',
      gridWidth: '3',
      barMargin: '0',
      gridMargin: '0'
    };

    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
  }

  ngOnInit() {
    this.play();
  }

  play(): void {
    let event = null;

    Promise.resolve()
      .then(() => this.timeout(3000))
      .then(() => {
        event = new SlimScrollEvent({
          type: 'scrollToBottom',
          duration: 2000,
          easing: 'inOutQuad'
        });

        this.scrollEvents.emit(event);
      })
      .then(() => this.timeout(3000))
      .then(() => {
        event = new SlimScrollEvent({
          type: 'scrollToTop',
          duration: 3000,
          easing: 'outCubic'
        });

        this.scrollEvents.emit(event);
      })
      .then(() => this.timeout(4000))
      .then(() => {
        event = new SlimScrollEvent({
          type: 'scrollToPercent',
          percent: 80,
          duration: 1000,
          easing: 'linear'
        });

        this.scrollEvents.emit(event);
      })
      .then(() => this.timeout(2000))
      .then(() => {
        event = new SlimScrollEvent({
          type: 'scrollTo',
          y: 200,
          duration: 4000,
          easing: 'inOutQuint'
        });

        this.scrollEvents.emit(event);
      });
  }

  timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }
}
