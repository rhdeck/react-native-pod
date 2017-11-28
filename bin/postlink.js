#!/usr/bin/env node
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const process = require("process")
const getIOSProject = require('../lib/getIOSProject')
const getProjectDependencies = require("../lib/getProjectDependencies")
const registerPod = require("../lib/registerPod");
const {spawnSync} = require("child_process"); 
const checkForPod = require("../lib/checkForPod");
const dependencies = getProjectDependencies();
const iOSProject = getIOSProject();
const projectPath = process.cwd();
const nodepath = projectPath + "/node_modules"
const opts = {
    'encoding': 'utf8', 
    stdio: "inherit"
  }
dependencies.map((dependency)=>{
    const package = require(nodepath + "/" + dependency + "/package.json")
    if(!package || !package.pods) {
        return;
    }
    Object.keys(package.pods).map((podname)=>{
        var podinfo = package.pods[podname];
        if(!podinfo || (podinfo == "*") || podinfo == podname) {
            podinfo = {pod: podname}
        }    else if(!podinfo.pod) {
            podinfo.pod = podname;
        }
        if(!checkForPod(podinfo.pod, iOSProject.podfile)) {
            registerPod(podinfo, iOSProject);            
        }
    })
})
//Now that all my pods are here, let's run a pod install
process.chdir("./ios");
spawnSync("pod", ["install"], opts);



