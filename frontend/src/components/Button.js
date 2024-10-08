import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './components css/Button.css';
import '../responsive.css';
import { faHouse, faDoorOpen, faMoon, faSun, faUser, faPen } from '@fortawesome/free-solid-svg-icons';

const Button = ({text, className, onClick, icon, disabled}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
      <span className="button-text" disabled={disabled}> {text}</span>
    </button>
  )
};

export default Button;
