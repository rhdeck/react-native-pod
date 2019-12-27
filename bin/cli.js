#!/usr/bin/env node
const commander = require("commander");
const addPod = require("../lib/addPod");
const removePod = require("../lib/removePod");
commander
  .command("addpod <pod>")
  .description("Add the named pod to the current package.json file")
  .option("--podversion [version]", "version directive")
  .option("--podgit [giturl]", "Git (usually github) source URL")
  .option("--podgitoption [gitoption]", "Specify the branch, commit or tag like 'branch=branch_name'")
  .option("--podspec [specurl]", "Podspec for full path/url pointer")
  .action((a, b, c) => {
    return addPod(a, c, b);
  });
commander
  .command("removepod <pod>")
  .description("Remove the named pod from the current package.json file")
  .action(removePod);
commander.parse(process.argv);
