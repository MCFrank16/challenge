require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('welcome to the world');
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🚀 http://localhost:${port}`)
});
