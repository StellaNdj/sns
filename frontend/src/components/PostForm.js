import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import './components css/PostForm.css';
import Button from "./Button";

const PostForm = () => {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      setError('You must be logged in');
      return
    }

    const post = {content};

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(post)
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
      dispatch({type: 'CREATE_POST', payload: json})
    }
  };

  return(
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}></textarea>
      <Button text={'Post'} onClick={undefined}></Button>
    </form>
  )
};

export default PostForm;
