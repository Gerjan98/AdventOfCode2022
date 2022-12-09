import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

export default async function () {
  const input = (await new Input().setDelimiters('\n', '').readAs2dArray()).map(treeArray => treeArray.map(tree => ({
    height: +tree,
    visible: false,
  })));

  for (let y = 0; y < input.length; y++) {
    let previous = -1;
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x].height > previous) {
        input[y][x].visible = true;
        previous = input[y][x].height;
      }
    }

    previous = -1;
    for (let x = input[y].length - 1; x >= 0; x--) {
      if (input[y][x].height > previous) {
        input[y][x].visible = true;
        previous = input[y][x].height;
      }
    }
  }

  for (let x = 0; x < input[0].length; x++) {
    let previous = -1;
    for (let y = 0; y < input.length; y++) {
      if (input[y][x].height > previous) {
        input[y][x].visible = true;
        previous = input[y][x].height;
      }
    }

    previous = -1;
    for (let y = input[x].length - 1; y >= 0; y--) {
      if (input[y][x].height > previous) {
        input[y][x].visible = true;
        previous = input[y][x].height;
      }
    }
  }

  await new Output().write(input.flat().filter(i => i.visible).length.toString());
}
