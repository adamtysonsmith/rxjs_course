import Rx from 'rxjs/Rx';
import util from './lib/util';

const everySecond$ = util.createInterval(1000);

// Take operator will take the first 3 items, and then complete
const subscription$ = everySecond$.take(3).subscribe(util.createSubscriber('Unsubscribe Demo'));

setTimeout(() => {
    subscription$.unsubscribe();
}, 5000);