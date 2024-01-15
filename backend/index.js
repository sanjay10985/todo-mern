import express from "express";
import Todos from "./schema/todoSchema.js";
import mongoose from "mongoose";
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
    origin: 'https://todo-mern-frontend-two.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie with CORS
  }));
  const corsOptions = {
    origin: 'https://todo-mern-frontend-two.vercel.app',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://sanjaytomar717:X7r6Y4qNA3htReM6@cluster0.mzdmlaj.mongodb.net/',{dbName : "todos"});

// Create todos
app.get('/',async(req,res) =>{
    const todos = await Todos.find({});
    res.send(todos);
})

app.post('/',async(req,res) =>{
    const {todo} = req.body;
    const newTodo = new Todos({
        todo:todo,
        completed : false,
    })
    await newTodo.save();
    console.log(newTodo);
    res.send(newTodo);
})

app.put('/:id',async(req,res) =>{
    const todoId = req.params.id;
    const todo = await Todos.findByIdAndUpdate(todoId,req.body);
     if(todo)
    res.send(todo);
    else         
    res.status(404).json({message: 'todo not found'});

})

app.delete('/',async (req,res) =>{
    // const todoId = req.params.id;
    // const deleteTodo = await Todos.findByIdAndDelete(todoId);
    const deleteTodo = await Todos.deleteMany({completed:true})
    if(deleteTodo.deletedCount> 0){
        res.send(deleteTodo);
    }
    else{
        res.status(404).send("Todo not found");
    }
})

// app.listen(3000,()=> console.log("server is running"))
module.exports = app;


