import './components css/Profile.css';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import Button from './Button';

const Profile = ({firstName, lastName, username}) => {
  return (
    <div>
      <div className="profile">
      <Avatar firstName={firstName} lastName={lastName} username={username}></Avatar>
      <Link to="/">
        <Button className="home-btn" text={'Home'} onClick={undefined}></Button>
      </Link>
      <Button className="post-btn" text={'Create a post'} onClick={undefined}></Button>
      <Button className="logout-btn" text={'Log out'} onClick={undefined}></Button>
    </div>
    </div>
  )
};

export default Profile;
