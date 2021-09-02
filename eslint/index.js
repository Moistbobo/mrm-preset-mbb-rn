const {json, install, lines} = require('mrm-core');
const eslintConfig = require('./.eslintrc.json');
const prettierConfig = require('./prettierrc.json');

function task() {
    // delete old files
    console.info('Deleting .eslintrc.js and .prettierrc.js');
    lines('.eslintrc.js').delete();
    lines('.prettierrc.js').delete();

    // install dependencies
    const deps = [
        'eslint-config-airbnb',
        'eslint-config-recommended',
        'eslint-config-typescript',
        'eslint-import-resolver-typescript',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-react-native'
    ];

    install(deps, {yarn: true});

    // create .eslintrc.json
    json('.eslintrc.json', eslintConfig).save();

    // create prettierrc.json
    json('.prettierrc.json', prettierConfig).save();

    // create .eslintignore
    const content = [
        'storybook/addons.js',
        'storybook/index.js',
        'storybook/rn-addons.js',
        'storybook/storyLoader.js',
        'src/assets/',
        'jest/setup.js'
    ]

    lines('.eslintignore', content).save();
}

task.description = 'Adds modified airbnb eslint preset and prettier.'

module.exports = task;
