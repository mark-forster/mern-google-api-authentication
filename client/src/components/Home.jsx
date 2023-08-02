import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate();
  useEffect(() =>{
    const token= localStorage.getItem('TOKEN')
    if(!token){
        navigate('/signin')
    }
  },[]);

  const handleLogout= ()=>{
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('EMAIL')
        navigate('/signin')
  }


  return (
    <div className='mx-5'>
      <h1>Home</h1>
      <div className='float-end'>
      <p>{localStorage.getItem("EMAIL")}</p>
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Home