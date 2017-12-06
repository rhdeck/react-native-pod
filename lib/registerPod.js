'use strict';

const readPodfile = require('./readPodfile');
const findPodTargetLine = require('./findPodTargetLine');
const findLineToAddPod = require('./findLineToAddPod');
const findMarkedLinesInPodfile = require('./findMarkedLinesInPodfile');
const addPodEntry = require('./addPodEntry');
const savePodFile = require('./savePodFile');
const getIOSProject = require('./getIOSProject');

module.exports = function registerPod(pod, iOSProject) {
  if(!iOSProject || !iOSProject.projectName) iOSProject = getIOSProject();
  if(!iOSProject || !iOSProject.projectName) return false;
  const podLines = readPodfile(iOSProject.podfile);
  const linesToAddEntry = getLinesToAddEntry(podLines, iOSProject);
  addPodEntry(podLines, linesToAddEntry, pod);
  savePodFile(iOSProject.podfile, podLines);
};

function getLinesToAddEntry(podLines, { projectName }) {
  const linesToAddPodWithMarker = findMarkedLinesInPodfile(podLines);
  if (linesToAddPodWithMarker.length > 0) {
    return linesToAddPodWithMarker;
  } else {
    const firstTargetLined = findPodTargetLine(podLines, projectName);
    return findLineToAddPod(podLines, firstTargetLined);
  }
}
