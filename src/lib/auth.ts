import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from './db';
import User from './models/User';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role: string;
        }
    }
    interface User {
        role: string;
        id: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'admin@creativepluz.com' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                console.log('🔐 Auth attempt for:', credentials?.email)

                if (!credentials?.email || !credentials?.password) {
                    console.log('❌ Missing credentials')
                    throw new Error('Please enter email and password');
                }

                try {
                    await connectToDatabase();
                    console.log('✅ Database connected for auth')

                    const user = await User.findOne({ email: credentials.email.toLowerCase() }).select('+password');

                    if (!user) {
                        console.log('❌ User not found:', credentials.email)
                        throw new Error('Invalid email or password');
                    }

                    console.log('👤 User found:', user.email, 'Role:', user.role)

                    // Use the comparePassword method from the model
                    const isValid = await user.comparePassword(credentials.password);

                    if (!isValid) {
                        console.log('❌ Invalid password for:', user.email)
                        throw new Error('Invalid email or password');
                    }

                    console.log('✅ Auth successful for:', user.email)

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role
                    };
                } catch (error: any) {
                    console.error('❌ Auth error:', error.message)
                    throw new Error('Authentication failed');
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log('🔄 JWT callback - User:', user?.email)
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            console.log('🔄 Session callback - Token email:', token.email)
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            console.log('👤 Final session user:', session.user)
            return session;
        }
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login'
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
};