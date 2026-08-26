import mongoose, { Schema, model, type Model, type Types } from 'mongoose';
export type ResourceKind = 'notice'|'slide'|'promotion'|'gateway'|'setting';
export interface IAdminResource { _id: Types.ObjectId; kind: ResourceKind; name: string; status: 'active'|'inactive'; data: Record<string, unknown>; createdBy: Types.ObjectId; createdAt: Date; updatedAt: Date; }
const schema = new Schema<IAdminResource>({ kind:{type:String,enum:['notice','slide','promotion','gateway','setting'],required:true,index:true},name:{type:String,required:true,trim:true},status:{type:String,enum:['active','inactive'],default:'active',index:true},data:{type:Schema.Types.Mixed,default:{}},createdBy:{type:Schema.Types.ObjectId,ref:'User',required:true} },{timestamps:true,versionKey:false});
schema.index({kind:1,name:1});
export const AdminResource=(mongoose.models.AdminResource as Model<IAdminResource>)||model<IAdminResource>('AdminResource',schema);
