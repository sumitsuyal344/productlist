"use client"
import SignIn from '@/components/SignIn'
import React,{useState} from 'react'

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
        <SignIn setIsLoggedIn={setIsLoggedIn}/>
    </div>
  )
}

export default Login