// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by gembas-report-individual-module.js.
import { name as packageName } from "meteor/gembas-report-individual-module";

// Write your tests here!
// Here is an example.
Tinytest.add('gembas-report-individual-module - example', function (test) {
  test.equal(packageName, "gembas-report-individual-module");
});
