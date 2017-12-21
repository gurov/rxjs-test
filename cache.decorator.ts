import 'rxjs/add/operator/publishReplay';

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

            const cacheKey = `${className}:${methodName}:${JSON.stringify(args)}`;

            const entry = storage[cacheKey];
            if (entry) {
                return entry;
            }

            storage[cacheKey] = originalMethod.apply(this, args)
                .catch(error => originalMethod)
                .publishReplay(1, ms)
                .refCount()
                .take(1);
            return storage[cacheKey];
        };
        return descriptor;
    };

}
