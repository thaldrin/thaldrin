import { execSync } from 'child_process';

export const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).slice(0, 8);