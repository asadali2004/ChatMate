import { config } from "dotenv";
config();

import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Connects to the database and starts the Express server
const PORT = Number(process.env.PORT) || 10000;

connectToDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => console.log(`Server Started on port ${PORT} & Connected to Database 🤝`)
  );
})
.catch((err) => console.log(err));