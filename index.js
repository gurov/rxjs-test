"use strict";
exports.__esModule = true;
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/observable/from");
require("rxjs/add/operator/map");
var a = Observable_1.Observable
    .from([1, 2, 3])
    .map(function (x) { return x + '!!!'; }); // etc
a.subscribe(function (r) { return console.log(r); });
