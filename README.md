![image alt] (https://github.com/Deekshap16/PustakLok-An-Indian-Bookstore/blob/6166f8b699d522fb186ac7da8599bce53627628a/Screenshot%202025-12-26%20183804.png)
# PustakLok - Full Stack MERN Application

A beautiful, full-stack online bookstore web application inspired by crossword.in, built with the MERN stack (MongoDB, Express, React, Node.js). Features Indian literature, mythology books, and a complete e-commerce experience with authentication, cart management, and search/filter capabilities.

## 🚀 Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes and API endpoints

### Book Management
- Display up to 20 Indian books
- Books by Indian authors
- Mythological books (Ramayana, Mahabharata, Shiva Trilogy, etc.)
- Realistic book data with covers, descriptions, and ratings
- Prices in INR (₹)

### Shopping Cart
- Add/remove books from cart
- Update quantity
- Cart persists per user
- Real-time cart total calculation
- Proceed to checkout (demo)

### Search & Filters
- Search by title or author
- Filter by genre (Mythical, Fiction, Non-Fiction, etc.)
- Filter by price range
- Filter by language
- Sort by price (Low to High, High to Low)

### UI/UX
- Beautiful, minimal design inspired by crossword.in
- Warm color scheme (beige, brown, off-white)
- Responsive design (desktop + mobile)
- Smooth hover effects and transitions
- Clean typography and spacing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier works) or local MongoDB

## 🛠️ Installation & Setup

### 1. Navigate to Project Directory

If you have the project files already, navigate to the project directory:

```bash
cd "crossword clone"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your MongoDB connection string and JWT secret:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**MongoDB Atlas Setup:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist your IP address (0.0.0.0/0 for all IPs)
6. Get your connection string and replace `<password>` with your password
7. Update `MONGODB_URI` in `.env`

### 3. Seed the Database

```bash
# From the backend directory
npm run seed
```

This will populate your database with 20 Indian books.

### 4. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 6. Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
crossword clone/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Cart.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── cartController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── cartRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── BookCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Books.jsx
│   │   │   ├── BookDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books` - Get all books (with query params: search, genre, minPrice, maxPrice, language, sortBy)
- `GET /api/books/:id` - Get single book by ID

### Cart (Protected - requires authentication)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:bookId` - Remove item from cart

## 🎨 Pages

1. **Home Page** (`/`) - Featured books and categories
2. **Books Listing** (`/books`) - All books with filters
3. **Book Details** (`/books/:id`) - Individual book page
4. **Login** (`/login`) - User login
5. **Signup** (`/signup`) - User registration
6. **Cart** (`/cart`) - Shopping cart
7. **404 Page** - Not found page

## 🧪 Testing the Application

1. **Register a new user:**
   - Go to `/signup`
   - Fill in name, email, and password
   - Submit the form

2. **Browse books:**
   - Go to `/books`
   - Use search and filters
   - Click on any book to view details

3. **Add to cart:**
   - View a book's details
   - Select quantity
   - Click "Add to Cart"
   - View cart at `/cart`

4. **Cart management:**
   - Update quantities
   - Remove items
   - View cart total

## 🔒 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (optional .env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🚢 Deployment

### Backend Deployment (Railway, Render, Heroku)
1. Set environment variables
2. Update CORS settings if needed
3. Deploy

### Frontend Deployment (Vercel, Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API URL in environment variables

## 📝 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cors
- dotenv

### Frontend
- React 18
- React Router DOM
- Axios
- Context API
- Tailwind CSS
- Vite

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB connection error:** Check your MongoDB URI and ensure your IP is whitelisted
- **Port already in use:** Change PORT in .env file
- **JWT errors:** Ensure JWT_SECRET is set in .env

### Frontend Issues
- **API connection failed:** Ensure backend is running on port 5000
- **CORS errors:** Check backend CORS configuration
- **Build errors:** Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a full-stack MERN application for learning and demonstration purposes.

## 🙏 Acknowledgments

- Design inspiration from crossword.in
- Book data includes works from renowned Indian authors

---

**Happy Reading! 📚**


