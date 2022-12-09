import Input from "../../shared/helper/io/input";
import Output, {OutputType} from "../../shared/helper/io/output";


export default async function () {
  const input = (await new Input().readAs2dArray());
  const summed = input.map(inner => inner.reduce((c, n) => c + +n, 0));
  const biggest = summed.sort().pop() ?? -1;
  await new Output().write(biggest.toString());
}
