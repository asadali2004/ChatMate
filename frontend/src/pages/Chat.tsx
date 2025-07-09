import  { useEffect, useLayoutEffect,  useRef, useState } from 'react'
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, sendChatRequest, getUserChats } from '../helpers/api-communicator';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

type Message = {
  role: "user" | "assistant";
  content: string;
};


const Chat = () => {
  
    const navigate = useNavigate();
    //ref will allow the dta to fetch the input that hav e typed by the user from the DOM
    const inputRef = useRef<HTMLInputElement | null>(null); 

    const auth = useAuth();

    //Once we recive input data from the user first we want store all of the chats 
    //first previous chats will be stored 
    //Then we want to insert latest chats to the array 

    const [chatMessages, setChatMessages] = useState<Message[]>([]);

     {/**once we click on the input button we need to send the data */}
     const handleSubmit = async () => {
      //get the latest input messages
      const content = inputRef.current?.value as string;
      
      // Check if content is empty or just whitespace
      if (!content || content.trim() === "") {
        return;
      }
      
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
      //store the input in the state as well
      {/**here we are getting type error so we can declare types as well at top */}
      setChatMessages((prev) => [...prev, newMessage]);


      //After creating new message inside the array now we want to send API request to Backend with new message 
      //with the help of that we will be reciving response as well and we can send new response inside the setChatMessages 
      //I will add in api communicator

      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);

     };

     // Handle Enter key press
     const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
       if (event.key === 'Enter') {
         event.preventDefault(); // Prevent form submission
         handleSubmit();
       }
     };

     const handleDeleteChats = async () => {
      try {
        toast.loading("Deleting Chats", { id: "deletechats" });
        await deleteUserChats();
        setChatMessages([]);
        toast.success("Deleted Chats Successfully", { id: "deletechats" });
      } catch (error) {
        console.log(error);
        toast.error("Deleting chats failed", { id: "deletechats" });
      }
    };


     useLayoutEffect(() => {
      if (auth?.isLoggedIn && auth.user) {
        toast.loading("Loading Chats", { id: "loadchats" });
        getUserChats()
          .then((data) => {
            setChatMessages([...data.chats]);
            toast.success("Successfully loaded chats", { id: "loadchats" });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Loading Failed", { id: "loadchats" });
          });
      }
    }, [auth]);
    

    //to check if user have logged in or not if not he will be redirected to signup page
    //using useEffect

    useEffect(() => {
      if (!auth?.user) {
        return navigate("/login");
      }
    }, [auth]);

  return (
    <Box
    sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 3,
    }}
    >
      <Box 
      sx={{
        display: { md: "flex", xs: "none", sm: "none" },
        flex: 0.2,
        flexDirection: "column",
      }}
        >
        <Box 
         sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "background.paper",
          borderRadius: 3,
          flexDirection: "column",
          mx: 3,
          border: '1px solid rgba(99, 102, 241, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          p: 3,
        }}
        >
          {/* Top section with user info */}
          <Box sx={{ textAlign: 'center' }}>
            <Avatar 
              sx={{ 
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                color: "white",
                fontWeight: 700,
                width: 56,
                height: 56,
                fontSize: '1.5rem',
              }}
            >
            { auth?.user?.name[0] }
            </Avatar>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'text.primary',
                mb: 3,
              }}
            >
              Welcome, {auth?.user?.name.split(" ")[0]}! 👋
            </Typography>

            <Typography
              sx={{
                 fontFamily: "Inter", 
                 color: 'text.secondary',
                 lineHeight: 1.6,
                 textAlign: 'justify',
                 fontSize: '0.95rem',
                 mb: 4,
                }}
            >
             
             I'm ChatMate, your AI assistant created by Asad Ali and powered by Groq! I'm here to help with questions, provide advice, assist with learning, and much more. What would you like to explore today? 🚀
         
            </Typography>
          </Box>

          {/* Clear Chat Button positioned after the description */}
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "100%",
              color: "white",
              fontWeight: 600,
              borderRadius: 2,
              bgcolor: "error.main",
              py: 1.5,
              ":hover": {
                bgcolor: "error.dark",
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            🗑️ Clear Chat
          </Button>

        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            color: "primary.main",
            mb: 3,
            mx: "auto",
            fontWeight: 700,
            textAlign: "center",
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Chat with ChatMate AI ✨
        </Typography>

        {/* render actual chats over here */}
        <Box 
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            bgcolor: "background.paper",
            border: '1px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              scrollBehavior: "smooth",
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(0,0,0,0.1)',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(99, 102, 241, 0.3)',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(99, 102, 241, 0.5)',
              },
            }}
          >
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>
        </Box>
        <Box sx={{ 
          width: "100%",
          borderRadius: 3, 
          bgcolor: "background.paper",
          border: '1px solid rgba(99, 102, 241, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          display: "flex",
          alignItems: "center",
          margin: "16px auto 0",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #6366f1, #ec4899)",
          }
          }}>
          {/** add Input tag to type  */}
        <input
          ref={inputRef} 
          type="text" 
          placeholder="Type your message here......✨"
          onKeyPress={handleKeyPress}
          style={{ 
            width: "100%", 
            backgroundColor: "transparent",
            padding: "18px 24px",
            border: "none",
            outline: "none",
            color: "#f8fafc",
            fontSize: "16px",
            fontFamily: "Inter, sans-serif",
            }}
        />
        {/**Enhanced send button with better styling */}
        <IconButton 
          onClick={handleSubmit}
          sx={{
            m: 1,
            color: "white",
            background: "linear-gradient(135deg, #6366f1, #ec4899)",
            width: 52,
            height: 52,
            ":hover": {
              background: "linear-gradient(135deg, #4f46e5, #db2777)",
              transform: "scale(1.1)",
            },
            ":active": {
              transform: "scale(0.95)",
            },
            transition: "all 0.2s ease",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
          }}
        >
          <IoMdSend />
        </IconButton>

        </Box>
        
      </Box>
    </Box>
  )
}

export default Chat

//this should contain all of the pages routes of our application