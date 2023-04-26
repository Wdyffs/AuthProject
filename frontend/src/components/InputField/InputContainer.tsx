import {HTMLInputTypeAttribute, ReactNode} from "react";
import InputLabel from "./InputLabel";
import InputField from "./InputField";
import {Path, UseFormRegister} from "react-hook-form";
import {IFormInput} from "../Form/Form";

type Props = {
  type: HTMLInputTypeAttribute;
  id: string;
  placeholder: string;
  children: ReactNode;

  register: UseFormRegister<IFormInput>;
  label: Path<IFormInput>;
  required: boolean;
}

const FormField = ({type, id ,placeholder, children, register, label, required}: Props) => {
  return (
    <div className="flex align-middle">
      <InputLabel htmlFor={id}>{children}</InputLabel>
      <InputField type={type} id={id} placeholder={placeholder} label={label} register={register} required={required} />
    </div>
  )
}
export default FormField;