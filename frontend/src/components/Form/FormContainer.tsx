import {
    Dispatch,
    FormEventHandler,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useRef,
} from 'react';
import Form from './Form';
import { FormTypes } from '../../models/FormInput.model';
import { EFormType } from '../../enums/form/authForm.enum';

type Props = {
    toggleModal: Dispatch<SetStateAction<boolean>>;
    formType: FormTypes;
    setModalType: Dispatch<
        SetStateAction<EFormType.REGISTER | EFormType.LOGIN>
    >;
};

const FormContainer = ({ toggleModal, formType, setModalType }: Props) => {
    const blurAreaRef = useRef(null);
    const closeLogin: MouseEventHandler<HTMLElement> = (e) => {
        if (e.target == blurAreaRef.current) toggleModal(false);
    };
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                toggleModal(false);
            }
        };
        window.addEventListener('keyup', handleEsc);
        return () => {
            window.removeEventListener('keyup', handleEsc);
        };
    }, []);
    return (
        <section
            className='fixed top-0 bottom-0 w-full flex items-center justify-center z-30 blur-none backdrop-blur-sm'
            ref={blurAreaRef}
            onClick={(e) => closeLogin(e)}
        >
            <Form
                formType={formType}
                toggleModal={toggleModal}
                setModalType={setModalType}
            />
        </section>
    );
};

export default FormContainer;
