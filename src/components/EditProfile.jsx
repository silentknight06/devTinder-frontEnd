import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [showToast, setShowToast] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setErr(" ");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <>
      <div className="flex  justify-center my-9 ">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300  w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center"> Edit Profile </h2>

              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name </legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => setfirstName(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name </legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender </legend>
                  <input
                    type="text"
                    value={gender}
                    className="input"
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> PhotoUrl </legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> About </legend>
                  <input
                    type="text"
                    value={about}
                    className="input"
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Type here"
                  />
                </fieldset>
              </div>
              <p className="text-red-600"> {err} </p>
              <div className="card-actions justify-center">
                {/* <p> eroor are acoming </p> */}
                <button onClick={saveProfile} className="btn btn-primary">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center ">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
