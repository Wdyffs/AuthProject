import { RegisterOptions } from 'react-hook-form';
import { EFormInput } from '../enums/form/authForm.enum';

export function createRequirements(
    type: EFormInput,
    required: boolean = false
): RegisterOptions {
    switch (type) {
        case EFormInput.LOGIN:
            return {
                minLength: {
                    value: 3,
                    message: 'Login must be at least 3 characters long',
                },
                maxLength: {
                    value: 18,
                    message: 'Login must be less than 19 characters long',
                },
                required: {
                    value: required,
                    message: 'Login is required',
                },
            };
            break;
        case EFormInput.PASSWORD:
            return {
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                },
                maxLength: {
                    value: 16,
                    message: 'Password must be less than 17 characters long',
                },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,16}$/,
                    message:
                        'Password must contain:\t 1 uppercase,\r 1 lowercase,\r 1 digit letter,\r 1 special symbol',
                },
                required: {
                    value: required,
                    message: 'Password is required',
                },
            };
        case EFormInput.PRIVACY:
            return {
                required: {
                    value: required,
                    message: 'Privacy is required',
                },
            };
    }
}
