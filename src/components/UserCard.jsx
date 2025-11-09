  import React from 'react'

  const UserCard = ({user}) => {
      const{firstName,lastName,photoUrl,about,age}=user;
      const defaultPhotoUrl = "https://via.placeholder.com/150";
    return (
      
          <div className="card bg-base-100 w-96 shadow-sm">
    <figure>
      <img
        src={photoUrl || defaultPhotoUrl}
        alt={`${firstName} ${lastName}`} />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
          {firstName} {lastName}
          {age && `, ${age}`}
      </h2>
      {about && <p>{about}</p>}
      <button>Intrested</button>
      <button>Ignore</button>
    </div>
  </div>
    
    )
  }

  export default UserCard