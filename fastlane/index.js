const fs = require("fs");
const path = require("path");
const {lines} = require("mrm-core");

console.log(__dirname);
function task(){
    const configPath = __dirname+"/config";
    const files = [
        ".env.sample",
        "BundleConfig",
        "Fastfile",
        "Gemfile",
        "Matchfile"
    ];

    const[envSample, bundleConfig, fastfile, gemfile, matchfile] = files.map(fileName => fs.readFileSync(path.resolve(configPath, fileName), "utf8").split("\n"));

    lines("bundle/config", bundleConfig).save();
    lines("fastlane/.env.sample", envSample).save();
    lines("fastlane/Fastfile", fastfile).save();
    lines("fastlane/Matchfile", matchfile).save();
    lines("Gemfile", gemfile).save();

    console.info("Run bundle install to install all necessary dependencies");
}

module.exports = task;
