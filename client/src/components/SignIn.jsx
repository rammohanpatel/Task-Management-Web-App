import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); // New state for loading

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/task');
    }
  }, [navigate]);

  const SignUser = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when Sign In button is clicked
    try {
      const response = await fetch('https://task-management-web-app.onrender.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, password: user.password })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Logged in Successfully');
        localStorage.setItem('token', data.token);
        navigate('/task');
      }
      else {   
        toast('Incorrect Password or Email', { icon: '🔒'   })     
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false); // Set loading back to false after form submission is complete
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className='text-center text-3xl font-semibold'>Welcome to Task Management App</div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={SignUser}>
          <div>
            <label htmlFor="email" className="block text font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            {/* Conditionally render loading bar */}
            {loading ? (
              <div className='flex w-full justify-center '>
                <CircularProgress />
              </div>
                         ) : (
              <button
                type="submit"
                className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-lg text-gray-500">
          Didn{"'"}t have an account?{' '}
          <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

