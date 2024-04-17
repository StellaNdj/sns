import './components css/Post.css';
import Avatar from './Avatar';

const Post = ({post}) => {
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
        <p>Likes: <span>{post.likes}</span></p>
        <p>Dislikes: <span>{post.dislikes}</span></p>
      </div>
    </div>
  )
}

export default Post;
