import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

const rangeContains = (firstStart: number, secondStart: number, firstEnd: number, secondEnd: number) => {
  return (firstStart >= secondStart && firstEnd <= secondEnd);
}

interface Directory {
  path: string;
  sub: Directory[];
  parent: Directory | undefined;
  size: number;
  type: 'file'|'dir';
}

const dir: Directory = {
  path: '/',
  sub: [],
  parent: undefined,
  size: 0,
  type: 'dir',
};

let currentDir: Directory = dir;

const recalculateSize = (directory: Directory) => {
  let current = directory;

  while (current.parent) {
    if (current.parent) {
      current.parent.size += directory.size;
    }
    current = current.parent;
  }
}

const getDir = (path: string) => {
  if (path === '/') {
    return dir;
  }

  const parts = path.split('/').filter(p => p !== '');
  let directory: Directory | undefined = path.startsWith('/') ? dir : currentDir;
  let index = 0;

  while (directory !== undefined && index < parts.length) {
    if (parts[index] === '..') {
      if (directory.parent) {
        directory = directory.parent;
        index++;
      } else {
        return undefined;
      }
    } else {
      directory = directory.sub.find(subDir => subDir.type === 'dir' && subDir.path === parts[index]);
      index++;
    }
  }

  return directory;
}

const flattenDirStructure = (current: Directory) => {
  let dirs: Directory[] = [current];

  current.sub.filter((dir) => dir.type === 'dir').forEach(dir => {
    dirs = [...dirs, ...flattenDirStructure(dir)];
  });

  return dirs;
}

export default async function () {
  const input = (await new Input().setDelimiters('\n').readAsArray());

  let currentCommand: string | null = null;

  input.forEach(line => {
    const isCommand = line.startsWith('$ ');

    if (isCommand) {
      currentCommand = null;

      if (line === '$ ls') {
        currentCommand = 'ls';
      } else if (line.startsWith('$ cd')) {
        currentCommand = 'cd';

        currentDir = getDir(line.slice(5)) ?? currentDir;
      }
    } else {
      if (currentCommand === 'ls') {
        let [size, filename] = line.split(' ');

        currentDir.sub.push({
          path: filename,
          sub: [],
          parent: currentDir,
          size: size === 'dir' ? 0 : +size,
          type: size === 'dir' ? 'dir' : 'file',
        });

        if (size !== 'dir') {
          recalculateSize(currentDir.sub[currentDir.sub.length - 1]);
        }
      }
    }
  });

  const freeSpace =  (70000000 - dir.size);
  let flattend = flattenDirStructure(dir).filter(d => d.size + freeSpace > 30000000);
  flattend.sort((a, b) => {
    return a.size > b.size ? 1 : -1;
  });

  console.log(freeSpace,flattend);
  await new Output().write(flattend[0].size.toString());
}
