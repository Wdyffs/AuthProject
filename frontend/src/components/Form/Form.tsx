import { Dispatch, SetStateAction } from 'react';
import FormField from '../InputField/InputContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormTypes, IFormInput } from '../../models/FormInput.model';
import { EFormInput, EFormType } from '../../enums/form/authForm.enum';
import ErrorInput from '../ErrorInput/ErrorInput';
import { useMutation } from '@tanstack/react-query';

type Props = {
    formType: FormTypes;
    toggleModal: Dispatch<SetStateAction<boolean>>;
    setModalType: Dispatch<
        SetStateAction<EFormType.REGISTER | EFormType.LOGIN>
    >;
};
type RegInfo = {
    login: string;
    password: string;
};

const Form = ({ formType, toggleModal, setModalType }: Props) => {
    const mutations = useMutation({
        mutationFn: (reginfo: RegInfo) => {
            return formType === EFormType.REGISTER
                ? fetch('http://localhost:3000/app/register', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json; charset=utf-8',
                      },
                      body: JSON.stringify(reginfo),
                  })
                : fetch('http://localhost:3000/app/register', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json; charset=utf-8',
                      },
                      body: JSON.stringify(reginfo),
                  });
        },
        onSuccess: () => {
            toggleModal(false);
        },
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>({ criteriaMode: 'all' });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        mutations.mutate(data);
    };

    return (
        <form
            className='inline-flex flex-col p-4 bg-sky-900 rounded-md p-8 animate-fall'
            onSubmit={handleSubmit(onSubmit)}
        >
            <legend className='text-amber-300 text-2xl m-auto mb-4'>
                {formType === EFormType.REGISTER
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
                className='mt-4 text-xl bg-pink-700 text-white p-2 rounded-md cursor-pointer hover:text-amber-300'
                type='submit'
                value={formType === EFormType.REGISTER ? 'Submit' : 'Log in'}
            />
            {formType === EFormType.LOGIN ? (
                <p className='mt-4 text-center'>
                    <span className='mr-2'>Have no account?</span>
                    <span
                        className='underline hover:text-amber-300 cursor-pointer'
                        onClick={() => setModalType(EFormType.REGISTER)}
                    >
                        Create new!!!
                    </span>
                </p>
            ) : (
                <p className='mt-4 text-center'>
                    <span className='mr-2'>Have already an account?</span>
                    <span
                        className='underline hover:text-amber-300 cursor-pointer'
                        onClick={() => setModalType(EFormType.LOGIN)}
                    >
                        Log in
                    </span>
                </p>
            )}
        </form>
    );
};

export default Form;
