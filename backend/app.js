require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/middlewares');
const ErrorNotFound = require('./error/ErrorNotFound');
const validation = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

/* app.use(cors({
  origin: [
    'https://api.krasnovid.students.nomoredomains.work',
    'https://krasnovid.students.nomoredomains.work',
    'https://localhost:3001',
  ],
})); */

app.use(cors()); // все адреса

app.use(requestLogger);

/* app.get('/crash-test', () => { // после ревью удалить
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); */

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.post('/signin', validation.checkLogin, login);
app.post('/signup', validation.checkUserCreate, createUser);

app.use((req, res, next) => {
  next(new ErrorNotFound('Not found'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
