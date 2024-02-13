"use strict";

// no {} this time in import
import express from "express";
import fs from 'fs';
import morgan from 'morgan';
import { nextTick } from "process";

const port = process.argv[2] || 8000;
const app = express();
const file = 'db.json';

let db = JSON.parse(fs.readFileSync(file));

app.use(morgan('tiny'));
app.use(express.json());

// put middlewares here if any
function loadDB() {
    if (fs.existsSync(file))
        db = JSON.parse(fs.readFileSync(file));
    else
        throw('db.json not found');
}

// routing
app.get('/', (req, res) => res.send('Hi'))

app.get('/exit', (req, res) => {
    res.send('Bye')
    process.exit(0)
})

app.get('/restart', (req, res) => {
    try {
        loadDB();
        res.setHeader('Content-Type', 'text/plain');
        res.send('db.json reloaded');
    } catch (e) {
        console.log(e.message);
    }
})

app.get('/nbpapers', (req, res) => {
    try {
        loadDB();
        res.setHeader('Content-Type', 'text/plain');
        res.send(`${db.length}`);
    } catch (e) {
        console.log(e.message);
    }
})

app.get('/byauthor/:author', (req, res) => {
    loadDB();
    const author = req.params.author;
    const papersByAuthor = db.filter(paper =>
        paper.authors.some(authorName => authorName.toLowerCase().includes(author.toLowerCase())));
    const result = papersByAuthor.length + "";
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
})

app.get('/papersdesc/:author', (req, res) => {
    try {
        loadDB();
        const author = req.params.author;
        const papersByAuthor = db.filter(paper =>
            paper.authors.some(authorName => authorName.toLowerCase().includes(author.toLowerCase())));
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(papersByAuthor, null, 2));
    } catch (e) {
        console.log(e.message);
    }
})

app.get('/tt/:author', (req, res) => {
    try {
        loadDB();
        const author = req.params.author;
        const papersByAuthor = db.filter(paper =>
            paper.authors.some(authorName => authorName.toLowerCase().includes(author.toLowerCase())));
        const titles = papersByAuthor.map(paper => paper.title);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(titles, null, 2));
    } catch (e) {
        console.log(e.message);
    }
})

app.get('/reference/:key', (req, res) => {
    try {
        loadDB();
        const key = req.params.key;
        const paper = db.find(paper => paper.key === key);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(paper, null, 2));
    } catch (e) {
        console.log(e.message);
    }
})

app.delete('/reference/:key', (req, res) => {
    try {
        loadDB();
        const key = req.params.key;
        const paper = db.find(paper => paper.key === key);
        res.setHeader('Content-Type', 'text/plain');
        if (paper) {
            db = db.filter(paper => paper.key !== key);
            fs.writeFileSync(file, JSON.stringify(db, null, 2));
            res.send(`Paper with key ${key} deleted`);
        } else {
            res.send(`Paper with key ${key} not found`);
        }
    } catch (e) {
        console.log(e.message);
    }
})

app.post('/reference', (req, res) => {
    try {
        loadDB();
        res.setHeader('Content-Type', 'text/plain');
        if (req.body.length === 0) {
            res.send('No publication to add');
            return;
        }
        const newPublication = req.body;
        newPublication.key = "imaginary";
        db.push(newPublication);
        fs.writeFileSync(file, JSON.stringify(db, null, 2));
        res.send('Publication added');
    } catch (e) {
        console.log(e.message);
    }
})

app.put('/reference/:key', (req, res) => {
    loadDB();
    const key = req.params.key;
    const index = db.findIndex(paper => paper.key === key);
    res.setHeader('Content-Type', 'text/plain');
    if (index !== -1) {
        db[index] = { ...db[index], ...req.body };
        fs.writeFileSync(file, JSON.stringify(db, null, 2));
        res.send(`Paper with key ${key} updated`);
    } else {
        res.send(`Paper with key ${key} not found`);
    }
})

// server starting
app.listen(port, () => console.log(`Example app listening on port ${port}!`));