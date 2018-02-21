const xcode = require("xcode");
const getIOSProject = require("./getIOSProject");
const glob = require("glob");
const Path = require("path");
const fs = require("fs");
module.exports = () => {
  const ip = getIOSProject();
  const baseDir = Path.dirname(ip.podfile);
  const podDir = Path.join(baseDir, "Pods");
  const g = Path.join(podDir, "**", "project.pbxproj");
  glob.sync(g).forEach(path => {
    console.log("Found pbxproj file at ", path);
    const project = xcode.project(path);
    project.parseSync();
    project.addBuildProperty("ENABLE_BITCODE", "NO");
    const out = project.writeSync();
    fs.writeFileSync(path, out);
  });
};
