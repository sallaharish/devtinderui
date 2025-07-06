import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { useEffect } from 'react';

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  // const userdata= useSelector((store) => store);
  // console.log(userdata, "userdata in body component");    

  const fetchUser = async () => {
    try { 
      const user = await axios.get(API_URL+"profile/view", { withCredentials: true });
      console.log(user.data, "user data in body component");
      if (user.data) {  
        dispatch(addUser(user.data));
      } 

    } catch (error) {
      if(error.response && error.response.status === 401) {
        // If the user is not authenticated, redirect to login
        navigate("/login");
      }
      // navigate("/login");  
      console.error("Error fetching user data:", error);
    }
  };
useEffect(() => {
  // if (userdata ) {
    fetchUser(); 
  // } 
}, []); // Fetch user data on component mount  

  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Body