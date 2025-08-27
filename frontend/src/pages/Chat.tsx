import  { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, sendChatRequest, getUserChats, enhanceUserPrompt } from '../helpers/api-communicator';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

type Message = {
  role: "user" | "assistant";
  content: string;
};


const Chat = () => {
  
    const navigate = useNavigate();
  // Ref for chat input textarea
    const inputRef = useRef<HTMLTextAreaElement | null>(null); 

    const auth = useAuth();



    const [chatMessages, setChatMessages] = useState<Message[]>([]);

  // Handles chat message submission
     const handleSubmit = async () => {
  // Get the latest input message
      const content = inputRef.current?.value as string;
      
      // Check if content is empty or just whitespace
      if (!content || content.trim() === "") {
        return;
      }
      
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
  // Store the input in the state

      setChatMessages((prev) => [...prev, newMessage]);





      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);

     };

  // Handles Enter key press for chat input
     const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
       if (event.key === 'Enter' && !event.shiftKey) {
         event.preventDefault(); // Prevent form submission
         handleSubmit();
       }
     };

  // Handles chat deletion
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

  // Handles prompt enhancement using AI
  const handleEnhancePrompt = async () => {
    const currentValue = inputRef.current?.value || "";
    if (!currentValue.trim()) {
      toast.error("Please enter a message to enhance");
      return;
    }

    try {
      toast.loading("Enhancing your prompt...", { id: "enhance" });
      const enhancedPrompt = await enhanceUserPrompt(currentValue);
      if (inputRef.current) {
        inputRef.current.value = enhancedPrompt;
      }
      toast.success("Prompt enhanced successfully!", { id: "enhance" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to enhance prompt", { id: "enhance" });
    }
  };

  // Loads user chats on login
  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
          
          // Check if there's a prompt from home page
          const startPrompt = localStorage.getItem("startPrompt");
          if (startPrompt && inputRef.current) {
            inputRef.current.value = startPrompt;
            localStorage.removeItem("startPrompt");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);
    

  // Redirects to login if user is not authenticated

    useEffect(() => {
      if (!auth?.user) {
        return navigate("/login");
      }
    }, [auth, navigate]);

  // Main Chat page render
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

  {/* Render actual chat messages */}
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
            maxWidth: "100%",
            wordWrap: "break-word"
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              p: 2,
              scrollBehavior: "smooth",
              maxWidth: "100%",
              wordWrap: "break-word",
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
          alignItems: "flex-end",
          margin: "16px auto 0",
          overflow: "visible",
          position: "relative",
          minHeight: "56px",
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
          {/* Add textarea for dynamic input */}
        <textarea
          ref={inputRef} 
          placeholder="Type your question here......✨"
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
            resize: "none",
            minHeight: "20px",
            maxHeight: "200px",
            overflow: "auto",
            lineHeight: "1.5",
            verticalAlign: "top",
            }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "20px";
            target.style.height = Math.min(target.scrollHeight, 200) + "px";
          }}
        />
  {/* Enhanced lightning button for prompt enhancement */}
        <IconButton 
          onClick={handleEnhancePrompt}
          sx={{
            m: 1,
            color: "white",
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            width: 48,
            height: 48,
            ":hover": {
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
            },
            ":active": {},
            transition: "all 0.2s ease",
            borderRadius: "50%",
            boxShadow: "0 4px 15px rgba(251, 191, 36, 0.4)",
          }}
        >
          ⚡
        </IconButton>
  {/* Enhanced send button with better styling */}
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
            },
            ":active": {},
            transition: "all 0.2s ease",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
          }}
        >
          <IoMdSend />
        </IconButton>        </Box>
        
      </Box>
    </Box>
  )
}

// Export Chat page component
export default Chat

