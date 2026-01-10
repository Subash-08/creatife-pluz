import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'editor';
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'editor'],
        default: 'editor'
    }
}, {
    timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        console.log('🔐 Hashing password for user:', user.email)
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
        console.log('✅ Password hashed successfully')
        next();
    } catch (error: any) {
        console.error('❌ Error hashing password:', error)
        next(error);
    }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        console.log('🔐 Comparing passwords for user:', this.email)
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        console.log('✅ Password match:', isMatch)
        return isMatch
    } catch (error) {
        console.error('❌ Error comparing passwords:', error)
        return false
    }
};

// Static method to create admin user
UserSchema.statics.createAdmin = async function (email: string, password: string, name: string = 'Admin User') {
    try {
        const existingAdmin = await this.findOne({ email, role: 'admin' })
        if (existingAdmin) {
            console.log('⚠️ Admin already exists:', email)
            return existingAdmin
        }

        const admin = new this({
            name,
            email,
            password,
            role: 'admin'
        })

        await admin.save()
        console.log('✅ Admin user created:', email)
        return admin
    } catch (error) {
        console.error('❌ Error creating admin:', error)
        throw error
    }
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);