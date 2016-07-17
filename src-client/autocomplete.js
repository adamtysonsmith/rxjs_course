import $ from 'jQuery';
import Rx from 'rxjs/Rx';

// Some jQuery elements
const $title = $('#title');
const $results = $('#results');

// We create an observable on the keyup event
const keyups$ = Rx.Observable.fromEvent($title, 'keyup');

// Next, we create a transformation
// on the original stream of keyup events
const queries$ = keyups$
    .map(_eventValue)
    .distinctUntilChanged()
    .debounceTime(250)
    .switchMap(query => API_get_items(query)) // switchMap is like flatMapLatest
      
// Then we subscribe to the queries stream
queries$.subscribe(items => {
    $results.empty();
    $results.append(_listItems(items));
});


function _eventValue(event) {
    return event.target.value;
}

function _listItems(items) {
    return items.map(item => $('<li />').text(item));
}





// Mock API
function API_get_items(title) {
    console.log(`Querying ${title}`);
    
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve([title, 'Item 2', `Another ${Math.random()}`])
        }, 500 + (Math.random() * 200));
    });
}