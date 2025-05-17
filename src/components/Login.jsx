import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("sachin@gmail.com");
  const [password, setPassword] = useState("Sachin@123");
   const dispatch = useDispatch();
    const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      },{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
      navigate("/");
    //   console.log(res.data.firstName);
    } catch (err) {
      console.log(err); 
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300  w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center"> Login Now </h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Your Emailid </legend>
              <input
                type="text"
                value={emailId}
                className="input"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Your Password</legend>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              LogIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
