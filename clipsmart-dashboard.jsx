import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard, Users, CreditCard, Film, Settings as SettingsIcon, LogOut,
  Plus, Trash2, Pencil, CheckCircle2,
  Upload, X, Eye, Heart, MessageCircle, Share2, Lock,
  Building2, Search, Download, RefreshCw, AlertTriangle, ExternalLink,
  ShieldCheck, FileSpreadsheet
} from 'lucide-react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const STORAGE_KEY = 'clipsmart_data';

const SAMPLE_DATA = {
  clients: [
    {
      id: 'c_nhc', name: 'NHC Murda Mgmt', company: 'NHC Murda', email: 'team@nhcmurda.com',
      category: 'Music Artist', platformFocus: 'TikTok', signedDate: '2026-02-10', status: 'Active',
      packageBudget: 1000, clientRpmRate: 0.08, viewsGuaranteed: 8000000, creatorPayoutRpm: 0.03,
      salesGenerated: '', notes: 'Case study client — 60x ROI on launch single.',
      username: 'nhcmurda', password: 'demo123'
    },
    {
      id: 'c_gui', name: 'Marco', company: 'Growing Up Italian', email: 'marco@growingupitalian.com',
      category: 'Podcaster', platformFocus: 'Both', signedDate: '2026-03-02', status: 'Active',
      packageBudget: 600, clientRpmRate: 0.16, viewsGuaranteed: 3500000, creatorPayoutRpm: 0.06,
      salesGenerated: '', notes: '',
      username: 'guipodcast', password: 'demo123'
    }
  ],
  payments: [
    { id: 'p1', clientId: 'c_nhc', date: '2026-02-10', amount: 1000, method: 'Bank Transfer', status: 'Paid', note: 'Full package upfront' },
    { id: 'p2', clientId: 'c_gui', date: '2026-03-02', amount: 600, method: 'Card', status: 'Paid', note: '' }
  ],
  videos: [
    { id: 'v1', clientId: 'c_nhc', link: 'https://www.tiktok.com/@creator1/video/0000000000001', platform: 'TikTok', creatorHandle: '@creator1', datePosted: '2026-02-14', views: 4200000, likes: 380000, comments: 9100, shares: 22000, lastUpdated: '2026-04-01' },
    { id: 'v2', clientId: 'c_nhc', link: 'https://www.tiktok.com/@creator2/video/0000000000002', platform: 'TikTok', creatorHandle: '@creator2', datePosted: '2026-02-16', views: 5300000, likes: 410000, comments: 7600, shares: 31000, lastUpdated: '2026-04-01' },
    { id: 'v3', clientId: 'c_nhc', link: 'https://www.tiktok.com/@creator3/video/0000000000003', platform: 'TikTok', creatorHandle: '@creator3', datePosted: '2026-02-20', views: 2500000, likes: 198000, comments: 5400, shares: 12500, lastUpdated: '2026-04-01' },
    { id: 'v4', clientId: 'c_gui', link: 'https://www.instagram.com/reel/0000000000004', platform: 'Instagram', creatorHandle: '@creator4', datePosted: '2026-03-05', views: 1900000, likes: 152000, comments: 3100, shares: 8400, lastUpdated: '2026-04-01' },
    { id: 'v5', clientId: 'c_gui', link: 'https://www.tiktok.com/@creator5/video/0000000000005', platform: 'TikTok', creatorHandle: '@creator5', datePosted: '2026-03-09', views: 1900000, likes: 140000, comments: 2800, shares: 7100, lastUpdated: '2026-04-01' }
  ],
  settings: { adminPasscode: 'clipsmart2026', sheetCsvUrl: '' }
};

const EMPTY_DATA = { clients: [], payments: [], videos: [], settings: { adminPasscode: 'clipsmart2026', sheetCsvUrl: '' } };

function uid(prefix) { return prefix + '_' + Math.random().toString(36).slice(2, 9); }

function detectPlatform(link) {
  if (!link) return 'Other';
  if (/tiktok\.com/i.test(link)) return 'TikTok';
  if (/instagram\.com/i.test(link)) return 'Instagram';
  if (/youtube\.com|youtu\.be/i.test(link)) return 'YouTube';
  return 'Other';
}

function platformDot(platform) {
  if (platform === 'TikTok') return '#ECF2EE';
  if (platform === 'Instagram') return '#E1306C';
  if (platform === 'YouTube') return '#E2604F';
  return '#8CA193';
}

