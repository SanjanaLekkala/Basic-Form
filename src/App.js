import './App.css';
// import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React,{lazy,Suspense} from "react";
import Users from './components/Users';

const SignIn= lazy(()=>import("./components/SignIn"))

function App() {
  return (
    <div className="App">
      <Router>
      <nav className='nav'>
        <ul className='list'>
          <li className='listItems'>
            <a href="/">Sign Up</a>
          </li>
          <li className='listItems'>
          <Suspense fallback={<p>Loading ....</p>}>
            <a href='/signin'>Sign In</a>
           </Suspense>
          </li>
          <li className='listItems'>
            <a href="/users">Users</a>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/" element={<SignUp/>}  />
        <Route path="/users" element={<Users/>}  />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
