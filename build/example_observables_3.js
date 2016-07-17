'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Built in methods!

// Interval & Timer
_Rx2.default.Observable.interval(500).take(5).subscribe(_util2.default.createSubscriber('Built in Interval'));

//Rx.Observable
//    .timer(1000, 500)
//    .subscribe(util.createSubscriber('Built in Timer'))

// Of is cool - takes multiple arguments as each next item
// this will not iterate over an array
_Rx2.default.Observable.of('HELLO WORLD', 42, 'Ballz', [1, 2, 3]).subscribe(_util2.default.createSubscriber('Observable.of'));

// From is like of, but takes an array to iterate over!
// this will work with generator functions also
_Rx2.default.Observable.from([1, 2, 3, 4]).subscribe(_util2.default.createSubscriber('Observable.from'));

// Mapping to multiply each by 5
_Rx2.default.Observable.from([10, 9, 8, 7]).map(function (i) {
    return i * 5;
}).subscribe(_util2.default.createSubscriber('Observable.from again'));

// Errors can be thrown
// Always create new Error to get the stack trace
// Errors can also be passed as next, but will not actually throw,
// so error handling is very flexible
_Rx2.default.Observable.throw(new Error('oh snap!')).subscribe(_util2.default.createSubscriber('Throwing error'));

// You may not always not to throw an error, like this
_Rx2.default.Observable.of(new Error('Not throwing')).subscribe(_util2.default.createSubscriber('NOT throwing error'));

// Empty completes and does nothing else (produces no items)
// Why? Can be useful because you are in an observable workflow,
// and sometimes you dont want to return anything,
// but you must return an observable
_Rx2.default.Observable.empty().subscribe(_util2.default.createSubscriber('Empty'));

// Defer is like creating a custom observable, more abstract syntax
// Accepts a function that is invoked each time it's subscribed to
// To demonstrate, we increment a sideEffect and subscribe 3 times
var sideEffect = 0;
var defer$ = _Rx2.default.Observable.defer(function () {
    sideEffect++;
    return _Rx2.default.Observable.of(sideEffect);
});

defer$.subscribe(_util2.default.createSubscriber('defer.one'));
defer$.subscribe(_util2.default.createSubscriber('defer.two'));
defer$.subscribe(_util2.default.createSubscriber('defer.three'));

// Never produces no items, and never completes
// Why? This is like using empty, except it does not trigger 'complete'
// Sometimes you use observables to signal to other observables, and you
// might want to never signal that observable in a certain case
_Rx2.default.Observable.never().subscribe(_util2.default.createSubscriber('Never'));

// Range gives you the range of numbers as each next
_Rx2.default.Observable.range(0, 10).subscribe(_util2.default.createSubscriber('Range'));