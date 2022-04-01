const router = require('express').Router();
// const auth = require('../middlewares/auth');
const validation = require('../middlewares/validation');
const { getUsers, updateUserInfo, getCurrentUsers, getUsersId, updateUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.patch('/me', validation.checkUserInfo, updateUserInfo);
router.get('/me', getCurrentUsers);
router.patch('/me/avatar', validation.checkUserAvatar, updateUserAvatar);
router.get('/:userId', validation.checkUserId, getUsersId);

module.exports = router;
