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
      className="nav-link-gradient"
      to={props.to}
      style={{ 
        background: props.bg, 
        color: props.textColor,
        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
        border: 'none',
        fontWeight: 600,
        textTransform: 'none',
        marginRight: '8px',
        marginLeft: '8px',
        padding: '10px 20px',
        borderRadius: '8px',
        textDecoration: 'none',
        letterSpacing: '0.5px',
        transition: 'all 0.3s ease',
        display: 'inline-block',
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
