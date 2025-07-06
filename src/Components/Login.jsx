import React from "react";
import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants"; // Adjust the import path as necessary

function Login() {
  const [email, setEmail] = useState("thirduser@gmail.com");
  const [password, setPassword] = useState("thirduser@gmail.com"); 
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = {
        emailId: email,
        password: password, 

      };
      const response = await axios.post(API_URL+"login", data, { withCredentials: true });
      console.log(response.data.data, "data to see in ui")
      dispatch(addUser(response.data)); // Dispatch the user data to the Redux store
      navigation("/")
      


     
      // Redirect to profile page
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className="flex items-center justify-center mt-60">
      <div className="card w-96 bg-base-100 card-lg shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
         <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>    
            <input
              type="email"
              placeholder="Enter your email"    
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label"> 
              <span className="label-text">Password</span>
            </label>    
            <input
              type="password"

              placeholder="Enter your password" 
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="justify-end card-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
