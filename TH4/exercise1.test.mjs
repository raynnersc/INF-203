"use strict";

import {fibonaIt,fiboRec,fiboArr,fibMap} from "./exercise1.mjs";

console.log("fibonaIt(): "); 
console.log(fibonaIt(7));
console.log(fibonaIt(13));
console.log(fibonaIt(9));

console.log("fiboRec(): ");
console.log(fiboRec(8));
console.log(fiboRec(15));
console.log(fiboRec(16));

console.log("fiboArr(): ");
console.log(fiboArr([3,5]));
console.log(fiboArr([3,5,7,9]));
console.log(fiboArr([2,8,12,16]));

console.log("fibMap(): ");
console.log(fibMap([3,5]));
console.log(fibMap([3,5,7,9]));
console.log(fibMap([2,8,12,16]));