'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The observable constructor takes a generator function
// that can call next(s), complete, or error

// Observables are lazy, they do not invoke the generator function
// until the observable is subscribed to
var simpleObs$ = new _Rx2.default.Observable(function (observer) {
    console.log('Generating observable');

    _timeout('First Timeout: ', function () {
        observer.next('Hit the first next function at ' + Date.now());
        _timeout('Second Timeout', function () {
            observer.next('Hit the second next function at ' + Date.now());
            //           observer.error(new Error('ERMAGHERD'))
            observer.complete();
        });
    });
});

function _timeout(message, cb) {
    setTimeout(function () {
        console.log(message);
        cb();
    }, 1000);
}

// The subscriber can take three functions:
// next cb, error cb, complete cb
// only next function is requuired

// The purpose of the subscription is to execute the code on each next item,
// handle errors, and notify you when complete.  The subscription causes
// side effects, but in a way that is easy to manage the side effects
simpleObs$.subscribe(next, error, complete);

function next(item) {
    console.log('Subscribing to the next item---', item);
}

function error(err) {
    console.log('Subscribing to the error---', err);
}

function complete() {
    console.log('Subcribing to complete event!');
}

// alternative subscribe syntax, pass object
// this one is destructured

// The timeout logs will run in parallel when two subscriptions are created
// You can optionally run them sequentially if you need to (next lesson)
simpleObs$.subscribe({
    next: next,
    error: error,
    complete: complete
});