const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./api/routes');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10MB' }));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/v1/', routes);
app.get('/health', (req, res) => {
    res.status(200).json({status: 'UP'});
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: res.statusCode,
        message: err.message
    });
});
module.exports = app;
