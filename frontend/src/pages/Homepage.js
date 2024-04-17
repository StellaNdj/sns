import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import Profile from '../components/Profile';
import './pages css/Homepage.css';
import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Homepage = () => {
  const { posts, dispatch } = usePostContext();
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      const json = await response.json();

      if(response.ok) {
        dispatch({type: 'SET_POSTS', payload: json})
      }
    }

    const fetchUser = async () => {
      const response = await fetch(`/api/user/${user?.email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      const json = await response.json();

      if(response.ok) {
        setUserInfo(json.user);
      }
    }
    fetchPosts();
    fetchUser();
  }, [dispatch, user?.token])

  return (
    <div className="homepage">
      <div className='homepage-profile'>
        {userInfo && (<Profile firstName={userInfo.firstName} lastName={userInfo.lastName} username={userInfo.username}></Profile>)}
      </div>
      <div className="homepage-posts">
        {posts && posts.map((post) => {
          return <Post key={post._id} post={post}></Post>
        })}
      </div>
    </div>
  )
}

export default Homepage;
