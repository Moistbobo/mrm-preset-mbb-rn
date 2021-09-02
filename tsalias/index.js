const {install, json, lines} = require('mrm-core');

const babelConfig = require('./babel.config.json');
const tsPathsConfig = require('./tsconfig.paths.json');

function task(){
    console.info('Deleting babel.config.js');
    lines('babel.config.js').delete();

    // install dependencies
    const deps = [
        'babel-plugin-module-resolver'
    ];
    install(deps, {yarn: true});

    // create babel.config.json
    json('babel.config.json', babelConfig).save();

    // create tsconfig.paths.json
    json('tsconfig.paths.json', tsPathsConfig).save();

    // extend tsconfig.json with tsconfig.paths.json created above
    json('tsconfig.json').merge({
        extends: './tsconfig.paths.json'
    }).save();
}

task.description = 'Adds tsAlias config to a react native project';

module.exports = task;
