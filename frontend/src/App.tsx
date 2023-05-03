import './App.css';
import NavMenu from './components/NavMenu/NavMenu';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <NavMenu></NavMenu>
            <div className='flex flex-col align-middle justify-center h-full'>
                <Outlet />
            </div>
        </>
    );
}

export default App;
