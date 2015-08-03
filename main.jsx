import Firebase from 'firebase';
import Rx from 'rx';

function makeCallback(eventType, observer) {
  if (eventType === 'value') {
    return function(snap) {
      observer.onNext(snap);
    };
  } else {
    return function(snap, prevName) {
      // Wrap into an object, since we can only pass one argument through.
      observer.onNext({snapshot: snap, prevName: prevName});
    }
  }
}

export default class FirebaseRx extends Firebase {
  observe(eventType) {
    const query = this;
    return Rx.Observable.create(observer => {
      const listener = query.on(
        eventType,
        makeCallback(eventType, observer),
          err => observer.onError(err)
      );
      return function () {
        query.off(eventType, listener);
      }
    }).publish().refCount();
  }
}
