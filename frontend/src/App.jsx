import React, { useEffect, useState } from 'react'
import './App.css'
import {CSSTransition,TransitionGroup} from 'react-transition-group'

const App = () => {
  const[input,setInput] = useState("");
  const[todos,setTodos]= useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/",{
      method: "GET"
    }).then((response) => {
      response.json().then((data) => {
        setTodos(data);
      })
    });
    
  },[todos]);

  useEffect(() => { 
    // const deleteTodo = () => {
    fetch("http://localhost:3000/",{
      method: "DELETE"
    })
    .then((response) => console.log(response))
  // }
  },[])

  const postTodo = () =>{
    if(input === "") return;
    fetch("http://localhost:3000/",{
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
    fetch("http://localhost:3000/" + id,{
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
          <input type="text" className='input' placeholder='Add Task' value={input} onChange={e => setInput(e.target.value)} onKeyPress={enterKey}/>
          <button type='submit' className='submit_button' onClick={postTodo}>+</button>
        </div>
        <div className="todo_output">
          <TransitionGroup>
          {todos.map((todo) => (
            <CSSTransition key={todo._id}timeout={200}classNames="fade">
            <div key={todo._id} className='todo_ind'>
              <input type="checkbox" className="check" checked={todo.completed ? 'check' : ""} onChange={() => toggleCompleted(todo._id,todo.completed)} />
              <span className="todo" style={{textDecoration: todo.completed ? 'line-through': ''}} onClick={() => toggleCompleted(todo._id,todo.completed)}>{todo.todo}</span>
              </div>
              </CSSTransition>
          ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  )
}


export default App