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
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SlimScrollModule } from 'ngx-slimscroll';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
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
      position: 'right',
      barBackground: '#000000',
      ... // check ISlimScrollOptions for all options
    }
  }
}
```

## Author

[Jan Kuri](http://www.jankuri.com)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
