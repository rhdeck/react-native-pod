#!/usr/bin/env node
var fs = require('fs');
var path = require('path'); 
var glob = require('glob');

const spawnSync = require("child_process").spawnSync;
const execSync = require("child_process").execSync;
//Get my directory
var thisPath = process.argv[1];
var thisPath = path.dirname(thisPath); //bin directory
var thisPath = path.dirname(thisPath); //dependency directory
var thisPath = path.dirname(thisPath); // node_modules
var baseName = path.basename(thisPath);
if(!baseName.startsWith("node_modules")) {
  console.log("This is not a dependency: ", thisPath);
  process.exit(); 
}
var thisPath = path.dirname(thisPath); // parent
var iosPath = thisPath + "/ios";
if(!fs.existsSync(iosPath)) {
  console.log("Could not find ios in ", thisPath, iosPath); 
  console.log(fs.readdirSync(thisPath));
  process.exit(1);
}
xpdir = glob.sync(iosPath +"/*.xcodeproj")[0];
if(xpdir.length === 0) {
  console.log("Could not find xcodeproj directory inside: ", iosPath)
  process.exit(1);
}
if(!fs.existsSync(iosPath + "/Podfile")) {
    //Check for pod command
    const cmd = "which pod"
    const out = execSync(cmd);
    if(!out.toString().trim().endsWith("pod")) {
        console.log("Could not find pod command - you need to install CocoaPods! Try gem install cocoapods");
        process.exit(1); 
    }
    process.chdir(iosPath);
    const opts = {
        'encoding': 'utf8', 
        stdio: "inherit"
    }
    spawnSync("pod", "init", opts);
    
    console.log("Podfile created in " + iosPath);
} else {
    console.log("Podfile already present, we're OK!");
}
