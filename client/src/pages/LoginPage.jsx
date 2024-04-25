import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [redirect, setRedirect] = useState(false);
const {setUser} = useContext(UserContext);
async function handleLoginSubmit(ev){
  ev.preventDefault();
  try {
    const {data} = await axios.post('/login', {email,password});
    setUser(data);
    alert('Login successful');
    setRedirect(true);
  }catch(e){
    alert('Login Failed');
  }
}
if(redirect){
  return <Navigate to={'/'} />
}
    return(
      <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl border border-blue-200 shadow-md max-w-md w-full">
        <h1 className="text-4xl text-center mb-4 font-semi-bold text-gray-700">Welcome back</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
            Login
          </button>
          <div className="text-center mt-4 text-gray-500">
            Do not have an account yet?{' '}
            <Link to={'/register'} className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}