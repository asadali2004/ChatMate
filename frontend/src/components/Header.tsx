
import Logo from './shared/Logo';
//using the header with modern styling and updated navigation
import {  AppBar, Toolbar } from "@mui/material";
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ 
        bgcolor: "rgba(15, 23, 42, 0.9)", 
        position: "static", 
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(99, 102, 241, 0.1)"
      }}
    >
      <Toolbar sx={{ display: "flex", py: 1 }}>
        <Logo />
        <div>
          {/* is loggedin means user logged in */}
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="linear-gradient(135deg, #10b981, #059669)"
                textColor="white"
                to="/"
                text="🏠 Home"
              />
              <NavigationLink
                bg="linear-gradient(135deg, #ef4444, #dc2626)"
                textColor="white"
                to="/"
                text="🚪 Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="linear-gradient(135deg, #6366f1, #4f46e5)"
                to="/login"
                text="Sign In"
                textColor="white"
              />
              <NavigationLink
                bg="linear-gradient(135deg, #ec4899, #db2777)"
                textColor="white"
                to="/signup"
                text="Get Started"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;