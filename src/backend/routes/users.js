const express = require('express');
const router = express.Router();
const { userPost, userLogin , useUpdate, userLogout, userDelete} = require('./../controllers/users.js');

router.route('/create/user')
    .post(userPost)

router.route('/login')
    .post(userLogin)

router.route('/user/update')
    .post(useUpdate)

router.route('/user/logout')
    .post(userLogout)

module.exports = router;
