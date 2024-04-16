import { useState } from "react";

const PostForm = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {content};

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })

    const json = response.json();

    if(!response.ok) {
      setError(json.error);
      console.log(error);
    }

    if(response.ok) {
      console.log(json);
      console.log(content);
      setContent('');
      setError(null);
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}></textarea>
      <button>Post</button>
    </form>
  )
};

export default PostForm;
