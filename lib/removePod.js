const removePodEntry = require("./removePodEntry");
const readPodfile = require("./readPodfile");
const savePodFile = require("./savePodFile");
const getProject = require("./getProject");
const saveProject = require("./saveProject");
const getIOSProject = require("./getIOSProject");
const fs = require("fs");

module.exports = podName => {
  if (!podName) {
    console.log("You need to specify a pod to remove");
    return;
  }
  var p = getProject();
  if (p && p.pods) {
    delete p.pods[podName];
    if (Object.keys(p).length == 0) {
      delete p.pods;
    }
    saveProject(p);
  }
  try {
    const iOSProject = getIOSProject();
    var podContent = fs.readFileSync(iOSProject.podfile, { encoding: "utf8" });
    podContent = removePodEntry(podContent, podName);
    fs.writeFileSync(iOSProject.podfile, podContent);
  } catch (e) {}
};
