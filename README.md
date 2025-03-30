# HackHive - AI-Powered Hackathon Team Formation Platform

HackHive is an innovative platform designed to revolutionize the hackathon experience by leveraging AI to generate project ideas, form balanced teams, and create detailed project roadmaps. The platform helps participants find the perfect team based on their skills and interests while ensuring project success through AI-guided development paths.

## Features

### 🤖 AI-Powered Idea Generation
- Generate unique and innovative project ideas using Google's Gemini AI
- Get difficulty assessments and tech stack recommendations
- Receive detailed project descriptions and potential features

### 👥 Smart Team Formation
- Skill-based team matching algorithm
- Real-time team composition visualization
- Team request management system
- Profile-based participant matching

### 📋 Project Roadmap Generation
- AI-generated project development timelines
- Task breakdown and milestone creation
- Technical requirement analysis
- Resource allocation suggestions

## Tech Stack

### Frontend (React + Vite)
- React.js with Vite for fast development and optimized builds
- React Router for navigation
- Modern UI with CSS animations and gradients
- Responsive design for all devices

### Backend (Node.js + Express)
- Express.js server
- MongoDB with Mongoose for data management
- JWT authentication
- Google's Generative AI integration

### Key Dependencies
- Frontend:
  - @google/genai: AI integration
  - axios: HTTP client
  - react-router-dom: Routing

- Backend:
  - @google/generative-ai: Gemini AI integration
  - express: Web framework
  - mongoose: MongoDB ODM
  - jsonwebtoken: Authentication
  - bcryptjs: Password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Google AI API key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_API_KEY=your_google_api_key
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd hackhive
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── backend/                # Backend server
│   ├── controllers/        # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── server.js          # Server entry point
│
└── hackhive/              # Frontend application
    ├── src/
    │   ├── components/    # React components
    │   ├── assets/        # Static assets
    │   └── App.jsx        # Main component
    └── index.html         # Entry HTML file
```

## Features in Detail

### AI Idea Generation
- Input your interests and skills
- Receive AI-generated project ideas
- Get difficulty assessments and tech stack matches
- View detailed project descriptions

### Team Formation
- Create a profile with your skills
- Browse available teams and projects
- Send and receive team requests
- View team member compatibility

### Project Management
- Generate project roadmaps
- Track team progress
- Manage team communications
- Access AI-powered development suggestions

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.