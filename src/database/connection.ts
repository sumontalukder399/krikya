import mongoose from 'mongoose';

const globalMongo = globalThis as typeof globalThis & { mongo?: { connection: typeof mongoose | null; promise: Promise<typeof mongoose> | null } };
globalMongo.mongo ??= { connection: null, promise: null };

export async function connectDatabase() {
  if (globalMongo.mongo!.connection) return globalMongo.mongo!.connection;
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URl;
  if (!uri) throw new Error('MONGODB_URI is not configured');
  globalMongo.mongo!.promise ??= mongoose.connect(uri, { dbName: process.env.MONGODB_DB || 'krikya' });
  globalMongo.mongo!.connection = await globalMongo.mongo!.promise;
  return globalMongo.mongo!.connection;
}
