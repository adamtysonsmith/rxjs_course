import Rx from 'rxjs/Rx';
import util from './lib/util';


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
    return new Rx.Observable(observer => {
        let count = 0;
        const subscription = baseObservable$.subscribe({
            next(item) { 
                count++;
                observer.next(item);
                if (count >= amount) observer.complete();
            },
            error(err) { observer.error(err) },
            complete() { observer.complete() }
        });
        
        // our unsubscribe function actually unsubscribes from the base
        return () => subscription.unsubscribe();
    });
}

// Now lets try it
const everyTwoSeconds$ = util.createInterval(2000);
const firstFiveItems$  = _myTake(everyTwoSeconds$, 5);
const subscription     = firstFiveItems$.subscribe(util.createSubscriber('Custom Take'));