import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Search, 
  Home, 
  MessageSquare, 
  HelpCircle, 
  ChevronRight, 
  CheckCheck,
  Bot,
  User
} from 'lucide-react';
import { UserProfile } from '../types';

interface LiveChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  user?: UserProfile;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  user,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const handleClose = isControlled ? (controlledOnClose || (() => {})) : () => setInternalIsOpen(false);
  const handleOpen = () => setInternalIsOpen(true);

  const [activeTab, setActiveTab] = useState<'home' | 'messages' | 'help'>('home');
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: `Hello ${user?.username ? user.username : 'there'}! Welcome to Krikya 24/7 Live Support. How may I assist you today with deposits, withdrawals, or bonuses?`,
      time: 'Just now',
    }
  ]);
  const [conversationId,setConversationId]=useState<string>();

  if (!isOpen) {
    if (isControlled) return null;
    return (
      <button
        id="live-chat-launcher-btn"
        onClick={handleOpen}
        className="fixed bottom-18 sm:bottom-6 right-4 z-40 bg-[#0e5332] hover:bg-[#0a3e25] text-white p-3.5 rounded-full shadow-2xl border-2 border-amber-400 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer group"
        title="Chat with 24/7 Live Support"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 text-amber-300 fill-amber-300/20" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#0e5332] rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#0e5332] rounded-full"></span>
        </div>
      </button>
    );
  }

  const faqs = [
    { q: 'বিকাশ একাউন্টে ডিপোজিট করার নিয়ম?', a: 'বিকাশ দিয়ে ডিপোজিট করতে "Deposit" পেজে গিয়ে বিকাশ সিলেক্ট করুন। প্রদত্ত এজেন্ট নম্বরে ক্যাশ আউট করে Transaction ID টি সাবমিট করুন।' },
    { q: 'How to create Affiliate Account?', a: 'Go to Partner Programs > Affiliate, enter your desired Agent ID, password, and submit. You will receive immediate dashboard access.' },
    { q: 'Why withdrawal option is not showing?', a: 'Please ensure you have completed your turnover requirement (1x for standard deposits) and verified your phone number.' },
    { q: 'How long does it take to process my deposit?', a: 'With Nagad-SpeedPay and bKash Auto, deposits are credited instantly within 30 seconds to 3 minutes.' },
    { q: 'How to claim 8% Instant Cash Bonus?', a: 'Select the 8% Instant Cash bonus on the Deposit page during checkout. Turnover is only 1x!' }
  ];

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    const userText = messageInput;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setMessageInput('');
    setActiveTab('messages');

    try{let visitorId=localStorage.getItem('krikya_visitor');if(!visitorId){visitorId=crypto.randomUUID();localStorage.setItem('krikya_visitor',visitorId)}const response=await fetch('/api/v1/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({visitorId,conversationId,message:userText})});const json=await response.json();if(!response.ok)throw new Error(json.error?.message);setConversationId(json.data.conversationId);setChatMessages(prev=>[...prev,{sender:'bot',text:json.data.message.text,time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}])}catch{setChatMessages(prev=>[...prev,{sender:'bot',text:'We could not save your message. Please try again.',time:'Just now'}])}
  };

  const handleSelectFaq = (faq: { q: string; a: string }) => {
    setActiveTab('messages');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: faq.q, time: now },
      { sender: 'bot', text: faq.a, time: now }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[350px] max-w-[92vw] h-[520px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slideUp">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[#0e5332] via-[#146b41] to-[#0e5332] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg border border-white/20">
              <Bot className="w-6 h-6 text-amber-300" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#0e5332] rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight text-white">KRIKYA SUPPORT</h3>
            <p className="text-[11px] text-emerald-200">We typically reply in a few minutes</p>
          </div>
        </div>

        <button
          id="close-live-chat-btn"
          onClick={handleClose}
          className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content by Tab */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 text-xs">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Banner greeting */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-2xs">
              <h4 className="font-bold text-gray-800 text-sm mb-1">
                Hi {user.isLoggedIn ? user.username : 'Player'} 👋
              </h4>
              <p className="text-gray-600 text-xs">How can we help you today?</p>
              
              <button
                onClick={() => setActiveTab('messages')}
                className="mt-3 w-full bg-[#0e5332] hover:bg-[#0a3e25] text-white font-bold py-2 px-3 rounded-lg flex items-center justify-between text-xs transition"
              >
                <span>Send us a message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* FAQs list */}
            <div>
              <h5 className="font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-2 px-1">
                Search for help
              </h5>
              <div className="space-y-1.5">
                {faqs.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectFaq(faq)}
                    className="w-full bg-white hover:bg-gray-100 p-2.5 rounded-lg border border-gray-200 flex items-center justify-between text-left transition group"
                  >
                    <span className="font-medium text-gray-700 text-[11px] pr-2 group-hover:text-[#0e5332]">
                      {faq.q}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0e5332] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="flex flex-col h-full space-y-3 justify-between">
            <div className="space-y-2.5 overflow-y-auto pr-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 rounded-2xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#0e5332] text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="mt-2 flex items-center gap-1.5">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white border border-gray-300 rounded-full px-3.5 py-2 text-xs focus:outline-hidden focus:border-[#0e5332]"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#0e5332] hover:bg-[#0a3e25] text-white flex items-center justify-center transition shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
              />
            </div>

            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs">
                  <p className="font-bold text-gray-800 text-xs">{faq.q}</p>
                  <p className="text-gray-600 text-[11px] mt-1 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tabs Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-around text-xs font-semibold">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'home' ? 'text-[#0e5332]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'messages' ? 'text-[#0e5332]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[10px]">Messages</span>
        </button>

        <button
          onClick={() => setActiveTab('help')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'help' ? 'text-[#0e5332]' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-[10px]">Help</span>
        </button>
      </div>
    </div>
  );
};
