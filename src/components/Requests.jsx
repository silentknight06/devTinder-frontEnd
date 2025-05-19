import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async(status, _id)=>{
    try{
          const res =await  axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
            withCredentials:true,
          })

          dispatch(removeRequest(_id));
    }
    catch(err){
      // console.log(err);
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h1 className=" flex justify-center  my-10"> No Request Found </h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-4xl"> Connections Requests </h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex m-4 p-4  justify-between items-center rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                about="photo"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {" "}
                {firstName + " " + lastName}{" "}
              </h2>
              {age && gender && <p> {age + " " + gender} </p>}
              <p> {about}</p>
            </div>
          <div>

            <button className="btn btn-primary mx-3" onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
            <button className="btn btn-secondary mx-3" onClick={()=>reviewRequest("rejected", request._id)} >Reject </button>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
