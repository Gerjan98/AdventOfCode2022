import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

const rangeContains = (firstStart: number, secondStart: number, firstEnd: number, secondEnd: number) => {
  return (firstStart >= secondStart && firstEnd <= secondEnd);
}

export default async function () {

  const input = (await new Input().setDelimiters('\n', ',').readAs2dArray());

  const dups = input.filter((pair) => {
    const [firstStart, firstEnd] = pair[0].split('-').map(n => +n);
    const [secondStart, secondEnd] = pair[1].split('-').map(n => +n);

    return rangeContains(firstStart, secondStart, firstEnd, secondEnd) || rangeContains(secondStart, firstStart, secondEnd, firstEnd);
  })

  await new Output().write(dups.length.toString());
}
