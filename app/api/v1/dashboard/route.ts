import { connectDatabase } from '@/src/database/connection';
import { Transaction } from '@/src/database/models/Transaction';
import { User } from '@/src/database/models/User';
import { AuditLog } from '@/src/database/models/AuditLog';
import { requirePermission } from '@/src/server/auth';
import { fail, ok } from '@/src/utils/api-response';
import { visibleUserIds } from '@/src/server/scope';

export async function GET(){
 const auth=await requirePermission('dashboard:view');if('error'in auth)return fail(auth.error,auth.status);await connectDatabase();
 const visibleIds=await visibleUserIds(auth.session),userScope=visibleIds?{_id:{$in:visibleIds}}:{};
 const users=await User.find(userScope).select('_id role balance status createdAt').lean(),ids=users.map(u=>u._id),transactionScope={userId:{$in:ids}};
 const since=new Date();since.setDate(since.getDate()-6);since.setHours(0,0,0,0);
 const[totals,statuses,daily,recentTransactions,recentActivity]=await Promise.all([
  Transaction.aggregate([{$match:{...transactionScope,status:'approved'}},{$group:{_id:null,deposits:{$sum:{$cond:[{$eq:['$type','deposit']},'$amount',0]}},withdrawals:{$sum:{$cond:[{$eq:['$type','withdrawal']},'$amount',0]}},wins:{$sum:{$cond:[{$eq:['$type','win']},'$amount',0]}},bets:{$sum:{$cond:[{$eq:['$type','bet']},'$amount',0]}},transfers:{$sum:{$cond:[{$eq:['$type','transfer']},'$amount',0]}},rebate:{$sum:{$cond:[{$eq:['$type','rebate']},'$amount',0]}},lossBonus:{$sum:{$cond:[{$eq:['$type','loss_bonus']},'$amount',0]}},bonus:{$sum:{$cond:[{$eq:['$type','bonus']},'$amount',0]}}}}]),
  Transaction.aggregate([{$match:transactionScope},{$group:{_id:'$status',count:{$sum:1},amount:{$sum:'$amount'}}}]),
  Transaction.aggregate([{$match:{...transactionScope,createdAt:{$gte:since}}},{$group:{_id:{day:{$dateToString:{format:'%Y-%m-%d',date:'$createdAt'}},type:'$type'},amount:{$sum:'$amount'}}},{$sort:{'_id.day':1}}]),
  Transaction.find(transactionScope).populate('userId','name email').sort({createdAt:-1}).limit(6).lean(),
  auth.session.role==='master_admin'?AuditLog.find().populate('actorId','name').sort({createdAt:-1}).limit(6).lean():Promise.resolve([]),
 ]);
 const t=totals[0]||{};const currentBalance=users.reduce((n,u)=>n+(u.balance||0),0);
 return ok({currentBalance,transferredBalance:t.transfers||0,dailySales:t.deposits||0,userBalance:users.filter(u=>u.role==='user').reduce((n,u)=>n+(u.balance||0),0),totalAffiliateManagers:users.filter(u=>u.role==='affiliate_manager').length,totalAffiliateAgents:users.filter(u=>u.role==='affiliate_agent').length,totalUsers:users.filter(u=>u.role==='user').length,activeUsers:users.filter(u=>u.status==='active').length,profitLoss:(t.bets||0)-(t.wins||0),totalDeposit:t.deposits||0,totalWithdraw:t.withdrawals||0,totalRebate:t.rebate||0,totalLossBonus:t.lossBonus||0,totalPromotionBonus:t.bonus||0,statuses,daily,recentTransactions,recentActivity});
}
