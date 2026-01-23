"use client";
import React, { useState } from 'react';

const PASSWORD = "Test2026_V1";
const DEFAULT_KW = { fr: ['[métier] [ville]', 'meilleur [métier] [ville]', '[métier] près de [ville]', 'avis [métier] [ville]'], it: ['[métier] [ville]', 'miglior [métier] [ville]', '[métier] vicino a [ville]', 'recensioni [métier] [ville]'] };

const T = {
  fr: { login: "Audit SEO Local", sub: "Outil d'analyse", pwd: "Mot de passe", pwdPh: "Entrez le mot de passe", pwdErr: "Incorrect", access: "Accéder", header: "Audit SEO Local", badge: "Automatisé", title: "Analysez votre visibilité locale", desc: "Audit complet avec positionnement et impact financier", apiTitle: "Clé API SerpAPI", apiLabel: "Clé API", apiPh: "Collez votre clé", cont: "Continuer", config: "Configuration", bizTitle: "Informations", bizName: "Entreprise", bizPh: "Ex: Alsace Carreaux", logoL: "Logo URL", logoPh: "https://...", actL: "Activité", actPh: "Ex: carrelage", panL: "Panier €", panPh: "500", marL: "Marge %", marPh: "15", etabTitle: "Établissements", etab: "Établissement", del: "Supprimer", cityL: "Ville", cityPh: "Ville", volL: "Volume/mois", addEtab: "Ajouter", kwTitle: "Mots-clés", kwDesc: "Variable:", kwPh: "Ex: [métier] [ville]", addKw: "Ajouter", back: "Retour", launch: "Lancer", analyzing: "Analyse...", wait: "Veuillez patienter", report: "Rapport", etabs: "établissement(s)", statEtab: "Établissements", statNote: "Note moyenne", statReq: "Requêtes", statVis: "Visibilité", diag: "Diagnostic", top3: "Top 3", exc: "Excellent", pos47: "Pos 4-7", imp: "À améliorer", pos8: "Pos 8+", crit: "Critique", fin: "Impact financier", loss: "Perte annuelle", lossD: "CA perdu", pot: "Potentiel", potD: "Récupérable 12 mois", dist: "Répartition", inv: "Investissement", roi: "ROI", be: "Break-even", leads: "Leads/an", comp: "Concurrents", detail: "Analyse détaillée", note: "Note", avis: "Avis", posReq: "Positions", matrix: "Matrice", newA: "Nouvel audit", pdf: "Exporter", search: "Rechercher...", footer: "V1" },
  it: { login: "Audit SEO Locale", sub: "Strumento di analisi", pwd: "Password", pwdPh: "Inserisci password", pwdErr: "Errata", access: "Accedi", header: "Audit SEO Locale", badge: "Automatizzato", title: "Analizza la visibilità locale", desc: "Audit completo con posizionamento e impatto", apiTitle: "Chiave API SerpAPI", apiLabel: "Chiave API", apiPh: "Incolla chiave", cont: "Continua", config: "Configurazione", bizTitle: "Informazioni", bizName: "Azienda", bizPh: "Es: Milano Piastrelle", logoL: "Logo URL", logoPh: "https://...", actL: "Attività", actPh: "Es: piastrelle", panL: "Scontrino €", panPh: "500", marL: "Margine %", marPh: "15", etabTitle: "Stabilimenti", etab: "Stabilimento", del: "Elimina", cityL: "Città", cityPh: "Città", volL: "Volume/mese", addEtab: "Aggiungi", kwTitle: "Parole chiave", kwDesc: "Variabile:", kwPh: "Es: [métier] [ville]", addKw: "Aggiungi", back: "Indietro", launch: "Avvia", analyzing: "Analisi...", wait: "Attendere", report: "Rapporto", etabs: "stabilimento/i", statEtab: "Stabilimenti", statNote: "Valutazione", statReq: "Query", statVis: "Visibilità", diag: "Diagnosi", top3: "Top 3", exc: "Eccellente", pos47: "Pos 4-7", imp: "Da migliorare", pos8: "Pos 8+", crit: "Critico", fin: "Impatto finanziario", loss: "Perdita annuale", lossD: "Fatturato perso", pot: "Potenziale", potD: "Recuperabile 12 mesi", dist: "Distribuzione", inv: "Investimento", roi: "ROI", be: "Break-even", leads: "Lead/anno", comp: "Concorrenti", detail: "Analisi dettagliata", note: "Valutazione", avis: "Recensioni", posReq: "Posizioni", matrix: "Matrice", newA: "Nuovo audit", pdf: "Esporta", search: "Cerca...", footer: "V1" }
};

