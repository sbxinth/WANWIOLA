const express = require('express');

const app = express();
app.use(express.json());

var movies = [
    {
        id: 0,
        name: "The Flash",
        type: "series",
        isPublished: false
    },
    {
        id: 1,
        name: "Arrow",
        type: "series",
        isPublished: true
    },
    {
        id: 2,
        name: "Harry Potter",
        type: "movie",
        isPublished: false
    }
];

app.get('/', (req, res) => {
    res.send('<h1>Hello Fucking World</h1>');
});

app.post('/api/movies', (req, res) => {
    console.log("run api movies");
    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        type: req.body.typeMovie,
        isPublished: req.body.isPublished
    };
    movies.push(movie);
    res.send(movie);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );