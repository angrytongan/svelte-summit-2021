import { writable } from 'svelte/store';
import LZString from 'lz-string';

export const ourStore = (name, initialValue, toStorage = [], fromStorage = []) => {
    if (window?.localStorage) {
        const storedValue = window.localStorage.getItem(name);

        if (storedValue) {
            initialValue = fromStorage.reduce((acc, fn) => fn(acc), storedValue);
        }
    }

    const { subscribe, set } = writable(initialValue);

    return {
        subscribe,

        set: (x) => {
            if (window?.localStorage) {
                window.localStorage.setItem(name, toStorage.reduce((acc, fn) => fn(acc), x));
            }
            set(x);
        },
    };
};

export const someText = ourStore('someText', '');
export const anObject = ourStore(
    'anObject',
    {
        a: 12345,
        b: true,
        c: 'this is a string',
    },
    [ JSON.stringify ],
    [ JSON.parse ],
);
export const aCompressedObject = ourStore(
    'aCompressedObject',
    {
        a: 12345,
        b: true,
        c: 'this is a string',
    },
    [ JSON.stringify, LZString.compress ],
    [ LZString.decompress, JSON.parse ],
);
