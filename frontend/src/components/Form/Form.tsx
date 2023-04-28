import { KeyboardEventHandler, ReactNode, useEffect } from 'react';
import FormField from '../InputField/InputContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormTypes, IFormInput } from '../../models/FormInput.model';
import { EFormInput, EFormType } from '../../enums/form/authForm.enum';
import { ErrorMessage } from '@hookform/error-message';
import ErrorInput from '../ErrorInput/ErrorInput';
import { useMutation } from '@tanstack/react-query';

type Props = {
    formType: FormTypes;
};
type RegInfo = {
    login: string;
    password: string;
};

const Form = ({ formType }: Props) => {
    const mutations = useMutation({
        mutationFn: (reginfo: RegInfo) => {
            return fetch('http://localhost:3000/app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(reginfo),
            });
        },
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>({ criteriaMode: 'all' });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        mutations.mutate(data);
    };

    return (
        <form
            className='inline-flex flex-col p-4 bg-sky-900 rounded-md p-8 animate-fall'
            onSubmit={handleSubmit(onSubmit)}
        >
            <legend className='text-amber-300 text-2xl m-auto mb-4'>
                {formType === 'register'
                    ? 'Create an account'
                    : 'Log in to your existing account'}
            </legend>
            <FormField
                type='text'
                id='login'
                placeholder='Enter login...'
                register={register}
                label='login'
                required={true}
            >
                Login
            </FormField>
            <ErrorInput errors={errors} name={EFormInput.LOGIN} />
            <FormField
                type='password'
                id='password'
                placeholder='Enter password...'
                register={register}
                label='password'
                required={true}
            >
                Password
            </FormField>
            <ErrorInput errors={errors} name={EFormInput.PASSWORD} />
            {formType === 'register' && (
                <>
                    <FormField
                        type='checkbox'
                        id='privacy'
                        placeholder='Accept privacy policy:'
                        register={register}
                        label='privacy'
                        required={true}
                    >
                        Accept privacy policy:
                    </FormField>
                    <ErrorInput errors={errors} name={EFormInput.PRIVACY} />
                </>
            )}
            {mutations.isLoading && <p>Processing</p>}
            {mutations.isError && <p>Error</p>}
            <input
                className='mt-4 text-xl bg-pink-700 text-white p-2 rounded-md cursor-pointer'
                type='submit'
                value={formType === EFormType.REGISTER ? 'Submit' : 'Log in'}
            />
        </form>
    );
};

export default Form;