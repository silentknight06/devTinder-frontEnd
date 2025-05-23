import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogInForm, setIsLogInForm] = useState(true);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
      //   console.log(res.data.firstName);
    } catch (err) {
      setErr("🧠Remember you Id & P/w , then try again...");
      console.log(err);
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setErr("💻 Something Went Wrong:" + err);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300  w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {" "}
            {isLogInForm ? "Login Now" : "SignUp Now "}{" "}
          </h2>
          <div>
            {!isLogInForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Enter Your First Name{" "}
                  </legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Enter Your LastName{" "}
                  </legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>
              </>
            )}

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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <p className="text-red-600"> {err} </p>
          <div className="card-actions justify-center">
            {/* <p> eroor are acoming </p> */}
            <button
              className="btn btn-primary"
              onClick={isLogInForm ? handleLogin : handleSignup}
            >
              {isLogInForm ? "Login" : "Sign Up "}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLogInForm((value) => !value)}
          >
            {" "}
            {isLogInForm
              ? "New User SignUp Here "
              : "Existing User Login Here "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
