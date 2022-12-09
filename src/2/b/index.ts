import Input from "../../shared/helper/io/input";
import Output, {OutputType} from "../../shared/helper/io/output";

enum Move {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

const movePointMap: {[key: string]: number} = {
  'A': Move.Rock,
  'B': Move.Paper,
  'C': Move.Scissors,
};

const intentionMap: {[key: string]: number} = {
  'X': 1,
  'Y': 2,
  'Z': 3,
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

const getMove = (state: number): number => {
  switch (state) {
    case 5: //
    case 11:
    case 14:
      return Move.Scissors;
    case 6:
    case 9:
    case 15:
      return Move.Rock;
    case 7:
    case 10:
    case 13:
      return Move.Paper;
    default:
      throw new Error('cannot parse ' + state);
  }
}

export default async function () {
  const input = (await new Input().setDelimiters('\n', ' ').readAs2dArray());

  const total = input.reduce((value, turn) => {
    const opponentMove = movePointMap[turn[0]];
    const move = getMove((opponentMove << 2) + intentionMap[turn[1]]);

    return value + getPoints((move << 2) + opponentMove) + move;
  }, 0);

  await new Output().write(total.toString());
}
