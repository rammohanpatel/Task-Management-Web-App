import React ,{useEffect}from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {   
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Task Manager</span>
      </div>
     
      <div className="">
          <button onClick={handleLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white lg:mt-0">Logout</button>      
      </div>
    </nav>
  );
};

export default Navbar;