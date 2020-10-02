require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const checkToken = require('../src/middlewares/checkToken');
const { getApplications } = require('../src/handlers/applications');
const router = require('./routes');

app.set('view engine', 'ejs');

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
