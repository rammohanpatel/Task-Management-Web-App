import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.js';
import checkUser from '../middleware/checkUser.js';


const router = express.Router();

router.get('/tasks', checkUser, getTasks);
router.post('/tasks', checkUser, createTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
