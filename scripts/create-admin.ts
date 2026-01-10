require('dotenv').config({ path: '.env.local' });
import mongoose from 'mongoose';
import User from '../src/lib/models/User';

async function createAdminUser() {
    try {
        console.log('Connecting to database...');
        // Ensure MONGODB_URI is available
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        const adminExists = await User.findOne({ email: 'admin@creativepluz.com' });

        if (adminExists) {
            console.log('⚠️ Admin user already exists');
            process.exit(0);
        }

        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@creativepluz.com',
            password: 'ChangeThisPassword123!', // Will be hashed by pre-save hook
            role: 'admin'
        });

        await adminUser.save();

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@creativepluz.com');
        console.log('🔐 Password: ChangeThisPassword123!');
        console.log('⚠️ IMPORTANT: Change this password immediately!');

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
        process.exit(0);
    }
}

createAdminUser();
