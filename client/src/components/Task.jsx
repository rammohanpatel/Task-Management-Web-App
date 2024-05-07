import React, { useState ,useEffect} from 'react';

const Task = () => {
  
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks,setTasks] = useState([]); 
  const [editingTaskId, setEditingTaskId] = useState(null);


  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.log('Failed to fetch tasks');
      }
    }

    getTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(task, priority, dueDate);
    const taskData = { task, priority, dueDate };

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

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
    <div className="flex flex-wrap">
      {tasks.map((task) => (
        <div key={task._id} className="card">
          <div className="card-body">
            {editingTaskId === task._id ? (
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Task
                </button>
              </form>
            ) : (
              <>
                <h5 className="card-title">{task.task}</h5>
                <p className="card-text">Priority: {task.priority}</p>
                <p className="card-text">Due Date: {task.dueDate}</p>
                <button className="btn btn-primary" onClick={() => handleEdit(task._id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(task._id)} className="btn btn-danger">Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
      <div className="container">
        <h1>Create a Task</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );

};

export default Task;
