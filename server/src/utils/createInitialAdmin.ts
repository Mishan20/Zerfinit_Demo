// server/src/utils/createInitialAdmin.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../frameworks/database/mongodb/models/admin';
import { authService } from '../frameworks/services/authService';

dotenv.config(); // Loads .env file

const createInitialAdmin = async () => {
  const email = 'admin2@gmail.com';
  const password = 'admin123'; // Consider using a stronger password in production!

  try {
    // Connect to MongoDB
    const mongoUri = process.env.DB_CLUSTER_URL;
    if (!mongoUri) {
      console.error('MONGODB_URI is not defined in environment variables');
      process.exit(1);
    }

    console.log(`Attempting to connect to MongoDB with URI: ${mongoUri.substring(0, mongoUri.indexOf('@') > 0 ? mongoUri.indexOf('@') : 10)}...`);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully');
    
    // Log the current database name
    const dbName = mongoose.connection.db.databaseName;
    console.log(`Connected to database: ${dbName}`);
    
    // List collections to verify the connection
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Check if admin already exists
    console.log('Checking if admin already exists...');
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists with email:', email);
      return;
    }
    console.log('No existing admin found with this email, proceeding to create...');

    // Hash the password
    console.log('Hashing password...');
    const hashedPassword = await authService().hashPassword(password);
    console.log('Password hashed successfully');

    // Create new admin
    console.log('Creating new admin document...');
    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    console.log('Admin document created, attempting to save to database...');
    const savedAdmin = await admin.save();
    console.log('Admin save operation completed');
    console.log('Saved admin document:', JSON.stringify(savedAdmin, null, 2));
    console.log('Admin user created successfully with email:', email);
    console.log('Please change the default password after first login for security purposes.');

  } catch (error) {
    console.error('Error creating admin user:', error);
    
    // Additional error diagnosis
    if (error instanceof mongoose.Error.ValidationError) {
      console.error('Validation error details:', error.errors);
    }
    
    // Check connection state
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB connection is not open. Connection state:', mongoose.connection.readyState);
    }
  } finally {
    // Disconnect from MongoDB
    console.log('Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Execute the function with proper error handling
console.log('Starting admin creation process...');
createInitialAdmin()
  .then(() => {
    console.log('Admin creation process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Uncaught exception during admin creation:', error);
    process.exit(1);
  });