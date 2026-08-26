'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import {
  BarChart3, ChevronDown, ChevronUp, Clipboard, Copy, FileText, FolderOpen,
  Home, Link2, LogOut, Menu, Network, Search, Settings, UploadCloud, User,
  UserRound, Users,
} from 'lucide-react';

type View = 'dashboard' | 'profile' | 'bank' | 'hierarchy' | 'kyc' | 'commission-designation' | 'material' | 'member-search' | 'registrations' | 'performance' | 'commission';
type AuthMode = 'login' | 'signup';

const periods = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month'];
const reportViews: { label: string; view: View }[] = [
  { label: 'Member Search', view: 'member-search' }, { label: 'Registrations & FTDs', view: 'registrations' },
  { label: 'Performance', view: 'performance' }, { label: 'Commission', view: 'commission' },
];

function AuthScreen({ onAuthenticated }: { onAuthenticated: (name: string) => void }) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = String(data.get('username') || '').trim();
    const password = String(data.get('password') || '');
    if (!username || password.length < 6) { setError('Enter a username and a password of at least 6 characters.'); return; }
    if (mode === 'signup') localStorage.setItem('krikya-affiliate-account', JSON.stringify({ username, password }));
    const saved = localStorage.getItem('krikya-affiliate-account');
    if (mode === 'login' && !saved) { setError('No affiliate account found. Please sign up first.'); return; }
    if (mode === 'login' && saved) {
      const account = JSON.parse(saved);
      if (account.username !== username || account.password !== password) { setError('Username or password is incorrect.'); return; }
    }
    localStorage.setItem('krikya-affiliate-session', username);
    onAuthenticated(username);
  };
  return <main className="min-h-screen bg-[#e7ecf0] px-4 py-10 font-[Arial,sans-serif] text-[#17202d]">
    <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-[3px] bg-white shadow-[0_4px_18px_rgba(25,35,50,.2)]">
      <div className="bg-[#465269] px-7 py-7 text-white">
        <div className="mb-7 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-sm bg-white text-xl font-black text-[#465269]">K</div><div><h1 className="text-xl font-bold">Krikya Affiliate</h1><p className="text-xs text-white/70">Partner management portal</p></div></div>
        <h2 className="text-2xl font-bold">{mode === 'login' ? 'Welcome back' : 'Create affiliate account'}</h2>
        <p className="mt-1 text-xs text-white/70">{mode === 'login' ? 'Sign in to access your affiliate dashboard.' : 'Register to start managing your referrals.'}</p>
      </div>
      <div className="flex border-b border-[#d7dce2]">
        {(['login','signup'] as AuthMode[]).map(tab => <button key={tab} onClick={() => { setMode(tab); setError(''); }} className={`h-12 flex-1 text-sm font-bold capitalize ${mode === tab ? 'border-b-[3px] border-[#465269] text-[#465269]' : 'text-[#8a929d]'}`}>{tab === 'signup' ? 'Sign Up' : 'Login'}</button>)}
      </div>
      <form key={mode} onSubmit={submit} className="space-y-4 p-7 text-xs">
        {mode === 'signup' && <div className="grid grid-cols-2 gap-3"><Field label="First Name" name="firstName" required/><Field label="Last Name" name="lastName" required/></div>}
        <Field label="Username" name="username" required />
        {mode === 'signup' && <><Field label="Email" name="email" type="email" required/><Field label="Phone Number" name="phone" required/></>}
        <Field label="Password" name="password" type="password" required />
        {error && <p className="border border-red-200 bg-red-50 px-3 py-2 text-red-600">{error}</p>}
        <button className="h-10 w-full rounded-[2px] bg-[#465269] font-bold text-white hover:bg-[#374156]">{mode === 'login' ? 'Login' : 'Create Account'}</button>
        <button type="button" onClick={() => location.href = '/'} className="w-full text-center text-[#687488] underline">Back to Krikya</button>
      </form>
    </div>
  </main>;
}

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="block font-bold">{label}{required && <span className="text-red-500"> *</span>}<input name={name} type={type} required={required} className="mt-1 h-9 w-full border border-[#bfc5cc] px-3 font-normal outline-none focus:border-[#465269]" /></label>;
}

