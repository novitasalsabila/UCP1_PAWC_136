const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo.js');
const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Simulasi data hewan dalam database
let animals = [
    { id: 1, name: 'Lion', species: 'Panthera leo', age: 5 },
    { id: 2, name: 'Elephant', species: 'Loxodonta', age: 10 }
];

// Halaman utama menampilkan daftar hewan
app.get('/', (req, res) => {
    res.render('index', { animals: animals });
});

// Halaman untuk menambah hewan
app.get('/add', (req, res) => {
    res.render('edit', { animal: null });
});

// Menambahkan data hewan
app.post('/add', (req, res) => {
    const { name, species, age } = req.body;
    const newId = animals.length ? animals[animals.length - 1].id + 1 : 1;
    animals.push({ id: newId, name, species, age });
    res.redirect('/');
});

// Halaman untuk mengedit data hewan
app.get('/edit/:id', (req, res) => {
    const animalId = parseInt(req.params.id);
    const animal = animals.find(a => a.id === animalId);
    if (animal) {
        res.render('edit', { animal });
    } else {
        res.status(404).send('Animal not found');
    }
});

// Menyimpan perubahan data hewan
app.post('/edit/:id', (req, res) => {
    const animalId = parseInt(req.params.id);
    const { name, species, age } = req.body;
    const animal = animals.find(a => a.id === animalId);
    if (animal) {
        animal.name = name;
        animal.species = species;
        animal.age = age;
        res.redirect('/');
    } else {
        res.status(404).send('Animal not found');
    }
});

// Menghapus data hewan
app.post('/delete/:id', (req, res) => {
    const animalId = parseInt(req.params.id);
    animals = animals.filter(a => a.id !== animalId);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
