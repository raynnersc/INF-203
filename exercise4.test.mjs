"use strict";

import { ForeignStud, Student } from "./exercise3.mjs";
import { Prom } from "./exercise4.mjs";

const student = new ForeignStud("HAMILTON", "Lewis", "2023", "English");
const student2 = new Student("RENAULT", "Francois", "2024");

var prom = new Prom();
prom.readFile("prom.json");
prom.add(student);
prom.add(student2);
prom.print();
console.log("Prom size: " + prom.size());
console.log(prom.write());
console.log(prom.get(3));
prom.saveTo("newProm.json");