export function AffiliateApp() {
  const [username, setUsername] = useState('');
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>('dashboard');
  const [accountOpen, setAccountOpen] = useState(true);
  const [reportOpen, setReportOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    setUsername(localStorage.getItem('krikya-affiliate-session') || '');
    setSidebarOpen(window.innerWidth >= 768);
    setReady(true);
  }, []);
  if (!ready) return null;
  if (!username) return <AuthScreen onAuthenticated={setUsername} />;
  const logout = () => { localStorage.removeItem('krikya-affiliate-session'); setUsername(''); };
  return <div className="min-h-screen bg-[#e7ecf0] font-[Arial,sans-serif] text-[12px] text-[#17202d]">
    <header className="sticky top-0 z-30 flex h-11 items-center overflow-hidden bg-[#465269] text-white shadow-md">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Open affiliate menu" className="grid h-11 w-11 shrink-0 place-items-center border-r border-white/20 md:hidden"><Menu className="h-5 w-5"/></button>
      <LinkBox label="Default Player Sign-up Link" value="krikya.com/join/S97yYf27" />
      <div className="flex min-w-0 flex-1 justify-start md:justify-center"><LinkBox label="Affiliate Referral Link" value="krikya.com/saf/S97yYf27" /></div>
      <span className="ml-auto shrink-0 px-2 text-[10px] font-bold sm:px-4 sm:text-xs">৳ 0.00</span><button onClick={logout} title="Logout" className="grid h-11 w-10 shrink-0 place-items-center border-l border-white/20 sm:w-11"><LogOut className="h-5 w-5"/></button>
    </header>
    <div className="flex min-h-[calc(100vh-44px)]">
      {sidebarOpen && <button aria-label="Close affiliate menu" onClick={() => setSidebarOpen(false)} className="fixed inset-0 top-11 z-30 bg-black/30 md:hidden" />}
      <aside className={`${sidebarOpen ? 'fixed bottom-0 left-0 top-11 z-40 w-[216px] md:relative md:top-0' : 'w-0 overflow-hidden'} shrink-0 bg-[#707c8e] text-white transition-all`}>
        <div className="flex h-11 items-center justify-between bg-[#536077] px-3"><span>Welcome, {username}</span><button onClick={() => setSidebarOpen(false)}><Menu className="h-5 w-5"/></button></div>
        <SideButton active={view === 'dashboard'} icon={Home} label="Dashboard" onClick={() => setView('dashboard')} />
        <SideButton icon={UserRound} label="My Account" onClick={() => setAccountOpen(!accountOpen)} end={accountOpen ? ChevronUp : ChevronDown} />
        {accountOpen && <div className="bg-white py-1 text-[#4b5565]">{[
          ['Profile','profile'],['Bank','bank'],['Hierarchy','hierarchy'],['Affiliate KYC','kyc'],['Commission Designation','commission-designation'],
        ].map(([label,id]) => <button key={id} onClick={() => setView(id as View)} className="block w-full px-7 py-2 text-left hover:bg-[#eef1f4]">{label}</button>)}</div>}
        <SideButton active={view === 'material'} icon={Network} label="Material" onClick={() => setView('material')} />
        <SideButton icon={BarChart3} label="Report" onClick={() => setReportOpen(!reportOpen)} end={reportOpen ? ChevronUp : ChevronDown} />
        {reportOpen && <div className="bg-white py-1 text-[#4b5565]">{reportViews.map(item => <button key={item.view} onClick={() => setView(item.view)} className="block w-full px-7 py-2 text-left hover:bg-[#eef1f4]">{item.label}</button>)}</div>}
      </aside>
      <main className="min-w-0 flex-1 p-3 md:p-4">
        {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="mb-2 hidden bg-[#465269] p-2 text-white md:block"><Menu className="h-4 w-4"/></button>}
        <AffiliateContent view={view} username={username}/>
        <p className="py-6 text-center text-[10px]">Copyright © 2026. All rights Reserved</p>
      </main>
    </div>
  </div>;
}

function LinkBox({ label, value }: { label: string; value: string }) {
  const copy = () => navigator.clipboard?.writeText(`https://${value}`);
  return <div className="flex h-full min-w-0 items-center px-1 md:px-0"><button onClick={copy} title={`Copy ${label}`} className="flex h-7 min-w-0 items-center bg-white/10 px-1.5 md:h-8 md:px-3"><Link2 className="mr-1 h-3 w-3 shrink-0 md:mr-2 md:h-3.5 md:w-3.5"/><b className="max-w-[62px] text-[7px] leading-[8px] md:hidden">{label}</b><b className="hidden max-w-[190px] truncate md:block">{value}</b><Copy className="ml-1 h-3 w-3 shrink-0 md:ml-5 md:h-4 md:w-4"/></button></div>;
}

