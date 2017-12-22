import 'rxjs/add/operator/publishReplay';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

/**
 * Storage for cached functions
 */
const storage = {};

/**
 * Cache Observable function for ms milliseconds
 *
 * @param {number} ms
 * @returns {(target: any, methodName: string, descriptor: PropertyDescriptor) => PropertyDescriptor}
 * @constructor
 */

export default function CacheObservable(ms: number = 1000) {

    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {

        const originalMethod = descriptor.value;
        const className = target.constructor.name;

        descriptor.value = function (...args) {

            const cacheKey: string = `${className}:${methodName}:${JSON.stringify(args)}`;

            const entry: Observable<any> = storage[cacheKey];

            let error: boolean = false;

            if (entry) {
                return entry;
            }

            storage[cacheKey] = originalMethod.apply(this, args)
                .catch(() => {
                    this.error = true;
                    return originalMethod;
                })
                .publishReplay(1, ms)
                .refCount()
                .take(1);
            if (error) {
                return originalMethod;
            }
            return storage[cacheKey];
        };
        return descriptor;
    };

}
