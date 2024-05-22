import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import './components css/PostForm.css';
import '../responsive.css';
import Button from "./Button";
import { useThemeContext } from "../hooks/useThemeContext";

const PostForm = () => {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { darkTheme } = useThemeContext();

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
    <form className={darkTheme ? "post-form-dm" : "post-form"} onSubmit={handleSubmit}>
      <textarea
        placeholder="What's new?"
        onChange={(e) => setContent(e.target.value)}
        value={content}></textarea>
      <div className="post-form-btn">
        <Button className={'post-btn-form'} text={'Post'} onClick={undefined}></Button>
      </div>
    </form>
  )
};

export default PostForm;
