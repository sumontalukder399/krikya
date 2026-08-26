import mongoose, { Schema, model, type Model, type Types } from 'mongoose';
import { ROLES, type Role } from '@/src/server/permissions/roles';

export interface IUser {
  _id: Types.ObjectId; name: string; email: string; phone?: string; passwordHash: string; role: Role;
  balance: number; exposure: number; status: 'active' | 'suspended'; parentId?: Types.ObjectId; transactionPinHash?: string; twoFactorSecret?: string; twoFactorEnabled:boolean; lastLoginAt?: Date; createdAt: Date; updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  phone: { type: String, trim: true }, passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ROLES, default: 'user', index: true },
  balance: { type: Number, default: 0 }, exposure: { type: Number, default: 0 }, status: { type: String, enum: ['active', 'suspended'], default: 'active', index: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'User', index: true }, transactionPinHash: { type: String, select: false }, twoFactorSecret:{type:String,select:false},twoFactorEnabled:{type:Boolean,default:false},lastLoginAt: Date,
}, { timestamps: true, versionKey: false });

export const User = (mongoose.models.User as Model<IUser>) || model<IUser>('User', UserSchema);
