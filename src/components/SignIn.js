import React, { useState } from 'react';
import bcrypt from "bcryptjs";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] =useState("");
  const [error,setError] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    setTimeout(()=>{
      navigate("/users");

    },2000);
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email) {
      const isPasswordValid = bcrypt.compareSync(password, storedUser.password);
      if (isPasswordValid) {
        setEmail('');
        setPassword('');
        setError(`"${email}" successfully signed in`);
        console.log(email)
      } else {
        setError('Email or password is incorrect');
      }
    } else {
      setError('Email or password is incorrect');
    }
  }

  const reset = () =>{
    setEmail("");
    setPassword("");
  }


  const styles={
     
  }
  return (
    <div>
      <h1>Sign In</h1>
        <form style={{styles}}>
          <input name="email" placeholder='Please enter the email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type='password' name="password" placeholder='Please enter the password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button type='submit' onClick={handleSubmit}>Sign In</button>
          <button type='clear' onClick={reset}>Cancel</button>
          <p>{error}</p>
        </form>
    </div>
  )
}

export default SignIn;