import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

export default async function () {
  const input = (await new Input().setDelimiters('\n', ' ').readAs2dArray());
  const visited = new Set();
  const headPosition = [0, 0];
  const bodyPositions = [
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
  ];
  visited.add([...bodyPositions[bodyPositions.length - 1]].toString());

  input.forEach(([direction, steps]) => {
    console.log(direction, steps);
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

      let prev = headPosition;

      bodyPositions.forEach((bodyPosition) => {

        const distance = Math.abs(prev[0] - bodyPosition[0]) + Math.abs(prev[1] - bodyPosition[1]);
        const sameRowOrColumn = prev[0] === bodyPosition[0] || prev[1] === bodyPosition[1];

        let directionsTail: string[] = [];

        if (sameRowOrColumn && distance === 2) {
          if (prev[0] !== bodyPosition[0]) {
            directionsTail = [prev[0] > bodyPosition[0] ? 'R' : 'L'];
          } else {
            directionsTail = [prev[1] > bodyPosition[1] ? 'U' : 'D'];
          }
        } else if (distance > 2) {
          directionsTail.push(prev[0] > bodyPosition[0] ? 'R' : 'L');
          directionsTail.push(prev[1] > bodyPosition[1] ? 'U' : 'D');
        }

        directionsTail.forEach(tailDirection => {
          switch (tailDirection) {
            case 'L':
              bodyPosition[0]--;
              break;
            case 'R':
              bodyPosition[0]++;
              break;
            case 'U':
              bodyPosition[1]++;
              break;
            case 'D':
              bodyPosition[1]--;
              break;
          }
        });
        prev = bodyPosition;
      });

      visited.add([...prev].toString());
    }
  });

  await new Output().write(visited.size.toString());
}
