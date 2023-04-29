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

type Props = {
    toggleModal: Dispatch<SetStateAction<boolean>>;
    formType: FormTypes;
};

const FormContainer = ({ toggleModal, formType }: Props) => {
    const blurAreaRef = useRef(null);
    const closeLogin: MouseEventHandler<HTMLElement> = (e) => {
        if (e.target == blurAreaRef.current) toggleModal(false);
    };
    const onSubmitForm: FormEventHandler<HTMLElement> = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                toggleModal(false);
            }
        };
        window.addEventListener('keyup', handleEsc);
        return () => {
            console.log('working');
            window.removeEventListener('keyup', handleEsc);
        };
    }, []);
    return (
        <section
            className='fixed top-0 bottom-0 w-full flex items-center justify-center z-2 blur-none backdrop-blur-sm'
            ref={blurAreaRef}
            onClick={(e) => closeLogin(e)}
            onSubmit={onSubmitForm}
        >
            <Form formType={formType} />
        </section>
    );
};

export default FormContainer;
