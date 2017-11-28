'use strict';
const fs = require("fs")
module.exports = (podName, podFilePath) => {
    const podFileContent = fs.readFileSync(podFilePath, "utf8");
    const podRegex = new RegExp("\\n( |\\t)*pod\\s+(\"|')" + podName + "(\"|')(,\\s*(:[a-z]+\\s*=>)?\\s*((\"|').*?(\"|')|\\[[\\s\\S]*?\\]))*\\n", 'g');
    return podRegex.test(podFileContent);
}