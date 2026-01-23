"use client";
import React, { useState } from 'react';

const PASSWORD = "Test2026_V1";
const DEFAULT_KW = { fr: ['[métier] [ville]', 'meilleur [métier] [ville]', '[métier] près de [ville]', 'avis [métier] [ville]'], it: ['[métier] [ville]', 'miglior [métier] [ville]', '[métier] vicino a [ville]', 'recensioni [métier] [ville]'] };

const T = {
  fr: { login: "Audit SEO Local", sub: "Outil d'analyse", pwd: "Mot de passe", pwdPh: "Entrez le mot de passe", pwdErr: "Incorrect", access: "Accéder", header: "Audit SEO Local", badge: "Automatisé", title: "Analysez votre visibilité locale", desc: "Audit complet avec positionnement et impact financier", apiTitle: "Clé API SerpAPI", apiLabel: "Clé API", apiPh: "Collez votre clé", cont: "Continuer", config: "Configuration", bizTitle: "Informations", bizName: "Entreprise", bizPh: "Ex: Alsace Carreaux", logoL: "Logo URL", logoPh: "https://...", actL: "Activité", actPh: "Ex: carrelage", panL: "Panier moyen €", panPh: "500", marL: "Marge %", marPh: "15", etabTitle: "Établissements", etab: "Établissement", del: "Supprimer", cityL: "Ville", cityPh: "Ville", volL: "Volume/mois", addEtab: "Ajouter un établissement", kwTitle: "Mots-clés", kwDesc: "Variable disponible:", kwPh: "Ex: [métier] [ville]", addKw: "Ajouter un mot-clé", back: "Retour", launch: "Lancer l'analyse", analyzing: "Analyse en cours", wait: "Veuillez patienter", report: "Rapport d'audit", etabs: "établissement(s)", statEtab: "Établissements", statNote: "Note moyenne", statReq: "Requêtes", statVis: "Visibilité", diag: "Diagnostic visibilité", top3: "Top 3", exc: "Excellent", pos47: "Position 4-7", imp: "À améliorer", pos8: "Position 8+", crit: "Critique", fin: "Impact financier", loss: "Perte annuelle estimée", lossD: "CA perdu par manque de visibilité", pot: "Potentiel récupérable", potD: "Récupérable en 12 mois", dist: "Répartition par établissement", inv: "Investissement", roi: "ROI estimé", be: "Break-even", leads: "Leads/an", comp: "Concurrents principaux", detail: "Analyse détaillée", note: "Note Google", avis: "Avis", posReq: "Positions par requête", matrix: "Matrice de positionnement", newA: "Nouvel audit", pdf: "Exporter PDF", search: "Rechercher un établissement...", footer: "V1" },
  it: { login: "Audit SEO Locale", sub: "Strumento di analisi", pwd: "Password", pwdPh: "Inserisci password", pwdErr: "Errata", access: "Accedi", header: "Audit SEO Locale", badge: "Automatizzato", title: "Analizza la visibilità locale", desc: "Audit completo con posizionamento e impatto", apiTitle: "Chiave API SerpAPI", apiLabel: "Chiave API", apiPh: "Incolla chiave", cont: "Continua", config: "Configurazione", bizTitle: "Informazioni", bizName: "Azienda", bizPh: "Es: Milano Piastrelle", logoL: "Logo URL", logoPh: "https://...", actL: "Attività", actPh: "Es: piastrelle", panL: "Scontrino medio €", panPh: "500", marL: "Margine %", marPh: "15", etabTitle: "Stabilimenti", etab: "Stabilimento", del: "Elimina", cityL: "Città", cityPh: "Città", volL: "Volume/mese", addEtab: "Aggiungi stabilimento", kwTitle: "Parole chiave", kwDesc: "Variabile disponibile:", kwPh: "Es: [métier] [ville]", addKw: "Aggiungi parola chiave", back: "Indietro", launch: "Avvia analisi", analyzing: "Analisi in corso", wait: "Attendere", report: "Rapporto audit", etabs: "stabilimento/i", statEtab: "Stabilimenti", statNote: "Valutazione", statReq: "Query", statVis: "Visibilità", diag: "Diagnosi visibilità", top3: "Top 3", exc: "Eccellente", pos47: "Posizione 4-7", imp: "Da migliorare", pos8: "Posizione 8+", crit: "Critico", fin: "Impatto finanziario", loss: "Perdita annuale stimata", lossD: "Fatturato perso", pot: "Potenziale recuperabile", potD: "Recuperabile in 12 mesi", dist: "Distribuzione per stabilimento", inv: "Investimento", roi: "ROI stimato", be: "Break-even", leads: "Lead/anno", comp: "Concorrenti principali", detail: "Analisi dettagliata", note: "Valutazione Google", avis: "Recensioni", posReq: "Posizioni per query", matrix: "Matrice di posizionamento", newA: "Nuovo audit", pdf: "Esporta PDF", search: "Cerca uno stabilimento...", footer: "V1" }
};

