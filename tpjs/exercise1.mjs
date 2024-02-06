"use strict";

// non recursive
export function fibonaIt(n) {
    let a = 0;
    let b = 1;
    let c = 0;
    for (let i = 0; i < n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return a;
}

// recursive function
export function fiboRec(n) {
    if (n < 2) {
        return n;
    }
    return fiboRec(n - 1) + fiboRec(n - 2);
}

// process array, no map
export function fiboArr(t) {
    let result = [];
    for (let i = 0; i < t.length; i++) {
        result.push(fiboRec(t[i]));
    }
    return result;
}

// use of map
export function fibMap(t) {
    return t.map(fiboRec);
}