import './components css/Post.css';

const Post = ({post}) => {
  return (
    <div className="post">
      <p>{post.createdAt}</p>
      <p>{post.content}</p>
      <p>Likes: {post.likes} Dislikes {post.dislikes}</p>
    </div>
  )
}

export default Post;
