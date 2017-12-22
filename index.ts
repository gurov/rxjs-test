import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { Subject } from 'rxjs';
import CacheObservable from './cache.decorator';

import { request } from 'universal-rxjs-ajax';


export const GET_SOMETHING = 'GET_SOMETHING'
export const GOT_SOMETHING = 'GOT_SOMETHING'

export const getSomething = () => ({
    type: GET_SOMETHING
})

export const gotSomething = response => ({
    type: GOT_SOMETHING,
    payload: response
})

class Ttt {

    oneSecondInterval = Observable.interval(1000);
    url = 'https://dev.toyou.delivery/user/mgmt/v1/users?page=0&size=10&enabled=true';
    @CacheObservable(3000)
    test() {
        return request({ url: this.url })
            .map(({ response }) => gotSomething(response))
            .map(data =>  + new Date());
    }

    constructor() {
        this.oneSecondInterval.subscribe(d => {
            console.log('-->', d);
            // if (d === 15) {
            //     this.url = 'https://dev.toyou.delivery/user/mgmt/v1/users?page=0&size=10&enabled=true';
            // }

            if (d === 10) {
                this.url = 'https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc';
            }

            if (d === 20) {
                this.url = 'https://dev.toyou.delivery/user/mgmt/v1/users?page=0&size=10&enabled=true';
            }

            if (d === 30) {
                this.url = 'https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc';
            }


            this.test().subscribe(t => console.log('T ', t));

        });
    }

}

let a = new Ttt();


