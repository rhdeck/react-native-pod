"use strict";
const process = require("process");
const getProject = require("./getProject");
module.exports = () => {
  const pkg = getProject();
  const dependencies = Object.keys(pkg.dependencies);
  return dependencies;
};
