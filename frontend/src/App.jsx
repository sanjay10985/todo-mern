import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const[input,setInput] = useState("");
  const[todos,setTodos]= useState([]);

  useEffect(() => {
    fetch("https://todo-mern-mauve.vercel.app/",{
      method: "GET"
    }).then((response) => {
      response.json().then((data) => {
        setTodos(data);
      })
    });
    
  },[todos]);

  useEffect(() => { 
    fetch("https://todo-mern-mauve.vercel.app/",{
      method: "DELETE"
    })
    .then((response) => console.log(response))
  },[])

  const postTodo = () =>{
    if(input === "") return;
    fetch("https://todo-mern-mauve.vercel.app/",{
      method: "POST",
      body: JSON.stringify({
        todo : input.charAt(0).toUpperCase() + input.slice(1),
        completed: false,
      }),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      setTodos([...todos,data]);
      setInput("");
      console.log(data);
    })
    .catch(err => console.log(err))
  }

  const enterKey = (e) =>{
    if(e.key === "Enter"){
      postTodo();
    }
  }

  const toggleCompleted = (id,completed) => {
    fetch("https://todo-mern-mauve.vercel.app/" + id,{
      method: "PUT",
      body: JSON.stringify({
        completed: !completed
      }),
      headers:{
        "Content-Type": "application/json"
    }
    })
    .then((response) => response.json())
    .then((data) => {
      setTodos(todos.map(todo => (todo._id === id ? {...todo,completed:!completed}:todo )))
    })
    .catch(err => console.log(err))
  }
  

  return (
    <div className='app'>
      <div className='todo-box'>
        <div className="todo_input">
          <input type="text" className='input' placeholder='Add Task' value={input} onChange={e => setInput(e.target.value)}/>
          <button type='submit' className='submit_button' onClick={postTodo}>+</button>
        </div>
        <div className="todo_output">
          {todos.map((todo) => (
            <div key={todo._id} className='todo_ind'>
              <input type="checkbox" className="check" checked={todo.completed ? 'check' : ""} onChange={() => toggleCompleted(todo._id,todo.completed)} onKeyPress={enterKey}/>
              <span className="todo" style={{textDecoration: todo.completed ? 'line-through': ''}} onClick={() => toggleCompleted(todo._id,todo.completed)}>{todo.todo}</span>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default App