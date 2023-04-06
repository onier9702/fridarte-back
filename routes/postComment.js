

const {Router} = require('express');

const { postComment, getComments } = require('../controller/commentsController');

const router = Router();

/*
    Here path is: /api/comments
*/

router.post('/', postComment);
router.get('/', getComments);

module.exports = router;