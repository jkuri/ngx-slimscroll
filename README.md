# angular2-slimscroll

***angular2-slimscroll*** is a customizable scrollbar directive for Angular2.

## Demo

[http://jankuri.com/components/angular2-slimscroll](http://jankuri.com/components/angular2-slimscroll)

## Installation: 

```bash
npm i ng2-slimscroll
```

## Use Example:

```ts
import {Component} from 'angular2/core';
import {SlimScroll} from 'ng2-slimscroll';

@Component({
  template: `
    <div class="my-div" slimscroll background="#333" opacity="0.6" position="right" width="7px"></div>
  `,
  directives: [SlimScroll]
})

class App {
   
}
```

## Author

[Jan Kuri](http://www.jankuri.com)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
