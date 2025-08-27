import axios from "axios";

// Set axios base URL based on environment
axios.defaults.baseURL = import.meta.env.PROD 
  ? "https://chatmate-backend-w7jl.onrender.com/api/v1" // Your Render backend URL
  : "http://localhost:10000/api/v1"; // Updated local port to match Render

// Returns authorization header with JWT token
const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return config;
};

// Sends login request to backend
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

// Checks user authentication status
export const checkAuthStatus = async () => {
  const config = getTokenHeader();
  const res = await axios.get("/user/auth-status", config);
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

// Sends a new chat message to backend
export const sendChatRequest = async (message: string) => {
  const config = getTokenHeader();
  const res = await axios.post("/chat/new", { message }, config);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

// Retrieves all user chat messages
export const getUserChats = async () => {
  const config = getTokenHeader();
  const res = await axios.get("/chat/all-chats", config);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

// Deletes all user chat messages
export const deleteUserChats = async () => {
  const config = getTokenHeader();
  const res = await axios.delete("/chat/delete", config);
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

// Enhances user prompt using backend AI
export const enhanceUserPrompt = async (prompt: string) => {
  const config = getTokenHeader();
  const res = await axios.post("/chat/enhance-prompt", { prompt }, config);
  if (res.status !== 200) {
    throw new Error("Unable to enhance prompt");
  }
  const data = await res.data;
  return data.enhancedPrompt;
};

// Sends signup request to backend
export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};
