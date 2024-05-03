import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './components css/Button.css'
import { faHouse, faDoorOpen, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Button = ({text, className, onClick, icon}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      {text}
    </button>
  )
};

export default Button;
