import { Link } from 'react-router-dom';
import './components css/Avatar.css';

const Avatar = ({firstName, lastName, username}) => {
  return (
    <div className="avatar">
      <div className="avatar-logo">
        {firstName.charAt(0)} {lastName.charAt(0)}
      </div>
      <div className="avatar-infos">
        <Link to={`/${username}`}>
          <h3>{firstName} {lastName}</h3>
        </Link>
        <p>@{username}</p>
      </div>
    </div>
  )
};

export default Avatar;
