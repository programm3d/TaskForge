# TaskForge - Modern Task Management Application

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 📋 Overview

TaskForge is a modern, full-stack task management application that helps teams collaborate, track progress, and achieve goals together. Built with the MERN stack and styled with Tailwind CSS, it offers a seamless experience for managing tasks and team productivity.

## ✨ Features

- **User Authentication**
  - Secure registration and login system
  - JWT-based authentication
  - Password reset functionality via email
  - Profile management

- **Task Management**
  - Create, edit, and delete tasks
  - Assign tasks to multiple team members
  - Track task status (Pending → In Progress → Completed)
  - Real-time status updates

- **Team Collaboration**
  - Search and find team members by username
  - Assign tasks to multiple users
  - View tasks created by you and assigned to you

- **User Experience**
  - Beautiful, responsive UI with Tailwind CSS
  - Intuitive navigation and workflows
  - Toast notifications for user feedback
  - Loading states and error handling

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Heroicons** - Beautiful hand-crafted SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email sending
- **Dotenv** - Environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/taskforge.git
cd taskforge
```
2. Navigate to Backend Directory

```bash
cd backend
```
3. Install Dependencies
```bash
npm install
```
4. Create a `.env` File
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskforge
JWT_SECRET=your_jwt_secret_key_here
ADMIN_MAIL=your_email@gmail.com
ADMIN_PASS=your_app_specific_password
FRONTEND_URL=http://localhost:5000
```

5. Start the Server
```bash
node server.js
```

### Frontend Setup

1. Navigate to Frontend Directory
```bash
cd Frontend
```
2. Install Dependencies
```bash
npm install
```
3. Start the development server
```bash
npm run dev
```

### 🔧 API Endpoints
#### Authentication Routes
`POST /api/users/register` - Register new user
`POST /api/users/login` - User login
`POST /api/users/forgot-password` - Send password reset email  
`POST /api/users/reset-password` - Reset password with token  
`PUT /api/users/change-password` - Change password (authenticated)  
`DELETE /api/users/delete` - Delete user account (authenticated)  
`GET /api/users/search?username=query` - Search users (authenticated)  
#### Task Routes
`GET /api/tasks` - Get tasks created by user (authenticated)  
`GET /api/tasks/assigned` - Get tasks assigned to user (authenticated)  
`POST /api/tasks` - Create new task (authenticated)  
`PUT /api/tasks/:id` - Update task status (authenticated)  
`PUT /api/tasks/:id/assign` - Assign users to task (authenticated)  
`DELETE /api/tasks/:id` - Delete task (authenticated)  

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to improve TaskForge.

## Acknowledgements

- Inspired by modern task management tools
- Built with MERN stack and Tailwind CSS
- Special thanks to open-source contributors

### Deployment
[Frontend](https://taskforges.netlify.app/)  
[Backend](https://taskforge-5282.onrender.com/test)