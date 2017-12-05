import { SlimScrollService } from './ngx-slimscroll/services/slim-scroll.service';
import { Component, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ISlimScrollOptions } from './ngx-slimscroll/classes/slimscroll-options.class';
import { SlimScrollEvent } from './ngx-slimscroll/classes/slimscroll-event.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  options: ISlimScrollOptions;
  secondOptions: ISlimScrollOptions;
  thirdOptions: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  constructor(
    private elementRef: ElementRef,
    private slimScrollService: SlimScrollService
  ) {
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

    this.thirdOptions = {
      barBackground: '#000',
      gridBackground: '#DDDDDD',
      barBorderRadius: '10',
      barWidth: '5',
      gridWidth: '2'
    };

    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
  }

  ngOnInit() {
    this.play();

    this.startService();
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

  startService() {
    const scrollElem = this.elementRef.nativeElement.querySelector('#service-scroll');
    if (scrollElem != null) {
      this.slimScrollService.init(scrollElem, this.thirdOptions);
    }
  }
}
