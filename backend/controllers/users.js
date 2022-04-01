/* eslint-disable max-len */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../error/ErrorNotFound');
const ErrorConflict = require('../error/ErrorConflict');
const ErrorValidation = require('../error/ErrorValidation');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) {
    next(new ErrorValidation('Не правильный логин или пароль'));
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict(`Пользователь с таким ${email} уже существует`);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsersId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new ErrorNotFound('Пользователь с таким id не найден');
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new ErrorNotFound('Пользователь с таким id не найден');
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getCurrentUsers = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};
