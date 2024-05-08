import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Task = () => {

  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskData, setTaskData] = useState(false);



  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
  }, [navigate])


  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks', { method: "GET", headers: { 'authToken': localStorage.getItem('token'), 'Content-Type': 'application/json' } });
        const data = await response.json();
        // console.log(data);
        // const DD=data.dueDate;
        // DD.split("").reverse().join("");
        // data.dueDate=DD;
        setTasks(data);
      } catch (error) {
        console.log('Failed to fetch tasks');
      }
    }

    getTasks();
  }, [taskData]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = { task, priority, dueDate };
    
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify(taskData),
      });
      

      setTaskData(response);



      if (response.ok) {
        console.log('Task created successfully');
        setTask('');
        setPriority('');
        setDueDate('');
      } else {
        console.log('Failed to create task');
      }
    } catch (error) {
      console.log('Failed to create task');
    }

  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
    const selectedTask = tasks.find((task) => task._id === taskId);
    setTask(selectedTask.task);
    setPriority(selectedTask.priority);
    setDueDate(selectedTask.dueDate);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskData = { task, priority, dueDate };

    try {
      const response = await fetch(`http://localhost:5000/tasks/${editingTaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      setTaskData(response.data);

      if (response.ok) {
        console.log('Task updated successfully');
        setTask('');
        setPriority('');
        setDueDate('');
        setEditingTaskId(null);
      } else {
        console.log('Failed to update task');
      }
    } catch (error) {
      console.log('Failed to update task');
    }
  }

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        console.log('Task deleted successfully');
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.log('Failed to delete task');
      }
    } catch (error) {
      console.log('Failed to delete task');
    }
  }

  return (
    <div className=" flex flex-col">
     
    <Navbar/>
    
    <div className=''>

    

    
      {tasks && tasks.map((task) => (
        <div key={task._id} className="card">
          <div className="card-body">
            {editingTaskId === task._id ? (
              <form onSubmit={handleUpdate}>
              <div className="border border-blue-200  rounded mb-2">
                <input
                  type="text"
                  placeholder="Enter task ..."
                  className="p-2 w-full bg-slate-50"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <div className="mb-2 bg-slate-50 border p-2 border-blue-200 rounded">
                <label htmlFor="priority" className='text-lg'>Priority : {" "}</label>
                <select
                  className="p-2 rounded-lg border bg-slate-50 border-blue-200 "
                  placeholder="Select priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="mb-2 border bg-slate-50 border-blue-200 p-2 rounded">
                <label htmlFor="dueDate" className='text-lg'>Due Date : {" "}</label>
                <input
                  type="date"
                  className="p-2 rounded-lg border bg-slate-50 border-blue-200"
                  placeholder='Due Date'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </form>          
            ) : (
              <div className='border border-gray-500 p-4 bg-zinc-100 m-4 rounded-lg shadow-lg'>
                <h5 className="text-lg font-semibold">{task.task}</h5>         
                  <p className="bg-yellow-200 rounded-lg p-1 mt-2">Due : {task.dueDate}</p>
                  <p className="bg-red-500 p-1 rounded-lg mt-2 font-semibold text-white"> {task.priority}</p>
                <div className="flex justify-around mt-2">
                 <button onClick={()=>handleEdit(task._id)} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Edit</button>
                 <button onClick={()=>handleDelete(task._id)} type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>                
                </div>                   
              </div>

              
            )}
          </div>
        </div>
      ))}
      <div className="border p-10 border-gray-200 rounded-lg shadow-xl ">
        <h1 className='text-3xl font-bold mb-4'>Create a Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="border border-blue-200  rounded mb-2">
            <input
              type="text"
              placeholder="Enter task ..."
              className="p-2 w-full bg-slate-50"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="mb-2 bg-slate-50 border p-2 border-blue-200 rounded">
            <label htmlFor="priority" className='text-lg'>Priority : {" "}</label>
            <select
              className="p-2 rounded-lg border bg-slate-50 border-blue-200 "
              placeholder="Select priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="mb-2 border bg-slate-50 border-blue-200 p-2 rounded">
            <label htmlFor="dueDate" className='text-lg'>Due Date : {" "}</label>
            <input
              type="date"
              className="p-2 rounded-lg border bg-slate-50 border-blue-200"
              placeholder='Due Date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>

        </form>
      </div>
      <button onClick={logout}>logout</button>
      </div>
    </div>
  );

};

export default Task;
