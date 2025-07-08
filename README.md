# 🤖 ChatMate AI - Your Intelligent Conversation Partner

<div align="center">
  <img src="frontend/public/robot.png" alt="ChatMate Logo" width="100" height="100">
  
  [![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)
  [![Groq](https://img.shields.io/badge/Groq-Lightning_Fast-orange.svg)](https://groq.com/)

  **A modern, lightning-fast AI chat application built with React, TypeScript, Express, and powered by Groq's cutting-edge infrastructure.**
</div>

---

## ✨ Overview

ChatMate AI is a sophisticated conversational AI application created by **Asad Ali**. Originally powered by OpenAI, it has been upgraded to use **Groq's lightning-fast infrastructure** for instant AI responses. The application features a modern, glassmorphism UI design with real-time chat capabilities, user authentication, and personalized experiences.

## 🚀 Features

### 🎯 Core Features
- **⚡ Lightning-Fast Responses**: Powered by Groq's high-performance infrastructure
- **🔐 Secure Authentication**: JWT-based user registration and login system
- **💬 Real-time Chat**: Instant messaging with AI assistant
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI/UX**: Glassmorphism design with gradient effects
- **🔒 Privacy-First**: Secure data handling and user privacy protection

### 🛠 Technical Features
- **React 18** with TypeScript for type-safe frontend development
- **Express.js** backend with robust API endpoints
- **MongoDB** for reliable data persistence
- **Material-UI (MUI)** for consistent design components
- **JWT Authentication** for secure user sessions
- **Hot Toast Notifications** for better user feedback
- **Code Syntax Highlighting** for technical discussions
- **Markdown Support** for rich text formatting

### 🎨 UI/UX Improvements
- **Modern Gradient Themes**: Beautiful purple-pink gradient color scheme
- **Glassmorphism Effects**: Translucent elements with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Dark Theme**: Optimized for comfortable viewing
- **Custom Scrollbars**: Styled scrollbars throughout the application
- **Mobile-First Design**: Responsive layout for all devices

## 🛠 Tech Stack

### Frontend
- **React 18.2+** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Component library
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **React Hot Toast** - Beautiful notifications
- **React Syntax Highlighter** - Code highlighting

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### AI Integration
- **Groq SDK** - Lightning-fast AI inference
- **Advanced Chat Management** - Context-aware conversations
- **Real-time Streaming** - Instant response delivery

## 📋 Prerequisites

Before running the application, ensure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v6.0.0 or higher)
- **Groq API Key** (Get it from [Groq Console](https://console.groq.com/))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/asadali2004/ChatMate.git
cd ChatMate
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:
```env
# Database Configuration
MONGODB_URL=mongodb://localhost:27017/chatmate
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/chatmate

# AI Configuration
GROQ_API_KEY=your_groq_api_key_here

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### 4. Start the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm run dev
```

### 5. Access the Application
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```
ChatMate/
├── frontend/                 # React TypeScript frontend
│   ├── public/              # Static assets and images
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── chat/        # Chat-specific components
│   │   │   ├── footer/      # Footer component
│   │   │   ├── shared/      # Shared components
│   │   │   └── typer/       # Typing animation component
│   │   ├── context/         # React context for state management
│   │   ├── helpers/         # API communication utilities
│   │   ├── pages/           # Application pages
│   │   └── assets/          # Frontend assets
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                 # Express TypeScript backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── db/              # Database connection
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── .gitignore
```

## 🎯 API Endpoints

### Authentication
- `POST /user/signup` - User registration
- `POST /user/login` - User login
- `GET /user/auth-status` - Check authentication status

### Chat Management
- `POST /chat/new` - Send new message to AI
- `GET /chat/all-chats` - Retrieve user's chat history
- `DELETE /chat/delete` - Clear user's chat history

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple-Blue gradients (`#6366f1` to `#4f46e5`)
- **Secondary**: Pink gradients (`#ec4899` to `#db2777`)
- **Background**: Dark theme with glassmorphism effects
- **Text**: High contrast for accessibility

### Visual Elements
- **Glassmorphism**: Translucent cards with backdrop blur
- **Gradients**: Smooth color transitions throughout
- **Shadows**: Subtle depth with custom shadows
- **Animations**: Smooth hover and transition effects

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Backend
```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript
npm run start        # Start production server
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables for production

### Backend (Railway/Heroku/DigitalOcean)
1. Set up MongoDB Atlas for production database
2. Configure environment variables
3. Deploy using your preferred platform

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URL=your_production_mongodb_url
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=your_production_frontend_url
```

## 📱 Screenshots

### 🏠 Modern Landing Page
![Home Page](frontend/public/landingpage.png)
*Beautiful landing page with gradient design and clear call-to-action buttons*

### 🔐 Secure Authentication
![Login Page](frontend/public/loginpage.png)
*Clean login interface with modern styling*

### 💬 Real-time Chat Interface
![Chat Page](frontend/public/chattingpage.png)
*Responsive chat interface with AI assistant*

### 🎨 Glassmorphism Design
![Chat Interface](frontend/public/1.png)
*Modern chat bubbles with glassmorphism effects*

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Asad Ali**
- GitHub: [@asadali2004](https://github.com/asadali2004)
- LinkedIn: [Asad Ali](https://linkedin.com/in/asadali2004)

## 🙏 Acknowledgments

- **Groq** for providing lightning-fast AI infrastructure
- **Material-UI** for beautiful React components
- **MongoDB** for reliable data storage
- **React Community** for excellent development tools

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/asadali2004/ChatMate/issues) page
2. Create a new issue with detailed information
3. Contact the author through GitHub

---

<div align="center">
  <strong>Built with ❤️ by Asad Ali</strong><br>
  <em>Powered by Groq's Lightning-Fast AI Infrastructure</em>
</div>



