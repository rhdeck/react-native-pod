'use strict';
const registerPod = require('./registerPod');
module.exports = function registerNativeModulePods(dependency, iOSProject) {
  const pod = {pod: dependency.config.ios.podspec, path: "../node_modules/" + dependency.name}
  return registerPod(pod, iOSProject); 
};

