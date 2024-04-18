const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://upajay:A1s2d3%40f4@cluster0.7vb9cvk.mongodb.net/todoApp')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(error => console.error('Failed to connect to MongoDB Atlas', error));

// Todo Schema
const todoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// Middleware
app.use(cors());

app.use(express.json());
// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({
      text,
      isCompleted: false,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add todo' });
  }
});

// Complete todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.isCompleted = true;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete todo' });
  }
});

// Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
