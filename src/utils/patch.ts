import path from 'path';
const modulealias = require('module-alias');
let root = path.resolve(__dirname, '../../');

modulealias.addAliases({
    '@root': root,
    '@src': `${root}/src`,
    '@utils': `${root}/src/utils`,
    '@modules': `${root}/src/modules`,
})

// modulealias()