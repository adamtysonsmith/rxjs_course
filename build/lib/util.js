'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    createSubscriber: createSubscriber,
    createInterval: createInterval
};

function createSubscriber(tag) {
    return {
        next: function next(item) {
            console.log(tag + '.next ' + item);
        },
        error: function error(_error) {
            console.log(tag + '.error ' + (_error.stack || _error));
        },
        complete: function complete() {
            console.log(tag + '.complete');
        }
    };
}

function createInterval(time) {
    return new _Rx2.default.Observable(function (observer) {
        var index = 0;
        var interval = setInterval(function () {
            console.log('Generating Interval ' + index);
            observer.next(index++);
        }, time);

        // In order to implement unsubscribe functionality for our subscribers,
        // we must return an unsubscribe function from the observable
        return function () {
            clearInterval(interval);
        };
    });
}