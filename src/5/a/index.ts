import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

export default async function () {

  const input = (await new Input().setDelimiters('\n\n', '\n').readAs2dArray());
  let stacks: string[][] = [];

  input[0].forEach(value => {
    let index = 0;

    while (index < value.length) {
      if (value[index] === '[') {
        if (!stacks[index / 4]) {
          stacks[index / 4] = [];
        }

        stacks[index / 4].push(value[index + 1]);
      }

      index += 4;
    }
  });

  stacks = stacks.map(stack => stack.reverse());

  input[1].forEach((moveLine) => {
    const [quantity, origin, destination] = moveLine.match(/[0-9]{1,2}/g)?.map(number => +number) ?? [];

    const section = stacks[origin - 1].splice(-quantity).reverse();
    stacks[destination - 1] = [...stacks[destination - 1], ...section];
  });

  await new Output().write(stacks.map(stack => stack[stack.length - 1]).reduce((prev, curr) => prev + curr, ''));
}
