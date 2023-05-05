import {useEffect, useState} from 'react';
import FormContainer from '../Form/FormContainer';
import {EFormType} from '../../enums/form/authForm.enum';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/logo1.svg';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth, unAuth} from '../../store/slices/auth.slice';
import {RootState} from '../../store/store';

const NavMenu = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      if (localStorage.getItem('accessToken')) {
        dispatch(setAuth());
      }
    }
  }, [isAuth]);
  const onButtonClick = (): void => {
    localStorage.removeItem('accessToken');
    dispatch(unAuth());
  }
  return (
    <>
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
        <div className={"flex items-center"}>
          {
            isAuth ?
              <button
                onClick={onButtonClick}
                className='text-xl bg-transparent text-emerald-500 p-2 inline-block'
              >
                Log out
              </button>
              :
              <NavLink to={"login"}
                       className={"text-xl bg-transparent text-emerald-500 p-2 inline-block"}
              >
                Log in
              </NavLink>
          }
          {
            !isAuth ?
              <NavLink to={"register"}
                       className={"text-xl bg-transparent text-amber-300 p-2 inline-block "}
              >
                Create account
              </NavLink> : <p className={"w-9 h-9 bg-white rounded-full"}></p>
          }
        </div>
      </nav>
    </>
  )
};

export default NavMenu;
