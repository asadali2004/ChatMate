# Chat Mate AI

## **Overview**

Chat Mate AI is a chatbot application that utilizes OpenAI's GPT-4.0 model. The project is developed using a full-stack approach: React and TypeScript for the frontend, Express for the backend, and MongoDB for data storage. The app provides an intuitive interface for users to engage in dynamic, human-like conversations powered by the OpenAI API.

## **Features**

- **Conversational Interface:** Users can input queries and receive natural language responses from the GPT-4.0 model.
- **Backend Integration:** The Express backend communicates seamlessly with OpenAI's API to handle requests and responses efficiently.
- **Data Persistence:** MongoDB is used to store user data such as prompts and responses from the AI.

## **Prerequisites**

Ensure you have the following installed before setting up the project:

- Node.js
- npm (Node Package Manager)
- MongoDB

## **Setup**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ShreyGrg03/ChatMate
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd Chat-Mate-AI
   ```

3. **Install Dependencies:**

   Install the necessary dependencies for both the client and server:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

4. **Configure Environment Variables:**

   In the `backend` directory, create a `.env` file and include the following:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URL=your_mongodb_uri
   ```

   Be sure to replace `your_openai_api_key` and `your_mongodb_uri` with your actual credentials.

5. **Start the Application:**

   Run the client and server:

   ```bash
   # Start the frontend (in the frontend directory)
   npm run dev

   # Start the backend (in the backend directory)
   npm run dev
   ```

## **Notes**

- Ensure that valid OpenAI API keys and MongoDB URIs are provided in the `.env` file.
- Once both servers are running, the app will be live and ready for testing.

## **Website Screenshots**

### **Home Page**
![Home Page](https://github.com/user-attachments/assets/e0ec50d0-1321-4922-b960-dd767ad95aa7)

### **Login Page**
![Login Page](https://github.com/user-attachments/assets/e0e67748-aacb-425e-9300-726e217acc9b)

### **Sign-Up Page**
![Sign-Up Page](https://github.com/user-attachments/assets/2a2f1d38-64d3-4715-bdf2-704610da1b9f)

### **Chat Page**
![Chat Page](https://github.com/user-attachments/assets/fa95ba0f-3820-460a-9b44-9c5ca247108b)

