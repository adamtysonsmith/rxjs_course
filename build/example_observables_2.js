'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var everySecond$ = _util2.default.createInterval(1000);

// Take operator will take the first 3 items, and then complete
var subscription$ = everySecond$.take(3).subscribe(_util2.default.createSubscriber('Unsubscribe Demo'));

setTimeout(function () {
    subscription$.unsubscribe();
}, 5000);