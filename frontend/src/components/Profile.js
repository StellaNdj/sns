import './components css/Profile.css';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import Button from './Button';
import PostForm from './PostForm';
import { useLogout} from '../hooks/useLogoutContext';

const Profile = ({firstName, lastName, username}) => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="profile">
      <Avatar firstName={firstName} lastName={lastName} username={username}></Avatar>
      <Link to="/">
        <Button className="home-btn" text={'Home'} onClick={undefined}></Button>
      </Link>
      <Button className="post-btn" text={'Create a post'} onClick={undefined}></Button>
      <Button className="logout-btn" text={'Log out'} onClick={handleLogout}></Button>
      <PostForm></PostForm>
    </div>
    </div>
  )
};

export default Profile;
