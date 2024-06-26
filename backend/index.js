import express from "express";
import Todos from "./schema/todoSchema.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();
const MONGOOSE = process.env.MONGOOSE;

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.options('*', cors());
app.use(cors());

mongoose.connect(`${MONGOOSE}`,{dbName : "todos"});
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

app.listen(PORT,()=> console.log("server is running"))
// module.exports = app;


