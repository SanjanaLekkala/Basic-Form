import React, { useState } from "react";
import bcrypt, { hashSync } from "bcryptjs";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validation = () => {
    if (!username || !email || !password || !confirmpassword) {
      setError("Please enter all fields");
      return false;
    }
    if (password !== confirmpassword) {
      setError("Password not matched");
      return false;
    }
    if (password.length <= 8 || password.length >= 12) {
      setError("please enter the password in range from 8 to 12 letters only");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Email is invalid");
      return false;
    }

    setError(`"${username}" Successfully added`);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/signin");
    }, 2000);

    validation();
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const response = await fetch(" http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password: hashedPassword,
          confirmpassword,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("Username", username);
      localStorage.setItem("Email", email);
      localStorage.setItem("Password", hashedPassword);
      localStorage.setItem("Confirm Password", confirmpassword);
      const user = { username, email, password: hashedPassword };
      localStorage.setItem("user", JSON.stringify(user));
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      console.log(username, email, password, confirmpassword);
    } catch (error) {
      console.error("Error occured!");
    }
  };

  const reset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Enter the Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter you Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirm password"
          placeholder="Enter your Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
        <button type="clear" onClick={reset}>
          Cancel
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default SignUp;
