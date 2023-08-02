import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios';
function Forgotpassword() {
    const navigate = useNavigate();
    const [email, setemail] = useState('')

const forgotpasswordHandle= (e)=>{
    e.preventDefault();
    try{
        axios.post('http://localhost:7000/api/send-mail',{ email})
        .then((res)=>{
            if(res.data.error){
                toast.error(res.data.error)
            } else{
                toast.success(res.data.success)
                navigate('/newpassword')
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
        <form action="" className='form-control' onSubmit={forgotpasswordHandle}>
           <h1 className="text-center">Forget Password</h1>
          
          <div className="mb-3">
          <label htmlFor="" className="form-label">Enter Email</label>
           <input type="email" className='form-control' placeholder='Enter Email' value={email} onChange={(e)=>{
            setemail(e.target.value)
           }}/>
          </div>
          <button type='submit' className='btn btn-primary w-100'>Send</button>
           <Link to='/signin'>login</Link>
        </form>
    </div>
</div>
  )
}

export default Forgotpassword