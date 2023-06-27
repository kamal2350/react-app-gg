import React, { useState, } from 'react'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import '../styles/loginpage.css';
import { HostName } from '../utils/config';
import { loginStart, loginSuccess } from '../redux/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const[credentails,setCredentials]= useState({
        'username':null,
        'password':null
    });

    const navigate = useNavigate();
  
    const handleChange = (e) => {
        setCredentials({...credentails,[e.target.name]:e.target.value});
    };

    const handleSubmit =async()=>{
       
       try {

            dispatch(loginStart());
                const user =  await axios.post(`http://localhost:4000/api/auth/login`,credentails,{
                    withCredentials:true,
                    credentails:'include'
                });
                
                window.localStorage.setItem("user",JSON.stringify(user.data));
                dispatch(loginSuccess(user.data));
                
                navigate('/');
                // navigate

       } catch (error) {
        
       }
          
       
    }

  return (
    
    <div className='login-container'>
      
        <div className='login-form'>
            
            <input type='text'  required="true" value={credentails.username} name="username"placeholder='Enter your email or number' onChange={handleChange}/>

            <input type='password' required = "true" value={credentails.password} name='password' placeholder='Enter your password' onChange={handleChange}/>

            <button type='submit' onClick={()=>handleSubmit()}>Submit</button>
        </div>
        
    </div>

    
  )
}

export default Login
