import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <div className="bg-black h-full flex flex-col max-w-[1920px] mx-auto">
        <Navbar className='' />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
