import axios from "axios";

// Configure axios base URL for production
// TODO: Replace with your actual Render URL after deployment
axios.defaults.baseURL = import.meta.env.PROD 
  ? "https://chatmate-backend-[YOUR-RENDER-ID].onrender.com/api/v1" // Update this with your Render backend URL
  : "http://localhost:10000/api/v1"; // Updated local port to match Render

const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return config;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const config = getTokenHeader();
  const res = await axios.get("/user/auth-status", config);
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const config = getTokenHeader();
  const res = await axios.post("/chat/new", { message }, config);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const config = getTokenHeader();
  const res = await axios.get("/chat/all-chats", config);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const config = getTokenHeader();
  const res = await axios.delete("/chat/delete", config);
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};


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
