import 'rxjs/add/operator/publishReplay';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

/**
 * Storage for cached functions
 */
class StorageItem {
    error: boolean = false;
    data$: Observable<any>
}

const storage: { [index: string]: StorageItem } = {};

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
            const entry = storage[cacheKey];
            if (entry && !entry.error) {
                return entry.data$;
            }

            storage[cacheKey] = new StorageItem();

            storage[cacheKey].data$ = originalMethod.apply(this, args)
                .catch(() => {
                    storage[cacheKey].error = true;
                    return originalMethod;
                })
                .publishReplay(1, ms)
                .refCount()
                .take(1);

            return storage[cacheKey].error ? originalMethod : storage[cacheKey].data$;
        };
        return descriptor;
    };

}
