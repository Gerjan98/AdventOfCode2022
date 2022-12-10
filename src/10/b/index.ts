import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

let cycle = 0;
let x = 0;
let figure = '';
let row = 0;

const incrementCycle = () => {
  const rowPosition = cycle - row * 40;
  if (rowPosition >= x && rowPosition <= x + 2) {
    figure += '#';
  } else {
    figure += '.';
  }

  cycle++;

  if (cycle % 40 === 0) {
    figure += '\n';
    row++;
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
  });

  await new Output().write(figure);
}
