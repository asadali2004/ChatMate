
import { Box, Typography, Link as MuiLink } from "@mui/material";

// Footer component displays the application's footer section
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 4,
        px: 3,
        mt: 8,
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(99, 102, 241, 0.1)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
        }}
      >
        ChatMate AI - Your Intelligent Companion
      </Typography>
      
      <Typography
  variant="body2"
  sx={{
    color: 'text.secondary',
    mb: 1,
  }}
>
  Built with ❤️ by{' '}
  <MuiLink
    href="https://www.linkedin.com/in/asadalli/"
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      color: 'primary.main',
      textDecoration: 'none',
      fontWeight: 600,
      '&:hover': {
        textDecoration: 'underline',
      },
    }}
  >
    Asad Ali
  </MuiLink>
</Typography>

      
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        Powered by Groq • Made with React & TypeScript • © 2024 ChatMate
      </Typography>
    </Box>
  );
};

// Export Footer component
export default Footer;
