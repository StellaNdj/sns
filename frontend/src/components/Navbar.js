import React from 'react';
import { Link } from 'react-router-dom';
import './components css/Navbar.css';
import '../responsive.css';
import Button from './Button';
import { useLogout} from '../hooks/useLogoutContext';
import { useEffect, useState } from 'react';
import { usePostContext } from '../hooks/usePostContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faHouse, faDoorOpen, faUser, faPen } from '@fortawesome/free-solid-svg-icons';
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${user?.email}`, {
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
    <>
      <div className="navbar">
        <img src="SocNetLogo.png" alt="Logo"></img>
        <div>
          <Link to="/">
            <Button className={darkTheme ? "home-btn-dm" : "home-btn"} text={"Home"} icon={faHouse}></Button>
          </Link>
          <Button className={darkTheme ? "logout-btn-dm" : "logout-btn"} text={"Log out"} onClick={handleLogout} icon={faDoorOpen}></Button>
          <Button className={darkTheme ? "theme-btn-dm" : "theme-btn"} text={'Theme'} onClick={toggleTheme} icon={darkTheme ? faMoon : faSun}></Button>
          <Link to={`/${user?.username}`}>
            <Button className={darkTheme ? "profile-btn-dm" : "profile-btn"} text={'Profile'} icon={faUser}></Button>
          </Link>
          <Button className="post-btn" text={'Post'} icon={faPen}></Button>
        </div>

        {userInfo && (<AvatarNavbar firstName={userInfo.firstName} lastName={userInfo.lastName} username={userInfo.username}></AvatarNavbar>)}
      </div>

      <div className="mobile-navbar">
        <div className='mobile-navbar-top'>
          {userInfo && (<AvatarNavbar firstName={userInfo.firstName} lastName={userInfo.lastName} username={userInfo.username}></AvatarNavbar>)}
          <img src="SocNetLogo.png" alt="Logo"></img>
        </div>

        <div className={darkTheme ? 'mobile-navbar-bottom-dm' : 'mobile-navbar-bottom'}>
          <Link to="/">
            <Button className={darkTheme ? "home-btn-dm" : "home-btn"} text={"Home"} icon={faHouse}></Button>
          </Link>
          <Button className={darkTheme ? "logout-btn-dm" : "logout-btn"} text={"Log out"} onClick={handleLogout} icon={faDoorOpen}></Button>
          <Button className={darkTheme ? "theme-btn-dm" : "theme-btn"} text={'Theme'} onClick={toggleTheme} icon={darkTheme ? faMoon : faSun}></Button>
          <Link to={`/${user?.username}`}>
            <Button className={darkTheme ? "profile-btn-dm" : "profile-btn"} text={'Profile'} icon={faUser}></Button>
          </Link>
          <Button className="post-btn" text={'Post'} icon={faPen}></Button>
        </div>

      </div>

    </>
  )
}

export default Navbar;
