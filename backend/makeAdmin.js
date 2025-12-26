import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const makeUserAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get email from command line argument or use default
    const email = process.argv[2] || 'deekshap1102@gmail.com';

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ User with email "${email}" not found.`);
      console.log('\nAvailable users:');
      const allUsers = await User.find({}, 'name email role');
      allUsers.forEach(u => {
        console.log(`  - ${u.name} (${u.email}) - Role: ${u.role}`);
      });
      process.exit(1);
    }

    // Update user role to admin
    user.role = 'admin';
    await user.save();

    console.log(`✅ Success! User "${user.name}" (${user.email}) is now an admin.`);
    console.log('\nYou can now log in using the Admin Login tab.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

makeUserAdmin();

