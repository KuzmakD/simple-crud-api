import fs from 'node:fs/promises';
import { join, dirname } from 'node:path';

export const writeFile = async(data: string) => {
    console.log(join(dirname(__dirname), 'db', 'usersDB.json'));
    await fs.writeFile(join(dirname(__dirname), 'db', 'usersDB.json'), data);
}
