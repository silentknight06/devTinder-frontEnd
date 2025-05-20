import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id,firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 rounded-md w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p> {about} </p>
        <div className="card-actions my-4 justify-center">
          <button className="btn btn-secondary" onClick={()=>{
            handleSendRequest("ignored", _id)
          }}>Ignore </button>
          <button className="btn btn-primary" onClick={()=>{
            handleSendRequest("interested", _id)
          }} > Interested </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
