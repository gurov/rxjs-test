import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';

let a1 = Observable.of({a: 1}).delay(1000).do(() => {
    console.log('first');
})


let a2 = Observable.of(2).delay(2000).do(() => {
    console.log('second');
})


let a3 = Observable.of({ a: 3 }).delay(3000).do(() => {
    console.log('third');
})


// Observable.concat(a1, a2, a3)
//     .pluck('a')
//     .subscribe(r => console.log(r));

// let t = [];
// Observable
//     .ajax('https://jsonplaceholder.typicode.com/posts')
//     .map(e => e.response)
//     .subscribe(res => {
//         console.log(res);
//     })


// The serial variant of combineLatest
Observable
    .from([a1, a2, a3])
    .concatMap(r => r)
    .toArray()
    .subscribe(r => console.log(r));
