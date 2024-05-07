import Task from '../models/task.model.js';

export  const createTask = async (req,res)=>{
    const task = req.body;
    const newTask = new Task(task);
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const getTasks = async (req,res)=>{
    console.log(req.body)
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const updateTask = async (req,res)=>{
    try{
        const {id} = req.params;
        const task = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');
        const updatedTask = await Task.findByIdAndUpdate(id,{...task,id},{new:true});
        res.json(updatedTask);
    }
    catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const deleteTask = async (req,res)=>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');
        await Task.findByIdAndRemove(id);
        res.json({message:'Task deleted successfully'});
    } catch (error) {
        res.status(404).json({message:error.message});
    } 
}

    

