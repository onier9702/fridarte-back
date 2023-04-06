

const {Router} = require('express');

const { postComment, getComments } = require('../controller/commentsController');

const router = Router();

/*
    Here path is: /api/comments
*/

router.get('/', getComments);
router.post('/', postComment);

module.exports = router;