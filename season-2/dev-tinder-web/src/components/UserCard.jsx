import React from 'react'

// const UserCard = ({user}) => {
//   // console.log(user);
//   const {firstName,lastName,photoUrl,age,gender,about}=user;
//   return (
   
//       <div className="card bg-sky-500 w-96 shadow-xl">
      
//       {/* <div className="card bg-sky-500 w-96 shadow-xl min-h-[792px]"></div> */}
//   <figure>
//     <img
//       className="rounded-full"
//       src={user.photoUrl}
//       alt="photo"/>
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">{firstName+" "+lastName}</h2>
//     {age && gender && <p>{age+", "+gender}</p>}
//     <p>{about}</p>
//     <div className="card-actions justify-center my-4">
//       <button className="btn btn-primary">Ignore</button>
//       <button className="btn btn-secondary">Interested</button>
//     </div>
//   </div>
// </div>
  
//   )
// }

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-sky-500 w-96 shadow-xl">
      {/* Card Image */}
      <figure className="pt-6">
        <img
          className="rounded-full w-24 h-24 object-cover"
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
      </figure>

      {/* Card Body */}
      <div className="card-body items-center text-center">
        {/* Name */}
        <h2 className="card-title text-white">
          {`${firstName} ${lastName}`}
        </h2>

        {/* Age and Gender */}
        {age && gender && (
          <p className="text-white">
            {`${age} years old, ${gender}`}
          </p>
        )}

        {/* About */}
        <p className="text-white">
          {about || "No additional details available."}
        </p>

        {/* Buttons */}
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};


export default UserCard