function fmtNum(n) {
  const num = Number(n) || 0;
  if (Math.abs(num) >= 1000000) return (num / 1000000).toFixed(num >= 10000000 ? 0 : 1).replace(/\.0$/, '') + 'M';
  if (Math.abs(num) >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K';
  return num.toLocaleString();
}

function fmtFull(n) { return (Number(n) || 0).toLocaleString(); }

function fmtMoney(n) {
  const num = Number(n) || 0;
  return '£' + num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function fmtDate(d) {
  if (!d) return '—';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function todayISO() { return new Date().toISOString().slice(0, 10); }

const BrandStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Instrument+Sans:wght@400;500;600;700&display=swap');
    .cs-root { background:#0A0D0A; color:#ECF2EE; font-family:'Instrument Sans', sans-serif; min-height:100vh; }
    .cs-display { font-family:'Bricolage Grotesque', sans-serif; font-weight:800; letter-spacing:-0.01em; }
    .cs-eyebrow { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#7E9385; font-weight:600; }
    .cs-btn-primary { background:#2ECC71; color:#06140A; font-weight:600; transition:background .15s ease, transform .1s ease; border:none; }
    .cs-btn-primary:hover { background:#45DD85; }
    .cs-btn-primary:active { transform:scale(0.98); }
    .cs-btn-primary:disabled { opacity:.45; cursor:not-allowed; }
    .cs-btn-ghost { background:transparent; color:#ECF2EE; border:1px solid #233226; transition:border-color .15s ease, background .15s ease; }
    .cs-btn-ghost:hover { border-color:#2ECC71; background:#0E150F; }
    .cs-btn-danger { background:transparent; color:#E2604F; border:1px solid #3A2420; transition:background .15s ease; }
    .cs-btn-danger:hover { background:#1A0E0D; }
    .cs-input { background:#0A0D0A; border:1px solid #233226; color:#ECF2EE; }
    .cs-input:focus { outline:none; border-color:#2ECC71; }
    .cs-input::placeholder { color:#52615A; }
    .cs-panel { background:#111811; border:1px solid #1C2A1E; }
    .cs-row:hover { background:#0D130E; }
    .cs-tab { color:#7E9385; border-bottom:2px solid transparent; white-space:nowrap; transition:color .15s ease, border-color .15s ease; }
    .cs-tab:hover { color:#ECF2EE; }
    .cs-tab-active { color:#2ECC71 !important; border-bottom:2px solid #2ECC71; }
    .cs-scroll::-webkit-scrollbar { height:6px; width:6px; }
    .cs-scroll::-webkit-scrollbar-thumb { background:#1C2A1E; border-radius:6px; }
    .cs-link { color:#2ECC71; text-decoration:none; }
    .cs-link:hover { text-decoration:underline; }
  `}</style>
);

function Badge({ tone = 'neutral', children }) {
  const tones = {
    success: { bg: 'rgba(46,204,113,0.12)', fg: '#2ECC71' },
    warning: { bg: 'rgba(232,179,57,0.12)', fg: '#E8B339' },
    danger:  { bg: 'rgba(226,96,79,0.12)', fg: '#E2604F' },
    neutral: { bg: 'rgba(140,163,150,0.12)', fg: '#8CA199' }
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1" style={{ background: t.bg, color: t.fg }}>
      {children}
    </span>
  );
}

function statusTone(status) {
  if (status === 'Active' || status === 'Paid') return 'success';
  if (status === 'Pending' || status === 'Paused') return 'warning';
  if (status === 'Refunded') return 'danger';
  return 'neutral';
}

function Field({ label, children, hint }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-xs font-medium" style={{ color: '#A9BAAE' }}>{label}</span>
      {children}
      {hint && <span className="text-xs" style={{ color: '#5C6F60' }}>{hint}</span>}
    </label>
  );
}

function Input(props) {
  return <input {...props} className={'cs-input rounded-lg px-3 py-2 text-sm w-full ' + (props.className || '')} />;
}

function Select({ children, ...props }) {
  return <select {...props} className={'cs-input rounded-lg px-3 py-2 text-sm w-full ' + (props.className || '')}>{children}</select>;
}

function Textarea(props) {
  return <textarea {...props} className={'cs-input rounded-lg px-3 py-2 text-sm w-full ' + (props.className || '')} />;
}

function Btn({ variant = 'primary', children, className, ...props }) {
  const cls = variant === 'primary' ? 'cs-btn-primary' : variant === 'danger' ? 'cs-btn-danger' : 'cs-btn-ghost';
  return (
    <button {...props} className={cls + ' rounded-lg px-3.5 py-2 text-sm inline-flex items-center justify-center gap-1.5 ' + (className || '')}>
      {children}
    </button>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className={'cs-panel rounded-2xl w-full ' + (wide ? 'max-w-2xl' : 'max-w-md') + ' my-6'}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #1C2A1E' }}>
          <h3 className="cs-display text-lg">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg cs-btn-ghost"><X size={16} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, body }) {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6 cs-panel rounded-2xl">
      <div className="p-3 rounded-full mb-3" style={{ background: 'rgba(46,204,113,0.08)' }}>
        <Icon size={22} style={{ color: '#2ECC71' }} />
      </div>
      <div className="cs-display text-base mb-1">{title}</div>
      <div className="text-sm max-w-sm" style={{ color: '#7E9385' }}>{body}</div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="cs-panel rounded-2xl p-4 sm:p-5">
      <div className="cs-eyebrow mb-2">{label}</div>
      <div className="cs-display text-2xl sm:text-3xl">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: '#7E9385' }}>{sub}</div>}
    </div>
  );
}

function GuaranteeBar({ delivered, guaranteed }) {
  const pct = guaranteed > 0 ? Math.min(100, (delivered / guaranteed) * 100) : 0;
  const met = delivered >= guaranteed && guaranteed > 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="cs-eyebrow">Views guarantee progress</span>
        <span className="text-xs font-semibold" style={{ color: met ? '#2ECC71' : '#A9BAAE' }}>{pct.toFixed(0)}%</span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden" style={{ background: '#1C2A1E' }}>
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: pct + '%', background: '#2ECC71' }} />
      </div>
      <div className="flex items-center justify-between mt-2 text-xs" style={{ color: '#7E9385' }}>
        <span>{fmtFull(delivered)} delivered</span>
        <span>{guaranteed ? fmtFull(guaranteed) + ' guaranteed' : 'No guarantee set'}</span>
      </div>
      {met && (
        <div className="flex items-center gap-1.5 mt-2 text-xs font-medium" style={{ color: '#2ECC71' }}>
          <CheckCircle2 size={13} /> Guarantee met
        </div>
      )}
    </div>
  );
}

// ---------- LOGIN ----------

function LoginScreen({ data, onLogin, storageWarning }) {
  const [mode, setMode] = useState('client');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    setError('');
    if (mode === 'admin') {
      if (passcode === (data.settings && data.settings.adminPasscode)) {
        onLogin({ role: 'admin' });
      } else {
        setError('Incorrect passcode.');
      }
      return;
    }
    const u = username.trim().toLowerCase();
    const client = (data.clients || []).find(c => (c.username || '').toLowerCase() === u && c.password === password && u.length > 0);
    if (client) {
      onLogin({ role: 'client', clientId: client.id });
    } else {
      setError('No account found. Your ClipSmart login is created by our team — reach out if you\u2019re expecting access.');
    }
  }

  return (
    <div className="cs-root flex items-center justify-center p-4">
      <BrandStyles />
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="cs-display text-2xl mb-1">
            Clip<span style={{ color: '#2ECC71' }}>Smart</span>
          </div>
          <div className="text-sm" style={{ color: '#7E9385' }}>Client performance portal</div>
        </div>

        <div className="cs-panel rounded-2xl p-5">
          <div className="flex gap-1 mb-5 p-1 rounded-xl" style={{ background: '#0A0D0A' }}>
            <button onClick={() => { setMode('client'); setError(''); }} className="flex-1 rounded-lg py-1.5 text-sm font-medium transition-colors" style={{ background: mode === 'client' ? '#003D1A' : 'transparent', color: mode === 'client' ? '#2ECC71' : '#7E9385' }}>Client</button>
            <button onClick={() => { setMode('admin'); setError(''); }} className="flex-1 rounded-lg py-1.5 text-sm font-medium transition-colors" style={{ background: mode === 'admin' ? '#003D1A' : 'transparent', color: mode === 'admin' ? '#2ECC71' : '#7E9385' }}>Admin</button>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-3">
            {mode === 'client' ? (
              <>
                <Field label="Username">
                  <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="yourcompany" autoFocus />
                </Field>
                <Field label="Password">
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                </Field>
              </>
            ) : (
              <Field label="Admin passcode">
                <Input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} placeholder="••••••••" autoFocus />
              </Field>
            )}
            {error && (
              <div className="text-xs flex items-start gap-1.5" style={{ color: '#E2604F' }}>
                <AlertTriangle size={13} className="mt-0.5 flex-shrink-0" /> <span>{error}</span>
              </div>
            )}
            <Btn type="submit" className="w-full mt-1"><Lock size={14} /> Sign in</Btn>
          </form>
        </div>

        {storageWarning && (
          <div className="mt-4 text-xs flex items-start gap-1.5 px-1" style={{ color: '#E8B339' }}>
            <AlertTriangle size={13} className="mt-0.5 flex-shrink-0" />
            <span>{storageWarning}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- ADMIN: OVERVIEW ----------

function OverviewTab({ data }) {
  const clients = data.clients || [];
  const videos = data.videos || [];
  const payments = data.payments || [];

  const totalViews = videos.reduce((s, v) => s + (Number(v.views) || 0), 0);
  const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + (Number(p.amount) || 0), 0);
  const outstanding = payments.filter(p => p.status === 'Pending').reduce((s, p) => s + (Number(p.amount) || 0), 0);
  const activeClients = clients.filter(c => c.status === 'Active').length;
  const estCreatorPayout = clients.reduce((sum, c) => {
    const clientViews = videos.filter(v => v.clientId === c.id).reduce((s, v) => s + (Number(v.views) || 0), 0);
    return sum + (clientViews / 1000) * (Number(c.creatorPayoutRpm) || 0);
  }, 0);

  const chartData = clients.map(c => ({
    name: (c.company || c.name || '').slice(0, 14),
    views: videos.filter(v => v.clientId === c.id).reduce((s, v) => s + (Number(v.views) || 0), 0)
  })).sort((a, b) => b.views - a.views).slice(0, 8);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Active clients" value={activeClients} sub={clients.length + ' total'} />
        <StatCard label="Views delivered" value={fmtNum(totalViews)} sub={fmtFull(totalViews) + ' views'} />
        <StatCard label="Revenue collected" value={fmtMoney(totalRevenue)} sub={outstanding > 0 ? fmtMoney(outstanding) + ' pending' : 'all settled'} />
        <StatCard label="Est. creator payouts" value={fmtMoney(estCreatorPayout)} sub="internal — not client visible" />
      </div>

      <div className="cs-panel rounded-2xl p-4 sm:p-5">
        <div className="cs-eyebrow mb-4">Views delivered by client</div>
        {chartData.length === 0 ? (
          <div className="text-sm py-8 text-center" style={{ color: '#7E9385' }}>Add clients and videos to see this chart.</div>
        ) : (
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#5C6F60" fontSize={11} tickLine={false} axisLine={{ stroke: '#1C2A1E' }} />
                <YAxis stroke="#5C6F60" fontSize={11} tickFormatter={fmtNum} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(v) => [fmtFull(v) + ' views', '']}
                  contentStyle={{ background: '#0A0D0A', border: '1px solid #1C2A1E', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#ECF2EE' }}
                  cursor={{ fill: 'rgba(46,204,113,0.06)' }}
                />
                <Bar dataKey="views" fill="#2ECC71" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- ADMIN: CLIENTS ----------

function ClientFormModal({ initial, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(initial || {
    name: '', company: '', email: '', category: 'Music Artist', platformFocus: 'TikTok',
    signedDate: todayISO(), status: 'Active', packageBudget: '', clientRpmRate: '',
    viewsGuaranteed: '', creatorPayoutRpm: '', salesGenerated: '', notes: '', username: '', password: ''
  });
  const isEdit = !!(initial && initial.id);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e) {
    e.preventDefault();
    if (!form.company.trim()) return;
    onSave(form);
  }

  return (
    <Modal title={isEdit ? 'Edit client' : 'Add client'} onClose={onClose} wide>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Company / Brand"><Input value={form.company} onChange={e => set('company', e.target.value)} required /></Field>
          <Field label="Contact name"><Input value={form.name} onChange={e => set('name', e.target.value)} /></Field>
          <Field label="Email"><Input type="email" value={form.email} onChange={e => set('email', e.target.value)} /></Field>
          <Field label="Category">
            <Select value={form.category} onChange={e => set('category', e.target.value)}>
              <option>Music Artist</option><option>E-commerce</option><option>Podcaster</option><option>Other</option>
            </Select>
          </Field>
          <Field label="Platform focus">
            <Select value={form.platformFocus} onChange={e => set('platformFocus', e.target.value)}>
              <option>TikTok</option><option>Instagram</option><option>Both</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={e => set('status', e.target.value)}>
              <option>Active</option><option>Paused</option><option>Completed</option>
            </Select>
          </Field>
          <Field label="Signed date"><Input type="date" value={form.signedDate} onChange={e => set('signedDate', e.target.value)} /></Field>
          <Field label="Package budget (£)"><Input type="number" min="0" step="0.01" value={form.packageBudget} onChange={e => set('packageBudget', e.target.value)} /></Field>
          <Field label="Client RPM (£ / 1k views)" hint="Visible to client"><Input type="number" min="0" step="0.01" value={form.clientRpmRate} onChange={e => set('clientRpmRate', e.target.value)} /></Field>
          <Field label="Views guaranteed"><Input type="number" min="0" value={form.viewsGuaranteed} onChange={e => set('viewsGuaranteed', e.target.value)} /></Field>
          <Field label="Creator payout RPM (£ / 1k)" hint="Internal only — never shown to client"><Input type="number" min="0" step="0.01" value={form.creatorPayoutRpm} onChange={e => set('creatorPayoutRpm', e.target.value)} /></Field>
          <Field label="Sales generated (£)" hint="Optional, client-visible"><Input type="number" min="0" step="0.01" value={form.salesGenerated} onChange={e => set('salesGenerated', e.target.value)} /></Field>
        </div>

        <Field label="Internal notes" hint="Admin only — never shown to client">
          <Textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)} />
        </Field>

        <div className="rounded-xl p-4" style={{ background: '#0A0D0A', border: '1px solid #1C2A1E' }}>
          <div className="cs-eyebrow mb-3 flex items-center gap-1.5"><ShieldCheck size={13} /> Client login</div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Username"><Input value={form.username} onChange={e => set('username', e.target.value)} placeholder="e.g. nhcmurda" /></Field>
            <Field label="Password"><Input value={form.password} onChange={e => set('password', e.target.value)} placeholder="set a password" /></Field>
          </div>
          <div className="text-xs mt-2" style={{ color: '#5C6F60' }}>Leave blank to keep this client unable to log in.</div>
        </div>

        <div className="flex items-center justify-between pt-1">
          {isEdit ? (
            <Btn type="button" variant="danger" onClick={() => onDelete(form.id)}><Trash2 size={14} /> Delete client</Btn>
          ) : <span />}
          <div className="flex gap-2">
            <Btn type="button" variant="ghost" onClick={onClose}>Cancel</Btn>
            <Btn type="submit">{isEdit ? 'Save changes' : 'Add client'}</Btn>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function ClientsTab({ data, actions }) {
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const clients = (data.clients || []).filter(c =>
    (c.company || '').toLowerCase().includes(query.toLowerCase()) ||
    (c.name || '').toLowerCase().includes(query.toLowerCase())
  );

  function statsFor(clientId) {
    const vids = (data.videos || []).filter(v => v.clientId === clientId);
    const views = vids.reduce((s, v) => s + (Number(v.views) || 0), 0);
    return { views, count: vids.length };
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#5C6F60' }} />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search clients..." className="pl-8" />
        </div>
        <Btn onClick={() => setAdding(true)}><Plus size={14} /> Add client</Btn>
      </div>

      {clients.length === 0 ? (
        <EmptyState icon={Building2} title="No clients yet" body="Add your first signed client to start tracking their campaign, payments and video performance." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {clients.map(c => {
            const s = statsFor(c.id);
            return (
              <button key={c.id} onClick={() => setEditing(c)} className="cs-panel rounded-2xl p-4 text-left flex flex-col gap-3 cs-row transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="cs-display text-base leading-tight">{c.company}</div>
                    <div className="text-xs" style={{ color: '#7E9385' }}>{c.category}</div>
                  </div>
                  <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                </div>
                <GuaranteeBar delivered={s.views} guaranteed={Number(c.viewsGuaranteed) || 0} />
                <div className="flex items-center justify-between text-xs pt-1" style={{ color: '#7E9385', borderTop: '1px dashed #1C2A1E' }}>
                  <span>{s.count} video{s.count === 1 ? '' : 's'}</span>
                  <span>Signed {fmtDate(c.signedDate)}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {adding && (
        <ClientFormModal
          onClose={() => setAdding(false)}
          onSave={(form) => { actions.addClient(form); setAdding(false); }}
          onDelete={() => {}}
        />
      )}
      {editing && (
        <ClientFormModal
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(form) => { actions.updateClient(editing.id, form); setEditing(null); }}
          onDelete={(id) => { if (window.confirm('Delete this client and all their payments and videos?')) { actions.deleteClient(id); setEditing(null); } }}
        />
      )}
    </div>
  );
}

// ---------- ADMIN: PAYMENTS ----------

function PaymentFormModal({ clients, initial, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(initial || { clientId: clients[0] ? clients[0].id : '', date: todayISO(), amount: '', method: 'Bank Transfer', status: 'Paid', note: '' });
  const isEdit = !!(initial && initial.id);
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function submit(e) { e.preventDefault(); if (!form.clientId) return; onSave(form); }
  return (
    <Modal title={isEdit ? 'Edit payment' : 'Add payment'} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <Field label="Client">
          <Select value={form.clientId} onChange={e => set('clientId', e.target.value)} required>
            <option value="">— Select client —</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date"><Input type="date" value={form.date} onChange={e => set('date', e.target.value)} required /></Field>
          <Field label="Amount (£)"><Input type="number" min="0" step="0.01" value={form.amount} onChange={e => set('amount', e.target.value)} required /></Field>
          <Field label="Method">
            <Select value={form.method} onChange={e => set('method', e.target.value)}>
              <option>Bank Transfer</option><option>Card</option><option>Crypto</option><option>Other</option>
            </Select>
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={e => set('status', e.target.value)}>
              <option>Paid</option><option>Pending</option><option>Refunded</option>
            </Select>
          </Field>
        </div>
        <Field label="Note (optional)"><Textarea rows={2} value={form.note} onChange={e => set('note', e.target.value)} /></Field>
        <div className="flex items-center justify-between pt-1">
          {isEdit ? <Btn type="button" variant="danger" onClick={() => onDelete(form.id)}><Trash2 size={14} /> Delete</Btn> : <span />}
          <div className="flex gap-2">
            <Btn type="button" variant="ghost" onClick={onClose}>Cancel</Btn>
            <Btn type="submit">{isEdit ? 'Save changes' : 'Add payment'}</Btn>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function PaymentsTab({ data, actions }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('All');
  const clients = data.clients || [];
  const clientName = (id) => { const c = clients.find(x => x.id === id); return c ? c.company : 'Unknown'; };

  const payments = (data.payments || [])
    .filter(p => filter === 'All' || p.status === filter)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totals = ['Paid', 'Pending', 'Refunded'].map(s => ({
    status: s, amount: (data.payments || []).filter(p => p.status === s).reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {totals.map(t => <StatCard key={t.status} label={t.status} value={fmtMoney(t.amount)} />)}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#111811', border: '1px solid #1C2A1E' }}>
          {['All', 'Paid', 'Pending', 'Refunded'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className="px-3 py-1 rounded-lg text-xs font-medium transition-colors" style={{ background: filter === s ? '#003D1A' : 'transparent', color: filter === s ? '#2ECC71' : '#7E9385' }}>{s}</button>
          ))}
        </div>
        <div className="flex-1" />
        <Btn onClick={() => setAdding(true)} disabled={clients.length === 0}><Plus size={14} /> Add payment</Btn>
      </div>

      {clients.length === 0 ? (
        <EmptyState icon={CreditCard} title="Add a client first" body="Payments are linked to a client — add a client before logging any payments." />
      ) : payments.length === 0 ? (
        <EmptyState icon={CreditCard} title="No payments logged" body="Track every payment your clients make, with the date it landed." />
      ) : (
        <div className="cs-panel rounded-2xl overflow-x-auto cs-scroll">
          <table className="w-full text-sm" style={{ minWidth: 640 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1C2A1E' }}>
                {['Date', 'Client', 'Amount', 'Method', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 cs-eyebrow font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="cs-row transition-colors" style={{ borderBottom: '1px solid #161F18' }}>
                  <td className="px-4 py-3 whitespace-nowrap">{fmtDate(p.date)}</td>
                  <td className="px-4 py-3">{clientName(p.clientId)}</td>
                  <td className="px-4 py-3 font-medium">{fmtMoney(p.amount)}</td>
                  <td className="px-4 py-3" style={{ color: '#7E9385' }}>{p.method}</td>
                  <td className="px-4 py-3"><Badge tone={statusTone(p.status)}>{p.status}</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing(p)} className="p-1.5 rounded-lg cs-btn-ghost"><Pencil size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adding && <PaymentFormModal clients={clients} onClose={() => setAdding(false)} onSave={(f) => { actions.addPayment(f); setAdding(false); }} onDelete={() => {}} />}
      {editing && <PaymentFormModal clients={clients} initial={editing} onClose={() => setEditing(null)} onSave={(f) => { actions.updatePayment(editing.id, f); setEditing(null); }} onDelete={(id) => { actions.deletePayment(id); setEditing(null); }} />}
    </div>
  );
}

// ---------- ADMIN: VIDEOS ----------

function VideoFormModal({ clients, initial, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(initial || { clientId: clients[0] ? clients[0].id : '', link: '', creatorHandle: '', datePosted: todayISO(), views: 0, likes: 0, comments: 0, shares: 0 });
  const isEdit = !!(initial && initial.id);
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function submit(e) {
    e.preventDefault();
    if (!form.clientId || !form.link.trim()) return;
    onSave({ ...form, platform: detectPlatform(form.link), lastUpdated: todayISO() });
  }
  return (
    <Modal title={isEdit ? 'Edit video' : 'Add video'} onClose={onClose} wide>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client">
            <Select value={form.clientId} onChange={e => set('clientId', e.target.value)} required>
              <option value="">— Select client —</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
            </Select>
          </Field>
          <Field label="Creator handle"><Input value={form.creatorHandle} onChange={e => set('creatorHandle', e.target.value)} placeholder="@creator" /></Field>
        </div>
        <Field label="Video link" hint={'Detected platform: ' + detectPlatform(form.link)}>
          <Input value={form.link} onChange={e => set('link', e.target.value)} placeholder="https://www.tiktok.com/@.../video/..." required />
        </Field>
        <Field label="Date posted"><Input type="date" value={form.datePosted} onChange={e => set('datePosted', e.target.value)} /></Field>
        <div className="grid grid-cols-4 gap-3">
          <Field label="Views"><Input type="number" min="0" value={form.views} onChange={e => set('views', e.target.value)} /></Field>
          <Field label="Likes"><Input type="number" min="0" value={form.likes} onChange={e => set('likes', e.target.value)} /></Field>
          <Field label="Comments"><Input type="number" min="0" value={form.comments} onChange={e => set('comments', e.target.value)} /></Field>
          <Field label="Shares"><Input type="number" min="0" value={form.shares} onChange={e => set('shares', e.target.value)} /></Field>
        </div>
        <div className="text-xs" style={{ color: '#5C6F60' }}>Stats aren\u2019t pulled live from TikTok/Instagram — update them here whenever you check the post.</div>
        <div className="flex items-center justify-between pt-1">
          {isEdit ? <Btn type="button" variant="danger" onClick={() => onDelete(form.id)}><Trash2 size={14} /> Delete</Btn> : <span />}
          <div className="flex gap-2">
            <Btn type="button" variant="ghost" onClick={onClose}>Cancel</Btn>
            <Btn type="submit">{isEdit ? 'Save changes' : 'Add video'}</Btn>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function ImportPanel({ data, clients, onClose, onImport, onSaveSheetUrl }) {
  const [url, setUrl] = useState(data.settings.sheetCsvUrl || '');
  const [pasted, setPasted] = useState('');
  const [mode, setMode] = useState('url');
  const [rows, setRows] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({ client: '', link: '', creator: '', platform: '', date: '' });
  const [rowClients, setRowClients] = useState({});
  const [fetchError, setFetchError] = useState('');
  const [busy, setBusy] = useState(false);

  function guessMap(hdrs) {
    const find = (re) => hdrs.find(h => re.test(h)) || '';
    return {
      client: find(/client|brand|company/i),
      link: find(/link|url|video/i),
      creator: find(/creator|handle|username|tiktok|instagram/i),
      platform: find(/platform/i),
      date: find(/timestamp|date/i)
    };
  }

  function parseText(text) {
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    const hdrs = result.meta.fields || [];
    setHeaders(hdrs);
    setMapping(guessMap(hdrs));
    setRows(result.data);
    const guesses = {};
    result.data.forEach((r, i) => {
      const valRaw = (r[guessMap(hdrs).client] || '').toLowerCase();
      const match = clients.find(c => valRaw && (c.company.toLowerCase() === valRaw || c.company.toLowerCase().includes(valRaw) || valRaw.includes(c.company.toLowerCase())));
      guesses[i] = match ? match.id : '';
    });
    setRowClients(guesses);
  }

  async function fetchSheet() {
    setBusy(true); setFetchError('');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Request failed with status ' + res.status);
      const text = await res.text();
      parseText(text);
      onSaveSheetUrl(url);
    } catch (err) {
      setFetchError('Could not fetch that sheet. Make sure it\u2019s published to the web (File \u2192 Share \u2192 Publish to web \u2192 CSV), or paste the CSV instead.');
    } finally {
      setBusy(false);
    }
  }

  function doParsePaste() { parseText(pasted); }

  const existingLinks = useMemo(() => new Set((data.videos || []).map(v => v.link)), [data.videos]);

  function doImport() {
    if (!rows) return;
    const toAdd = [];
    rows.forEach((r, i) => {
      const link = (r[mapping.link] || '').trim();
      const clientId = rowClients[i];
      if (!link || !clientId || existingLinks.has(link)) return;
      toAdd.push({
        clientId,
        link,
        creatorHandle: mapping.creator ? (r[mapping.creator] || '') : '',
        platform: mapping.platform && r[mapping.platform] ? r[mapping.platform] : detectPlatform(link),
        datePosted: mapping.date && r[mapping.date] ? r[mapping.date].slice(0, 10) : todayISO(),
        views: 0, likes: 0, comments: 0, shares: 0,
        lastUpdated: todayISO()
      });
    });
    onImport(toAdd);
  }

  const importableCount = rows ? rows.filter((r, i) => {
    const link = (r[mapping.link] || '').trim();
    return link && rowClients[i] && !existingLinks.has(link);
  }).length : 0;

  return (
    <Modal title="Import video submissions" onClose={onClose} wide>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#0A0D0A' }}>
          <button onClick={() => setMode('url')} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: mode === 'url' ? '#003D1A' : 'transparent', color: mode === 'url' ? '#2ECC71' : '#7E9385' }}>From sheet URL</button>
          <button onClick={() => setMode('paste')} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: mode === 'paste' ? '#003D1A' : 'transparent', color: mode === 'paste' ? '#2ECC71' : '#7E9385' }}>Paste CSV</button>
        </div>

        {mode === 'url' ? (
          <Field label="Published Google Sheet CSV link" hint="In Sheets: File → Share → Publish to web → choose CSV, then paste the link it gives you.">
            <div className="flex gap-2">
              <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv" />
              <Btn type="button" onClick={fetchSheet} disabled={!url || busy}><RefreshCw size={14} /> {busy ? 'Fetching...' : 'Fetch'}</Btn>
            </div>
          </Field>
        ) : (
          <Field label="Paste CSV contents" hint="Copy the rows straight from your Google Sheet and paste here.">
            <Textarea rows={5} value={pasted} onChange={e => setPasted(e.target.value)} />
            <Btn type="button" onClick={doParsePaste} className="w-fit mt-2" disabled={!pasted}><FileSpreadsheet size={14} /> Parse</Btn>
          </Field>
        )}

        {fetchError && <div className="text-xs flex items-start gap-1.5" style={{ color: '#E2604F' }}><AlertTriangle size={13} className="mt-0.5 flex-shrink-0" /><span>{fetchError}</span></div>}

        {rows && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['client', 'link', 'creator', 'platform', 'date'].map(key => (
                <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1) + ' column'}>
                  <Select value={mapping[key]} onChange={e => setMapping(m => ({ ...m, [key]: e.target.value }))}>
                    <option value="">—</option>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </Select>
                </Field>
              ))}
            </div>

            <div className="cs-panel rounded-xl overflow-x-auto cs-scroll" style={{ maxHeight: 260 }}>
              <table className="w-full text-xs" style={{ minWidth: 560 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1C2A1E' }}>
                    <th className="text-left px-3 py-2 cs-eyebrow">Link</th>
                    <th className="text-left px-3 py-2 cs-eyebrow">Assign to client</th>
                    <th className="text-left px-3 py-2 cs-eyebrow">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const link = (r[mapping.link] || '').trim();
                    const dup = link && existingLinks.has(link);
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #161F18' }}>
                        <td className="px-3 py-2 truncate max-w-[220px]" style={{ color: '#A9BAAE' }}>{link || '—'}</td>
                        <td className="px-3 py-2">
                          <Select value={rowClients[i] || ''} onChange={e => setRowClients(rc => ({ ...rc, [i]: e.target.value }))}>
                            <option value="">— Select —</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
                          </Select>
                        </td>
                        <td className="px-3 py-2">{dup ? <Badge tone="neutral">Already imported</Badge> : rowClients[i] ? <Badge tone="success">Ready</Badge> : <Badge tone="warning">Needs client</Badge>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: '#7E9385' }}>{importableCount} of {rows.length} rows ready to import</span>
              <Btn type="button" onClick={doImport} disabled={importableCount === 0}><Upload size={14} /> Import {importableCount} video{importableCount === 1 ? '' : 's'}</Btn>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

function VideosTab({ data, actions }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [importing, setImporting] = useState(false);
  const clients = data.clients || [];
  const clientName = (id) => { const c = clients.find(x => x.id === id); return c ? c.company : 'Unknown'; };

  const videos = (data.videos || []).slice().sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
  const totalViews = videos.reduce((s, v) => s + (Number(v.views) || 0), 0);
  const totalEngagement = videos.reduce((s, v) => s + (Number(v.likes) || 0) + (Number(v.comments) || 0) + (Number(v.shares) || 0), 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total videos" value={videos.length} />
        <StatCard label="Total views" value={fmtNum(totalViews)} />
        <StatCard label="Total engagement" value={fmtNum(totalEngagement)} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Btn variant="ghost" onClick={() => setImporting(true)} disabled={clients.length === 0}><FileSpreadsheet size={14} /> Import from sheet</Btn>
        <div className="flex-1" />
        <Btn onClick={() => setAdding(true)} disabled={clients.length === 0}><Plus size={14} /> Add video</Btn>
      </div>

      {clients.length === 0 ? (
        <EmptyState icon={Film} title="Add a client first" body="Videos are linked to a client — add a client before logging any video submissions." />
      ) : videos.length === 0 ? (
        <EmptyState icon={Film} title="No videos tracked yet" body="Add a video manually, or import submissions straight from your Google Sheet." />
      ) : (
        <div className="cs-panel rounded-2xl overflow-x-auto cs-scroll">
          <table className="w-full text-sm" style={{ minWidth: 760 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1C2A1E' }}>
                {['Posted', 'Client', 'Platform', 'Link', 'Views', 'Likes', 'Comments', 'Shares', ''].map(h => (
                  <th key={h} className="text-left px-3 py-3 cs-eyebrow font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {videos.map(v => (
                <tr key={v.id} className="cs-row transition-colors" style={{ borderBottom: '1px solid #161F18' }}>
                  <td className="px-3 py-3 whitespace-nowrap">{fmtDate(v.datePosted)}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{clientName(v.clientId)}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: platformDot(v.platform) }} />
                      {v.platform}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <a href={v.link} target="_blank" rel="noopener noreferrer" className="cs-link inline-flex items-center gap-1 truncate max-w-[160px]">
                      <span className="truncate">{v.creatorHandle || v.link}</span>
                      <ExternalLink size={11} className="flex-shrink-0" />
                    </a>
                  </td>
                  <td className="px-3 py-3 font-medium">{fmtNum(v.views)}</td>
                  <td className="px-3 py-3" style={{ color: '#7E9385' }}>{fmtNum(v.likes)}</td>
                  <td className="px-3 py-3" style={{ color: '#7E9385' }}>{fmtNum(v.comments)}</td>
                  <td className="px-3 py-3" style={{ color: '#7E9385' }}>{fmtNum(v.shares)}</td>
                  <td className="px-3 py-3 text-right">
                    <button onClick={() => setEditing(v)} className="p-1.5 rounded-lg cs-btn-ghost"><Pencil size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adding && <VideoFormModal clients={clients} onClose={() => setAdding(false)} onSave={(f) => { actions.addVideo(f); setAdding(false); }} onDelete={() => {}} />}
      {editing && <VideoFormModal clients={clients} initial={editing} onClose={() => setEditing(null)} onSave={(f) => { actions.updateVideo(editing.id, f); setEditing(null); }} onDelete={(id) => { actions.deleteVideo(id); setEditing(null); }} />}
      {importing && (
        <ImportPanel
          data={data}
          clients={clients}
          onClose={() => setImporting(false)}
          onSaveSheetUrl={actions.saveSheetUrl}
          onImport={(rows) => { actions.importVideos(rows); setImporting(false); }}
        />
      )}
    </div>
  );
}

// ---------- ADMIN: SETTINGS ----------

function SettingsTab({ data, actions }) {
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [sheetUrl, setSheetUrl] = useState(data.settings.sheetCsvUrl || '');
  const [saved, setSaved] = useState('');

  function savePasscode() {
    if (!passcode || passcode !== confirmPasscode) { setSaved('mismatch'); return; }
    actions.saveSettings({ adminPasscode: passcode });
    setPasscode(''); setConfirmPasscode(''); setSaved('passcode');
    setTimeout(() => setSaved(''), 2500);
  }
  function saveSheet() {
    actions.saveSheetUrl(sheetUrl);
    setSaved('sheet');
    setTimeout(() => setSaved(''), 2500);
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'clipsmart-backup-' + todayISO() + '.json';
    a.click();
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <div className="cs-panel rounded-2xl p-5">
        <div className="cs-display text-base mb-3">Admin passcode</div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Field label="New passcode"><Input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} /></Field>
          <Field label="Confirm passcode"><Input type="password" value={confirmPasscode} onChange={e => setConfirmPasscode(e.target.value)} /></Field>
        </div>
        {saved === 'mismatch' && <div className="text-xs mb-2" style={{ color: '#E2604F' }}>Passcodes don\u2019t match.</div>}
        {saved === 'passcode' && <div className="text-xs mb-2" style={{ color: '#2ECC71' }}>Passcode updated.</div>}
        <Btn onClick={savePasscode}>Save passcode</Btn>
      </div>

      <div className="cs-panel rounded-2xl p-5">
        <div className="cs-display text-base mb-3">Submission sheet</div>
        <Field label="Default Google Sheet CSV link" hint="Used to pre-fill the import tool on the Videos tab.">
          <Input value={sheetUrl} onChange={e => setSheetUrl(e.target.value)} placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv" />
        </Field>
        {saved === 'sheet' && <div className="text-xs mt-2 mb-1" style={{ color: '#2ECC71' }}>Saved.</div>}
        <Btn className="mt-3" onClick={saveSheet}>Save link</Btn>
      </div>

      <div className="cs-panel rounded-2xl p-5">
        <div className="cs-display text-base mb-2">Recommended form fields</div>
        <p className="text-sm mb-2" style={{ color: '#A9BAAE' }}>Point your Discord and Whop creators to a Google Form with these questions, feeding a sheet you publish to the web:</p>
        <ul className="text-sm flex flex-col gap-1" style={{ color: '#7E9385' }}>
          <li>— Client / Brand name</li>
          <li>— Video link</li>
          <li>— Creator handle (TikTok or Instagram)</li>
          <li>— Platform</li>
        </ul>
      </div>

      <div className="cs-panel rounded-2xl p-5">
        <div className="cs-display text-base mb-3">Data</div>
        <div className="flex gap-2 flex-wrap">
          <Btn variant="ghost" onClick={exportBackup}><Download size={14} /> Export backup (JSON)</Btn>
          <Btn variant="danger" onClick={() => { if (window.confirm('Load fresh sample data? This replaces everything currently saved.')) actions.loadSample(); }}>Load sample data</Btn>
          <Btn variant="danger" onClick={() => { if (window.confirm('Clear all clients, payments and videos? This can\u2019t be undone.')) actions.clearAll(); }}><Trash2 size={14} /> Clear all data</Btn>
        </div>
      </div>
    </div>
  );
}

// ---------- ADMIN SHELL ----------

function AdminApp({ data, actions, onLogout }) {
  const [tab, setTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'videos', label: 'Videos', icon: Film },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];
  return (
    <div className="cs-root">
      <BrandStyles />
      <div className="sticky top-0 z-10" style={{ background: '#0A0D0A', borderBottom: '1px solid #1C2A1E' }}>
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 max-w-6xl mx-auto">
          <div className="cs-display text-lg">Clip<span style={{ color: '#2ECC71' }}>Smart</span></div>
          <div className="flex items-center gap-3">
            <Badge tone="success">Admin</Badge>
            <button onClick={onLogout} className="p-2 rounded-lg cs-btn-ghost"><LogOut size={15} /></button>
          </div>
        </div>
        <div className="flex gap-5 px-4 sm:px-6 max-w-6xl mx-auto overflow-x-auto cs-scroll">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={'cs-tab flex items-center gap-1.5 py-3 text-sm font-medium ' + (tab === t.id ? 'cs-tab-active' : '')}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        {tab === 'overview' && <OverviewTab data={data} />}
        {tab === 'clients' && <ClientsTab data={data} actions={actions} />}
        {tab === 'payments' && <PaymentsTab data={data} actions={actions} />}
        {tab === 'videos' && <VideosTab data={data} actions={actions} />}
        {tab === 'settings' && <SettingsTab data={data} actions={actions} />}
      </div>
    </div>
  );
}

// ---------- CLIENT APP ----------

function ClientApp({ data, clientId, onLogout }) {
  const client = (data.clients || []).find(c => c.id === clientId);
  const videos = (data.videos || []).filter(v => v.clientId === clientId).sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  if (!client) {
    return (
      <div className="cs-root flex items-center justify-center p-6">
        <BrandStyles />
        <EmptyState icon={AlertTriangle} title="Account not found" body="This account is no longer linked to a client. Please contact ClipSmart." />
      </div>
    );
  }

  const totalViews = videos.reduce((s, v) => s + (Number(v.views) || 0), 0);
  const totalLikes = videos.reduce((s, v) => s + (Number(v.likes) || 0), 0);
  const totalComments = videos.reduce((s, v) => s + (Number(v.comments) || 0), 0);
  const totalShares = videos.reduce((s, v) => s + (Number(v.shares) || 0), 0);

  return (
    <div className="cs-root">
      <BrandStyles />
      <div className="sticky top-0 z-10" style={{ background: '#0A0D0A', borderBottom: '1px solid #1C2A1E' }}>
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 max-w-5xl mx-auto">
          <div className="cs-display text-lg">Clip<span style={{ color: '#2ECC71' }}>Smart</span></div>
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:inline" style={{ color: '#7E9385' }}>{client.company}</span>
            <button onClick={onLogout} className="p-2 rounded-lg cs-btn-ghost"><LogOut size={15} /></button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
        <div>
          <div className="cs-eyebrow mb-1">Welcome back</div>
          <div className="cs-display text-2xl">{client.company}</div>
        </div>

        <div className="cs-panel rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="cs-eyebrow mb-1">Total views delivered</div>
              <div className="cs-display text-4xl">{fmtNum(totalViews)}</div>
            </div>
            <Badge tone={statusTone(client.status)}>{client.status} campaign</Badge>
          </div>
          <GuaranteeBar delivered={totalViews} guaranteed={Number(client.viewsGuaranteed) || 0} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Videos posted" value={videos.length} />
          <StatCard label="Likes" value={fmtNum(totalLikes)} />
          <StatCard label="Comments" value={fmtNum(totalComments)} />
          <StatCard label="Shares" value={fmtNum(totalShares)} />
        </div>

        {client.salesGenerated ? (
          <StatCard label="Sales generated" value={fmtMoney(client.salesGenerated)} sub="Attributed to this campaign" />
        ) : null}

        <div className="cs-panel rounded-2xl p-5">
          <div className="cs-eyebrow mb-1">Campaign details</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3 text-sm">
            <div><div style={{ color: '#7E9385' }}>Signed</div><div className="font-medium mt-0.5">{fmtDate(client.signedDate)}</div></div>
            <div><div style={{ color: '#7E9385' }}>Package</div><div className="font-medium mt-0.5">{fmtMoney(client.packageBudget)}</div></div>
            {client.clientRpmRate ? <div><div style={{ color: '#7E9385' }}>Rate</div><div className="font-medium mt-0.5">{fmtMoney(client.clientRpmRate)} / 1k views</div></div> : null}
          </div>
        </div>

        <div>
          <div className="cs-display text-lg mb-3">Your videos</div>
          {videos.length === 0 ? (
            <EmptyState icon={Film} title="No videos yet" body="Your videos will show up here as soon as creators post and we log them." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {videos.map(v => (
                <div key={v.id} className="cs-panel rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: platformDot(v.platform) }} />
                      {v.platform}
                    </span>
                    <span className="text-xs" style={{ color: '#7E9385' }}>{fmtDate(v.datePosted)}</span>
                  </div>
                  {v.creatorHandle && <div className="text-sm" style={{ color: '#A9BAAE' }}>{v.creatorHandle}</div>}
                  <div className="grid grid-cols-4 gap-2 text-center pt-2" style={{ borderTop: '1px dashed #1C2A1E' }}>
                    <div><Eye size={13} className="mx-auto mb-1" style={{ color: '#7E9385' }} /><div className="text-sm font-semibold">{fmtNum(v.views)}</div></div>
                    <div><Heart size={13} className="mx-auto mb-1" style={{ color: '#7E9385' }} /><div className="text-sm font-semibold">{fmtNum(v.likes)}</div></div>
                    <div><MessageCircle size={13} className="mx-auto mb-1" style={{ color: '#7E9385' }} /><div className="text-sm font-semibold">{fmtNum(v.comments)}</div></div>
                    <div><Share2 size={13} className="mx-auto mb-1" style={{ color: '#7E9385' }} /><div className="text-sm font-semibold">{fmtNum(v.shares)}</div></div>
                  </div>
                  <a href={v.link} target="_blank" rel="noopener noreferrer" className="cs-btn-ghost rounded-lg py-1.5 text-sm font-medium inline-flex items-center justify-center gap-1.5">
                    View post <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- ROOT ----------

export default function ClipSmartPortal() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [storageWarning, setStorageWarning] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (!window.storage) throw new Error('no storage');
        const result = await window.storage.get(STORAGE_KEY, true).catch(() => null);
        if (result && result.value) {
          setData(JSON.parse(result.value));
        } else {
          setData(SAMPLE_DATA);
          await window.storage.set(STORAGE_KEY, JSON.stringify(SAMPLE_DATA), true);
        }
      } catch (e) {
        setData(SAMPLE_DATA);
        setStorageWarning('Changes in this session won\u2019t be saved permanently — storage isn\u2019t available right now.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function persist(next) {
    setData(next);
    try {
      if (window.storage) await window.storage.set(STORAGE_KEY, JSON.stringify(next), true);
    } catch (e) {
      setStorageWarning('Your last change may not have saved. Try again in a moment.');
    }
  }

  const actions = {
    addClient: (form) => persist({ ...data, clients: [...data.clients, { ...form, id: uid('c') }] }),
    updateClient: (id, form) => persist({ ...data, clients: data.clients.map(c => c.id === id ? { ...form, id } : c) }),
    deleteClient: (id) => persist({
      ...data,
      clients: data.clients.filter(c => c.id !== id),
      payments: data.payments.filter(p => p.clientId !== id),
      videos: data.videos.filter(v => v.clientId !== id)
    }),
    addPayment: (form) => persist({ ...data, payments: [...data.payments, { ...form, id: uid('p') }] }),
    updatePayment: (id, form) => persist({ ...data, payments: data.payments.map(p => p.id === id ? { ...form, id } : p) }),
    deletePayment: (id) => persist({ ...data, payments: data.payments.filter(p => p.id !== id) }),
    addVideo: (form) => persist({ ...data, videos: [...data.videos, { ...form, id: uid('v') }] }),
    updateVideo: (id, form) => persist({ ...data, videos: data.videos.map(v => v.id === id ? { ...form, id } : v) }),
    deleteVideo: (id) => persist({ ...data, videos: data.videos.filter(v => v.id !== id) }),
    importVideos: (rows) => persist({ ...data, videos: [...data.videos, ...rows.map(r => ({ ...r, id: uid('v') }))] }),
    saveSettings: (patch) => persist({ ...data, settings: { ...data.settings, ...patch } }),
    saveSheetUrl: (url) => persist({ ...data, settings: { ...data.settings, sheetCsvUrl: url } }),
    loadSample: () => persist(SAMPLE_DATA),
    clearAll: () => persist({ ...EMPTY_DATA, settings: data.settings })
  };

  if (loading || !data) {
    return (
      <div className="cs-root flex items-center justify-center">
        <BrandStyles />
        <div className="cs-display text-lg" style={{ color: '#2ECC71' }}>Loading ClipSmart...</div>
      </div>
    );
  }

  if (!session) {
    return <LoginScreen data={data} onLogin={setSession} storageWarning={storageWarning} />;
  }

  if (session.role === 'admin') {
    return <AdminApp data={data} actions={actions} onLogout={() => setSession(null)} />;
  }

  return <ClientApp data={data} clientId={session.clientId} onLogout={() => setSession(null)} />;
}
