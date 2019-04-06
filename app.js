const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const taskRoute = require('./routes/tasks');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const sql = require('./sql-connector')
sql.connect().then(() => {
    require('./sequalize')
}).catch((err) => {
    console.error("error occurred:", err)
})

// require('./mongoose-connection')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/v1', usersRouter);
app.use('/v1/user', taskRoute);



module.exports = app;
