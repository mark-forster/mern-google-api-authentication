import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function SignUp() {
        const navigate= useNavigate();
        const [name, setname] = useState('')
        const [email, setemail] = useState('')
        const [password, setpassword] = useState('')

const registerHandle= async (e)=>{
    e.preventDefault();
    try{
        console.log(name, email, password)
        axios.post('http://localhost:7000/api/register',{name, email, password})
        .then((res)=>{
            if(res.data.error){
                toast.error(res.data.error)
            } else{
                toast.success(res.data.success)
                navigate('/signin')
            }

        })
    }
    catch(err){
        console.log(err);
    }
}

  return (
    <div className='d-flex align-items-center justify-content-center bg-secondary'>
        <div className="w-50 vh-100 m-5">
            <form action="" className='form-control' onSubmit={registerHandle}>
               <h1 className="text-center">Register</h1>
              <div className="mb-3">
              <label htmlFor="" className="form-label">Enter Name</label>
               <input type="text" className='form-control' placeholder='Enter Name' value={name}  onChange={(e)=>{
                setname(e.target.value)
               }}/>
              </div>
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
              <button type='submit' className='btn btn-primary w-100'>Register</button>
              <p>Already have an account <Link to='/signin'>login here?</Link> </p>
            </form>
        </div>
    </div>
  )
}

export default SignUp