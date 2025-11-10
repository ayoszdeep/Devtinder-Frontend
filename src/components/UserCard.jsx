  import React from 'react'
  import { useDispatch } from 'react-redux'
  import axios from 'axios'
import { removeFeed } from '../utils/feedSLice';


  const UserCard = ({user}) => {
    const dispatch=useDispatch();

    const handleSumbit=async(status,userId)=>{
      try {
        const res= await axios.post("localhost:7777/request/send/"+status+"/"+userId,{},{withCredentials:true})
        dispatch(removeFeed(userId))
        
      } catch (error) {
        console.log(error);
        
        
      }
    }

      const{_id,firstName,lastName,photoUrl,about,age}=user;
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
      <button onClick={()=>handleSumbit("accepted",_id)}>Intrested</button>
      <button onClick={()=>handleSumbit("ignored",_id)}> Ignore</button>
    </div>
  </div> 
    
    )
  }

  export default UserCard