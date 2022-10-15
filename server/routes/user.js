const express = require('express');
const router = express.Router();
// ! import user controller
const {listUsers, readUsers, updateUsers, removeUsers, changeStatus, changeRole} = require('../controllers/user')

//! import middleware
const {auth, adminCheck} = require('../middleware/auth')


router.get('/users',auth, adminCheck,listUsers) //1

router.get('/users/:id', readUsers) //2

router.put('/users/:id', updateUsers) //3

router.delete('/users/:id', removeUsers) //4



router.post('/change-status',auth, adminCheck, changeStatus) //5
router.post('/change-role',auth, adminCheck, changeRole) //6


module.exports = router