#!/usr/bin/env node
var pbxproj = require("@raydeck/xcode");
var fs = require("fs");
var path = require("path");
var glob = require("glob");

//Get my directory
var iosPath = process.argv[2];
if (!iosPath || !iosPath.length || !fs.existsSync(iosPath)) {
  var thisPath = process.argv[1];
  var thisPath = path.dirname(thisPath); //bin directory
  var thisPath = path.dirname(thisPath); //dependency directory
  var thisPath = path.dirname(thisPath); // node_modules
  var baseName = path.basename(thisPath);
  if (!baseName.startsWith("node_modules")) {
    console.log("This is not a dependency: ", thisPath);
    process.exit();
  }
  var thisPath = path.dirname(thisPath); // parent
  var iosPath = path.resolve(thisPath, "ios");
} else {
  iosPath = fs.realpathSync(iosPath);
}
if (!fs.existsSync(iosPath)) {
  console.log("Could not find ios in ", thisPath, iosPath);
  console.log(fs.readdirSync(thisPath));
  process.exit(1);
}
xpdir = glob.sync(iosPath + "/*.xcodeproj")[0];
if (xpdir.length === 0) {
  console.log("Could not find xcodeproj directory inside: ", iosPath);
  process.exit(1);
}
const podPath = iosPath + "/Podfile";
if (!fs.existsSync(podPath)) {
  let filename = path.resolve(xpdir, "project.pbxproj");
  if (!fs.existsSync(filename)) {
    console.log("COuld not find pbxproj file:", filename);
    process.exit();
  }
  var proj = pbxproj.project(filename);
  var targets = [];
  proj.parse(function(err) {
    const nts = proj.pbxNativeTargetSection();
    for (var key in nts) {
      if (key.endsWith("_comment")) continue;
      targets.push(nts[key].name);
    }
    targets = targets.map(val => {
      while (val.startsWith('"')) val = val.substring(1);
      while (val.endsWith('"')) val = val.substring(0, val.length - 1);
      return val;
    });
    targets.sort();
    const mainprojects = targets.filter(val => {
      if (val.endsWith("Tests")) {
        return false;
      }
      return true;
    });
    var podlines = [];
    podlines.push("# Created by react-native-pod");
    mainprojects.map(project => {
      const tvOS = project.endsWith("tvOS");
      podlines.push("target '" + project + "' do");
      podlines.push(
        "\t# We uncomment because we like dynamic frameworks witn working with swift projects"
      );
      podlines.push("\tuse_frameworks!");
      if (!tvOS) podlines.push("\t# Add new pods below this line");
      targets.map(target => {
        if (target == project + "Tests") {
          //This is my test project
          podlines.push("\ttarget '" + target + "' do");
          podlines.push("\t\tinherit! :search_paths");
          podlines.push("\t\t# Pods for testing");
          if (!tvOS) podlines.push("\t\t# Add new pods below this line");
          podlines.push("\tend");
        }
      });
      podlines.push("end");
    });
    const podText = podlines.join("\n").replace(new RegExp("\t", "g"), "  ");
    fs.writeFileSync(podPath, podText);
  });
  console.log("Podfile created in " + podPath);
} else {
  console.log("Podfile already present, we're OK!");
}
