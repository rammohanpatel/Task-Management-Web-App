import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/user.js';


app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(express.json());

dotenv.config();

const PORT=process.env.PORT || 5000;

app.use(taskRoutes);
app.use(userRoutes);

app.post('/api/auth/signup',(req,res)=>{
    console.log(req.body);
    res.send({message:'Data received'});
})

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(PORT,()=> console.log(`Server running on port : ${PORT}`))
})
.catch((error)=>console.log(error.message))

