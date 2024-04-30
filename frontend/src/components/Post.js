import './components css/Post.css';
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const Post = ({post}) => {
  const { user } = useAuthContext();
  const [postComments, setPostComments] = useState([]);
  const [displayComments, setDisplayComments] = useState(false);

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

  return (
    <div className="post-card">
      <div className='avatar-date'>
        {post.user && (
          <div className="user-info">
            <Avatar
              firstName={post.user.firstName}
              lastName={post.user.lastName}
              username={post.user.username}
              />
          </div>
        )}
        <p className="post-date">{post.createdAt}</p>
      </div>
      <p>{post.content}</p>
      <div className="post-counters">
        <p><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon><span>{post.likes}</span>
        </p>
        <p><FontAwesomeIcon icon={faComment} onClick={handleComments}></FontAwesomeIcon><span>{post.comments ? post.comments.length : 0}</span></p>
      </div>
      { displayComments && (<div>
          { postComments.length > 0 && postComments.map((postComment) => {
            return <Post key={postComment.id} post={postComment}></Post>
          }) }
        </div>)
      }
    </div>
  )
}

export default Post;