const Ic = ({ n, s = 20 }) => {
  const d = { lock: "M7 11V7a5 5 0 0110 0v4M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z", chart: "M18 20V10M12 20V4M6 20v-6", search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", pin: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", target: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 100 4 2 2 0 000-4z", trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6", users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", check: "M20 6L9 17l-5-5", x: "M18 6L6 18M6 6l12 12", arrow: "M5 12h14m-7-7l7 7-7 7", download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3", plus: "M12 5v14m-7-7h14", trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", globe: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 0 4.5 4.5 4.5 10s-2 10-4.5 10-4.5-4.5-4.5-10 2-10 4.5-10zM2 12h20", key: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" };
  return <svg width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={d[n]}/></svg>;
};

const Badge = ({ children, v = 'def' }) => {
  const c = { def: ['#f1f5f9', '#475569'], ok: ['#dcfce7', '#16a34a'], warn: ['#fef3c7', '#d97706'], err: ['#fee2e2', '#dc2626'], pri: ['#dbeafe', '#2563eb'] }[v];
  return <span style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: c[0], color: c[1] }}>{children}</span>;
};

const PosBadge = ({ r }) => {
  const n = typeof r === 'string' && r.startsWith('+') ? 99 : r;
  let v = 'err';
  if (n !== 'N/A' && n !== null && typeof n === 'number') { if (n <= 3) v = 'ok'; else if (n <= 7) v = 'warn'; }
  return <Badge v={v}>{r === 'N/A' || r === null ? 'N/A' : typeof r === 'number' ? '#' + r : r}</Badge>;
};

