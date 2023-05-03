import { useState, MouseEventHandler, FormEventHandler } from 'react';
import FormContainer from '../Form/FormContainer';
import { EFormType } from '../../enums/form/authForm.enum';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
    const [logInOpen, setLogInOpen] = useState<boolean>(false);
    const onButtonLogin = (): void => {
        setLogInOpen(true);
    };
    return (
        <nav className='flex justify-around h-12 bg-black text-white items-center'>
            <img src='#' alt='Logo' width='40px' height='40px' />
            <NavLink to='todos'>Todo</NavLink>
            <button
                onClick={onButtonLogin}
                className='text-xl bg-transparent text-emerald-500 p-2 inline-block'
            >
                Log in
            </button>
            {logInOpen && (
                <FormContainer
                    toggleModal={setLogInOpen}
                    formType={EFormType.REGISTER}
                />
            )}
        </nav>
    );
};

export default NavMenu;
