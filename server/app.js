import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.status(200);
    res.json({
        name: "Chike",
        message: "Welcome to More-Recipes"
    });

});


app.listen(port, () => console.log(`Application started on port ${port}`));