const process = require("process");
const fs = require("fs");
var path = require("path");
var { spawnSync } = require("child_process");
const opts = {
  encoding: "utf8",
  stdio: "inherit"
};
module.exports = (config, args) => {
  const makepodPath = path.join(__dirname, "..", "bin", "makepod.js");
  spawnSync(makepodPath, [], opts);
  const postlinkPath = path.join(__dirname, "..", "bin", "postlink.js");
  spawnSync(postlinkPath, [], opts);
};
