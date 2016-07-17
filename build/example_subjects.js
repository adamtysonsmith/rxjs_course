'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Subjects are another Rx class that is like an observable and subscription
// You can produce values like an observable, and also subscribe
var subject$ = new _Rx2.default.Subject();

subject$.subscribe((0, _util.createSubscriber)('Subject Example'));

// You can control the next, error, complete functions
subject$.next('Hello there...');
subject$.next('..sexy.');
subject$.complete();

// Another example
var interval$ = _Rx2.default.Observable.interval(1000).take(5);
var intervalProxy$ = new _Rx2.default.Subject();

// Our initial observable is subscribing to the subject,
// which will act as a proxy
// You will see that interval$ is subscribed to just ONCE
// and the other subscribers on the subject are sharing the interval stream
interval$.subscribe(intervalProxy$);

intervalProxy$.subscribe((0, _util.createSubscriber)('First'));
intervalProxy$.subscribe((0, _util.createSubscriber)('Second'));
intervalProxy$.subscribe((0, _util.createSubscriber)('Third'));

setTimeout(function () {
   intervalProxy$.subscribe((0, _util.createSubscriber)('Check me out!'));
}, 3000);

// @todo Rx.BehaviorSubject()
// @todo Rx.ReplaySubject()
// @todo Rx.AsyncSubject()