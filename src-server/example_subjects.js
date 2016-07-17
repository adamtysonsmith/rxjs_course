import Rx from 'rxjs/Rx';
import {createSubscriber} from './lib/util';

// Subjects are another Rx class that is like an observable and subscription
// You can produce values like an observable, and also subscribe
const subject$ = new Rx.Subject();

subject$.subscribe(createSubscriber('Subject Example'));

// You can control the next, error, complete functions
subject$.next('Hello there...')
subject$.next('..sexy.')
subject$.complete();


// Another example
const interval$ = Rx.Observable.interval(1000).take(5);
const intervalProxy$ = new Rx.Subject();

// Our initial observable is subscribing to the subject,
// which will act as a proxy
// You will see that interval$ is subscribed to just ONCE
// and the other subscribers on the subject are sharing the interval stream
interval$.subscribe(intervalProxy$);

intervalProxy$.subscribe(createSubscriber('First'));
intervalProxy$.subscribe(createSubscriber('Second'));
intervalProxy$.subscribe(createSubscriber('Third'));

setTimeout(() => {
   intervalProxy$.subscribe(createSubscriber('Check me out!')); 
}, 3000);


// @todo Rx.BehaviorSubject()
// @todo Rx.ReplaySubject()
// @todo Rx.AsyncSubject()