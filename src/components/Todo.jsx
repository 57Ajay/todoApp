import { useState } from "react";
import "./Todo.css";
const Todo = () => {
  const [todos, setTodos] = useState([
    { text: 'Learn React', isCompleted: false },
    { text: 'Build a Todo app', isCompleted: false },
  ]);


  const [value, setValue] = useState('');


  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };


  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };


  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };


  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="todo"
            style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
          >
            {todo.text}
            <div>
              <button onClick={() => completeTodo(index)}>Complete</button>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};



export default Todo;