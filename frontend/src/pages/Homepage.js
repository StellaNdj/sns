import React, { useEffect } from 'react';
import Post from '../components/Post';
import Profile from '../components/Profile';
import './pages css/Homepage.css';
import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Homepage = () => {
  const { posts, dispatch } = usePostContext();
  const { user } = useAuthContext();

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
    fetchPosts();
  }, [dispatch, user?.token])

  return (
    <div className="homepage">
      <div className='homepage-profile'>
        <Profile firstName={'Max'} lastName={'Mad'} username={'mad_max'}></Profile>
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
