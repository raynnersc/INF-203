"use strict";

import { Student, ForeignStud } from "./exercise3.mjs";

var student = new Student("Dupond", "John", "1835");
var foreignStud = new ForeignStud("Doe", "John", "432", "American");

console.log(student.toString());
console.log(foreignStud.toString());