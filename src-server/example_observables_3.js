import Rx from 'rxjs/Rx';
import util from './lib/util';

// Built in methods!

// Interval & Timer
Rx.Observable
    .interval(500)
    .take(5)
    .subscribe(util.createSubscriber('Built in Interval'))

//Rx.Observable
//    .timer(1000, 500)
//    .subscribe(util.createSubscriber('Built in Timer'))


// Of is cool - takes multiple arguments as each next item
// this will not iterate over an array
Rx.Observable
    .of('HELLO WORLD', 42, 'Ballz', [1,2,3])
    .subscribe(util.createSubscriber('Observable.of'))


// From is like of, but takes an array to iterate over!
// this will work with generator functions also
Rx.Observable
    .from([1, 2, 3, 4])
    .subscribe(util.createSubscriber('Observable.from'))

// Mapping to multiply each by 5
Rx.Observable
    .from([10, 9, 8, 7])
    .map(i => i * 5)
    .subscribe(util.createSubscriber('Observable.from again'))


// Errors can be thrown
// Always create new Error to get the stack trace
// Errors can also be passed as next, but will not actually throw,
// so error handling is very flexible
Rx.Observable
    .throw(new Error('oh snap!'))
    .subscribe(util.createSubscriber('Throwing error'))


// You may not always not to throw an error, like this
Rx.Observable
    .of(new Error('Not throwing'))
    .subscribe(util.createSubscriber('NOT throwing error'))


// Empty completes and does nothing else (produces no items)
// Why? Can be useful because you are in an observable workflow,
// and sometimes you dont want to return anything,
// but you must return an observable
Rx.Observable
    .empty()
    .subscribe(util.createSubscriber('Empty'))


// Defer is like creating a custom observable, more abstract syntax
// Accepts a function that is invoked each time it's subscribed to
// To demonstrate, we increment a sideEffect and subscribe 3 times
let sideEffect = 0;
const defer$ = Rx.Observable.defer(() => {
    sideEffect++;
    return Rx.Observable.of(sideEffect);
});

defer$.subscribe(util.createSubscriber('defer.one'));
defer$.subscribe(util.createSubscriber('defer.two'));
defer$.subscribe(util.createSubscriber('defer.three'));


// Never produces no items, and never completes
// Why? This is like using empty, except it does not trigger 'complete'
// Sometimes you use observables to signal to other observables, and you
// might want to never signal that observable in a certain case
Rx.Observable
    .never()
    .subscribe(util.createSubscriber('Never'))

// Range gives you the range of numbers as each next
Rx.Observable
    .range(0, 10)
    .subscribe(util.createSubscriber('Range'))