const express = require('express');
const router = express.Router();
const { userPost, userLogin , userUpdate, userLogout, userDelete} = require('./../controllers/users.js');

router.route('/create/user')
    .post(userPost)

router.route('/login')
    .post(userLogin)

router.route('/user/update')
    .put(userUpdate)

router.route('/user/logout')
    .post(userLogout)

router.route('/user/delete')
    .delete(userDelete)

module.exports = router;
