"use strict";

module.exports = function addPodEntry(podLines, linesToAddEntry, podInfo) {
  if (typeof podInfo == "string") {
    podInfo = { pod: podInfo };
  }
  var entryParts = ["pod '" + podInfo.pod + "'"];
  if (podInfo.path) {
    entryParts.push(":path => '" + podInfo.path + "'");
  }
  if (podInfo.version) {
    entryParts.push("'" + podInfo.version + "'");
  }
  if (podInfo.git) {
    entryParts.push(":git => " + "'" + podInfo.git + "'");
  }
  if (podInfo.spec) {
    entryParts.push("podspec: '" + podInfo.spec + "'");
  }
  var newEntry = entryParts.join(", ") + "\n";

  if (!linesToAddEntry) {
    return;
  } else if (Array.isArray(linesToAddEntry)) {
    linesToAddEntry.map(({ line, indentation }, idx) =>
      podLines.splice(line + idx, 0, getLineToAdd(newEntry, indentation))
    );
  } else {
    const { line, indentation } = linesToAddEntry;
    podLines.splice(line, 0, getLineToAdd(newEntry, indentation));
  }
};

function getLineToAdd(newEntry, indentation) {
  const spaces = Array(indentation + 1).join(" ");
  return spaces + newEntry;
}
