import Rx from 'rxjs/Rx';

module.exports = {
    createSubscriber: createSubscriber,
    createInterval: createInterval
}
    
function createSubscriber(tag) {
	return {
		next(item) { console.log(`${tag}.next ${item}`); },
		error(error) { console.log(`${tag}.error ${error.stack || error}`); },
		complete() { console.log(`${tag}.complete`); }
	};
}

function createInterval(time) {
    return new Rx.Observable(observer => {
        let index = 0;
        let interval = setInterval(() => {
            console.log(`Generating Interval ${index}`);
            observer.next(index++);
        }, time);
        
        // In order to implement unsubscribe functionality for our subscribers,
        // we must return an unsubscribe function from the observable
        return () => {
            clearInterval(interval);
        }
    });
}