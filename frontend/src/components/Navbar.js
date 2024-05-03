import React from 'react';
import { Link } from 'react-router-dom';
import './components css/Navbar.css';
import Button from './Button';
import { useLogout} from '../hooks/useLogoutContext';
import PostForm from './PostForm';
import { useEffect, useState } from 'react';
import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faHouse, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { useThemeContext } from '../hooks/useThemeContext';
import AvatarNavbar from './AvatarNavbar';



const Navbar = () => {
  const { logout } = useLogout();
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState();
  const { darkTheme, setDarkTheme } = useThemeContext(false);

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

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <div className="navbar">
      <img src="SocNetLogo.png" alt="Logo"></img>
      <div>
        <Link to="/">
          <Button className="home-btn" text={"Home"} icon={faHouse}></Button>
        </Link>
        <Button className="logout-btn" text={"Log out"} onClick={handleLogout} icon={faDoorOpen}></Button>
        <Button className="theme-btn" text={'Theme'} onClick={toggleTheme} icon={darkTheme ? faMoon : faSun}></Button>
        <Button className="post-btn" text={'Post'}></Button>
      </div>

      {userInfo && (<AvatarNavbar firstName={userInfo.firstName} lastName={userInfo.lastName} username={userInfo.username}></AvatarNavbar>)}
    </div>
  )
}

export default Navbar;
