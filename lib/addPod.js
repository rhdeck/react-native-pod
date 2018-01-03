const getProject = require("./getProject");
const saveProject = require("./saveProject");

module.exports = (podname, obj, args) => {
  if (typeof podname !== "string") podname = podname[0];
  podinfo = { pod: podname };
  if (args.podversion) podinfo.version = args.podversion;
  if (args.podgit) podinfo.git = args.podgit;
  if (podinfo) {
    var p = getProject();
    if (!p.pods) p.pods = {};
    p.pods[podname] = podinfo;
    saveProject(p);
    console.log(
      "Run react-native link to finish installing the pod to your project"
    );
  } else {
    console.log("Could not add pod with arguments", options);
  }
};
