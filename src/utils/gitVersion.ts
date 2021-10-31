import { execSync } from 'child_process';

export default execSync('git rev-parse HEAD', { encoding: 'utf8' }).slice(0, 8);