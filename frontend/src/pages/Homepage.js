import React, { useEffect } from 'react';
import Post from '../components/Post';
import './pages css/Homepage.css';
import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';
import PostForm from '../components/PostForm';

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
      console.log(json);

      if(response.ok) {
        dispatch({type: 'SET_POSTS', payload: json})
      }
    }
    fetchPosts();
  }, [dispatch, user?.token])

  return (
    <div className="homepage">
      <div className="homepage-posts">
        <div className="homepage-post-form">
          <PostForm></PostForm>
        </div>
        {posts && posts.map((post) => {
          return <Post key={post._id} post={post}></Post>
        })}
      </div>
    </div>
  )
}

export default Homepage;