function SideButton({ icon: Icon, end: End, label, active, onClick }: any) {
  return <button onClick={onClick} className={`flex h-11 w-full items-center gap-3 px-5 text-left hover:bg-[#536077] ${active ? 'bg-[#536077]' : ''}`}><Icon className="h-5 w-5" strokeWidth={1.4}/><span>{label}</span>{End && <End className="ml-auto h-3.5 w-3.5"/>}</button>;
}

function AffiliateContent({ view, username }: { view: View; username: string }) {
  if (view === 'dashboard') return <Dashboard />;
  if (view === 'profile') return <Profile username={username}/>;
  if (view === 'kyc') return <Kyc />;
  if (view === 'material') return <SimpleTable title="Links" columns={['#','Domain','Status','Keywords','Page','Action']} row={['1','krikya.com','Active','join','Sign Up','↗']} />;
  if (view === 'bank' || view === 'hierarchy') return <Empty title={view === 'bank' ? 'Bank Accounts' : 'Hierarchy'} />;
  if (view === 'commission-designation') return <Report title="Commission Designation" columns={['Player','Currency','Created Time','Update Date','Status','Action']} />;
  const titles: Record<string,string> = { 'member-search':'Member Search', registrations:'Registration & FTDs', performance:'Performance', commission:'Commission' };
  const columns = view === 'registrations' ? ['#','Username','Full Name','VIP Level','Currency','Registration Time','First Deposit','Last Bet'] : view === 'commission' ? ['#','Start Date','Currency','Net Profit','Commission','Period','Status','Action'] : ['#','Username','Full Name','VIP Level','Currency','Registered Time','Total Deposit','Total Withdrawal','Turnover'];
  return <Report title={titles[view]} columns={columns} tabs={view === 'performance' ? ['Player','Downline'] : view === 'commission' ? ['My Account','Downline'] : undefined} />;
}

