# MERN Blog Application - Setup Guide

## Quick Start

Follow these steps to get your MERN blog application up and running with MongoDB Atlas.

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (free tier is sufficient)
3. Wait for the cluster to be created
4. Click "Connect" on your cluster
5. Add your current IP address to the whitelist
6. Create a database user:
   - Username: `your-username`
   - Password: `your-password` (save this!)
7. Click "Connect your application"
8. Copy the connection string
   - It will look like: `mongodb+srv://username:password@cluster.mongodb.net/`

## Step 2: Configure Server

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Create a `.env` file:
   ```bash
   copy env.example.txt .env
   ```

3. Edit the `.env` file and replace the MongoDB URI with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mern-blog?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key_here_make_it_long_and_random
   PORT=5000
   NODE_ENV=development
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

   You should see: `Server running on port 5000` and `Connected to MongoDB`

## Step 3: Configure Client

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the client:
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:3000`

## Step 4: Test the Application

1. **Register a new user**
   - Click "Register" in the navbar
   - Fill in name, email, and password
   - Click "Register"

2. **Create a category** (first post creation will need a category)
   - You can create categories via API or directly in MongoDB if needed
   - Or create a post without selecting a category (update Post model to make it optional)

3. **Create your first post**
   - Click "Create Post"
   - Fill in the form
   - Submit

4. **Explore the features**
   - Browse posts on the home page
   - View post details
   - Add comments
   - Edit or delete your posts

## Troubleshooting

### MongoDB Connection Fails

- Check your connection string is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify your database password is correct
- Make sure you've specified the database name in the URI

### Server Won't Start

- Ensure Node.js v18+ is installed: `node -v`
- Check that the `.env` file exists in the server directory
- Verify all dependencies are installed: `npm list`

### Client Won't Connect to Server

- Ensure both server and client are running
- Check that the server is running on port 5000
- Verify the proxy configuration in `vite.config.js`

## Environment Variables Reference

### Server (.env)

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Server port
PORT=5000

# Secret key for JWT tokens (use a strong random string)
JWT_SECRET=your_secret_key_here

# Environment type
NODE_ENV=development
```

## Creating Initial Data

You can use tools like Postman or curl to create initial categories:

```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Technology","description":"Posts about technology"}'
```

Or create categories directly through the application interface (requires admin role).

## Next Steps

1. Explore the API endpoints using the documentation in README.md
2. Customize the UI to match your preferences
3. Add more features like image uploads
4. Deploy to production (Heroku, Netlify, Vercel, etc.)

## Need Help?

- Check the main README.md for detailed documentation
- Review the Week4-Assignment.md for assignment requirements
- Check server and client console logs for errors
- Ensure all dependencies are installed correctly

