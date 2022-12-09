import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

const rangeContains = (firstStart: number, secondStart: number, firstEnd: number, secondEnd: number) => {
  return (firstStart >= secondStart && firstEnd <= secondEnd);
}

export default async function () {

  const input = (await new Input().read());

  let num = 4;
  let arr: (string)[] = [input[0], input[1], input[2], input[3]];

  while (num < input.length && new Set(arr).size !== arr.length) {
    arr[0] = arr[1];
    arr[1] = arr[2];
    arr[2] = arr[3];
    arr[3] = input[num++];
  }

  await new Output().write(num.toString());
}
