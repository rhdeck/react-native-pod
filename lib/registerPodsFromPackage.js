const registerPod = require("./registerPod");
const checkForPod = require("./checkForPod");
const iOSProject = require("./getIOSProject")();
module.exports = package => {
  if (!package || !package.pods) {
    return;
  }
  Object.keys(package.pods).map(podname => {
    var podinfo = package.pods[podname];
    console.log("Checking to add ", podname, podinfo);
    if (!podinfo || podinfo == "*" || podinfo == podname) {
      podinfo = { pod: podname };
    } else if (typeof podinfo === "string") {
      if (podinfo.indexOf("git") > -1) {
        podinfo = {
          pod: podname,
          git: podinfo
        };
      } else {
        //Assume a version directive
        podinfo = {
          pod: podname,
          version: podinfo
        };
      }
    } else if (!podinfo.pod) {
      {
        podinfo.pod = podname;
      }
    }
    if (!checkForPod(podinfo.pod, iOSProject.podfile)) {
      registerPod(podinfo, iOSProject);
    }
  });
};
