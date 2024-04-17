import React from 'react';
import { Link } from 'react-router-dom';
import './components css/Navbar.css';
import Button from './Button';
import { useLogout} from '../hooks/useLogoutContext';
import PostForm from './PostForm';
import { useEffect, useState } from 'react';
import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from './Avatar';


const Navbar = () => {
  const { logout } = useLogout();
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/user/${user?.email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      const json = await response.json();

      if(response.ok) {
        setUserInfo(json.user);
      }
    }
    fetchUser();
  }, [dispatch, user?.email, user?.token])

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="navbar">
      <img src="SocNetLogo.png" alt="Logo"></img>
      <Link to="/">
        <Button text={"Home"}></Button>
      </Link>
      <Button className="post-btn" text={'Post'}></Button>
      <Button text={"Log out"} onClick={handleLogout}></Button>
      <PostForm></PostForm>
      {userInfo && (<Avatar firstName={userInfo.firstName} lastName={userInfo.lastName} username={userInfo.username}></Avatar>)}
    </div>
  )
}

export default Navbar;
