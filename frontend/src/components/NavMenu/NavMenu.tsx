import {useState, MouseEventHandler, FormEventHandler} from 'react';
import FormContainer from '../Form/FormContainer';
import {EFormType} from '../../enums/form/authForm.enum';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/logo1.svg';

const NavMenu = () => {
  const [logInOpen, setLogInOpen] = useState<boolean>(false);
  const onButtonLogin = (): void => {
    setLogInOpen(true);
  };
  return (
    <nav className='flex justify-around h-12 bg-black text-white items-center'>
      <NavLink to='/'>
        <div className='flex items-center'>
          <img src={logo} alt='Logo' width='35px' height='35px' className='inline-block'/>
          <span className='inline-block'>K.S.</span>
        </div>
      </NavLink>
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