const Card = ({ children, style }) => <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px', marginBottom: '24px', ...style }}>{children}</div>;
const Btn = ({ children, primary, style, ...p }) => <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.2s', background: primary ? '#0f172a' : '#f1f5f9', color: primary ? '#fff' : '#475569', ...style }} {...p}>{children}</button>;
const Input = ({ style, ...p }) => <input style={{ width: '100%', padding: '14px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#0f172a', fontSize: '15px', outline: 'none', ...style }} {...p} />;
const Label = ({ children }) => <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>{children}</label>;

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
  const page = { minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: "'Inter',-apple-system,sans-serif" };
  const header = { background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
  const container = { maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' };

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
    <div style={page}><div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#0ea5e9' }}><Ic n="globe" s={28}/></div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Audit SEO Local</h1>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>Sélectionnez votre langue</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Btn onClick={() => { setLang('fr'); setKws(DEFAULT_KW.fr); }} style={{ padding: '20px', flexDirection: 'column', gap: '8px', border: '1px solid #e2e8f0', background: '#fff' }}><span style={{ fontSize: '24px', fontWeight: 700 }}>FR</span><span style={{ fontSize: '13px', color: '#64748b' }}>Français</span></Btn>
          <Btn onClick={() => { setLang('it'); setKws(DEFAULT_KW.it); }} style={{ padding: '20px', flexDirection: 'column', gap: '8px', border: '1px solid #e2e8f0', background: '#fff' }}><span style={{ fontSize: '24px', fontWeight: 700 }}>IT</span><span style={{ fontSize: '13px', color: '#64748b' }}>Italiano</span></Btn>
        </div>
      </Card>
    </div></div>
  );

  // LOGIN
  if (!auth) return (
    <div style={page}><div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', background: '#f1f5f9', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#64748b' }}><Ic n="lock" s={24}/></div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>{t.login}</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{t.sub}</p>
        </div>
        <div style={{ marginBottom: '20px' }}><Label>{t.pwd}</Label><Input type="password" placeholder={t.pwdPh} value={pwd} onChange={e => { setPwd(e.target.value); setPwdErr(false); }} onKeyPress={e => e.key === 'Enter' && login()} style={{ borderColor: pwdErr ? '#ef4444' : '#e2e8f0' }} />{pwdErr && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{t.pwdErr}</p>}</div>
        <Btn primary onClick={login} style={{ width: '100%' }}>{t.access} <Ic n="arrow" s={16}/></Btn>
      </Card>
    </div></div>
  );

  // STEP 1 - API KEY
  if (step === 1) return (
    <div style={page}>
      <header style={header}><div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0ea5e9' }}><Ic n="chart"/><span style={{ fontWeight: 700, color: '#0f172a' }}>{t.header}</span></div></header>
      <div style={container}><div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <Badge v="pri">{t.badge}</Badge>
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '16px 0 12px', letterSpacing: '-0.5px' }}>{t.title}</h1>
        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '40px' }}>{t.desc}</p>
        <Card>
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ color: '#0ea5e9' }}><Ic n="key"/></div>
            <div style={{ textAlign: 'left' }}><div style={{ fontWeight: 600, marginBottom: '8px' }}>{t.apiTitle}</div>
              <ol style={{ fontSize: '14px', color: '#64748b', lineHeight: 2, paddingLeft: '18px', margin: 0 }}><li>Créez un compte sur <a href="https://serpapi.com" target="_blank" rel="noreferrer" style={{ color: '#0ea5e9' }}>serpapi.com</a></li><li>Confirmez votre email</li><li>Dashboard → API Key</li><li>100 recherches/mois gratuites</li></ol>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}><Label>{t.apiLabel}</Label><Input type="password" placeholder={t.apiPh} value={apiKey} onChange={e => setApiKey(e.target.value)} /></div>
          <Btn primary onClick={() => apiKey && setStep(2)} style={{ width: '100%' }}>{t.cont} <Ic n="arrow" s={16}/></Btn>
        </Card>
      </div></div>
    </div>
  );

  // STEP 2 - CONFIG
  if (step === 2) return (
    <div style={page}>
      <header style={header}><div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0ea5e9' }}><Ic n="chart"/><span style={{ fontWeight: 700, color: '#0f172a' }}>{t.header}</span></div><Btn onClick={() => setStep(1)}>{t.back}</Btn></header>
      <div style={container}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>{t.config}</h1>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}><div style={{ width: '40px', height: '40px', background: '#dbeafe', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}><Ic n="building"/></div><h2 style={{ fontSize: '16px', fontWeight: 600 }}>{t.bizTitle}</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}><div><Label>{t.bizName}</Label><Input placeholder={t.bizPh} value={biz} onChange={e => setBiz(e.target.value)} /></div><div><Label>{t.logoL}</Label><Input placeholder={t.logoPh} value={logo} onChange={e => setLogo(e.target.value)} /></div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}><div><Label>{t.actL}</Label><Input placeholder={t.actPh} value={met} onChange={e => setMet(e.target.value)} /></div><div><Label>{t.panL}</Label><Input type="number" placeholder={t.panPh} value={pan} onChange={e => setPan(e.target.value)} /></div><div><Label>{t.marL}</Label><Input type="number" placeholder={t.marPh} value={mar} onChange={e => setMar(e.target.value)} /></div></div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}><div style={{ width: '40px', height: '40px', background: '#fef3c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}><Ic n="pin"/></div><h2 style={{ fontSize: '16px', fontWeight: 600 }}>{t.etabTitle}</h2></div>
          {locs.map((l, i) => (
            <div key={l.id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}><span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '28px', height: '28px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff' }}>{i + 1}</span>{t.etab}</span>{locs.length > 1 && <Btn onClick={() => rmLoc(l.id)} style={{ background: '#fee2e2', color: '#dc2626', padding: '6px 12px' }}><Ic n="trash" s={16}/></Btn>}</div>
              <div style={{ position: 'relative', marginBottom: '16px' }}><div style={{ display: 'flex', gap: '10px' }}><Input placeholder={t.search} value={l.q} onChange={e => upLoc(l.id, 'q', e.target.value)} onKeyPress={e => e.key === 'Enter' && searchP(l.id, l.q)} style={{ flex: 1, background: '#fff' }} /><Btn primary onClick={() => searchP(l.id, l.q)} disabled={l.ld} style={{ padding: '14px 18px', opacity: l.ld ? 0.6 : 1 }}>{l.ld ? '...' : <Ic n="search" s={18}/>}</Btn></div>
                {l.sh && l.res.length > 0 && <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginTop: '8px', maxHeight: '280px', overflowY: 'auto', zIndex: 100, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>{l.res.map((p, j) => <div key={j} onClick={() => selP(l.id, p)} style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = '#fff'}><div style={{ fontWeight: 600, marginBottom: '2px' }}>{p.name}</div><div style={{ fontSize: '13px', color: '#64748b' }}>{p.address}</div>{p.rating && <div style={{ marginTop: '4px', fontSize: '13px', color: '#f59e0b' }}>★ {p.rating}</div>}</div>)}</div>}
              </div>
              {l.err && <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px', padding: '10px 14px', background: '#fee2e2', borderRadius: '8px' }}>{l.err}</div>}
              {l.name && <div style={{ background: '#dcfce7', borderRadius: '10px', padding: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, color: '#16a34a', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}><Ic n="check" s={16}/> {l.name}</div><div style={{ fontSize: '13px', color: '#64748b' }}>{l.city}</div></div>{l.rat && <span style={{ color: '#f59e0b', fontWeight: 600 }}>★ {l.rat}</span>}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}><div><Label style={{ fontSize: '12px' }}>{t.cityL}</Label><Input placeholder={t.cityPh} value={l.city} onChange={e => upLoc(l.id, 'city', e.target.value)} style={{ background: '#fff' }} /></div><div><Label style={{ fontSize: '12px' }}>{t.volL}</Label><Input type="number" placeholder="500" value={l.vol} onChange={e => upLoc(l.id, 'vol', parseInt(e.target.value) || 500)} style={{ background: '#fff' }} /></div></div>
            </div>
          ))}
          <button onClick={addLoc} style={{ width: '100%', padding: '16px', background: '#fff', border: '2px dashed #e2e8f0', borderRadius: '12px', color: '#64748b', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Ic n="plus" s={18}/> {t.addEtab}</button>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}><div style={{ width: '40px', height: '40px', background: '#dcfce7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}><Ic n="target"/></div><h2 style={{ fontSize: '16px', fontWeight: 600 }}>{t.kwTitle}</h2></div>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>{t.kwDesc} <code style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>[métier]</code></p>
          {kws.map((k, i) => <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}><Input value={k} onChange={e => { const n = [...kws]; n[i] = e.target.value; setKws(n); }} placeholder={t.kwPh} />{kws.length > 1 && <Btn onClick={() => setKws(kws.filter((_, j) => j !== i))} style={{ background: '#fee2e2', color: '#dc2626', padding: '0 14px' }}><Ic n="x" s={16}/></Btn>}</div>)}
          <button onClick={() => setKws([...kws, ''])} style={{ marginTop: '8px', padding: '12px 20px', background: '#fff', border: '2px dashed #e2e8f0', borderRadius: '10px', color: '#64748b', cursor: 'pointer', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Ic n="plus" s={18}/> {t.addKw}</button>
        </Card>
        <div style={{ textAlign: 'center' }}><Btn primary onClick={run} disabled={!biz || !met || locs.every(l => !l.pid)} style={{ padding: '16px 48px', fontSize: '16px', opacity: (!biz || !met || locs.every(l => !l.pid)) ? 0.5 : 1 }}>{t.launch} <Ic n="arrow" s={16}/></Btn></div>
      </div>
    </div>
  );

  // STEP 3 - LOADING
  if (step === 3) return (
    <div style={page}>
      <header style={header}><div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0ea5e9' }}><Ic n="chart"/><span style={{ fontWeight: 700, color: '#0f172a' }}>{t.header}</span></div></header>
      <div style={container}><Card style={{ maxWidth: '480px', margin: '60px auto', textAlign: 'center', padding: '48px' }}>
        <div style={{ fontSize: '64px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>{prog}%</div>
        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}><div style={{ width: prog + '%', height: '100%', background: '#0ea5e9', borderRadius: '4px', transition: 'width 0.3s' }}/></div>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>{t.analyzing}</h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>{progT}</p>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>{t.wait}</p>
      </Card></div>
    </div>
  );

  // STEP 4 - RESULTS
  if (step === 4 && results) {
    const r = results;
    return (
      <div style={page}>
        <style>{`@media print{.noprint{display:none!important}}`}</style>
        <header style={header} className="noprint">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>{r.logo && <img src={r.logo} alt="" style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }}/>}<div><div style={{ fontWeight: 700 }}>{r.biz}</div><div style={{ fontSize: '13px', color: '#64748b' }}>{r.met}</div></div></div>
          <div style={{ display: 'flex', gap: '10px' }}><Btn onClick={() => { setStep(2); setResults(null); }}>{t.newA}</Btn><Btn primary onClick={() => window.print()}><Ic n="download" s={18}/> {t.pdf}</Btn></div>
        </header>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}><Badge v="pri">{t.report}</Badge><h1 style={{ fontSize: '36px', fontWeight: 700, marginTop: '16px', marginBottom: '8px' }}>{r.biz}</h1><p style={{ color: '#64748b' }}>{r.sum.tot} {t.etabs}</p></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '40px' }}>
            {[{ ic: 'building', v: r.sum.tot, l: t.statEtab }, { ic: 'star', v: r.sum.avgR || 'N/A', l: t.statNote }, { ic: 'target', v: r.sum.tot * kws.length, l: t.statReq }, { ic: 'trending', v: r.sum.visPct + '%', l: t.statVis }].map((s, i) => <Card key={i} style={{ marginBottom: 0, padding: '24px' }}><div style={{ width: '48px', height: '48px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9', marginBottom: '16px' }}><Ic n={s.ic}/></div><div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>{s.v}</div><div style={{ fontSize: '14px', color: '#64748b' }}>{s.l}</div></Card>)}
          </div>
          <Card><h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>{t.diag}</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}><div style={{ padding: '24px', background: '#dcfce7', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '40px', fontWeight: 700, color: '#16a34a' }}>{r.sum.t3}</div><div style={{ fontSize: '14px', color: '#16a34a', fontWeight: 600 }}>{t.top3}</div><div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{t.exc}</div></div><div style={{ padding: '24px', background: '#fef3c7', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '40px', fontWeight: 700, color: '#d97706' }}>{r.sum.t7 - r.sum.t3}</div><div style={{ fontSize: '14px', color: '#d97706', fontWeight: 600 }}>{t.pos47}</div><div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{t.imp}</div></div><div style={{ padding: '24px', background: '#fee2e2', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '40px', fontWeight: 700, color: '#dc2626' }}>{r.sum.tot * kws.length - r.sum.t7}</div><div style={{ fontSize: '14px', color: '#dc2626', fontWeight: 600 }}>{t.pos8}</div><div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{t.crit}</div></div></div></Card>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>{t.fin}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}><Card style={{ borderLeft: '4px solid #dc2626', marginBottom: 0 }}><div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>{t.loss}</div><div style={{ fontSize: '48px', fontWeight: 700, color: '#dc2626', marginBottom: '8px' }}>-{r.fin.tl}K€</div><div style={{ fontSize: '14px', color: '#64748b' }}>{t.lossD}</div></Card><Card style={{ borderLeft: '4px solid #16a34a', marginBottom: 0 }}><div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>{t.pot}</div><div style={{ fontSize: '48px', fontWeight: 700, color: '#16a34a', marginBottom: '8px' }}>+{r.fin.pg}K€</div><div style={{ fontSize: '14px', color: '#64748b' }}>{t.potD}</div></Card></div>
          <Card><h3 style={{ fontSize: '15px', fontWeight: 700, color: '#dc2626', marginBottom: '16px' }}>{t.dist}</h3>{r.locs.sort((a, b) => b.loss - a.loss).map((l, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f8fafc', borderRadius: '10px', marginBottom: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}><span style={{ fontWeight: 600 }}>{l.city}</span><Badge v={l.stat === 'excellent' ? 'ok' : l.stat === 'bon' ? 'pri' : l.stat === 'moyen' ? 'warn' : 'err'}>{l.stat}</Badge></div><span style={{ fontSize: '18px', fontWeight: 700, color: '#dc2626' }}>-{l.loss}K€</span></div>)}</Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '40px' }}>{[{ v: r.fin.inv + '€', l: t.inv }, { v: r.fin.roi + '%', l: t.roi }, { v: r.fin.be, l: t.be }, { v: '+' + r.fin.lpy, l: t.leads }].map((s, i) => <Card key={i} style={{ marginBottom: 0, textAlign: 'center', padding: '24px' }}><div style={{ fontSize: '28px', fontWeight: 700, color: '#0ea5e9', marginBottom: '4px' }}>{s.v}</div><div style={{ fontSize: '13px', color: '#64748b' }}>{s.l}</div></Card>)}</div>
          {r.topComp?.length > 0 && <Card><h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>{t.comp}</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '16px' }}>{r.topComp.map((c, i) => <div key={i} style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}><div style={{ width: '40px', height: '40px', background: i === 0 ? '#fef3c7' : '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: i === 0 ? '#d97706' : '#64748b', margin: '0 auto 12px' }}>{i + 1}</div><div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>{c.rating && <div style={{ fontSize: '13px', color: '#f59e0b' }}>★ {c.rating}</div>}</div>)}</div></Card>}
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>{t.detail}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))', gap: '24px', marginBottom: '40px' }}>{r.locs.map((l, i) => <Card key={i}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}><div style={{ fontSize: '20px', fontWeight: 700 }}>{l.city}</div><Badge v={l.stat === 'excellent' ? 'ok' : l.stat === 'bon' ? 'pri' : l.stat === 'moyen' ? 'warn' : 'err'}>{l.stat}</Badge></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}><div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: 700, color: l.rat >= 4.5 ? '#16a34a' : l.rat >= 4 ? '#d97706' : '#dc2626' }}>{l.rat || 'N/A'}</div><div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{t.note}</div></div><div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: 700, color: '#0ea5e9' }}>{l.rev || 'N/A'}</div><div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{t.avis}</div></div></div><div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '12px' }}>{t.posReq}</div>{l.ranks.map((x, j) => <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}><span style={{ fontSize: '13px', color: '#64748b' }}>{x.kw}</span><PosBadge r={x.rk}/></div>)}</Card>)}</div>
          <Card style={{ overflowX: 'auto' }}><h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>{t.matrix}</h2><table style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr><th style={{ padding: '14px 16px', background: '#f8fafc', fontSize: '13px', fontWeight: 600, color: '#64748b', textAlign: 'left', borderRadius: '8px 0 0 8px' }}>Requête</th>{r.locs.map((l, i) => <th key={i} style={{ padding: '14px 16px', background: '#f8fafc', fontSize: '13px', fontWeight: 600, color: '#64748b', textAlign: 'center', borderRadius: i === r.locs.length - 1 ? '0 8px 8px 0' : 0 }}>{l.city}</th>)}</tr></thead><tbody>{kws.map((k, ki) => <tr key={ki}><td style={{ padding: '14px 16px', fontSize: '14px', borderBottom: '1px solid #f1f5f9' }}>{k}</td>{r.locs.map((l, li) => <td key={li} style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}><PosBadge r={l.ranks[ki]?.rk}/></td>)}</tr>)}</tbody></table></Card>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '48px' }}>{t.footer}</p>
        </div>
      </div>
    );
  }

  return null;
}
