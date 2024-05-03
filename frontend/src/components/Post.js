import './components css/Post.css';
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';
import CommentForm from './CommentForm';
import { usePostContext } from '../hooks/usePostContext';
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";


const Post = ({post}) => {
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();
  const [postComments, setPostComments] = useState([]);
  const [displayComments, setDisplayComments] = useState(false);

  // Display all the comments on a post
  const handleComments = () => {
    if (displayComments) {
      setDisplayComments(false);
    } else {
      const fetchComments = async () => {
        const response = await fetch(`/api/posts/${post._id}/comments`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          }
        })

        const json = await response.json();
        setPostComments(json);
      }
      fetchComments();
      setDisplayComments(true);
    }
  }

  // Updating the comments state when a new comment is added
  const handleNewComment = (newComment) => {
    setPostComments([...postComments, newComment]);
  }

  // Verify that only the user who created a post can delete it
  const deletePossible = () => {
    const userId = user.userId;
    if (userId === post.user._id) {
      return (<p><FontAwesomeIcon icon={faTrash} onClick={handleDelete}></FontAwesomeIcon></p>)
    } else {
      return null
    }
  }

  // Delete a post
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?')
    if(confirmDelete) {
      const deletePost = async () => {
        const response = await fetch(`/api/posts/${post._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          }
        })

        const json = await response.json();

        if(response.ok) {
          console.log(json);
          dispatch({type: 'DELETE_POST', payload: json})
        }
      }
      deletePost();
    }
  }

  return (
    <div className="post-card">
      <div className='avatar-date'>
        {post.user && post.user.firstName && post.user.lastName && post.user.username && (
          <div className="user-info">
            <Avatar
              firstName={post.user.firstName}
              lastName={post.user.lastName}
              username={post.user.username}
              />
          </div>
        )}
        <p className="post-date">·{formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}</p>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-counters">
        <p><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon><span>{post.likes}</span>
        </p>
        <p><FontAwesomeIcon icon={faComment} onClick={handleComments}></FontAwesomeIcon><span>{post.comments ? post.comments.length : 0}</span></p>
        {deletePossible()}
      </div>
      { displayComments && (<div>
          <CommentForm postId={post._id} onNewComment={handleNewComment}></CommentForm>
          { postComments.length > 0 && postComments.map((postComment) => {
            return <Post key={postComment._id} post={postComment}></Post>
          }) }
        </div>)
      }
    </div>
  )
}

export default Post;
