import { Box, useMediaQuery, useTheme, Typography, Button } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteUserChats } from "../helpers/api-communicator";
import toast from "react-hot-toast";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const auth = useAuth();

  const handleNewConversation = async () => {
    try {
      toast.loading("Starting new conversation...", { id: "newConversation" });
      await deleteUserChats();
      toast.success("Ready for a new conversation!", { id: "newConversation" });
      navigate("/chat");
    } catch (error) {
      console.log(error);
      toast.error("Sorry, couldn't start new conversation", { id: "newConversation" });
    }
  };

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            my: 6,
            px: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Meet ChatMate AI ✨
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Your intelligent AI companion built by Asad Ali, powered by Groq's lightning-fast infrastructure. 
            Get instant answers, creative assistance, and engaging conversations.
          </Typography>
          
          {auth?.isLoggedIn ? (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/chat")}
                sx={{
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                💬 Go to Chat
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleNewConversation}
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  ":hover": {
                    bgcolor: "rgba(99, 102, 241, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                ⚡ Start New Conversation
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/signup")}
                sx={{
                  background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Get Started Free 🚀
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  ":hover": {
                    bgcolor: "rgba(99, 102, 241, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Box>

        {/* Feature Cards */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 4,
            my: 8,
            px: 3,
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 4,
              border: '1px solid rgba(99, 102, 241, 0.2)',
              maxWidth: '300px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h2" sx={{ mb: 2 }}>⚡</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Lightning Fast</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Powered by Asad Ali's implementation of Groq's cutting-edge infrastructure for instant AI responses
            </Typography>
          </Box>
          
          <Box
            sx={{
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 4,
              border: '1px solid rgba(236, 72, 153, 0.2)',
              maxWidth: '300px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h2" sx={{ mb: 2 }}>🧠</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Smart & Helpful</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Advanced AI models ready to assist with any question or task
            </Typography>
          </Box>
          
          <Box
            sx={{
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 4,
              border: '1px solid rgba(16, 185, 129, 0.2)',
              maxWidth: '300px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h2" sx={{ mb: 2 }}>🔒</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Secure & Private</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Your conversations are protected with enterprise-grade security
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src="1.png"
            alt="ChatMate Demo"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "90%" : "80%",
              borderRadius: 20,
              boxShadow: "0 20px 60px rgba(99, 102, 241, 0.3)",
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;