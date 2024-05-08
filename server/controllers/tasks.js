import Task from '../models/task.model.js';
import mongoose from 'mongoose';

export const createTask = async (req, res) => {
    const { priority, dueDate, task } = req.body;
    console.log();
    try {
        const newTask = await Task.create({
            task, dueDate, priority, userId: req.body.decodedToken.id
        })
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getTasks = async (req, res) => {
    const { id } = req.body.decodedToken;
    try {
        const tasks = await Task.find({ userId: id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');
        const updatedTask = await Task.findByIdAndUpdate(id, { ...task, id }, { new: true });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');
        await Task.findByIdAndDelete(id);
        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



