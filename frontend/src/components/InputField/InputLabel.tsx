import {ReactNode} from "react";

type Props = {
  htmlFor: string;
  children: ReactNode;
}
const InputLabel = ({htmlFor, children}: Props) => {
  return <label htmlFor={htmlFor} className="text-xl flex-1 self-center text-white mr-2">{children}</label>
}
export default InputLabel;