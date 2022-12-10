import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

let cycle = 0;
let x = 1;
const signalStrengths: number[] = [];

const incrementCycle = () => {
  cycle++;

  if (cycle === 20 || (cycle - 20) % 40 === 0) {
    signalStrengths.push(x * cycle);
  }
}

export default async function () {
  const input = (await new Input().setDelimiters('\n', ' ').readAs2dArray());

  input.forEach(instruction => {
    switch (instruction[0]) {
      case 'addx':
        incrementCycle();
        incrementCycle();
        x += +instruction[1];
        break;
      case 'noop':
        incrementCycle();
        break;
      default:
        break;
    }
  })

  console.log(signalStrengths);
  await new Output().write(signalStrengths.reduce((prev, current) => prev + +current, 0).toString());
}
