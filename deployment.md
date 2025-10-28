# Deployment Guide

This guide explains how to deploy the MERN Stack Blog Application to production.

## Overview

This application consists of two main components:
1. **Backend Server** - Node.js/Express.js API (REST API)
2. **Frontend Client** - React application

We'll deploy them separately:
- **Backend**: Render.com (or Heroku, Railway, etc.)
- **Frontend**: Vercel (or Netlify, etc.)

## Prerequisites

- GitHub repository with your code
- MongoDB Atlas account (free tier works)
- GitHub account
- Email for service signup

## Deployment Steps

### 1. Prepare MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist IP address `0.0.0.0/0` (allows all IPs for deployment)
5. Get your connection string - it should look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

### 2. Deploy Backend to Render

**Option A: Using render.yaml (Recommended - Automated)**

If you have a `render.yaml` file in your repository (which is included in this project):

1. Go to [Render.com](https://render.com) and sign up
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file and automatically configure your services
5. Click "Apply" to create the service
6. Add the `MONGODB_URI` environment variable in Render dashboard:
   - Go to your service → Environment → Add Environment Variable
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string

**Option B: Manual Deployment**

1. Go to [Render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `mern-blog-backend` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

5. Add Environment Variables:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-key-here
   NODE_ENV=production
   PORT=10000
   ```

6. Click "Create Web Service"
7. Wait for deployment to complete (5-10 minutes)
8. Copy your service URL: `https://your-app-name.onrender.com`
9. Test the API: `https://your-app-name.onrender.com/` should return "MERN Blog API is running"

### 3. Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-app-name.onrender.com/api
   ```
   (Replace with your actual Render backend URL)

6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Copy your deployment URL

### 4. Update Frontend Configuration

After deploying the backend and getting the URL, you need to update the frontend's API configuration:

**Option A: Using Environment Variables (Recommended)**

1. In Vercel dashboard, go to your project settings
2. Add/Update environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
3. Redeploy the frontend

**Option B: Update vite.config.js**

Update the proxy in `client/vite.config.js`:

```javascript
export default {
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend-url.onrender.com',
        changeOrigin: true,
      },
    },
  },
}
```

### 5. Configure CORS on Backend

Make sure your `server/server.js` has proper CORS configuration:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-frontend-vercel-url.vercel.app'
  ],
  credentials: true
}));
```

## Alternative Deployment Options

### Backend Deployment

#### Option 2: Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables
5. Deploy: `git push heroku main`

#### Option 3: Railway
1. Go to [Railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Set root directory to `server`
5. Add environment variables
6. Deploy

### Frontend Deployment

#### Option 2: Netlify
1. Go to [Netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
4. Add environment variables
5. Deploy

## Post-Deployment Checklist

- [ ] Backend is accessible at your Render URL
- [ ] API returns "MERN Blog API is running" message
- [ ] Frontend is accessible at your Vercel URL
- [ ] Can register a new user account
- [ ] Can login with created account
- [ ] Can view posts
- [ ] Can create, edit, delete posts (when logged in)
- [ ] Can add comments
- [ ] Images upload successfully (if implemented)
- [ ] No CORS errors in browser console

## Troubleshooting

### Backend Issues

**Build Failures**
- Check that all dependencies are in `package.json`
- Verify Node.js version in `package.json` engines
- Check build logs in Render dashboard

**MongoDB Connection Errors**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

**API Not Accessible**
- Check service is running (not sleeping)
- Verify PORT environment variable
- Check backend logs for errors

### Frontend Issues

**API Calls Failing**
- Verify VITE_API_URL environment variable is set correctly
- Check CORS configuration on backend
- Inspect browser console for errors
- Test API endpoints directly in browser/Postman

**Build Errors**
- Check that all imports are correct
- Verify all client dependencies are installed
- Check Vercel build logs

**Blank Page After Deployment**
- Check browser console for errors
- Verify routing is configured correctly
- Check that index.html is in public folder

### Common Issues

**CORS Errors**
- Update backend CORS to include frontend URL
- Check credentials: true if using cookies

**404 on Refresh**
- Configure Vercel rewrite rules for SPA routing

**Environment Variables Not Working**
- Restart the backend service after adding variables
- For frontend, Vercel will auto-redeploy
- Variables starting with `VITE_` must be prefixed correctly

## Environment Variables Reference

### Backend (server/.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-here
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel/Netlify)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## render.yaml Explained

The project includes a `render.yaml` file that automates Render deployment configuration. This file:

- Defines the backend web service configuration
- Sets up build and start commands
- Configures environment variables (except secrets)
- Specifies the root directory (`server`)
- Pre-configure CORS and networking settings

**Benefits of using render.yaml:**
- Faster deployment setup
- Consistent configuration
- Version controlled deployment settings
- Easy to replicate across environments

**To use render.yaml:**
1. Commit the `render.yaml` file to your repository
2. In Render, select "Blueprint" instead of "Web Service"
3. Render automatically detects and applies the configuration
4. You only need to add the `MONGODB_URI` secret value

**Customizing render.yaml:**
- Change `region` to your preferred location
- Update `plan` from `free` to `starter` or `standard` for better performance
- Modify service names as needed

## Resources

- [Render Documentation](https://render.com/docs)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Heroku Documentation](https://devcenter.heroku.com/)

## Support

For issues specific to deployment:
1. Check service-specific logs (Render logs, Vercel logs)
2. Test API endpoints directly
3. Verify environment variables are set correctly
4. Check MongoDB Atlas connection status
5. Review browser console and network tab

## Production Best Practices

1. **Never commit `.env` files** - Keep sensitive data in deployment environment variables
2. **Use strong JWT secret** - Generate random strings for production
3. **Enable HTTPS** - All modern hosting providers include this
4. **Monitor your services** - Set up uptime monitoring
5. **Regular backups** - MongoDB Atlas provides automatic backups
6. **Log errors** - Use logging services like Sentry
7. **Rate limiting** - Consider adding rate limiting for production
8. **Update dependencies** - Keep packages updated for security

## Cost Estimates

### Free Tier Limits

**Render (Backend)**
- Free tier spins down after 15 minutes of inactivity
- Takes ~30 seconds to wake up
- 512MB RAM
- Consider upgrading for production use

**Vercel (Frontend)**
- Unlimited deployments
- 100GB bandwidth/month
- No spin-downs

**MongoDB Atlas**
- 512MB storage
- Free cluster

**Total Monthly Cost**: $0 (free tier) - Perfect for portfolio projects!

## Next Steps

After deployment:
1. Test all features thoroughly
2. Update README with live URLs
3. Share your application with others
4. Consider adding analytics
5. Set up monitoring and alerts

