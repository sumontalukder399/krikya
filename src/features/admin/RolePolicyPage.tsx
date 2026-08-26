'use client';
import { useEffect, useState } from 'react';
export function RolePolicyPage(){
 const[rows,setRows]=useState<any[]>([]),[message,setMessage]=useState('');
 const load=()=>fetch('/api/v1/role-policies').then(r=>r.json()).then(j=>{if(j.success)setRows(j.data)});
 useEffect(()=>{void load()},[]);
 function toggle(role:string,p:string){setRows(x=>x.map(r=>r.role===role?{...r,permissions:r.permissions.includes(p)?r.permissions.filter((v:string)=>v!==p):[...r.permissions,p]}:r))}
 async function save(row:any){const r=await fetch('/api/v1/role-policies',{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({role:row.role,permissions:row.permissions})}),j=await r.json();setMessage(r.ok?'Permission policy saved to MongoDB':j.error?.message)}
 return <section className="rounded-[22px] bg-white p-6 lg:p-8"><h2 className="mb-2 text-lg font-extrabold">Database-driven Role Permissions</h2><p className="mb-6 text-xs text-slate-400">The system always uses exactly four roles. Changes are enforced by backend APIs.</p>{message&&<p className="mb-4 rounded-xl bg-violet-50 p-3 text-sm text-violet-700">{message}</p>}<div className="grid gap-5 lg:grid-cols-2">{rows.map(row=><div className="rounded-2xl border p-5" key={row.role}><h3 className="mb-4 font-bold capitalize">{row.role.replaceAll('_',' ')}</h3><div className="grid gap-2 sm:grid-cols-2">{row.available.map((p:string)=><label className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 text-xs" key={p}><input type="checkbox" checked={row.permissions.includes(p)} onChange={()=>toggle(row.role,p)}/>{p}</label>)}</div><button onClick={()=>save(row)} className="mt-5 rounded-lg bg-violet-500 px-5 py-2 text-xs font-bold text-white">Save policy</button></div>)}</div></section>
}
