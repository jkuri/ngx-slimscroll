# ngx-slimscroll

***ngx-slimscroll*** is a customizable scrollbar directive for Angular2+.

Make scrollbar looks identical in any browser and any os.

## Demo

[http://ngx-slimscroll.jankuri.com](http://ngx-slimscroll.jankuri.com)

## Run Demo Locally

```sh
git clone https://github.com/jkuri/ngx-uploader.git
npm install
npm start
```

## Installation:

```bash
npm install ngx-slimscroll
```

## Use Example:

```ts
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SlimScrollModule } from 'ngx-slimscroll';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SlimScrollModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

// app.component.ts
import { AppComponent, OnInit, EventEmitter } from '@angular/core';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

@Component({
  selector: 'app-root',
  template: `<div slimScroll [options]="opts" [scrollEvents]="scrollEvents"></div>`
})
export class AppComponent imlements OnInit {
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  ngOnInit() {
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      position?: string; // left | right
      barBackground?: string; // #C9C9C9
      barOpacity?: string; // 0.8
      barWidth?: string; // 10
      barBorderRadius?: string; // 20
      barMargin?: string; // 0
      gridBackground?: string; // #D9D9D9
      gridOpacity?: string; // 1
      gridWidth?: string; // 2
      gridBorderRadius?: string; // 20
      gridMargin?: string; // 0
      alwaysVisible?: boolean; // true
      visibleTimeout?: number; // 1000
    }

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

// app.component.html
<div class="scroll-window" slimScroll [options]="options" [scrollEvents]="scrollEvents">
  <p>Long content</p>
</div>
```

## Options

```ts
export interface ISlimScrollOptions {
  position?: string;
  barBackground?: string;
  barOpacity?: string;
  barWidth?: string;
  barBorderRadius?: string;
  barMargin?: string;
  gridBackground?: string;
  gridOpacity?: string;
  gridWidth?: string;
  gridBorderRadius?: string;
  gridMargin?: string;
  alwaysVisible?: boolean;
  visibleTimeout?: number;
}
```

## SlimScroll Event

```ts
export interface ISlimScrollEvent {
  type: 'scrollToBottom' | 'scrollToTop' | 'scrollToPercent' | 'scrollTo';
  y?: number;
  duration?: number;
  easing?: 'linear' | 'inQuad' | 'outQuad' | 'inOutQuad' | 'inCubic' | 'outCubic' | 'inOutCubic' |
  'inQuart' | 'outQuart' | 'inOutQuart' | 'inQuint' | 'outQuint' | 'inOutQuint';
}
```

## Author

[Jan Kuri](http://www.jankuri.com)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
