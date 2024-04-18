import { useState, useEffect } from "react";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);
  
  const addTodo = () => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: value }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTodos([...todos, data]);
        setValue('');
      })
      .catch((error) => console.error("Error adding todo:", error));
  };
  
  
  const completeTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((updatedTodo) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error completing todo:", error));
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo();
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
              <button onClick={() => completeTodo(todo._id)}>Complete</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <textarea
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