function Panel({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return <section className={`overflow-hidden rounded-[3px] bg-white shadow-[0_2px_4px_rgba(0,0,0,.16)] ${className}`}><h2 className="flex h-12 items-center border-b border-[#d8dce0] px-4 text-base font-bold before:mr-2 before:h-5 before:w-1 before:rounded-sm before:bg-[#465269]">{title}<ChevronUp className="ml-auto h-4 w-4 text-[#8b939d]"/></h2>{children}</section>;
}

function Dashboard() {
  const cards = ['Registered Users','First Deposit','Deposit','Withdrawal','Bonus','Recycle Amount','Cancel Fee','VIP Cash Bonus','Referral Commission','Turnover'];
  return <div className="space-y-4"><div className="flex justify-end"><select className="h-8 border border-[#c5cad0] bg-white px-3"><option>BDT</option></select></div>
    <div className="grid gap-3 md:grid-cols-2"><Summary title="Commission" color="#cadbe0" amount="৳0"/><Summary title="Active Players" color="#d2e5d8" amount="0"/></div>
    <div className="grid gap-4 md:grid-cols-2">{cards.map((title,i) => <StatTable key={title} title={title} countOnly={i === 0}/>)}</div>
    <StatTable title="Affiliate Profit & Loss" />
  </div>;
}

function Summary({ title, color, amount }: { title:string;color:string;amount:string }) { return <div style={{background:color}} className="flex h-[152px] items-center justify-between rounded-[2px] p-4"><b className="self-start pt-2 text-sm">{title}</b><div className="space-y-4 pt-8 text-right text-sm text-[#697489]"><p className="whitespace-nowrap"><b>This Period</b> <span className="ml-3 text-2xl font-normal">{amount}</span></p><p className="whitespace-nowrap"><b>Last Period</b> <span className="ml-3 text-2xl font-normal">{amount}</span></p></div></div> }
function StatTable({ title, countOnly=false }: { title:string;countOnly?:boolean }) { return <Panel title={title}><div className="p-4"><table className="w-full border-collapse text-center"><thead><tr className="border-y border-[#9da6b3] bg-[#e2e5e8]"><th className="py-2">Period</th><th>Count</th>{!countOnly&&<th>Amount</th>}</tr></thead><tbody>{periods.map((p,i)=><tr key={p} className={i%2?'bg-[#eee]':''}><td className="py-2">{p}</td><td>0</td>{!countOnly&&<td>0.00</td>}</tr>)}</tbody></table></div></Panel> }

function Profile({ username }: { username:string }) { return <div className="grid gap-4 md:grid-cols-2"><Panel title="Profile"><dl className="grid grid-cols-2 gap-6 p-5"><Info k="Username" v={username}/><Info k="Account Status" v="Active"/><Info k="First Name" v="Affiliate"/><Info k="Approved Date and Time" v="2026/08/25 13:03:43"/><Info k="Last Name" v="Partner"/><Info k="Referral Code" v="S97yYf27"/></dl></Panel><Panel title="Contact Info"><dl className="space-y-6 p-5"><Info k="Phone Number 1" v="+880 1712100007"/><Info k="Email" v="affiliate@krikya.com"/></dl></Panel><Panel title="Potential (This Period)"><div className="grid grid-cols-3 gap-6 p-5">{['Total Profit & Loss','Total Jackpot','Total Deduction','Total Turnover','Total Bonus','Recycle Amount','Cancel Fee','Referral Commission','Net Profit'].map(x=><Info key={x} k={x} v="0.00"/>)}</div></Panel><Panel title="Commission"><div className="space-y-5 p-5">{['Pending','Available','Processing Withdrawal'].map(x=><Info key={x} k={x} v="0.00"/>)}</div></Panel></div> }
function Info({k,v}:{k:string;v:string}) { return <div><dt className="font-bold">{k}</dt><dd className="mt-1">{v}</dd></div> }

function Kyc() { const [tab,setTab]=useState('Identity'); return <Panel title="Affiliate KYC"><div className="p-4"><div className="mb-5 flex border-b-4 border-[#465269]">{['Identity','Address'].map(t=><button onClick={()=>setTab(t)} key={t} className={`px-4 py-2 ${tab===t?'bg-[#465269] text-white':''}`}>{t}</button>)}</div><div className="grid gap-3 md:grid-cols-2"><Field label="Document Type" name="doc"/><Field label={tab==='Identity'?'Document No':'Proof of Address'} name="number"/><Upload label="Upload Document Photo (Front side)"/><Upload label="Upload Document Photo (Back side)"/><Upload label="Upload Handheld KYC Document Photo (Selfie)"/></div><div className="mt-4 text-right"><button className="bg-[#465269] px-5 py-2 font-bold text-white">Submit</button></div></div></Panel> }
function Upload({label}:{label:string}) { return <div><b>{label}</b><div className="mt-2 grid h-32 place-items-center border border-dashed border-[#bdc3cb]"><div className="text-center text-[#aaa]"><UploadCloud className="mx-auto h-10 w-10"/><button className="mt-2 bg-[#39858d] px-4 py-1 text-white">choose image</button></div></div><p className="border border-[#adb5c0] bg-[#f0f2f4] p-2 text-[10px]">1. Upload jpg, jpeg or png file.<br/>2. Not over 5MB.<br/>3. Document must be clear and valid.</p></div> }

function Empty({title}:{title:string}) { return <Panel title={title}><div className="grid h-32 place-items-center text-[#586579]"><div className="text-center"><FolderOpen className="mx-auto h-8 w-8"/><p>No Records Found</p></div></div></Panel> }
function Report({title,columns,tabs}:{title:string;columns:string[];tabs?:string[]}) { return <Panel title={title}><div className="p-3">{tabs&&<div className="mb-4 flex border-b-4 border-[#465269]">{tabs.map((t,i)=><button key={t} className={`px-4 py-2 ${i===0?'bg-[#465269] text-white':''}`}>{t}</button>)}</div>}<button className="mb-3 bg-[#465269] px-3 py-1.5 font-bold text-white">Date Filter⌄</button><div className="mb-3 grid gap-3 md:grid-cols-3"><Field label="From" name="from" type="date"/><Field label="To" name="to" type="date"/><label className="font-bold">Currency<select className="mt-1 h-9 w-full border border-[#bfc5cc] px-2 font-normal"><option>BDT</option></select></label></div><SimpleTable title="" columns={columns}/><div className="mt-8 flex justify-end gap-1"><button className="bg-[#465269] px-4 py-2 font-bold text-white">Export</button><button className="flex items-center gap-2 bg-[#465269] px-4 py-2 font-bold text-white"><Search className="h-4 w-4"/>Search</button></div></div></Panel> }
function SimpleTable({title,columns,row}:{title:string;columns:string[];row?:string[]}) { return <div>{title&&<h2 className="mb-4 border-b border-[#ddd] pb-3 text-base font-bold">{title}</h2>}<div className="overflow-x-auto"><table className="min-w-full text-center"><thead className="bg-[#465269] text-white"><tr>{columns.map(c=><th key={c} className="whitespace-nowrap border-r border-white/20 px-3 py-2">{c}</th>)}</tr></thead><tbody><tr className="bg-[#eee]">{row ? row.map((x,i)=><td key={i} className="whitespace-nowrap px-3 py-2">{x}</td>) : <td className="px-3 py-2" colSpan={columns.length}>No data available in table</td>}</tr></tbody></table></div></div> }
