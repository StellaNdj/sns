import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './components css/Button.css'
import { faHouse, faDoorOpen, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';

const Button = ({text, className, onClick, icon}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
      <span className="button-text"> {text}</span>
    </button>
  )
};

export default Button;
