import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

export default async function () {
  const input = (await new Input().setDelimiters('\n', '').readAs2dArray()).map(treeArray => treeArray.map(tree => ({
    height: +tree,
    visible: false,
    score: -1,
  })));

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const current = input[y][x];

      for (let nY = y + 1; nY < input.length; nY++) {
        if (current.height <= input[nY][x].height) {
          current.score = current.score === -1 ? nY - y : current.score * (nY - y);
          break;
        } else if (nY === input.length - 1) {
          current.score = current.score === -1 ? nY - y : current.score * (nY - y);
        }
      }

      for (let nY = y - 1; nY >= 0; nY--) {
        if (current.height <= input[nY][x].height) {
          current.score = current.score === -1 ? y - nY : current.score * (y - nY);
          break;
        } else if (nY === 0) {
          current.score = current.score === -1 ? y - nY : current.score * (y - nY);
        }
      }

      for (let nX = x + 1; nX < input[y].length; nX++) {
        if (current.height <= input[y][nX].height) {
          current.score = current.score === -1 ? nX - x : current.score * (nX - x);
          break;
        } else if (nX === input[y].length - 1) {
          current.score = current.score === -1 ? nX - x : current.score * (nX - x);
        }
      }

      for (let nX = x - 1; nX >= 0; nX--) {
        if (current.height <= input[y][nX].height) {
          current.score = current.score === -1 ? x - nX : current.score * (x - nX);
          break;
        } else if (nX === 0) {
          current.score = current.score === -1 ? x - nX : current.score * (x - nX);
        }
      }
    }
  }

  await new Output().write(input.flat().map(i => i.score).sort((a, b) => a > b ? -1 : 1)[0].toString());
}
