import Input from "../../shared/helper/io/input";
import Output from "../../shared/helper/io/output";

const getCharPriority = (char: string) => {
  const asci = char.charCodeAt(0);

  if (asci >= 97 && asci <= 122) {
    return asci - 96;
  } else if (asci >= 65 && asci <= 90) {
    return asci - 38;
  } else {
    throw new Error('unsuported');
  }
}

export default async function () {

  const input = (await new Input().setDelimiters('\n').readAsArray());

  const dups = input.map((rucksack) => {

    const firstCompartment = rucksack.substring(0, Math.floor(rucksack.length / 2));
    const secondCompartment = rucksack.substring(Math.floor(rucksack.length / 2));

    return Array.from(new Set(firstCompartment)).filter(char => secondCompartment.includes(char));
  }).flat();

  const totalPriority = dups.reduce((prev, current) => {
    return prev + getCharPriority(current);
  }, 0);

  await new Output().write(totalPriority.toString());
}
