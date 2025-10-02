import mongoose, { mongo } from 'mongoose'
import { cache } from 'react';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

// This function ensures that the app always connects to the mongodb efficiently
export const connectToDatabase = async () => {
    if (!MONGODB_URI) throw new Error("MONGODB_URI must be set inside .env file");

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    console.log(`Connected to Database ${process.env.NODE_ENV} ${MONGODB_URI}`)
    // This will let us know if we are on development or production 
}