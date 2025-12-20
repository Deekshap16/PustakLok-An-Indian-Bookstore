# Quick Guide: Update Your .env File

## You need to edit the `.env` file with your real MongoDB connection string.

### Current (WRONG - placeholder values):
```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority
```

### Example of what it should look like (with REAL values):
```
MONGODB_URI=mongodb+srv://bookstore_user:MyPassword123@cluster0.abc12.mongodb.net/bookstore?retryWrites=true&w=majority
```

## Steps:

1. **Open** `backend/.env` in a text editor

2. **Get your MongoDB Atlas connection string:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Login (or create free account)
   - Click "Database" → "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update the .env file:**
   - Replace `your-username` with your MongoDB username
   - Replace `your-password` with your MongoDB password
   - Replace `cluster.mongodb.net` with your actual cluster URL (e.g., `cluster0.abc12.mongodb.net`)
   - Keep `/bookstore` (this is the database name)
   - Keep `?retryWrites=true&w=majority`

4. **Also update JWT_SECRET:**
   - Replace `your_super_secret_jwt_key_change_this_in_production` with any random string
   - Example: `JWT_SECRET=my_secret_key_12345_xyz`

## Example final .env file:
```
PORT=5000
MONGODB_URI=mongodb+srv://john_doe:SecurePass!2024@cluster0.x7y8z.mongodb.net/bookstore?retryWrites=true&w=majority
JWT_SECRET=my_very_secret_jwt_key_for_production_use
```

## Special Characters in Password:
If your password has special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`

Example: Password `Pass@123` becomes `Pass%40123`

## Don't have MongoDB Atlas yet?
See `MONGODB_SETUP.md` for step-by-step instructions to create a free account and get your connection string.


