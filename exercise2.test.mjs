"use strict";

import { wordc, WList } from "./exercise2.mjs";

console.log(wordc("fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish fish bird"));
console.log(wordc("fish fish fish bird bird bird bird cat"));
console.log(wordc("fish bird bird bird bird cat cat cat cat cat"));
console.log(wordc("fish fish bird bird bird bird bird cat cat cat dog dog dog dog dog"));

let wl = new WList("fish fish fish bird bird bird bird cat cat cat cat cat computer computer");

function f (word) {
    return word.length;
}

console.log(wl.getWords());
console.log(wl.maxCountWord());
console.log(wl.minCountWord());
console.log(wl.getCount("fish"));
console.log(wl.getCount("bird"));
console.log(wl.getCount("cat"));
console.log(wl.getCount("dog"));
console.log(wl.applyWordFunc(f));