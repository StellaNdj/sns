import { Link } from 'react-router-dom';
import './components css/Avatar.css';
import '../responsive.css';
import { useThemeContext } from '../hooks/useThemeContext';


const Avatar = ({firstName, lastName, username}) => {
  const { darkTheme } = useThemeContext()
  return (
    <div className="avatar">
      <div className="avatar-logo">
        {firstName.charAt(0)} {lastName.charAt(0)}
      </div>
      <div className={darkTheme ? "avatar-infos infos-dm" : "avatar-infos"}>
        <Link to={`/${username}`}>
          <h3>{firstName} {lastName}</h3>
        </Link>
        <p>@{username}</p>
      </div>
    </div>
  )
};

export default Avatar;
