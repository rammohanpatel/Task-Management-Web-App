import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaShareAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out Successfully');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Task Manager',
          text: 'Check out this awesome Task Manager app!',
          url: 'https://task-manager-by-ram.vercel.app/'
        });
      } else {
        // Fallback for browsers that do not support Web Share API
        // You can implement your own share functionality here
        console.log('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
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
          <button onClick={handleShare} className="block bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-600">
            <FaShareAlt className='text-white text-lg' />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
