# MERN Stack Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with complete CRUD functionality, user authentication, comments, and more.

## Features

### Core Features
- ✅ User Registration and Authentication (JWT-based)
- ✅ Full CRUD operations for blog posts
- ✅ Categories for organizing posts
- ✅ Comments system on posts
- ✅ Pagination for post listings
- ✅ Search and filter functionality
- ✅ Responsive design with modern UI
- ✅ Protected routes for authenticated users
- ✅ Role-based authorization (Admin, Author, User)

### Advanced Features
- User authentication with JWT tokens
- Image uploads for featured post images (prepared structure)
- Pagination for posts
- Search and filter by category
- Real-time comments on posts
- View count tracking

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-stack-integration-kipkoec77
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up Server Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your-mongodb-atlas-connection-string
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```
   
   To get your MongoDB Atlas connection string:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Click "Connect" and choose "Connect your application"
   - Copy the connection string and replace `<password>` with your database password
   - Replace `<dbname>` with `mern-blog` or your preferred database name

4. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the Client**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Post Endpoints

#### Get All Posts
```
GET /api/posts?page=1&limit=10&category=<id>&search=<query>
```

#### Get Single Post
```
GET /api/posts/:id
```

#### Create Post (Protected)
```
POST /api/posts
Headers: Authorization: Bearer <token>
Body: { title, content, category, excerpt?, tags? }
```

#### Update Post (Protected)
```
PUT /api/posts/:id
Headers: Authorization: Bearer <token>
Body: { title, content, category, excerpt?, tags? }
```

#### Delete Post (Protected)
```
DELETE /api/posts/:id
Headers: Authorization: Bearer <token>
```

#### Add Comment (Protected)
```
POST /api/posts/:id/comments
Headers: Authorization: Bearer <token>
Body: { content }
```

### Category Endpoints

#### Get All Categories
```
GET /api/categories
```

#### Create Category (Admin Only)
```
POST /api/categories
Headers: Authorization: Bearer <token>
Body: { name, description? }
```

#### Update Category (Admin Only)
```
PUT /api/categories/:id
Headers: Authorization: Bearer <token>
Body: { name, description? }
```

#### Delete Category (Admin Only)
```
DELETE /api/categories/:id
Headers: Authorization: Bearer <token>
```

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM library
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Express-validator** - Input validation

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **Context API** - State management

## Project Architecture

### Backend Structure
```
server/
├── controllers/     # Business logic
├── models/          # Database models
├── routes/           # API routes
├── middleware/       # Custom middleware
├── utils/            # Utility functions
└── server.js         # Entry point
```

### Frontend Structure
```
client/
├── src/
│   ├── components/  # Reusable components
│   ├── pages/        # Page components
│   ├── context/      # React contexts
│   ├── services/     # API services
│   ├── App.jsx       # Main app
│   └── main.jsx      # Entry point
```

## Features Implementation

### Task 1: Project Setup ✅
- Clear directory structure for client and server
- MongoDB connection using Mongoose
- Express.js server with middleware
- React front-end with Vite
- Environment variables configured

### Task 2: Back-End Development ✅
- RESTful API with all required endpoints
- Mongoose models (Post, Category, User)
- Input validation using express-validator
- Error handling middleware
- Authentication and authorization

### Task 3: Front-End Development ✅
- React components for all views
- React Router for navigation
- React hooks (useState, useEffect, useContext)
- Custom hooks for API calls
- Responsive UI

### Task 4: Integration ✅
- API service for back-end communication
- State management for posts and categories
- Forms with validation
- Loading and error states

### Task 5: Advanced Features ✅
- User authentication (registration, login)
- Protected routes
- Comments system
- Pagination
- Search and filter functionality

## Usage Guide

1. **Register a new account** or **login** with existing credentials
2. **Browse posts** on the home page
3. **Filter by category** or **search** for specific posts
4. **Create a new post** (requires authentication)
5. **View post details** and read comments
6. **Add comments** to posts (requires authentication)
7. **Edit or delete your own posts**

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas cluster is running
- Check that your connection string is correct
- Verify your IP is whitelisted in MongoDB Atlas
- Confirm your database user has proper permissions

### Authentication Issues
- Clear browser localStorage and try logging in again
- Check that JWT_SECRET is set in your .env file
- Ensure you're sending the token in Authorization header

### API Communication Issues
- Verify both server and client are running
- Check that proxy is configured correctly in vite.config.js
- Look at browser console and server logs for errors

## Contributing

This is an assignment project. For issues or questions, please refer to the assignment documentation.

## License

This project is created for educational purposes.

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 