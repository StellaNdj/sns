import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import './components css/PostForm.css';
import '../responsive.css';
import Button from "./Button";

const CommentForm = ({ postId, onNewComment }) => {
  const { user } = useAuthContext();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      setError('You must be logged in');
      return
    }

    const comment = { content };
    console.log(postId);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(comment)
    })

    const json = await response.json();
    console.log(json);

    if(!response.ok) {
      setError(json.error);
      console.log(error);
    }

    if(response.ok) {
      setContent('');
      setError(null);
      onNewComment(comment);
    }
  };

  return(
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}></textarea>
      <Button text={'Comment'} onClick={undefined}></Button>
    </form>
  )
};

export default CommentForm;
