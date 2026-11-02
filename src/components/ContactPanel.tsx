import React, { useState } from 'react';
import { X } from 'lucide-react';
import { errorMessage } from '../platform/api';
import { player } from '../platform/player';
import { useTenant } from '../platform/tenant';

/** The brand's own contact links, plus a support ticket for a logged-in player. */
export const ContactPanel: React.FC<{ isOpen: boolean; isLoggedIn: boolean; onClose: () => void }> = ({ isOpen, isLoggedIn, onClose }) => {
  const { social } = useTenant();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

  if (!isOpen) return null;
  const links = Object.entries(social ?? {}).filter(([, url]) => Boolean(url));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setNote('');
    try {
      await player.createTicket(subject.trim(), body.trim());
      setNote('Your message was sent. We will reply in your inbox.');
      setSubject('');
      setBody('');
    } catch (err) {
      setNote(errorMessage(err, 'Could not send your message.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-[#0e5332] p-4 text-white">
          <h2 className="text-sm font-bold">Contact Us</h2>
          <button onClick={onClose} className="cursor-pointer" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-4 p-5 text-xs">
          {links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {links.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer" className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-bold capitalize text-gray-800 hover:border-[#ff5a00]">{name}</a>)}
            </div>
          )}
          {isLoggedIn ? (
            <form onSubmit={submit} className="space-y-2">
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none" />
              <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="How can we help?" required rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none" />
              {note && <p className="font-semibold text-gray-700">{note}</p>}
              <button disabled={busy} className="w-full cursor-pointer rounded-lg bg-[#ff5a00] py-2.5 font-extrabold text-white disabled:opacity-50">{busy ? 'Sending...' : 'Send Message'}</button>
            </form>
          ) : links.length === 0 && <p className="text-gray-600">Log in to send us a message.</p>}
        </div>
      </div>
    </div>
  );
};
