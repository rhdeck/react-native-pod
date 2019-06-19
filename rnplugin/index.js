module.exports = [
  {
    name: "addpod [pod]",
    description: "Add specified pod",
    options: [
      {
        command: "--podversion [version]",
        description: "version directive"
      },
      {
        command: "--podgit [giturl]",
        description: "Git (usually github) source URL"
      },
      {
        command: "--podspec <specurl>",
        description: "Podspec for full path/url pointer"
      }
    ],
    func: require("../lib/addPod.js")
  },
  {
    name: "removepod [pod]",
    description: "Remove specified pod",
    func: require("../lib/removePod.js")
  },

  {
    name: "installpods",
    func: require("./installpods.js"),
    description:
      "Install all pods specified in the podfile. (Happens automatically at react-native link)"
  },
  {
    name: "fixpods",
    func: require("../lib/fixPods"),
    description:
      "Disable bitcode build in pod, can be important for swift-based projects"
  }
];
