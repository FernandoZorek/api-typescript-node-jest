import { join, resolve } from 'path';
import moduleAlias from 'module-alias';
// Do not change import below... modules are no registered yet.
import EnvVariablesUtil from '../EnvVariablesUtil';

const isProd = EnvVariablesUtil.isProductionEnv();
let path = resolve(__dirname, '../..');

moduleAlias.addAliases({
    '@src': join(path),
    '@config': join(path, 'config'),
    '@enum': join(path, 'enum'),
    '@error': join(path, 'error'),
    '@initializer': join(path, 'initializer'),
    '@interface': join(path, 'interface'),
    '@type': join(path, 'type'),
    '@util': join(path, 'util'),
});

if (!isProd) {
    path = resolve(__dirname, '../../..');
    moduleAlias.addAlias('@test', join(path, 'test'));
}
