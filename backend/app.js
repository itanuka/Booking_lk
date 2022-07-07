const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errors')


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());


// IMPORT ALL ROUTES
const movies = require('./routes/movie');
const theaters = require('./routes/theater');
const auth = require('./routes/auth');
const order = require('./routes/order');
const count = require('./routes/adminDashRoute');

const bodyParser = require('body-parser');

app.use('/api/v1', movies);
app.use('/api/v1', theaters);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', count);



app.use(errorMiddleware);

module.exports = app