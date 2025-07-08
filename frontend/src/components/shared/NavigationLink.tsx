import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ 
        background: props.bg, 
        color: props.textColor,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        border: 'none',
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
