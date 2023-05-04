import { useEffect, useState } from 'react';
import FormContainer from '../Form/FormContainer';
import { EFormType } from '../../enums/form/authForm.enum';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, unAuth } from '../../store/slices/auth.slice';
import { RootState } from '../../store/store';

const NavMenu = () => {
    const [logInOpen, setLogInOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<
        EFormType.REGISTER | EFormType.LOGIN
    >(EFormType.LOGIN);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        // localStorage.setItem('token', 'authenticated');
        // if (!isAuth) {
        //     if (localStorage.getItem('token')) {
        //         dispatch(setAuth());
        //     } else {
        //         console.log('NOT AUTH');
        //     }
        // }
    }, []);
    const onButtonClick = (): void => {
        if (!isAuth) {
            setLogInOpen(true);
        } else {
            localStorage.removeItem('token');
            dispatch(unAuth());
        }
    };
    return (
        <>
            <div className='h-12'></div>
            <nav className='flex justify-around h-12 bg-black text-white items-center fixed top-0 left-0 right-0 z-50'>
                <NavLink to='/'>
                    <div className='flex items-center'>
                        <img
                            src={logo}
                            alt='Logo'
                            width='35px'
                            height='35px'
                            className='inline-block'
                        />
                        <span className='inline-block'>K.S.</span>
                    </div>
                </NavLink>
                <NavLink to='todos'>Todo</NavLink>
                <button
                    onClick={onButtonClick}
                    className='text-xl bg-transparent text-emerald-500 p-2 inline-block'
                >
                    {isAuth ? 'Log out' : 'Log in'}
                </button>
                {logInOpen && (
                    <FormContainer
                        toggleModal={setLogInOpen}
                        formType={modalType}
                        setModalType={setModalType}
                    />
                )}
            </nav>
        </>
    );
};

export default NavMenu;
