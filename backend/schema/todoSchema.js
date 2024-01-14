import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo:String,
    completed:Boolean,
})

export default mongoose.model('Todos',todoSchema);