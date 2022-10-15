import React from 'react'
import {useSelector} from 'react-redux'
// import LoadingToRedirect
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = ({children}) => {
  
  // access data  to store  redux 
  const {user} = useSelector((state)=>({...state}))
  // show on console when you login success
  //console.log('Ueser Useselector : ', user)

  return user && user.token // Check user login
  ?  children
  : <LoadingToRedirect/>
}

export default UserRoute