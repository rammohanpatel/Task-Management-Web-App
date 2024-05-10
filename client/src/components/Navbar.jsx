import React ,{useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {FaShareAlt} from 'react-icons/fa';


const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {   
      toast.success('Logged out Successfully');
      localStorage.removeItem('token');
      navigate('/'); 
    };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Task Manager</span>
      </div>
       
      <div className="flex items-center justify-end"></div>
 
      <div className="flex items-center justify-end">
  <button onClick={handleLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white lg:mt-0">
    Logout
  </button>
  <div className="ml-4">
    <a href='https://task-manager-by-ram.vercel.app/' target='_blank' className="block bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-600">
      <FaShareAlt className='text-white text-lg' />
    </a>
  </div>
</div>

      {/* <div className='flex '>
      <div className=" ">
          <button onClick={handleLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white lg:mt-0">Logout</button>  
          
      </div>
      <div>
      <FaShareAlt />
      </div>
      
      </div> */}
      

    </nav>
  );
};

export default Navbar;