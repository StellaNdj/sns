import { useParams } from "react-router-dom";

const PostView = () => {
  const { id } = useParams();

  return (
    <h3>Post : {id} </h3>
  )
}

export default PostView;
