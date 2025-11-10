import axios from 'axios'
import React, { use } from 'react'
import { useDispatch } from 'react-redux'
import UserCard from './UserCard'
import { addFeed } from '../utils/feedSLice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

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


    if(feed.length<=0) return<h1>No Feed  </h1>
  return feed && (
    <div><UserCard user={feed}/></div>
  )
}

export default Feed