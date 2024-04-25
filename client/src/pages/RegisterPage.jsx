import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function RegisterPage(){
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
async function registerUser(ev) {
  ev.preventDefault(ev);
  try {
    await axios.post('/register', {
      name,
      email,
      password,
    });
    alert('Registration succesful.Now you can log in');  
  }catch (e){
    alert('Registration failed.Please try again')
  } 
}    
return(
  <div className="flex items-center justify-center h-screen">
  <div className="bg-white p-8 rounded-2xl border border-blue-200 shadow-md max-w-md w-full">
    <h1 className="text-4xl text-center mb-4 font-semi-bold text-gray-700">Register</h1>
    <form className="max-w-md mx-auto" onSubmit={registerUser}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name and Surname"
          className="w-full px-3 py-2 border rounded-full focus:outline-none focus:border-blue-300"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-full focus:outline-none focus:border-blue-300"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-full focus:outline-none focus:border-blue-300"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-full hover:bg-primary-dark focus:outline-none"
      >
        Sign Up
      </button>
      <div className="text-center py-2 text-gray-500">
        Already a traveler?{' '}
        <Link to={'/login'} className="underline text-black">
          Login now
        </Link>
      </div>
    </form>
  </div>
</div>
);
}