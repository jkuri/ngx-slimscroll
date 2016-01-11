# ng2-slimscroll

***ng2-slimscroll*** is a customizable scrollbar directive for Angular2.

Make scrollbar looks identical in any browser and any os.

## Demo

[http://jankuri.com/components/angular2-slimscroll](http://jankuri.com/components/angular2-slimscroll)

## Installation: 

```bash
npm install ng2-slimscroll
```

If you are using SystemJS, you can map to ng2-slimscroll in your configuration.

```html
<!-- index.html -->
<script>
  SystemJS.config({
    map: {
      "ng2-slimscroll": "node_modules/ng2-slimscroll/ng2-slimscroll.js"
    }
  });
</script>
```

## Use Example:

```ts
import {Component} from 'angular2/core';
import {SlimScroll} from 'ng2-slimscroll';

@Component({
  template: `
    <div slimscroll 
         background="#333" 
         opacity="0.6" 
         position="right" 
         width="7px"
         border-radius="5px">
      Long scrollable content ...
    </div>
  `,
  directives: [SlimScroll]
})

class App { }
```

## Author

[Jan Kuri](http://www.jankuri.com)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
