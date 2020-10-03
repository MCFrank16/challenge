require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const checkToken = require('../src/middlewares/checkToken');
const { getApplications } = require('../src/handlers/applications');
const router = require('./routes');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(process.cwd() + '/public'));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.get('/', checkToken, (req, res) => {
    const { token, url } = req.token;
    res.render('pages/apply',{ token, url });
});

app.get('/login', checkToken, (req, res) => {
    const { token, url } = req.token;
    res.render('pages/login', { token, url });
});

app.get('/resources', checkToken, getApplications, (req, res) => {
    const { token, url } = req.token;
    const { applications } = req;
    res.render('pages/resource', {
        token,
        url,
        applications
    });
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🚀 http://localhost:${port}`)
});
