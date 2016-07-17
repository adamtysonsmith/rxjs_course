'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The observable takes a generator function
// that can call next(s), complete, or error
var simpleObs$ = _Rx2.default.Observable(function (observer) {
   console.log('Generating observable');
   setTimeout(function () {
      observer.next('Hit the next function...');
      setTimeout(function () {
         observer.next('Hit the second next function!');
         observer.complete();
      }, 1000);
   }, 1000);
});