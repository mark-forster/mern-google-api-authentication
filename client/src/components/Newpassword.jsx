import React from 'react'

function Newpassword() {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center bg-secondary'>
    <div className="w-50 vh-100 m-5 container">
          <form action="" className='form-control'>
          <h1>NewPasword</h1>
       
               <div className="mb-3">
               <label htmlFor="" className="form-label">Enter OTP</label>
                <input type="number" className='form-control' />
               </div>
                <div className="mb-3">
                <label htmlFor="" className='form-label'>Enter new Password</label>
                <input type="password" className='form-control' />
                </div>
                <input type="submit" className='btn btn-primary' value='Change password' />
          
          </form>
    </div>
    </div>
    </>
  )
}

export default Newpassword