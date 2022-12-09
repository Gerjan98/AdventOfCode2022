import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

const movePointMap: {[key: string]: number} = {
  'X': 1,
  'A': 1,
  'Y': 2,
  'B': 2,
  'Z': 3,
  'C': 3,
};

const getPoints = (state: number): number => {
  switch (state) {
    case 7:
    case 9:
    case 14:
      return 6;
    case 5:
    case 10:
    case 15:
      return 3;
    default:
      return 0;
  }
}

export default async function () {

  const input = (await new Input().setDelimiters('\n', ' ').readAs2dArray());

  const total = input.reduce((value, turn) => {
    const opponentMove = movePointMap[turn[0]];
    const move = movePointMap[turn[1]];

    return value + getPoints((move << 2) + opponentMove) + move;
  }, 0);

  await new Output().write(total.toString());

}
