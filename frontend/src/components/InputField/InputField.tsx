import { HTMLInputTypeAttribute } from 'react';
import { Path as FormPath, UseFormRegister } from 'react-hook-form';
import { IFormInput } from '../../models/FormInput.model';
import { createRequirements } from '../../utils/inputRequirements';
import { EFormInput } from '../../enums/form/authForm.enum';

type Props = {
    type: HTMLInputTypeAttribute;
    id: EFormInput;
    placeholder: string;

    register: UseFormRegister<IFormInput>;
    label: FormPath<IFormInput>;
    required: boolean;
};

const InputField = ({
    type,
    id,
    placeholder,
    register,
    label,
    required,
}: Props) => {
    const requireMents = createRequirements(id, required);
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            {...register(label, { ...requireMents })}
            className={
                'm-2 mr-0 ' +
                (type == 'checkbox'
                    ? 'w-6 h-6'
                    : 'h-4 text-xl p-4 pl-2 pr-2 bg-transparent text-white border-0 border-b-2 border-rose-500 outline-0 focus:border-amber-300')
            }
        />
    );
};

export default InputField;
