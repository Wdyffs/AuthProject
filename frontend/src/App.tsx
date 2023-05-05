import './App.css';
import NavMenu from './components/NavMenu/NavMenu';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="h-full relative flex flex-col">
      <NavMenu></NavMenu>
      <div className='flex-1'>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
