import { Component, OnInit, EventEmitter } from '@angular/core';
import { SlimScrollOptions, SlimScrollState, ISlimScrollState, SlimScrollEvent } from 'ngx-slimscroll';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  options: SlimScrollOptions;
  enableScroll = true;
  slimScrollState = new SlimScrollState();
  slimscrollEvents = new EventEmitter<SlimScrollEvent>();
  locked = false;

  constructor() {
    this.options = new SlimScrollOptions({
      barBackground: '#3E3F42',
      gridBackground: '#EFF1F5',
      barBorderRadius: '10',
      barWidth: '6',
      gridWidth: '4',
      gridMargin: '0 1px',
      alwaysVisible: true
    });
  }

  ngOnInit(): void {
    Promise.resolve()
      .then(() => this.timeout(500))
      .then(() => {
        const ev = new SlimScrollEvent({
          type: 'scrollTo',
          y: 1200,
          duration: 1000,
          easing: 'inOutQuart'
        });
        this.slimscrollEvents.emit(ev);
      });
  }

  scrollChanged($event: ISlimScrollState) {
    this.slimScrollState = $event;
  }

  toggleLock(): void {
    this.locked = !this.locked;
    this.slimscrollEvents.emit(new SlimScrollEvent({ type: this.locked ? 'lock' : 'unlock' }));
  }

  timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }
}
