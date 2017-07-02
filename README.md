# ngx-slimscroll

***ngx-slimscroll*** is a customizable scrollbar directive for Angular2.

Make scrollbar looks identical in any browser and any os.

## Demo

[http://ngx-slimscroll.jankuri.com](http://ngx-slimscroll.jankuri.com)

## Run Demo locally

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
import { AppComponent, OnInit } from '@angular/core';
import { ISlimScrollOptions } from 'ngx-slimscroll';

@Component({
  selector: 'app-root',
  template: `<div slimScroll [options]="opts"></div>`
})
export class AppComponent imlements OnInit {
  opts: ISlimScrollOptions;

  ngOnInit() {
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
  }
}
```

## Author

[Jan Kuri](http://www.jankuri.com)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
