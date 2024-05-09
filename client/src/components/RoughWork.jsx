// It is a file for rough work. It contains some code snippets that are not used in the project but can be used in the future.

// {tasks && tasks.map((task) => (
//     <div key={task._id} className="card">
//       <div className="card-body">
//         {editingTaskId === task._id ? (
//           <form onSubmit={handleUpdate}>
//             <div className="border border-blue-200 rounded mb-2">
//               <input
//                 type="text"
//                 required
//                 placeholder="Enter task ..."
//                 className="p-2 w-full bg-slate-50"
//                 value={editTask}
//                 onChange={(e) => setEditTask(e.target.value)}
//               />
//             </div>
//             <div className="mb-2 bg-slate-50 border p-2 border-blue-200 rounded">
//               <label htmlFor="priority" className='text-lg'>Priority : {" "}</label>
//               <select
//                 className="p-2 rounded-lg border bg-slate-50 border-blue-200 "
//                 placeholder="Select priority"
//                 value={editPriority}
//                 onChange={(e) => setEditPriority(e.target.value)}
//               >

//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//             <div className="mb-2 border bg-slate-50 border-blue-200 p-2 rounded">
//               <label htmlFor="dueDate" className='text-lg'>Due Date : {" "}</label>
//               <input
//                 type="date"
//                 required
//                 className="p-2 rounded-lg border bg-slate-50 border-blue-200"
//                 placeholder='Due Date'
//                 value={editDueDate}
//                 onChange={(e) => setEditDueDate(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
//           </form>
//         ) : (
//           <div className='border w-80 border-gray-500 p-4 bg-zinc-100 m-4 rounded-lg shadow-lg'>
//             <h5 className="text-lg font-semibold">{task.task}</h5>
//             <p className="font-semibold rounded-lg p-1 mt-2">Due : {task.dueDate}</p>
//             <p className=" text-lg p-1 rounded-lg mt-2 font-semibold text-red-700"> {task.priority}</p>
//             <div className="flex justify-around mt-2">
//               <button onClick={() => handleEdit(task._id)} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white

// dark:hover:bg-gray-700">Edit</button>

//               {/* <button onClick={()=>handleCompleted(task._id)} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Completed</button> */}
//               <button onClick={() => handleDelete(task._id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   ))}


  // const [username, setUsername] = useState('');

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/user', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'authToken': localStorage.getItem('token')
  //         }
  //       });
  //       if (response.ok) {
  //         const userData = await response.json();
  //         setUsername(userData.username);
  //       } else {
  //         console.log('Failed to fetch username');
  //       }
  //     } catch (error) {
  //       console.log('Error fetching username:', error);
  //     }
  //   };

  //   fetchUsername();
  // }, []);