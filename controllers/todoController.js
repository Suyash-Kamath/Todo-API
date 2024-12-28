const fs = require('fs');
const path = require('path');

exports.getAll = (req, res) => {
    const TODO_FILE = path.join(__dirname, '../data/todos.json');
    
    if (!fs.existsSync(TODO_FILE)) {
        fs.writeFileSync(TODO_FILE, JSON.stringify([]));
    }

    const getTodos = fs.readFileSync(TODO_FILE, 'utf-8');
    
   
    const todos = JSON.parse(getTodos);

    
    res.status(200).json(todos);
};

exports.getAllById = (req, res) => {
    const { id } = req.params;  

    const TODO_FILE = path.join(__dirname, '../data/todos.json');
    const getTodos = fs.readFileSync(TODO_FILE, 'utf-8');
    const todos = JSON.parse(getTodos);

   
    const todo = todos.find(todo => todo.id.toString() === id.toString());

    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    return res.status(200).json(todo);
};

exports.createNew = (req, res) => {
    const { title, description } = req.body;
    const TODO_FILE = path.join(__dirname, '../data/todos.json');

    const todos = JSON.parse(fs.readFileSync(TODO_FILE, 'utf-8'));

    const newEntry = {
        id: Date.now().toString(),
        title,
        description: description || ''
    };

    todos.push(newEntry);
    const stringified = JSON.stringify(todos);

    fs.writeFileSync(TODO_FILE, stringified);
    res.status(200).json({ status: 'Done with the Task of Creation' });
};

exports.updateById = (req, res) => {
    const TODO_FILE = path.join(__dirname, '../data/todos.json');

    const { id } = req.params;
    const { title, description } = req.body;

    const todos = JSON.parse(fs.readFileSync(TODO_FILE, 'utf-8'));
    const todo = todos.find(todo => todo.id.toString() === id.toString());  

    if (!todo) {
        return res.status(404).json({ error: 'Not found' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;

    fs.writeFileSync(TODO_FILE, JSON.stringify(todos));
    return res.status(200).json({ status: 'Done with updating' });
};

exports.deleteById = (req, res) => {
    const { id } = req.params;
    const TODO_FILE = path.join(__dirname, '../data/todos.json');


    const data = fs.readFileSync(TODO_FILE, 'utf-8');
    const todos = JSON.parse(data);

    const todoIndex = todos.findIndex(todo => todo.id.toString() === id.toString());  

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos));
    return res.status(200).json({ message: 'Todo deleted successfully' });
};
