import process from "process";
import path from "path";
import fs from "fs/promises";
import * as util from "util";

export enum OutputType {
  File,
  Cli,
}

export default class Output {
  public async write(content: string, type = OutputType.File) {
    const args = process.argv.slice(2);

    if (type === OutputType.File) {
      const file = path.resolve(`./src/${args[0]}/${args[1]}/output.txt`);
      await fs.writeFile(file, content);
    } else {
      console.log(content);
    }
  }
}
