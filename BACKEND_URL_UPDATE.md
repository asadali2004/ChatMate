// After backend deployment, update this file:
// frontend/src/helpers/api-communicator.ts

import axios from "axios";

// Configure axios base URL for production
axios.defaults.baseURL = import.meta.env.PROD 
  ? "https://YOUR-BACKEND-URL-HERE.railway.app" // Replace with actual backend URL
  : "http://localhost:5000";

// Example after deployment:
// axios.defaults.baseURL = import.meta.env.PROD 
//   ? "https://chatmate-backend-production.up.railway.app"
//   : "http://localhost:5000";
