var pbxproj = require('xcode');
var fs = require('fs');
var path = require('path'); 
var glob = require('glob');
var process = require('process'); 
module.exports = () => {
    //Get my directory
    const thisPath = process.cwd();
    const iosPath = thisPath + "/ios";
    if(!fs.existsSync(iosPath)) {
        console.log("Could not find ios in ", thisPath, iosPath); 
        console.log(fs.readdirSync(thisPath));
        return false
    }
    const podPath = iosPath + "/Podfile"
    if(!fs.existsSync(podPath)) {
        return false; 
    }
    const package = require(thisPath + "/package.json");

    return {
        packageName: package.name,
        podfile: podPath 
    }
}
