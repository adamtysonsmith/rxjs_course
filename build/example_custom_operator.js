'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Lets write our own take operator, we will wrap the first observable into a new observable
// When this new observable is subscribed to, it will also subscribe to the base observable!

// We will rarely need to do this in the wild, but good to know how to write custom operator fns
// This operator will not be chainable unless it is added to the prototype of Rx.Observable or a subclass

// Steps to creating a custom operator:
// 1. Pass in the base observable
// 2. Return a new observable
// 3. Subscribe to the base observable, implement the next function
//    - The next function will be the 'transform' fn
//    - Also implement error, complete
// 4. Return an unsubscribe function from the new observable

// Basically the same as creating an observable, just wrapping the base
// Notice that our unsubscribe function here just unsubscribes from the base, easy!
function _myTake(baseObservable$, amount) {
    return new _Rx2.default.Observable(function (observer) {
        var count = 0;
        var subscription = baseObservable$.subscribe({
            next: function next(item) {
                count++;
                observer.next(item);
                if (count >= amount) observer.complete();
            },
            error: function error(err) {
                observer.error(err);
            },
            complete: function complete() {
                observer.complete();
            }
        });

        // our unsubscribe function actually unsubscribes from the base
        return function () {
            return subscription.unsubscribe();
        };
    });
}

// Now lets try it
var everyTwoSeconds$ = _util2.default.createInterval(2000);
var firstFiveItems$ = _myTake(everyTwoSeconds$, 5);
var subscription = firstFiveItems$.subscribe(_util2.default.createSubscriber('Custom Take'));