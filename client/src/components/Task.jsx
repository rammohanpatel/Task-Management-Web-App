import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


/**
 * Represents a Task component.
 * This component is responsible for managing task data, including creating, editing, and deleting tasks.
 * It also provides functionality to filter and search tasks.
 */
const Task = () => {
  // State variables for managing task data
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState(Date.now().toLocaleString());
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [taskData, setTaskData] = useState(false);
  const [filterPriority, setFilterPriority] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation hook for redirection
  const navigate = useNavigate();

  // Effect hook to check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  // Effect hook to fetch tasks data from API
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch('https://task-management-web-app.onrender.com/tasks', {
          method: "GET",
          headers: {
            'authToken': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log('Failed to fetch tasks');
      }
    };

    getTasks();
  }, [taskData]);

  // Function to handle task submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(dueDate);
    const currentDate = new Date();
    if (selectedDate < currentDate  && selectedDate.getDate() !== currentDate.getDate()){
      alert('Due date cannot be in the past');
      return;
    }
    const taskData = { task, priority, dueDate };
    console.log(dueDate);
    try {
      const response = await fetch('https://task-management-web-app.onrender.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log('Task created successfully');

        // Update the client-side state with the newly created task
        const newTask = await response.json();
        setTasks([...tasks, newTask]);

        // Clear input fields
        setTask('');
        setPriority('High');
        setDueDate('');
      } else {
        console.log('Failed to create task');
      }
    } catch (error) {
      console.log('Failed to create task');
    }
  };

  // Function to handle task editing
  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
    const selectedTask = tasks.find((task) => task._id === taskId);
    setEditTask(selectedTask.task);
    setEditPriority(selectedTask.priority);
    setEditDueDate(selectedTask.dueDate);
  };

  // Function to handle task updating
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskData = { task: editTask, priority: editPriority, dueDate: editDueDate };

    try {
      const response = await fetch(`https://task-management-web-app.onrender.com/tasks/${editingTaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log('Task updated successfully');

        // Update the task in the client-side state
        const updatedTasks = tasks.map((task) => {
          if (task._id === editingTaskId) {
            return { ...task, task: editTask, priority: editPriority, dueDate: editDueDate };
          }
          return task;
        });
        setTasks(updatedTasks);

        // Clear editing state
        setEditTask('');
        setEditPriority('High');
        setEditDueDate('');
        setEditingTaskId(null);
      } else {
        console.log('Failed to update task');
      }
    } catch (error) {
      console.log('Failed to update task');
    }
  };

  // Function to handle deletion of a task
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`https://task-management-web-app.onrender.com/tasks/${taskId}`, {
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
  };

  // Function to filter tasks based on priority and search query
  const filterTasks = () => {
    let filteredTasks = [...tasks];
    if (filterPriority !== '') {
      filteredTasks = filteredTasks.filter((task) => task.priority === filterPriority)
    }

    if (searchQuery !== '') {
      filteredTasks = filteredTasks.filter((task) => {
        return task.task.toLowerCase().includes(searchQuery.toLowerCase());
      })
    }
    console.log(filteredTasks);
    return filteredTasks;

  }

  // Function to toggle completion status of a task
  const handleCompleteToggle = async (taskId, completed) => {
    try {
      const response = await fetch(`https://task-management-web-app.onrender.com/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify({ completed }),
      });

      if (response.ok) {
        console.log('Task completion status updated successfully');
        const updatedTasks = tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, completed };
          }
          return task;
        });
        setTasks(updatedTasks);
      } else {
        console.log('Failed to update task completion status');
      }
    } catch (error) {
      console.log('Failed to update task completion status');
    }
  };

  // Function to format the date from "YYYY-MM-DD" to "DD Month, YYYY"
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // JSX for rendering Task component
  return (
    <>
      <Navbar />
      <div className="my-4 w-[75%] border mx-auto p-5 border-gray-200 rounded-lg shadow-xl ">
        <h1 className='text-center text-3xl font-bold mb-4'>Create your task </h1>
        <form onSubmit={handleSubmit}>
          <div className="border border-blue-200 rounded mb-2">
            <input
              type="text"
              placeholder="Enter task ..."
              required
              className="p-2 w-full bg-slate-50"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="justify-center mb-2 bg-slate-50 border p-2 border-blue-200 rounded">
            <label htmlFor="priority" className='text-lg'>Priority : {" "}</label>
            <select
              className="p-2 rounded-lg border bg-slate-50 border-blue-200 "
              placeholder="Select priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-2 border bg-slate-50 border-blue-200 p-2 rounded">
            <label htmlFor="dueDate" className='text-lg'>Due Date : {" "}</label>
            <input
              type="date"
              required
              className="p-2 rounded-lg border bg-slate-50 border-blue-200"
              placeholder='Due Date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button type="submit" className="text-white block m-auto bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
        </form>
      </div>

      {/* Filter and Search Tasks */}
      <div className='flex justify-evenly'>
        <div>
          <h1 className='text-center text-3xl font-bold mb-4'>Filter Tasks</h1>
          <div className="flex justify-center">
            <select
              className="p-2 rounded-lg border bg-slate-50 border-blue-200 "
              placeholder="Select priority"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <h1 className='text-center text-3xl font-bold mb-4'>Search Tasks</h1>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search task ..."
              className="p-2 border rounded-lg w-full bg-slate-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-row ">
        <div className='flex flex-wrap justify-center'>
          {
            filterTasks().map((task) => (
              <div key={task._id}>
                <div>
                  {editingTaskId === task._id ? (
                    // Edit Task Form
                    <div className='border w-80 border-gray-500 p-4 bg-zinc-100 m-4 rounded-lg shadow-lg'>
                      <form className='' onSubmit={handleUpdate}>
                        <div className="border border-blue-200 rounded mb-2">
                          <input
                            type="text"
                            required
                            placeholder="Enter task ..."
                            className="p-2 w-full bg-slate-50"
                            value={editTask}
                            onChange={(e) => setEditTask(e.target.value)}
                          />
                        </div>
                        <div className="mb-2 bg-slate-50 border p-2 border-blue-200 rounded">
                          <label htmlFor="priority" className='text-lg'>Priority : {" "}</label>
                          <select
                            className="p-2 rounded-lg border bg-slate-50 border-blue-200 "
                            placeholder="Select priority"
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                        <div className="mb-2 border bg-slate-50 border-blue-200 p-2 rounded">
                          <label htmlFor="dueDate" className='text-lg'>Due Date : {" "}</label>
                          <input
                            type="date"
                            required
                            className="p-2 rounded-lg border bg-slate-50 border-blue-200"
                            placeholder='Due Date'
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="text-white block m-auto bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                      </form>
                    </div>
                  ) : (
                    // Task Item
                    <div className='border w-80 border-gray-500 p-4 bg-zinc-100 m-4 rounded-lg shadow-lg'>
                      <input
                        className='w-4 h-4'
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleCompleteToggle(task._id, !task.completed)}
                      />
                      <h5 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>{task.task}</h5>
                      <p className={`font-semibold rounded-lg p-1 mt-2 ${task.completed ? 'line-through' : ''}`}>Due: {formatDate(task.dueDate)}</p>
                      <p className={`text-lg p-1 rounded-lg mt-2 font-semibold text-red-700 ${task.completed ? 'line-through' : ''}`}>{task.priority}</p>
                      <div className="flex justify-around mt-2">
                        <button onClick={() => handleEdit(task._id)} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Edit</button>
                        <button onClick={() => handleDelete(task._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Task;
