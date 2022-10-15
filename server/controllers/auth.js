const bcrypt = require('bcryptjs');
const MyUser = require('../models/User')
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

//! #############  Register ##############

exports.register = async (req, res)=>{
  try {
    const {fname, lname, username, password, email} = req.body;    
    let user = await MyUser.findOne({username})
    //console.log("Username : ", user)
    // ? Check user exists
    if(user) {
      return res.status(400).send("ຊື່ຜູ້ໃຊ້ນີ້ມີຜູ້ໃຊ້ງານແລ້ວ ກະລຸນາລອງໃໝ່ !!")
    }

    const salt = await bcrypt.genSalt(10)

    user = new MyUser({
      fname, lname, username, password, email
    })

    //? Encript Password

    user.password = await bcrypt.hash(password, salt)

    await user.save();
    
    res.send("ສະໝັກສະມາຊີກສຳເລັດ");
     
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error!!')
  }
}

exports.login = async(req, res) =>{
  try {
    const {username, password} = req.body;
    var user = await MyUser.findOneAndUpdate({username},{new:true})

     if(user && user.enabled){
      
        const isMatch = await bcrypt.compare(password, user.password)
       
        if(!isMatch){
          return res.status(400).send("ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ!!")
        }
        // Payload
        const payload = {
          user : {
            username : user.username,
            role : user.role
          }
        }
        // Create Token
        jwt.sign(payload, 'jwtSecret', {expiresIn : 3600}, (err, token)=>{
          if(err)throw err
          res.json({token,payload})
        })
     }else{
      return res.status(400).send('ບໍ່ພົບຜູ້ໃຊ້ນີ້!!')
     }
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error!!')
  }
}

//! ################## currentUser #######################
// Let make extend from auth file in the route component
exports.currentUser = async(req, res)=>{
  try {
   // console.log("Hello current User")
  //  console.log("Controller : ",req.user) // Test from middleware
   
  const user = await MyUser.findOne({username:req.user.username}).select('-password').exec()

   //console.log('User : ' , user)//Then refresh on frontend

   res.send(user); // send user to frontend

  } catch (error) {
     console.log(error)
  }
}


//! ################# List User ###################
exports.listUser = async (req, res)=>{
  try {
    res.send('List get User')
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error!!')
  }
}

exports.editUser = async (req, res)=>{
  try {
    res.send('Edit User')
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error!!')
  }
}

exports.deleteUser = async (req, res)=>{
  try {
    res.send('Delete User')
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error!!')
  }
}