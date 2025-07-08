import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Box 
        sx={{
            display: "flex",
            marginRight: "auto",
            alignItems: "center",
            gap: 2,
        }}
        >
            <Link to={"/"} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                        color: 'white',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                    }}
                >
                    🤖
                </Box>
               
                <Typography sx={{ 
                            display: {md:"block", sm:"none",xs:"none"}, 
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: 'none',
                            }}
                    >
                        ChatMate
                </Typography>
            </Link>
    </Box>
  );
};

export default Logo
