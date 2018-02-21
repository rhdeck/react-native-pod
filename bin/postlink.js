#!/usr/bin/env node
const path = require("path");
const process = require("process");
const { spawnSync } = require("child_process");
const registerPodsFromPackage = require("../lib/registerPodsFromPackage");
const dependencies = require("../lib/getProjectDependencies")();
const package = require("../lib/getProject")();
const nodepath = process.cwd() + "/node_modules";
const opts = {
  encoding: "utf8",
  stdio: "inherit"
};
var doFix = false;
dependencies.map(dependency => {
  const package = require(path.resolve(nodepath, dependency, "package.json"));
  registerPodsFromPackage(package);
  if (package.isSwift) doFix = true;
});
registerPodsFromPackage(package);
if (package.isSwift) doFix = true;
//Now that all my pods are here, let's run a pod install
const mydir = process.cwd();
process.chdir("./ios");
spawnSync("pod", ["install"], opts);
console.log("Do I fix pods?");
if (doFix) {
  console.log("Yes I do!");

  const fixPods = require("../lib/fixPods");
  process.chdir(mydir);
  fixPods();
}
