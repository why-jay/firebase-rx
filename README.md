# firebase-rx

This repo brings [this
Gist](https://gist.github.com/gsoltis/ee20138502a4764650f2) to npm.

## Usage

```JS
var FirebaseRx = require('firebase-rx');

var source =
  new FirebaseRx("https://<your firebase>.firebaseio.com")
    .observe('<event type>');

console.log(source instanceof Rx.Observable);

source.subscribe(function (changeData) {
  // If event type is 'value', changeData is a DataSnapshot
  // Otherwise, changeData is:
  // {
  //   snapshot: DataSnapshot, 
  //   prevName: optional string of previous child location
  // }
});
```
