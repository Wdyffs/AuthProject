import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import MainPage from './pages/MainPage/MainPage';
import Todos from "./pages/Todos/Todos";

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
    ],
  },
]);
