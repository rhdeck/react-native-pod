"use strict";
const process = require("process");
const fs = require("fs");
module.exports = projectobj => {
  const projpath = process.cwd();
  const packagepath = projpath + "/package.json";
  fs.writeFileSync(packagepath, JSON.stringify(projectobj, null, 2));
  const pkg = require(packagepath);
  return pkg;
};
