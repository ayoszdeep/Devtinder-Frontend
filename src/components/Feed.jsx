import axios from 'axios'
import React, { use } from 'react'
import { useDispatch } from 'react-redux'
import UserCard from './userCard'

const Feed = () => {
  
  const dispatch = useDispatch();
  const feed=useSelector((state)=>state.feed);
      const getFeed = async () => {
        if(feed) return;
        const response = await axios.get("localhost:7777/feed", { withCredentials: true })
        console.log(response.data)
        dispatch(addFeed(response.data))
       

      };
      useEffect(() => {
        getFeed();
      }, []);



  return feed && (
    <div><UserCard user={feed}/></div>
  )
}

export default Feed