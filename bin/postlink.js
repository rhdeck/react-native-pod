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
var isSwift = false;
var needsSwiftFix = false;
dependencies.map(dependency => {
  const package = require(path.resolve(nodepath, dependency, "package.json"));
  registerPodsFromPackage(package);
  if (package.isSwift) isSwift = true;
  if (package.needsSwiftFix) needsSwiftFix = true;
});
registerPodsFromPackage(package);
if (package.isSwift) isSwift = true;
if (package.needsSwiftFix) needsSwiftFix = true;
//Now that all my pods are here, let's run a pod install
const doFix = isSwift && needsSwiftFix;
const mydir = process.cwd();
process.chdir("./ios");
spawnSync("pod", ["install"], opts);
if (doFix) {
  const fixPods = require("../lib/fixPods");
  process.chdir(mydir);
  fixPods();
}
