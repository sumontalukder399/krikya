import mongoose, { Schema, model, type Model, type Types } from 'mongoose';

export interface ITransaction { _id: Types.ObjectId; userId: Types.ObjectId; createdBy?: Types.ObjectId; type: 'deposit'|'withdrawal'|'transfer'|'bonus'|'rebate'|'loss_bonus'|'bet'|'win'; amount: number; bonus: number; status: 'pending'|'approved'|'rejected'; reference?: string; method?: string; provider?: string; game?: string; note?: string; createdAt: Date; }
const TransactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }, createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['deposit','withdrawal','transfer','bonus','rebate','loss_bonus','bet','win'], required: true, index: true },
  amount: { type: Number, required: true, min: 0 }, bonus: { type: Number, default: 0, min: 0 }, status: { type: String, enum: ['pending','approved','rejected'], default: 'pending', index: true }, reference: String, method: String, provider: String, game: String, note: String,
}, { timestamps: true, versionKey: false });
TransactionSchema.index({ userId: 1, createdAt: -1 });
TransactionSchema.index({ status: 1, type: 1, createdAt: -1 });
export const Transaction = (mongoose.models.Transaction as Model<ITransaction>) || model<ITransaction>('Transaction', TransactionSchema);
