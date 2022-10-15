import { toast } from 'react-toastify';
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {register} from '../../functions/auth'

const Register = () => {

  const navigate = useNavigate();

  const [value, setValue] = useState({
    fname : "",
    lname : "",
    username : "",
    password : "",
    password1 : "",
    email : "",
  })

  const handleChange = (e)=>{
    // console.log(e.target.name)
    // console.log(e.target.value)
    setValue({...value, [e.target.name] : e.target.value})
  }

  const handleSubmit =(e)=>{
     e.preventDefault();
     //console.log(value)

     if(value.password !== value.password1){
      toast.error("ລະຫັດຜ່ານບໍຕົງກັນ!!",  {
        theme: "colored",
      })
      
     }else{
      register(value).then((res)=>{
        toast.success(res.data,  {
          theme: "colored",
        })
        setTimeout(()=>{
          navigate('/login')
        }, 1500)
      }).catch((err)=>{
        toast.error(err.response.data,  {
          theme: "colored",
        })
      })
     }
  }
  return (
    <div className="container">
      <h2 className="text-center">ສະໝັກສະມາຊີກ</h2>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6">
          <form onSubmit={handleSubmit}>
          <div className="form-input my-2">
            <label htmlFor="fname" className="fs-6 fw-bold">ຊື່ : </label>
            <input type="text" name="fname" className="form-control" onChange={handleChange} required/>
          </div>
          <div className="form-input my-2">
            <label htmlFor="lname" className="fs-6 fw-bold">ນາມສະກຸນ : </label>
            <input type="text" name="lname" className="form-control" onChange={handleChange} required/>
          </div>
          <div className="form-input my-2">
            <label htmlFor="fname" className="fs-6 fw-bold">ຊື່ຜູ້ໃຊ້ : </label>
            <input type="text" name="username" className="form-control" onChange={handleChange} required/>
          </div>
          <div className="form-input my-2">
            <label htmlFor="password" className="fs-6 fw-bold">ລະຫັດຜ່ານ : </label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required/>
          </div>
          <div className="form-input my-2">
            <label htmlFor="password1" className="fs-6 fw-bold">ຢືນຍັນລະຫັດຜ່ານ : </label>
            <input type="password" name="password1" className="form-control" onChange={handleChange} required/>
          </div>
          <div className="form-input my-2">
            <label htmlFor="email" className="fs-6 fw-bold">ອີເມວ : </label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required/>
          </div>
          <div className="form-input my-2">
            <button className='btn btn-success px-3 fs-6' hidden={value.password.length < 6 }>ບັນທືກຟອມ</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register