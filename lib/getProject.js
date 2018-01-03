"use strict";
const process = require("process");
module.exports = () => {
  const projpath = process.cwd();
  const packagepath = projpath + "/package.json";
  const pkg = require(packagepath);
  return pkg;
};
