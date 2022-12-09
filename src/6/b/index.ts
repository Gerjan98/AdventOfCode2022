import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

const rangeContains = (firstStart: number, secondStart: number, firstEnd: number, secondEnd: number) => {
  return (firstStart >= secondStart && firstEnd <= secondEnd);
}

export default async function () {

  const input = (await new Input().read());

  let num = 14;
  let arr: (string)[] = Array.from(input.slice(0, 14));

  while (num < input.length && new Set(arr).size !== arr.length) {
    for (let i = 0; i < 13; i++) {
      arr[i] = arr[i + 1];
    }
    arr[13] = input[num++];
  }

  await new Output().write(num.toString());
}
