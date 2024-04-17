import './components css/Profile.css';
import Avatar from './Avatar';

const Profile = ({firstName, lastName, username}) => {


  return (
    <div>
      <div className="profile">
      <Avatar firstName={firstName} lastName={lastName} username={username}></Avatar>
    </div>
    </div>
  )
};

export default Profile;
