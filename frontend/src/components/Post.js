import './components css/Post.css';

const Post = ({post}) => {
  return (
    <div className="post-card">
      <p className="post-date">{post.createdAt}</p>
      <p>{post.content}</p>
      <div className="post-counters">
        <p>Likes: <span>{post.likes}</span></p>
        <p>Dislikes: <span>{post.dislikes}</span></p>
      </div>
    </div>
  )
}

export default Post;
