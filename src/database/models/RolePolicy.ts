import mongoose,{Schema,model,type Model}from'mongoose';import{ROLES,type Role,type Permission}from'@/src/server/permissions/roles';
export interface IRolePolicy{role:Role;permissions:Permission[];updatedAt:Date}
const schema=new Schema<IRolePolicy>({role:{type:String,enum:ROLES,required:true,unique:true},permissions:{type:[String],default:[]}},{timestamps:true,versionKey:false});export const RolePolicy=(mongoose.models.RolePolicy as Model<IRolePolicy>)||model<IRolePolicy>('RolePolicy',schema);