const Ic = ({ n, s = 20 }) => {
  const paths = {
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    key: <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>,
  };
  return <svg width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">{paths[n]}</svg>;
};

const Badge = ({ children, v = 'def' }) => {
  const colors = { def: { bg: '#f1f5f9', c: '#475569' }, ok: { bg: '#dcfce7', c: '#16a34a' }, warn: { bg: '#fef3c7', c: '#d97706' }, err: { bg: '#fee2e2', c: '#dc2626' }, pri: { bg: '#e0e7ff', c: '#4f46e5' } };
  const col = colors[v] || colors.def;
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: col.bg, color: col.c }}>{children}</span>;
};

const PosBadge = ({ r }) => {
  const n = typeof r === 'string' && r.startsWith('+') ? 99 : r;
  let v = 'err';
  if (n !== 'N/A' && n !== null && typeof n === 'number') { if (n <= 3) v = 'ok'; else if (n <= 7) v = 'warn'; }
  return <Badge v={v}>{r === 'N/A' || r === null ? 'N/A' : typeof r === 'number' ? '#' + r : r}</Badge>;
};

const s = {
  page: { minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  header: { background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' },
  card: { background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '20px' },
  btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s' },
  btnP: { background: '#1e293b', color: '#fff' },
  btnS: { background: '#f1f5f9', color: '#475569' },
  input: { width: '100%', padding: '12px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#1e293b', outline: 'none' },
  label: { display: 'block', fontSize: '13px', fontWeight: 500, color: '#64748b', marginBottom: '6px' },
};

export default function App() {
  const [lang, setLang] = useState(null);
  const [auth, setAuth] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdErr, setPwdErr] = useState(false);
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [biz, setBiz] = useState('');
  const [logo, setLogo] = useState('');
  const [met, setMet] = useState('');
  const [pan, setPan] = useState('');
  const [mar, setMar] = useState('15');
  const [locs, setLocs] = useState([{ id: 1, pid: '', name: '', city: '', lat: '', lon: '', ld: false, err: '', rat: null, rev: null, vol: 500, q: '', res: [], sh: false }]);
  const [kws, setKws] = useState([]);
  const [results, setResults] = useState(null);
  const [prog, setProg] = useState(0);
  const [progT, setProgT] = useState('');

  const t = lang ? T[lang] : T.fr;

  const login = () => pwd === PASSWORD ? setAuth(true) : setPwdErr(true);
  const addLoc = () => setLocs([...locs, { id: Date.now(), pid: '', name: '', city: '', lat: '', lon: '', ld: false, err: '', rat: null, rev: null, vol: 500, q: '', res: [], sh: false }]);
  const upLoc = (id, k, v) => setLocs(locs.map(l => l.id === id ? { ...l, [k]: v } : l));
  const rmLoc = id => locs.length > 1 && setLocs(locs.filter(l => l.id !== id));

  const searchP = async (id, q) => {
    if (!apiKey || q.length < 3) return;
    setLocs(ls => ls.map(l => l.id === id ? { ...l, ld: true, err: '', sh: false } : l));
    try {
      const r = await fetch('/api/serpapi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apiKey, action: 'searchPlaces', query: q }) });
      const d = await r.json();
      setLocs(ls => ls.map(l => l.id === id ? { ...l, ld: false, res: d.places || [], sh: d.places?.length > 0, err: d.places?.length ? '' : 'Aucun résultat' } : l));
    } catch { setLocs(ls => ls.map(l => l.id === id ? { ...l, ld: false, err: 'Erreur' } : l)); }
  };

  const selP = (id, p) => {
    let city = p.address?.split(',').slice(-2, -1)[0]?.trim().replace(/\d{5}/, '').trim() || '';
    setLocs(ls => ls.map(l => l.id === id ? { ...l, pid: p.placeId, name: p.name, city, lat: p.lat, lon: p.lon, rat: p.rating, rev: p.reviews, q: p.name, res: [], sh: false } : l));
  };

  const run = async () => {
    setStep(3); setProg(0);
    const valid = locs.filter(l => l.pid && l.lat);
    const tot = valid.length * kws.length;
    let done = 0, pn = parseFloat(pan) || 500, mg = parseFloat(mar) / 100 || 0.15;
    const r = { biz, logo, met, pan: pn, mar: mg, locs: [], comp: [], sum: { tot: valid.length, avgR: 0, totRev: 0, t3: 0, t7: 0, inv: 0 } };

    for (const loc of valid) {
      const lr = { ...loc, ranks: [], stat: 'moyen', t3: 0, t7: 0, inv: 0 };
      for (const kwT of kws) {
        const kw = kwT.replace(/\[métier\]/g, met).replace(/\[ville\]/g, loc.city);
        setProgT(kw);
        try {
          const rs = await fetch('/api/serpapi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apiKey, action: 'searchRanking', keyword: kw, lat: loc.lat, lon: loc.lon }) });
          const d = await rs.json();
          let rk = 'N/A';
          if (d.local_results) { for (let i = 0; i < d.local_results.length; i++) if (d.local_results[i].place_id === loc.pid) { rk = i + 1; break; } if (rk === 'N/A' && d.local_results.length) rk = '+' + d.local_results.length; }
          if (d.competitors) d.competitors.forEach(c => { if (!r.comp.find(x => x.placeId === c.placeId)) r.comp.push(c); });
          lr.ranks.push({ kw, rk });
          if (typeof rk === 'number') { if (rk <= 3) { r.sum.t3++; lr.t3++; } if (rk <= 7) { r.sum.t7++; lr.t7++; } } else { r.sum.inv++; lr.inv++; }
        } catch { lr.ranks.push({ kw, rk: 'ERR' }); lr.inv++; r.sum.inv++; }
        done++; setProg(Math.round(done / tot * 100));
        await new Promise(x => setTimeout(x, 1500));
      }
      const kc = kws.length;
      if (lr.t3 / kc >= 0.7 && lr.rat >= 4.5) lr.stat = 'excellent'; else if (lr.t3 / kc >= 0.5) lr.stat = 'bon'; else if (lr.t7 / kc >= 0.3) lr.stat = 'moyen'; else if (lr.inv / kc >= 0.5) lr.stat = 'critique'; else lr.stat = 'faible';
      if (lr.rat) r.sum.avgR += lr.rat; if (lr.rev) r.sum.totRev += lr.rev;
      r.locs.push(lr);
    }
    const wr = r.locs.filter(l => l.rat); if (wr.length) r.sum.avgR = (r.sum.avgR / wr.length).toFixed(1);
    const tt = r.sum.tot * kws.length; r.sum.visPct = Math.round((tt - r.sum.inv) / tt * 100);
    r.locs.forEach(l => { const ir = l.inv / kws.length, pr = (kws.length - l.t7) / kws.length, v = l.vol || 500; l.loss = Math.round(v * 0.35 * (ir + pr * 0.5) * 12 * 0.04 * pn * mg / 1000); });
    const tl = r.locs.reduce((s, l) => s + l.loss, 0);
    r.fin = { tl, pg: Math.round(tl * 0.65), roi: tl > 0 ? Math.round(tl * 0.65 / 15 * 100) : 0, be: '2-3 ' + (lang === 'it' ? 'mesi' : 'mois'), lpy: Math.round(tl * 0.65 / (pn * mg) * 1000), inv: '10-20K' };
    const cc = {}; r.comp.forEach(c => cc[c.placeId] = cc[c.placeId] ? { ...cc[c.placeId], cnt: cc[c.placeId].cnt + 1 } : { ...c, cnt: 1 }); r.topComp = Object.values(cc).sort((a, b) => b.cnt - a.cnt).slice(0, 5);
    setResults(r); setStep(4);
  };

  // LANG SELECT
  if (!lang) return (
    <div style={s.page}>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={s.card}>
          <div style={{ width: '56px', height: '56px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#64748b' }}><Ic n="globe" s={26}/></div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '6px', textAlign: 'center' }}>Audit SEO Local</h1>
          <p style={{ color: '#64748b', marginBottom: '24px', textAlign: 'center', fontSize: '14px' }}>Sélectionnez votre langue</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button onClick={() => { setLang('fr'); setKws(DEFAULT_KW.fr); }} style={{ ...s.btn, ...s.btnS, padding: '16px', flexDirection: 'column', gap: '4px' }}><span style={{ fontSize: '20px', fontWeight: 600 }}>FR</span><span style={{ fontSize: '12px', color: '#94a3b8' }}>Français</span></button>
            <button onClick={() => { setLang('it'); setKws(DEFAULT_KW.it); }} style={{ ...s.btn, ...s.btnS, padding: '16px', flexDirection: 'column', gap: '4px' }}><span style={{ fontSize: '20px', fontWeight: 600 }}>IT</span><span style={{ fontSize: '12px', color: '#94a3b8' }}>Italiano</span></button>
          </div>
        </div>
      </div>
    </div>
  );

  // LOGIN
  if (!auth) return (
    <div style={s.page}>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...s.card, width: '360px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#64748b' }}><Ic n="lock" s={22}/></div>
            <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>{t.login}</h1>
            <p style={{ color: '#64748b', fontSize: '14px' }}>{t.sub}</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={s.label}>{t.pwd}</label>
            <input type="password" style={{ ...s.input, borderColor: pwdErr ? '#ef4444' : '#e2e8f0' }} placeholder={t.pwdPh} value={pwd} onChange={e => { setPwd(e.target.value); setPwdErr(false); }} onKeyPress={e => e.key === 'Enter' && login()} />
            {pwdErr && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{t.pwdErr}</p>}
          </div>
          <button style={{ ...s.btn, ...s.btnP, width: '100%' }} onClick={login}>{t.access}<Ic n="arrow" s={16}/></button>
        </div>
      </div>
    </div>
  );

  // STEP 1 - API KEY
  if (step === 1) return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Ic n="chart" s={22}/>
          <span style={{ fontWeight: 600 }}>{t.header}</span>
        </div>
      </header>
      <div style={s.container}>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <Badge v="pri">{t.badge}</Badge>
          <h1 style={{ fontSize: '28px', fontWeight: 600, margin: '12px 0 8px' }}>{t.title}</h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>{t.desc}</p>
          <div style={s.card}>
            <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#64748b' }}>
                <Ic n="key" s={18}/>
                <span style={{ fontWeight: 500, color: '#1e293b' }}>{t.apiTitle}</span>
              </div>
              <ol style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.8, paddingLeft: '18px', margin: 0 }}>
                <li>Créez un compte sur <a href="https://serpapi.com" target="_blank" rel="noreferrer" style={{ color: '#4f46e5' }}>serpapi.com</a></li>
                <li>Confirmez votre email</li>
                <li>Dashboard → API Key</li>
                <li>100 recherches/mois gratuites</li>
              </ol>
            </div>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={s.label}>{t.apiLabel}</label>
              <input type="password" style={s.input} placeholder={t.apiPh} value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>
            <button style={{ ...s.btn, ...s.btnP, width: '100%' }} onClick={() => apiKey && setStep(2)}>{t.cont}<Ic n="arrow" s={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );

  // STEP 2 - CONFIG
  if (step === 2) return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Ic n="chart" s={22}/><span style={{ fontWeight: 600 }}>{t.header}</span></div>
        <button style={{ ...s.btn, ...s.btnS }} onClick={() => setStep(1)}>{t.back}</button>
      </header>
      <div style={s.container}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>{t.config}</h1>
        
        <div style={s.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', background: '#e0e7ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}><Ic n="building" s={18}/></div>
            <h2 style={{ fontSize: '15px', fontWeight: 600 }}>{t.bizTitle}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div><label style={s.label}>{t.bizName}</label><input style={s.input} placeholder={t.bizPh} value={biz} onChange={e => setBiz(e.target.value)} /></div>
            <div><label style={s.label}>{t.logoL}</label><input style={s.input} placeholder={t.logoPh} value={logo} onChange={e => setLogo(e.target.value)} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div><label style={s.label}>{t.actL}</label><input style={s.input} placeholder={t.actPh} value={met} onChange={e => setMet(e.target.value)} /></div>
            <div><label style={s.label}>{t.panL}</label><input style={s.input} type="number" placeholder={t.panPh} value={pan} onChange={e => setPan(e.target.value)} /></div>
            <div><label style={s.label}>{t.marL}</label><input style={s.input} type="number" placeholder={t.marPh} value={mar} onChange={e => setMar(e.target.value)} /></div>
          </div>
        </div>

        <div style={s.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', background: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}><Ic n="pin" s={18}/></div>
            <h2 style={{ fontSize: '15px', fontWeight: 600 }}>{t.etabTitle}</h2>
          </div>
          {locs.map((l, i) => (
            <div key={l.id} style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '14px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '24px', height: '24px', background: '#1e293b', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#fff' }}>{i + 1}</span>
                  {t.etab}
                </span>
                {locs.length > 1 && <button onClick={() => rmLoc(l.id)} style={{ ...s.btn, background: '#fee2e2', color: '#dc2626', padding: '6px 10px' }}><Ic n="trash" s={14}/></button>}
              </div>
              <div style={{ position: 'relative', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input style={{ ...s.input, flex: 1 }} placeholder={t.search} value={l.q} onChange={e => upLoc(l.id, 'q', e.target.value)} onKeyPress={e => e.key === 'Enter' && searchP(l.id, l.q)} />
                  <button style={{ ...s.btn, ...s.btnP, padding: '12px 14px' }} onClick={() => searchP(l.id, l.q)} disabled={l.ld}>{l.ld ? '...' : <Ic n="search" s={16}/>}</button>
                </div>
                {l.sh && l.res.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', marginTop: '6px', maxHeight: '240px', overflowY: 'auto', zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    {l.res.map((p, j) => (
                      <div key={j} onClick={() => selP(l.id, p)} style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                        <div style={{ fontWeight: 500, marginBottom: '2px', fontSize: '14px' }}>{p.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{p.address}</div>
                        {p.rating && <div style={{ marginTop: '4px', fontSize: '12px', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}><Ic n="star" s={12}/> {p.rating}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {l.err && <div style={{ color: '#dc2626', fontSize: '12px', marginBottom: '10px', padding: '8px 12px', background: '#fee2e2', borderRadius: '6px' }}>{l.err}</div>}
              {l.name && (
                <div style={{ background: '#dcfce7', borderRadius: '8px', padding: '12px 14px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 500, color: '#16a34a', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}><Ic n="check" s={14}/> {l.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{l.city}</div>
                  </div>
                  {l.rat && <span style={{ color: '#f59e0b', fontWeight: 500, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}><Ic n="star" s={14}/> {l.rat}</span>}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><label style={{ ...s.label, fontSize: '12px' }}>{t.cityL}</label><input style={s.input} placeholder={t.cityPh} value={l.city} onChange={e => upLoc(l.id, 'city', e.target.value)} /></div>
                <div><label style={{ ...s.label, fontSize: '12px' }}>{t.volL}</label><input style={s.input} type="number" placeholder="500" value={l.vol} onChange={e => upLoc(l.id, 'vol', parseInt(e.target.value) || 500)} /></div>
              </div>
            </div>
          ))}
          <button onClick={addLoc} style={{ width: '100%', padding: '12px', background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Ic n="plus" s={16}/> {t.addEtab}</button>
        </div>

        <div style={s.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', background: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}><Ic n="target" s={18}/></div>
            <h2 style={{ fontSize: '15px', fontWeight: 600 }}>{t.kwTitle}</h2>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>{t.kwDesc} <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>[métier]</code></p>
          {kws.map((k, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input style={{ ...s.input, flex: 1 }} value={k} onChange={e => { const n = [...kws]; n[i] = e.target.value; setKws(n); }} placeholder={t.kwPh} />
              {kws.length > 1 && <button onClick={() => setKws(kws.filter((_, j) => j !== i))} style={{ ...s.btn, background: '#fee2e2', color: '#dc2626', padding: '0 12px' }}><Ic n="x" s={14}/></button>}
            </div>
          ))}
          <button onClick={() => setKws([...kws, ''])} style={{ marginTop: '6px', padding: '10px 16px', background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '8px', color: '#64748b', cursor: 'pointer', fontWeight: 500, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Ic n="plus" s={16}/> {t.addKw}</button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button style={{ ...s.btn, ...s.btnP, padding: '12px 32px', fontSize: '15px', opacity: (!biz || !met || locs.every(l => !l.pid)) ? 0.5 : 1 }} onClick={run} disabled={!biz || !met || locs.every(l => !l.pid)}>{t.launch}<Ic n="arrow" s={16}/></button>
        </div>
      </div>
    </div>
  );

  // STEP 3 - LOADING
  if (step === 3) return (
    <div style={s.page}>
      <header style={s.header}><div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Ic n="chart" s={22}/><span style={{ fontWeight: 600 }}>{t.header}</span></div></header>
      <div style={s.container}>
        <div style={{ ...s.card, maxWidth: '420px', margin: '40px auto', textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>{prog}%</div>
          <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginBottom: '20px' }}><div style={{ width: prog + '%', height: '100%', background: '#4f46e5', borderRadius: '3px', transition: 'width 0.3s' }}/></div>
          <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>{t.analyzing}</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>{progT}</p>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>{t.wait}</p>
        </div>
      </div>
    </div>
  );

  // STEP 4 - RESULTS
  if (step === 4 && results) {
    const r = results;
    return (
      <div style={s.page}>
        <style>{`@media print{.noprint{display:none!important}}`}</style>
        <header style={s.header} className="noprint">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {r.logo && <img src={r.logo} alt="" style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}/>}
            <div><div style={{ fontWeight: 600, fontSize: '15px' }}>{r.biz}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{r.met}</div></div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ ...s.btn, ...s.btnS }} onClick={() => { setStep(2); setResults(null); }}>{t.newA}</button>
            <button style={{ ...s.btn, ...s.btnP }} onClick={() => window.print()}><Ic n="download" s={16}/> {t.pdf}</button>
          </div>
        </header>
        <div style={s.container}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <Badge v="pri">{t.report}</Badge>
            <h1 style={{ fontSize: '30px', fontWeight: 600, marginTop: '12px', marginBottom: '6px' }}>{r.biz}</h1>
            <p style={{ color: '#64748b', fontSize: '14px' }}>{r.sum.tot} {t.etabs}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
            {[{ ic: 'building', v: r.sum.tot, l: t.statEtab }, { ic: 'star', v: r.sum.avgR || 'N/A', l: t.statNote }, { ic: 'target', v: r.sum.tot * kws.length, l: t.statReq }, { ic: 'trending', v: r.sum.visPct + '%', l: t.statVis }].map((x, i) => (
              <div key={i} style={{ ...s.card, marginBottom: 0, padding: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', marginBottom: '12px' }}><Ic n={x.ic} s={18}/></div>
                <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '2px' }}>{x.v}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{x.l}</div>
              </div>
            ))}
          </div>

          <div style={s.card}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>{t.diag}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
              <div style={{ padding: '20px', background: '#dcfce7', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: 600, color: '#16a34a' }}>{r.sum.t3}</div><div style={{ fontSize: '13px', color: '#16a34a', fontWeight: 500 }}>{t.top3}</div><div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{t.exc}</div></div>
              <div style={{ padding: '20px', background: '#fef3c7', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: 600, color: '#d97706' }}>{r.sum.t7 - r.sum.t3}</div><div style={{ fontSize: '13px', color: '#d97706', fontWeight: 500 }}>{t.pos47}</div><div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{t.imp}</div></div>
              <div style={{ padding: '20px', background: '#fee2e2', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: 600, color: '#dc2626' }}>{r.sum.tot * kws.length - r.sum.t7}</div><div style={{ fontSize: '13px', color: '#dc2626', fontWeight: 500 }}>{t.pos8}</div><div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{t.crit}</div></div>
            </div>
          </div>

          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t.fin}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ ...s.card, borderLeft: '3px solid #dc2626', marginBottom: 0 }}><div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '6px' }}>{t.loss}</div><div style={{ fontSize: '36px', fontWeight: 600, color: '#dc2626', marginBottom: '4px' }}>-{r.fin.tl}K€</div><div style={{ fontSize: '13px', color: '#64748b' }}>{t.lossD}</div></div>
            <div style={{ ...s.card, borderLeft: '3px solid #16a34a', marginBottom: 0 }}><div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '6px' }}>{t.pot}</div><div style={{ fontSize: '36px', fontWeight: 600, color: '#16a34a', marginBottom: '4px' }}>+{r.fin.pg}K€</div><div style={{ fontSize: '13px', color: '#64748b' }}>{t.potD}</div></div>
          </div>

          <div style={s.card}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#dc2626', marginBottom: '14px' }}>{t.dist}</h3>
            {r.locs.sort((a, b) => b.loss - a.loss).map((l, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontWeight: 500, fontSize: '14px' }}>{l.city}</span><Badge v={l.stat === 'excellent' ? 'ok' : l.stat === 'bon' ? 'pri' : l.stat === 'moyen' ? 'warn' : 'err'}>{l.stat}</Badge></div>
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#dc2626' }}>-{l.loss}K€</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
            {[{ v: r.fin.inv + '€', l: t.inv }, { v: r.fin.roi + '%', l: t.roi }, { v: r.fin.be, l: t.be }, { v: '+' + r.fin.lpy, l: t.leads }].map((x, i) => (
              <div key={i} style={{ ...s.card, marginBottom: 0, textAlign: 'center', padding: '20px' }}><div style={{ fontSize: '22px', fontWeight: 600, color: '#4f46e5', marginBottom: '2px' }}>{x.v}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{x.l}</div></div>
            ))}
          </div>

          {r.topComp?.length > 0 && (
            <div style={s.card}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t.comp}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '12px' }}>
                {r.topComp.map((c, i) => (
                  <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ width: '32px', height: '32px', background: i === 0 ? '#fef3c7' : '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '14px', color: i === 0 ? '#d97706' : '#64748b', margin: '0 auto 10px' }}>{i + 1}</div>
                    <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                    {c.rating && <div style={{ fontSize: '12px', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}><Ic n="star" s={10}/> {c.rating}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t.detail}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: '20px', marginBottom: '32px' }}>
            {r.locs.map((l, i) => (
              <div key={i} style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 600 }}>{l.city}</div>
                  <Badge v={l.stat === 'excellent' ? 'ok' : l.stat === 'bon' ? 'pri' : l.stat === 'moyen' ? 'warn' : 'err'}>{l.stat}</Badge>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 600, color: l.rat >= 4.5 ? '#16a34a' : l.rat >= 4 ? '#d97706' : '#dc2626' }}>{l.rat || 'N/A'}</div><div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{t.note}</div></div>
                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 600, color: '#4f46e5' }}>{l.rev || 'N/A'}</div><div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{t.avis}</div></div>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.posReq}</div>
                {l.ranks.map((x, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{x.kw}</span>
                    <PosBadge r={x.rk}/>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ ...s.card, overflowX: 'auto' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t.matrix}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 14px', background: '#f8fafc', fontSize: '12px', fontWeight: 600, color: '#64748b', textAlign: 'left', borderRadius: '6px 0 0 6px' }}>Requête</th>
                  {r.locs.map((l, i) => <th key={i} style={{ padding: '12px 14px', background: '#f8fafc', fontSize: '12px', fontWeight: 600, color: '#64748b', textAlign: 'center', borderRadius: i === r.locs.length - 1 ? '0 6px 6px 0' : 0 }}>{l.city}</th>)}
                </tr>
              </thead>
              <tbody>
                {kws.map((k, ki) => (
                  <tr key={ki}>
                    <td style={{ padding: '12px 14px', fontSize: '13px', borderBottom: '1px solid #f1f5f9' }}>{k}</td>
                    {r.locs.map((l, li) => <td key={li} style={{ padding: '12px 14px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}><PosBadge r={l.ranks[ki]?.rk}/></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '12px', marginTop: '40px' }}>{t.footer}</p>
        </div>
      </div>
    );
  }

  return null;
}
