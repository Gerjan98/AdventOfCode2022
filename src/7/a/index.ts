import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

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

const getDirectoriesWithMaximumSizeOf = (maxSize: number, current: Directory) => {
  let names: Directory[] = [];

  if (current.size <= maxSize) {
    names.push(current);
  }

  current.sub.filter((dir) => dir.type === 'dir').forEach(dir => {
    names = [...names, ...getDirectoriesWithMaximumSizeOf(maxSize, dir)];
  });

  return names;
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

  await new Output().write(getDirectoriesWithMaximumSizeOf(100000, dir).reduce((prev, d) => d.size + prev, 0).toString());
}
