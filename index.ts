import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { Subject } from 'rxjs';
import CacheObservable from './cache.decorator';

class Ttt {

    oneSecondInterval = Observable.interval(500);

    @CacheObservable()
    test() {
        return Observable.of(+new Date());
    }

    constructor() {
        this.oneSecondInterval.subscribe(d => {
            console.log('-->', d);

            this.test().subscribe(t => console.log('T ', t));

        });
    }

}

let a = new Ttt();


