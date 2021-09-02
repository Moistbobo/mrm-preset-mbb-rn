const {json, lines, install} = require('mrm-core');
const enJson = require('./en.json');
const i18nConfig = require('./i18n');

function task() {
    // install deps
    const deps = ['react-i18next', 'i18next'];
    install(deps, {yarn: true});

    // create en.json
    json('./src/assets/locales/en.json', enJson).save();

    // create i18n.ts file
    lines('./src/assets/i18n.ts', [i18nConfig]).save();

    // import i18n.ts in index.tsx
    const indexJs = lines('index.js');
    const indexString = indexJs.get();
    // insert the import right under `import App from './App';`
    const index = indexString.findIndex(x => x.includes('./App'));
    indexString.splice(index + 1, 0, `import 'assets/i18n';`);
    indexJs.set([...indexString]).save();
};

task.description = 'Adds i18n with a dummy en.json locale';

module.exports = task;
