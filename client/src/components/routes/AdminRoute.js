import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
// import LoadingToRedirect
import LoadingToRedirect from './LoadingToRedirect'
// import current AdminUser from auth file in the functions folder
import { currentAdmin } from '../functions/auth' 

const AdminRoute = ({children }) => { 

  const [ok, setOk] = useState(false)
  // access data  to store  redux 
  const {user} = useSelector((state)=>({...state}))
  
  // Send data to server
  // let make auth file in functions folder
  useEffect(() => {
/// Check user admin role in store 
    if(user && user.token){
        currentAdmin(user.token)  
        .then((res) => {
        //  console.log(res)
          setOk(true)
        }).catch((err)=>{
        // console.log(err)
         setOk(false)
        })
    }

  }, [user])

  return ok // Check user role login is admin
  ?  children
  : <LoadingToRedirect/>

}

export default AdminRoute