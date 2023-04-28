import { ErrorMessage } from '@hookform/error-message';
import { EFormInput } from '../../enums/form/authForm.enum';
import { FieldErrors } from 'react-hook-form';
import { IFormInput } from '../../models/FormInput.model';
type Props = {
    errors: FieldErrors<IFormInput>;
    name: EFormInput;
};
const ErrorInput = ({ errors, name }: Props) => {
    return (
        <div className='break-words w-80'>
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <p key={type} className='text-rose-500 font-medium'>
                            {message}
                        </p>
                    ))
                }
            />
        </div>
    );
};

export default ErrorInput;
