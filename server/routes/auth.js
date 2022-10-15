const express = require('express');
const router = express.Router();

//! import controllers
const {register, login, listUser, editUser, deleteUser, currentUser} = require('../controllers/auth.js')

//! import middleware
const {auth, adminCheck} = require('../middleware/auth')


router.post('/register', register) // Register


router.post('/login', login) // Login

// Check authorization in auth file from middleware folder
// Check token from middleware if user have a token and not expires
// so let make to controller
router.post('/current-user', auth, currentUser)


// Check role admin if you are not admin then check user
//Check authorization in middleware
// Let make auth file in middleware folder
router.post('/current-admin', auth, adminCheck ,currentUser)


// Test middleware 
// router.get('/1', auth, (req, res)=>{
//   res.send("Hello 1 test middleware")
// })

router.get('/auth', listUser)  // Fetching list data

router.put('/auth', editUser)  // Edit user

router.delete('/auth', deleteUser)  // Delete user

module.exports = router