import React from 'react'

const UserCard = ({user}) => {
    const { firstName, lastName, photoUrl, age, gender, skills, about}= user;
  return (
    <div className="card bg-base-300 rounded-md w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +lastName}</h2>
   {age && gender && <p>{age + ", " + gender}</p>}
   <p> {about} </p>
    <div className="card-actions my-4 justify-center">
      <button className="btn btn-secondary">Ignore </button>
        <button className="btn btn-primary"> Interested  </button>
    </div>
  </div>
</div>
  )
}

export default UserCard
 