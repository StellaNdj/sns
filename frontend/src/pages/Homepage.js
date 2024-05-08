import React, { useEffect } from 'react';
import Post from '../components/Post';
import './pages css/Homepage.css';
import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';
import PostForm from '../components/PostForm';
import PostHomepage from '../components/PostHomepage';

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

  const handlePostDelete = (postId) => {
    dispatch({type: 'DELETE_POST', payload: postId});
  }

  const handlePostLikes = (post) => {
    dispatch({type: 'UPDATE_LIKES_POST', payload: post})
  }
  return (
    <div className="homepage">
      <div className="homepage-posts">
        <div className="homepage-post-form">
          <PostHomepage>
            <PostForm></PostForm>
          </PostHomepage>
        </div>
        {posts && posts.map((post) => {
          return <Post key={post._id} post={post} onDelete={handlePostDelete} onLike={handlePostLikes}></Post>
        })}
      </div>
      <div className="homepage-rightside">
        <div className="homepage-quote">
          <h3>Quote of the day</h3>
          <p>“Does losing prove that you are weak? Isn't losing difficult for all of you? A challenge where, after ending up on your hands and knees, you must see if you can stand up again? If you stay on your hands and knees, that proves that you are weak.” - Haikyuu</p>
        </div>
        <div className="homepage-highlight">
          <h3>Highlights</h3>
          <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/Haikyuu-Season-4.jpeg" alt="Haikyuu pic" width={400}></img>
        </div>
      </div>
    </div>
  )
}

export default Homepage;
