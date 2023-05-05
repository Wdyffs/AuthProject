import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import MainPage from './pages/MainPage/MainPage';
import Todos from "./pages/Todos/Todos";
import FormContainer from "./components/Form/FormContainer";
import {EFormType} from "./enums/form/authForm.enum";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <MainPage/>,
      },
      {
        path: 'todos',
        element: <Todos/>,
      },
      {
        path: 'login',
        element: <FormContainer formType={EFormType.LOGIN}/>
      },
      {
        path: 'register',
        element: <FormContainer formType={EFormType.REGISTER}/>
      }
    ],
  },
]);
