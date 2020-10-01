require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.get('/apply', (req, res) => {
    res.render('pages/apply');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/resources', (req, res) => {
    res.render('pages/resource');
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🚀 http://localhost:${port}`)
});
