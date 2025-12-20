# MongoDB Atlas Setup Guide

## Step-by-Step Instructions to Get Your Connection String

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Fill in your details and verify your email

### 2. Create a Cluster
1. After logging in, you'll see "Deploy a cloud database"
2. Choose the **FREE** (M0) tier
3. Select a Cloud Provider (AWS, Google Cloud, or Azure) - doesn't matter which
4. Choose a region close to you
5. Name your cluster (or leave default "Cluster0")
6. Click "Create Cluster" (takes 3-5 minutes)

### 3. Create Database User
1. You'll see "Database Access" in the left sidebar - click it
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., "bookstore_user")
5. Enter a strong password (save this!)
6. Click "Add User"

### 4. Whitelist Your IP Address
1. Click "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (adds 0.0.0.0/0)
   - **OR** add your current IP address for better security
4. Click "Confirm"

### 5. Get Your Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as the driver
5. Copy the connection string - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Update Your .env File
1. Open `backend/.env` file
2. Replace the entire MONGODB_URI line with your connection string
3. **Important:** Replace `<username>` and `<password>` with your actual credentials
4. Add `/bookstore` before the `?` to specify the database name:
   ```
   MONGODB_URI=mongodb+srv://bookstore_user:yourpassword@cluster0.xxxxx.mongodb.net/bookstore?retryWrites=true&w=majority
   ```

### 7. Special Characters in Password
If your password contains special characters, you need to URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

**Example:**
- Password: `MyP@ss#123`
- URL-encoded: `MyP%40ss%23123`
- Final URI: `mongodb+srv://user:MyP%40ss%23123@cluster0.xxxxx.mongodb.net/bookstore?retryWrites=true&w=majority`

### 8. Test Your Connection
After updating `.env`, run:
```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
Cleared existing books
Seeded books successfully
Database connection closed
```

## Troubleshooting

**Error: "Authentication failed"**
- Double-check your username and password
- Make sure you URL-encoded special characters in the password

**Error: "ENOTFOUND" or "Connection timeout"**
- Check your internet connection
- Verify your IP address is whitelisted in Network Access
- Make sure you're using the correct cluster URL from Atlas

**Error: "Invalid connection string"**
- Make sure there are no spaces in the connection string
- Check that you replaced `<username>` and `<password>` with actual values
- Verify the format matches the example above

## Alternative: Local MongoDB (Advanced)

If you prefer to run MongoDB locally instead of using Atlas:

1. Install MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use this connection string in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/bookstore
   ```

---

**Need Help?** Make sure your connection string looks exactly like this format (with your actual values):
```
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/bookstore?retryWrites=true&w=majority
```


