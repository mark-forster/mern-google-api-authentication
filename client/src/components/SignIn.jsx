import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function SignIn() {
    const navigate= useNavigate();
    const [email, setemail] = useState('')
        const [password, setpassword] = useState('')
    const loginHandle= async (e)=>{
        e.preventDefault();
       console.log(email, password)
       try{
        axios.post('http://localhost:7000/api/login',{ email, password})
        .then((res)=>{
            if(res.data.error){
                toast.error(res.data.error)
            } else{
                toast.success(res.data.success)
                localStorage.setItem('TOKEN', res.data.token)
                localStorage.setItem('EMAIL', res.data.email)
                navigate('/')
            }

        })
       }
       catch(err){
        console.log(err)
       }
    }

  return (
    <div className='d-flex align-items-center justify-content-center bg-secondary'>
    <div className="w-50 vh-100 m-5">
        <form action="" className='form-control' onSubmit={loginHandle}>
           <h1 className="text-center">Login</h1>
          
          <div className="mb-3">
          <label htmlFor="" className="form-label">Enter Email</label>
           <input type="email" className='form-control' placeholder='Enter Email' value={email} onChange={(e)=>{
            setemail(e.target.value)
           }}/>
          </div>
          <div className="mb-3">
          <label htmlFor="" className="form-label">Enter Password</label>
           <input type="password" className='form-control' placeholder='Enter Password' value={password} onChange={(e)=>{
            setpassword(e.target.value)
           }}/>
          </div>
          <button type='submit' className='btn btn-primary w-100'>Login</button>
          <p> Create an account <Link to='/signup'>register here?</Link> </p>
           <Link to='/forgotpassword'>Forgot Password</Link>
        </form>
    </div>
</div>
  )
}

export default SignIn