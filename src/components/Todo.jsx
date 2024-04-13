import { useState } from "react";
const Todo=()=>{
    const [todo,setTodo]=useState([
        {task: "Go to store", done: false},
        {task: "Go to work", done: true}, 
        {task: "Go to gym", done: false}
    ]);
    const [newTodos,setNewTodos]=useState(""); 
    
    const setNewTodo=(e)=>{
        e.preventDefault();
        setTodo([...todo,{task: newTodos, done: Math.random()>0.5}]); 
        console.log(todo);
        setNewTodos("");
    };

    const textHandler = (e) => {
        setNewTodos(e.target.value);
    }
    return(
        <div>
            <div><textarea onChange={textHandler}/></div>
            <div><button onClick={setNewTodo}>Add Todo</button></div>
            <div>{todo.map((todo)=>(<div key={todo.task} >{todo.task}</div>))}</div>
        </div>
    );
};

export default Todo;