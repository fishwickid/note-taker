// Connecting Dependencies

const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');


let noteData = require('./db/db.json');

// Connecting server to Herouko or PORT 3000 as a default
let PORT = process.env.PORT || 3000;

// Middleware require for the app, these are additionaly function methods for Express

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Create routes the the HTML Pages using GET requests

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    res.json(noteData);
})

// Create an Express post request

app.post('/api/notes', (req, res) => {
    noteData.push(req.body);
    noteData.forEach((note, i) => {
        note.id = i + 1;
    })
    let newNote = JSON.stringify(noteData);
    fs.writeFileSync('./db/db.json', newNote);

    res.json(noteData);
})

app.delete('/api/notes/:id', (req, res) => {

    let filtered = noteData.filter(note => note.id !== parseInt(req.params.id));
    fs.writeFileSync('./db/db.json', JSON.stringify(filtered));

    //alter the note data with the filtered results so when it sends the response back it is immediately showned on the front end
    noteData = filtered;

    res.json(noteData);

})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})