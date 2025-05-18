import React, { useEffect } from "react";
import NavBar from "./Navbar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

import axios from "axios";
import { addUser } from "../utils/userSlice";


const Body = () =>{

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const userData = useSelector((store)=>store.user);
   // fetchuser function is used for saving the Login data :
   const fetchUser = async()=>{
    if(userData)return ;
    try{
          const res = await axios.get(BASE_URL + "/profile/view", {
            withCredentials: true,
          });
          dispatch(addUser(res.data));
    }
    catch(err){
        if(err.status===401){
            navigate("/login");
        }
        // navigate("/login")
        console.log(err);
    }
   }

   useEffect(()=>{
    // if(!userData){
    fetchUser();
    // }
   }, []);

    return (
        <div>
              <NavBar/>
              <Outlet/>
              <Footer/>
        </div>
    )
}
export default Body;