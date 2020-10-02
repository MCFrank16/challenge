require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');

app.set('view engine', 'ejs');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.get('/', (req, res) => {
    res.render('pages/apply');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/resources', (req, res) => {
    const { token } = req.cookies;
    
    res.render('pages/resource', {
        token
    });
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🚀 http://localhost:${port}`)
});
