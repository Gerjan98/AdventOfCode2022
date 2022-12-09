import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

export default async function () {
  const input = (await new Input().setDelimiters('\n', ' ').readAs2dArray());
  const visited = new Set();
  const headPosition = [0, 0];
  const tailPosition = [0, 0];
  visited.add([...tailPosition].toString());

  input.forEach(([direction, steps]) => {
    for (let i = 0; i < +steps; i++) {
      switch (direction) {
        case 'L':
          headPosition[0]--;
          break;
        case 'R':
          headPosition[0]++;
          break;
        case 'U':
          headPosition[1]++;
          break;
        case 'D':
          headPosition[1]--;
          break;
      }

      const distance = Math.abs(headPosition[0] - tailPosition[0]) + Math.abs(headPosition[1] - tailPosition[1]);
      const sameRowOrColumn = headPosition[0] === tailPosition[0] || headPosition[1] === tailPosition[1];

      const directionsTail = [];

      if (sameRowOrColumn && distance === 2) {
        directionsTail.push(direction);
      } else if (distance > 2) {
        directionsTail.push(headPosition[0] > tailPosition[0] ? 'R' : 'L');
        directionsTail.push(headPosition[1] > tailPosition[1] ? 'U' : 'D');
      }

      directionsTail.forEach(tailDirection => {
        switch (tailDirection) {
          case 'L':
            tailPosition[0]--;
            break;
          case 'R':
            tailPosition[0]++;
            break;
          case 'U':
            tailPosition[1]++;
            break;
          case 'D':
            tailPosition[1]--;
            break;
        }
      });

      visited.add([...tailPosition].toString());
    }
  });
  await new Output().write(visited.size.toString());
}
