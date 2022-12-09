import fs from 'fs/promises';
import path from 'path';

const start = async () => {
    const [day, part] = process.argv.slice(2);

    const dir = `./src/${day}/${part}/index.ts`;
    const absoluteDir = path.resolve(`${dir}`);

    try {
        await fs.access(absoluteDir);
    } catch {
        console.error(`no solution found for day ${day}, part ${part}. Checked ${absoluteDir}`);
        return;
    }

    await (await import(dir)).default();
}

start();
