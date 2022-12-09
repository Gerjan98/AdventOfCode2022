import * as process from "process";
import fs from "fs/promises";
import * as path from "path";
import * as os from "os";

export enum InputType {
  String,
  Number,
  Array,
  Array2d,
}

export default class Input {
  private delimiter = `${os.EOL}${os.EOL}`;
  private secondDelimiter = os.EOL;

  public setDelimiters(delimiter: string, secondDelimiter = `${os.EOL}${os.EOL}`) {
    this.delimiter = delimiter;
    this.secondDelimiter = secondDelimiter;

    return this;
  }

  public async read(): Promise<string> {
    const args = process.argv.slice(2);

    const file = path.resolve(`./src/${args[0]}/${args[1]}/input.txt`);
    return (await fs.readFile(file)).toString();
  }

  public async readAs2dArray(trim = true): Promise<string[][]> {
    const array = (await this.read()).split(this.delimiter).map(line => line.split(this.secondDelimiter));
    return trim ? array.map(inner => inner.filter(item => item)).filter(inner => !inner.every(item => item.trim() === '')) : array;
  }

  public async readAsArray(): Promise<string[]> {
    return (await this.read()).split(this.delimiter);
  }

  public async readAsNumber(): Promise<number> {
    return +(await this.read());
  }
}
