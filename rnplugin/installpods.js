const process = require('process');
const fs = require('fs');
var path = require('path'); 
var {spawnSync} = require("child_process");
module.exports = (config, args) => {
    require(__dirname + "../makepods.js");
    console.log("cwd", process.cwd());
    var newpath = process.cwd() + "/ios";
    process.chdir(newpath);
    var args = ["install"];
    const opts = {
        'encoding': 'utf8', 
        stdio: "inherit"
    }
    spawnSync("pod", args, opts);
}