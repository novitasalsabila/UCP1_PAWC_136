const express = require('express');
const router = express.Router();

let animals = [
    {
        id: 1, name: 'Lion', species: 'Panthera leo', age: 5
    },
    {
        id: 2, name: 'Elephant', species: 'Loxodonta', age: 10
    },
    {
        id: 3, name: 'Giraffe', species: 'Giraffa camelopardalis', age: 3
    },
];


// Endpoint untuk mendapatkan data Todos
router.get('/', (req, res) => { res.json(todos); });
// POST METHOD untuk menambahkan data atau mengirimkan data pada server
router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Endpoint untuk menghapus tugas
router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    const deleteTodo = todos.splice(todoIndex, 1)[0]; // Menghapus dan menyimpan todo yang dihapus
    res.status(200).json({ message: `Tugas '${deleteTodo.task}' telah dihapus` });
});

// Endpoint untuk memperbarui tugas
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    todo.task = req.body.task || todo.task;

    res.status(200).json({
        message: `Tugas dengan ID: ${todo.id} telah diperbarui`,
        updatedTodo: todo
    });
});

module.exports = router;