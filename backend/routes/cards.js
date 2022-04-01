const router = require('express').Router();
const { getCards, deleteCard, createCard, likeCard, dislikeCard } = require('../controllers/cards');
// const auth = require('../middlewares/auth');
const validation = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validation.checkCreateCard, createCard);
router.delete('/:cardId', validation.checkCardId, deleteCard);
router.put('/:cardId/likes', validation.checkCardId, likeCard);
router.delete('/:cardId/likes', validation.checkCardId, dislikeCard);

module.exports = router;
