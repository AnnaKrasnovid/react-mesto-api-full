const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const checkLink = Joi.string().custom((value, helper) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helper.message('Неверный формат ссылки');
});

const checkEmail = Joi.string().required().email();

const checkUserCreate = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: checkLink,
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required().min(8),
  }),
});

const checkUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const checkUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: checkLink,
  }),
});

const checkCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: checkLink,
  }),
});

const checkCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const checkUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  checkUserCreate,
  checkUserInfo,
  checkUserAvatar,
  checkCreateCard,
  checkCardId,
  checkUserId,
  checkLogin,
};
