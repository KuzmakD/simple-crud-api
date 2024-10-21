import fs from 'node:fs/promises';
import { join, dirname } from 'node:path';

export const readFile = async() => {
    let info = await fs.readFile(join(dirname(__dirname), 'db', 'usersDB.json'));
    return info;
}
