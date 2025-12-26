import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach user to request (use role from DB, not just JWT, for security)
      req.user = user;
      
      // Log for debugging
      console.log(`🔒 Protected route accessed by: ${user.email} (${user.role})`);

      next();
    } catch (error) {
      console.error('❌ Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } catch (error) {
    console.error('❌ Auth middleware error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin middleware - must be used after protect middleware
export const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.user.role !== 'admin') {
    console.log(`❌ Admin access denied for: ${req.user.email} (role: ${req.user.role})`);
    return res.status(403).json({ 
      message: 'Admin access only',
      userRole: req.user.role 
    });
  }

  console.log(`✅ Admin access granted to: ${req.user.email}`);
  next();
};



