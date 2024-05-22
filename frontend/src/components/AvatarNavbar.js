import './components css/Avatar.css';
import '../responsive.css';

const AvatarNavbar = ({firstName, lastName, username}) => {
  return (
    <div className="avatarNav">
      <div className="avatarNav-logo">
        {firstName.charAt(0)} {lastName.charAt(0)}
      </div>
      <div className="avatarNav-infos">
        <h3>{firstName} {lastName}</h3>
        <p>@{username}</p>
      </div>
    </div>
  )
};

export default AvatarNavbar;
