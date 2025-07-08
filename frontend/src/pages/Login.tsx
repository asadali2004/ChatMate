import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("LogIn Successfully", { id: "login" });
    } catch (error) {
      toast.error(" LogIn Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if(auth?.user) {
      return navigate("/chat")
    }
  }, [auth]);


  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box 
        padding={8} 
        mt={8} 
        display={{ md: "flex", sm: "none", xs: "none" }}
        sx={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
          borderRadius: 3,
          m: 2,
        }}
      >
        <img src="homebot.png" alt="ChatMate AI" style={{ width: "400px", filter: "drop-shadow(0 20px 40px rgba(99, 102, 241, 0.3))" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={8}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "40px",
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={3}
              fontWeight={700}
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back! 👋
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              mb={3}
              color="text.secondary"
            >
              Sign in to continue chatting with ChatMate AI
            </Typography>
            <CustomizedInput type="email" name="email" label="Email Address" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 4,
                py: 1.5,
                mt: 3,
                width: "100%",
                maxWidth: "400px",
                borderRadius: 2,
                background: "linear-gradient(135deg, #6366f1, #ec4899)",
                color: "white",
                fontWeight: 600,
                fontSize: "1rem",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
              endIcon={<IoIosLogIn />}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;


