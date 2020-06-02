# ngx-slimscroll

[![AbstruseCI](https://ci.bleenco.io/badge/9)](https://ci.bleenco.io/badge/9)

***ngx-slimscroll*** is a customizable scrollbar directive for Angular2+.

Make scrollbar looks identical in any browser and any os.

## Demo

[http://ngx-slimscroll.jankuri.com](http://ngx-slimscroll.jankuri.com)

## Run Demo Locally

```sh
git clone https://github.com/jkuri/ngx-slimscroll.git
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
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgSlimScrollModule
  ],
  providers: [
    // OPTIONAL : provide default global settings which will be merge with component options.
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible : false
      } as ISlimScrollOptions
    },
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
export class AppComponent implements OnInit {
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  ngOnInit() {
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      position?: 'left' | 'right';
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
      scrollSensitivity?: number; // 1
      alwaysPreventDefaultScroll?: boolean; // true
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
<div class="scroll-window" slimScroll [options]="opts" [scrollEvents]="scrollEvents">
  <p>Long content</p>
</div>
```

## Disabling the scrollbar directive

There is an input of the directive `enabled` defaults to `true`. Some users may want to control the scrollbar availability by some external condition. You can use the `enabled` input.

```html
<div class="scroll-window" slimScroll [enabled]="externalCondition" [options]="opts">
  <p>Long content</p>
</div>
```

## Options

```ts
export interface ISlimScrollOptions {
  position?: 'left' | 'right';
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
  alwaysPreventDefaultScroll?: boolean;
}
```
**Description:**
- `position`: The position of the scroll bar (default: `right`).
- `barBackground`: The background color of the scroll bar (default: `#343a40`).
- `barOpacity`: Defines the opacity of the scroll bar (default: `1`).
- `barWidth`: Customize the width of the scroll bar (default: `12` px).
- `barBorderRadius`: The border radius of the scroll bar (default: `5` px).
- `barMargin`: The margin of the scroll bar. Supports the CSS-Style spelling (default: `1px 0`).
- `gridBackground`: The background color of the grid (the line on which the scroll bar is arranged; default: `#adb5bd`).
- `gridOpacity`: The opacity of the grid (default: `1`).
- `gridWidth`: The width of the grid (default: `8` px).
- `gridBorderRadius`: The border radius of the grid (default: `10` px).
- `gridMargin`: The margin of the grid. Supports the CSS-Style spelling (default: `1px 2px`).
- `alwaysVisible`: If this option is enabled the scroll bar is displayed permanently, otherwise it will be faded out after the visible timeout (default: `true`).
- `visibleTimeout`: Represents the time the scroll bar is shown (default: `1000` ms). ***Hint**: It is necessary to set the option `alwaysVisible` to `false`*.
- `alwaysPreventDefaultScroll`: Disable this flag to forward the scroll event if top or bottom of the slimscroll container is reached (default: `true`)

## Global Default Options

You can provide global default options. You achieve this by defining a provider in your AppModule using `SCRIMSCROLL_DEFAULTS` [injection token](https://angular.io/guide/dependency-injection#ngmodule-providers).

Example:

```typescript
@NgModule({
  // Omitted for brevity
  providers: [
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible: false,
        gridOpacity: '0.2',
        barOpacity: '0.5',
        gridBackground: '#c2c2c2',
        gridWidth: '6',
        gridMargin: '2px 2px',
        barBackground: '#2C3E50',
        barWidth: '6',
        barMargin: '2px 2px'
      } as ISlimScrollOptions
    }
   // other providers
   ]
  ]
})
export class AppModule { }
```

## SlimScroll Event

```ts
export interface ISlimScrollEvent {
  type: 'scrollToBottom' | 'scrollToTop' | 'scrollToPercent' | 'scrollTo' | 'recalculate';
  y?: number;
  duration?: number;
  easing?: 'linear' | 'inQuad' | 'outQuad' | 'inOutQuad' | 'inCubic' | 'outCubic' | 'inOutCubic' |
  'inQuart' | 'outQuart' | 'inOutQuart' | 'inQuint' | 'outQuint' | 'inOutQuint';
}
```

And you could be notified for the visibility change event of the scrollbar via `barVisibilityChange`.
`true` for being visible, `false` for being invisible. For example:

```html
<div slimscoll (barVisibilityChange)="doSomething($event)"></div>
```

## Tests

```sh
npm test
```

## Author

[Jan Kuri](http://www.jankuri.com)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
