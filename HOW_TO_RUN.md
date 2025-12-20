# How to Run the Bookstore Application

## Quick Start Guide

### Step 1: Start the Backend Server

1. Open a terminal/PowerShell window
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies (if not already done):
   ```bash
   npm install
   ```

4. Make sure your `.env` file is configured with your MongoDB connection string:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Seed the database (only need to do this once, or when you want to reset):
   ```bash
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   MongoDB Connected: ...
   Server running on port 5000
   ```

   **Keep this terminal window open!**

### Step 2: Start the Frontend Server

1. Open a **NEW** terminal/PowerShell window (keep the backend running)

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies (if not already done):
   ```bash
   npm install
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:3000/
   ```

5. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Troubleshooting

### Port 5000 Already in Use

If you see `Error: listen EADDRINUSE: address already in use :::5000`:

**Windows (PowerShell):**
```powershell
# Find the process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the number you see)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Issues

- Make sure your `.env` file has the correct MongoDB connection string
- Verify your MongoDB Atlas IP is whitelisted
- Check that your MongoDB cluster is running

### Frontend Can't Connect to Backend

- Make sure the backend is running on port 5000
- Check that `vite.config.js` has the correct proxy configuration
- Verify the backend API is accessible at `http://localhost:5000/api/health`

## Summary

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

**Browser:**
```
http://localhost:3000
```

That's it! Your bookstore application should now be running! 🎉

