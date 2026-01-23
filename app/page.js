"use client";
import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const PASSWORD = "Test2026_V1";

const DEFAULT_KEYWORDS = {
  fr: ['[métier] [ville]', 'meilleur [métier] [ville]', '[métier] près de [ville]', 'avis [métier] [ville]'],
  it: ['[métier] [ville]', 'miglior [métier] [ville]', '[métier] vicino a [ville]', 'recensioni [métier] [ville]']
};

const TRANSLATIONS = {
  fr: {
    loginTitle: "Audit SEO Local", loginSubtitle: "Accès restreint", password: "Mot de passe",
    passwordPlaceholder: "Entrez le mot de passe...", passwordError: "Mot de passe incorrect",
    accessButton: "Accéder à l'outil", headerTitle: "Audit SEO Local", headerSubtitle: "Analyse Google Maps",
    configSubtitle: "Configuration", analysisSubtitle: "Analyse en cours...", resultsSubtitle: "Résultats",
    step1Badge: "Audit automatisé", step1Title: "Analysez la visibilité", step1Highlight: "Google Maps",
    step1Desc: "Générez un audit complet avec positionnement, concurrents et impact financier",
    apiKeyTitle: "Comment obtenir une clé API SerpAPI ?",
    apiKeySteps: ["Créez un compte gratuit sur", "Confirmez votre email", "Allez dans Dashboard → API Key", "Copiez votre clé (100 recherches/mois gratuites)"],
    apiKeyLabel: "Votre clé API SerpAPI", apiKeyPlaceholder: "Collez votre clé API ici...", continueButton: "Continuer",
    configTitle: "Configuration de l'audit", businessInfoTitle: "Informations du prospect",
    businessName: "Nom de l'entreprise", businessNamePlaceholder: "Ex: Alsace Carreaux",
    logoLabel: "Logo (URL)", logoPlaceholder: "https://...", metierLabel: "Métier / Activité",
    metierPlaceholder: "Ex: carrelage, plombier...", panierLabel: "Panier moyen (€)", panierPlaceholder: "Ex: 500",
    margeLabel: "Marge (%)", margePlaceholder: "Ex: 15", establishmentsTitle: "Établissements à analyser",
    establishment: "Établissement", delete: "Supprimer", cityLabel: "Ville", cityPlaceholder: "Ville",
    volumeLabel: "Volume recherches/mois", addEstablishment: "+ Ajouter un établissement",
    keywordsTitle: "Mots-clés à analyser", keywordsDesc: "Variable :", keywordPlaceholder: "Ex: [métier] [ville]",
    addKeyword: "+ Ajouter un mot-clé", backButton: "Retour", launchButton: "Lancer l'analyse",
    analysisInProgress: "Analyse en cours...", analysisWait: "L'analyse peut prendre quelques minutes",
    auditBadge: "Audit SEO Local", establishments: "établissement(s)", statsEstablishments: "Établissements",
    statsAvgRating: "Note Moyenne", statsQueries: "Requêtes", statsVisible: "Visibilité",
    visibilityDiagnostic: "Diagnostic Visibilité", top3Positions: "Top 3", excellent: "Excellent",
    positions47: "Position 4-7", toImprove: "À améliorer", positions8plus: "Position 8+", critical: "Critique",
    financialImpact: "Impact Financier", annualLoss: "Perte Annuelle Estimée",
    lossDesc: "CA perdu par manque de visibilité", acquisitionPotential: "Possibilité d'Acquisition",
    acquisitionDesc: "Récupérable en 12 mois", lossDistribution: "Répartition par établissement",
    investment: "Investissement", roiEstimated: "ROI Estimé", breakeven: "Break-Even", leadsYear: "Leads/an",
    mainCompetitors: "Concurrents Principaux", detailedAnalysis: "Analyse Détaillée",
    googleRating: "Note Google", reviews: "Avis", positionsPerQuery: "Positions par Requête",
    matrixTitle: "Matrice de Positionnement", legendExcellent: "Top 3", legendToImprove: "4-7",
    legendCritical: "8+", newAudit: "Nouvel audit", exportPdf: "Exporter PDF", footer: "Propulsé avec ❤️ — V1",
    statusExcellent: "★ Leader", statusGood: "✓ Performant", statusMedium: "⚡ Potentiel",
    statusWeak: "⚠ À risque", statusUrgent: "🚨 Critique", searchPlaceholder: "Rechercher un établissement...",
  },
  it: {
    loginTitle: "Audit SEO Locale", loginSubtitle: "Accesso riservato", password: "Password",
    passwordPlaceholder: "Inserisci la password...", passwordError: "Password errata",
    accessButton: "Accedi", headerTitle: "Audit SEO Locale", headerSubtitle: "Analisi Google Maps",
    configSubtitle: "Configurazione", analysisSubtitle: "Analisi in corso...", resultsSubtitle: "Risultati",
    step1Badge: "Audit automatizzato", step1Title: "Analizza la visibilità", step1Highlight: "Google Maps",
    step1Desc: "Genera un audit completo con posizionamento, concorrenti e impatto finanziario",
    apiKeyTitle: "Come ottenere una chiave API SerpAPI?",
    apiKeySteps: ["Crea un account gratuito su", "Conferma la tua email", "Vai su Dashboard → API Key", "Copia la chiave (100 ricerche/mese gratuite)"],
    apiKeyLabel: "La tua chiave API SerpAPI", apiKeyPlaceholder: "Incolla qui la chiave API...", continueButton: "Continua",
    configTitle: "Configurazione dell'audit", businessInfoTitle: "Informazioni del prospect",
    businessName: "Nome dell'azienda", businessNamePlaceholder: "Es: Milano Piastrelle",
    logoLabel: "Logo (URL)", logoPlaceholder: "https://...", metierLabel: "Settore / Attività",
    metierPlaceholder: "Es: piastrelle, idraulico...", panierLabel: "Scontrino medio (€)", panierPlaceholder: "Es: 500",
    margeLabel: "Margine (%)", margePlaceholder: "Es: 15", establishmentsTitle: "Stabilimenti da analizzare",
    establishment: "Stabilimento", delete: "Elimina", cityLabel: "Città", cityPlaceholder: "Città",
    volumeLabel: "Volume ricerche/mese", addEstablishment: "+ Aggiungi stabilimento",
    keywordsTitle: "Parole chiave", keywordsDesc: "Variabile:", keywordPlaceholder: "Es: [métier] [ville]",
    addKeyword: "+ Aggiungi parola chiave", backButton: "Indietro", launchButton: "Avvia analisi",
    analysisInProgress: "Analisi in corso...", analysisWait: "L'analisi può richiedere alcuni minuti",
    auditBadge: "Audit SEO Locale", establishments: "stabilimento/i", statsEstablishments: "Stabilimenti",
    statsAvgRating: "Valutazione Media", statsQueries: "Query", statsVisible: "Visibilità",
    visibilityDiagnostic: "Diagnosi Visibilità", top3Positions: "Top 3", excellent: "Eccellente",
    positions47: "Posizione 4-7", toImprove: "Da migliorare", positions8plus: "Posizione 8+", critical: "Critico",
    financialImpact: "Impatto Finanziario", annualLoss: "Perdita Annuale Stimata",
    lossDesc: "Fatturato perso per scarsa visibilità", acquisitionPotential: "Possibilità di Acquisizione",
    acquisitionDesc: "Recuperabile in 12 mesi", lossDistribution: "Distribuzione per stabilimento",
    investment: "Investimento", roiEstimated: "ROI Stimato", breakeven: "Break-Even", leadsYear: "Lead/anno",
    mainCompetitors: "Concorrenti Principali", detailedAnalysis: "Analisi Dettagliata",
    googleRating: "Valutazione Google", reviews: "Recensioni", positionsPerQuery: "Posizioni per Query",
    matrixTitle: "Matrice di Posizionamento", legendExcellent: "Top 3", legendToImprove: "4-7",
    legendCritical: "8+", newAudit: "Nuovo audit", exportPdf: "Esporta PDF", footer: "Realizzato con ❤️ — V1",
    statusExcellent: "★ Leader", statusGood: "✓ Performante", statusMedium: "⚡ Potenziale",
    statusWeak: "⚠ A rischio", statusUrgent: "🚨 Critico", searchPlaceholder: "Cerca uno stabilimento...",
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSANTS VISUELS
// ═══════════════════════════════════════════════════════════════════════════════

const GlowCard = ({ children, color = '#0ea5e9', style = {}, className = '' }) => (
  <div className={className} style={{
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(14,165,233,0.1), inset 0 1px 0 rgba(255,255,255,0.8)`,
    padding: '28px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    ...style
  }}>
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
      background: `linear-gradient(90deg, ${color}, #f97316)`,
      borderRadius: '20px 20px 0 0'
    }} />
    {children}
  </div>
);

const AnimatedNumber = ({ value, suffix = '', color = '#0ea5e9' }) => {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    const num = parseFloat(value) || 0;
    const duration = 1000;
    const steps = 30;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setDisplayed(num); clearInterval(timer); }
      else { setDisplayed(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span style={{ color, fontWeight: 800 }}>{displayed}{suffix}</span>;
};

const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="url(#gradient)" strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const StatusBadge = ({ status, lang }) => {
  const t = TRANSLATIONS[lang];
  const configs = {
    excellent: { bg: 'linear-gradient(135deg, #22c55e, #16a34a)', label: t.statusExcellent },
    bon: { bg: 'linear-gradient(135deg, #0ea5e9, #0284c7)', label: t.statusGood },
    moyen: { bg: 'linear-gradient(135deg, #f97316, #ea580c)', label: t.statusMedium },
    faible: { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', label: t.statusWeak },
    critique: { bg: 'linear-gradient(135deg, #991b1b, #7f1d1d)', label: t.statusUrgent }
  };
  const config = configs[status] || configs.moyen;
  return (
    <span style={{
      padding: '8px 16px', borderRadius: '50px', fontSize: '11px', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.5px', background: config.bg, color: '#fff',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)', display: 'inline-flex', alignItems: 'center', gap: '6px'
    }}>
      {config.label}
    </span>
  );
};

const PositionBadge = ({ rank }) => {
  let bg, shadow;
  const numRank = typeof rank === 'string' && rank.startsWith('+') ? 99 : rank;
  if (rank === 'N/A' || rank === 'ERR' || rank === null) {
    bg = 'linear-gradient(135deg, #ef4444, #dc2626)'; shadow = 'rgba(239,68,68,0.4)';
  } else if (numRank <= 3) {
    bg = 'linear-gradient(135deg, #22c55e, #16a34a)'; shadow = 'rgba(34,197,94,0.4)';
  } else if (numRank <= 7) {
    bg = 'linear-gradient(135deg, #f97316, #ea580c)'; shadow = 'rgba(249,115,22,0.4)';
  } else {
    bg = 'linear-gradient(135deg, #ef4444, #dc2626)'; shadow = 'rgba(239,68,68,0.4)';
  }
  const display = rank === 'N/A' || rank === null ? 'N/A' : typeof rank === 'number' ? `#${rank}` : rank;
  return (
    <span style={{
      padding: '6px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
      fontFamily: 'monospace', background: bg, color: '#fff', boxShadow: `0 4px 15px ${shadow}`,
      minWidth: '50px', display: 'inline-block', textAlign: 'center'
    }}>
      {display}
    </span>
  );
};

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating || 0);
  const hasHalf = (rating || 0) - fullStars >= 0.5;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ 
          color: i <= fullStars ? '#f97316' : (i === fullStars + 1 && hasHalf) ? '#f97316' : '#e2e8f0',
          fontSize: '18px'
        }}>
          {i <= fullStars ? '★' : (i === fullStars + 1 && hasHalf) ? '★' : '☆'}
        </span>
      ))}
      <span style={{ marginLeft: '8px', fontWeight: 700, color: '#0f172a' }}>{rating || 'N/A'}</span>
    </div>
  );
};

const VisibilityGauge = ({ percent, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto' }}>
      <ProgressRing progress={percent} size={100} strokeWidth={10} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: '24px', fontWeight: 800, color: '#0f172a'
      }}>{percent}%</div>
    </div>
    <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{label}</div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// APPLICATION
// ═══════════════════════════════════════════════════════════════════════════════

export default function AuditSEOLocal() {
  const [lang, setLang] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessLogo, setBusinessLogo] = useState('');
  const [metier, setMetier] = useState('');
  const [panierMoyen, setPanierMoyen] = useState('');
  const [margePercent, setMargePercent] = useState('15');
  const [locations, setLocations] = useState([{ id: 1, placeId: '', name: '', city: '', lat: '', lon: '', loading: false, error: '', rating: null, reviews: null, searchVolume: 500, searchQuery: '', searchResults: [], showResults: false }]);
  const [keywords, setKeywords] = useState([]);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');

  const t = lang ? TRANSLATIONS[lang] : TRANSLATIONS.fr;

  const selectLanguage = (l) => { setLang(l); setKeywords(DEFAULT_KEYWORDS[l]); };
  const handleLogin = () => { if (passwordInput === PASSWORD) { setIsAuthenticated(true); } else { setPasswordError(true); } };

  const addLocation = () => setLocations([...locations, { id: Date.now(), placeId: '', name: '', city: '', lat: '', lon: '', loading: false, error: '', rating: null, reviews: null, searchVolume: 500, searchQuery: '', searchResults: [], showResults: false }]);
  const updateLocation = (id, field, value) => setLocations(locations.map(l => l.id === id ? { ...l, [field]: value } : l));
  const removeLocation = (id) => { if (locations.length > 1) setLocations(locations.filter(l => l.id !== id)); };

  const searchPlaces = async (locationId, query) => {
    if (!apiKey || !query || query.length < 3) return;
    setLocations(locs => locs.map(l => l.id === locationId ? { ...l, loading: true, error: '', showResults: false } : l));
    try {
      const response = await fetch('/api/serpapi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apiKey, action: 'searchPlaces', query }) });
      const data = await response.json();
      if (data.success && data.places?.length > 0) {
        setLocations(locs => locs.map(l => l.id === locationId ? { ...l, loading: false, searchResults: data.places, showResults: true } : l));
      } else {
        setLocations(locs => locs.map(l => l.id === locationId ? { ...l, loading: false, error: 'Aucun résultat', searchResults: [] } : l));
      }
    } catch (e) {
      setLocations(locs => locs.map(l => l.id === locationId ? { ...l, loading: false, error: 'Erreur de connexion' } : l));
    }
  };

  const selectPlace = (locationId, place) => {
    let city = '';
    if (place.address) {
      const parts = place.address.split(',');
      if (parts.length >= 2) city = parts[parts.length - 2].trim().replace(/\d{5}/, '').trim();
    }
    setLocations(locs => locs.map(l => l.id === locationId ? { ...l, placeId: place.placeId, name: place.name, city, lat: place.lat, lon: place.lon, rating: place.rating, reviews: place.reviews, searchQuery: place.name, searchResults: [], showResults: false } : l));
  };

  const updateKeyword = (i, v) => { const k = [...keywords]; k[i] = v; setKeywords(k); };
  const addKeyword = () => setKeywords([...keywords, '']);
  const removeKeyword = (i) => { if (keywords.length > 1) setKeywords(keywords.filter((_, idx) => idx !== i)); };
  const exportPDF = () => window.print();

  const runAnalysis = async () => {
    setStep(3); setProgress(0);
    const validLocs = locations.filter(l => l.placeId && l.lat && l.lon);
    const total = validLocs.length * keywords.length;
    let done = 0;
    const panier = parseFloat(panierMoyen) || 500;
    const marge = parseFloat(margePercent) / 100 || 0.15;

    const res = { business: businessName, logo: businessLogo, metier, panier, marge, locations: [], allCompetitors: [],
      summary: { totalLocs: validLocs.length, avgRating: 0, totalReviews: 0, top3: 0, top7: 0, invisible: 0 } };

    for (const loc of validLocs) {
      const locRes = { ...loc, rankings: [], competitors: [], status: 'moyen', top3: 0, top7: 0, invisible: 0 };
      for (const kwTpl of keywords) {
        const kw = kwTpl.replace(/\[métier\]/g, metier).replace(/\[ville\]/g, loc.city);
        setProgressText(`Analyse: "${kw}"`);
        try {
          const resp = await fetch('/api/serpapi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apiKey, action: 'searchRanking', keyword: kw, lat: loc.lat, lon: loc.lon }) });
          const data = await resp.json();
          let rank = 'N/A';
          if (data.local_results) {
            for (let i = 0; i < data.local_results.length; i++) {
              if (data.local_results[i].place_id === loc.placeId) { rank = i + 1; break; }
            }
            if (rank === 'N/A' && data.local_results.length > 0) rank = '+' + data.local_results.length;
          }
          if (data.competitors) {
            locRes.competitors = data.competitors;
            data.competitors.forEach(c => { if (!res.allCompetitors.find(x => x.placeId === c.placeId)) res.allCompetitors.push(c); });
          }
          locRes.rankings.push({ keyword: kw, rank });
          if (typeof rank === 'number') {
            if (rank <= 3) { res.summary.top3++; locRes.top3++; }
            if (rank <= 7) { res.summary.top7++; locRes.top7++; }
          } else { res.summary.invisible++; locRes.invisible++; }
        } catch { locRes.rankings.push({ keyword: kw, rank: 'ERR' }); locRes.invisible++; res.summary.invisible++; }
        done++; setProgress(Math.round((done / total) * 100));
        await new Promise(r => setTimeout(r, 1500));
      }
      const kwCount = keywords.length;
      if (locRes.top3 / kwCount >= 0.7 && locRes.rating >= 4.5) locRes.status = 'excellent';
      else if (locRes.top3 / kwCount >= 0.5) locRes.status = 'bon';
      else if (locRes.top7 / kwCount >= 0.3) locRes.status = 'moyen';
      else if (locRes.invisible / kwCount >= 0.5) locRes.status = 'critique';
      else locRes.status = 'faible';
      if (locRes.rating) res.summary.avgRating += locRes.rating;
      if (locRes.reviews) res.summary.totalReviews += locRes.reviews;
      res.locations.push(locRes);
    }

    const withRating = res.locations.filter(l => l.rating);
    if (withRating.length) res.summary.avgRating = (res.summary.avgRating / withRating.length).toFixed(1);
    const totalTests = res.summary.totalLocs * keywords.length;
    const invisRate = res.summary.invisible / totalTests;

    res.locations.forEach(loc => {
      const locInvisRate = loc.invisible / keywords.length;
      const locPoorRate = (keywords.length - loc.top7) / keywords.length;
      const vol = loc.searchVolume || 500;
      const lost = vol * 0.35 * (locInvisRate + locPoorRate * 0.5);
      loc.estimatedLoss = Math.round(lost * 12 * 0.04 * panier * marge / 1000);
    });

    const totalLoss = res.locations.reduce((s, l) => s + l.estimatedLoss, 0);
    res.financial = { totalLoss, potentialGain: Math.round(totalLoss * 0.65), roi: totalLoss > 0 ? Math.round((totalLoss * 0.65 / 15) * 100) : 0, breakeven: '2-3 ' + (lang === 'it' ? 'mesi' : 'mois'), leadsPerYear: Math.round(totalLoss * 0.65 / (panier * marge) * 1000), investmentRange: '10-20K' };
    res.summary.invisiblePercent = Math.round(invisRate * 100);
    res.summary.visiblePercent = 100 - res.summary.invisiblePercent;

    const compCounts = {};
    res.allCompetitors.forEach(c => { compCounts[c.placeId] = compCounts[c.placeId] ? { ...compCounts[c.placeId], count: compCounts[c.placeId].count + 1 } : { ...c, count: 1 }; });
    res.topCompetitors = Object.values(compCounts).sort((a, b) => b.count - a.count).slice(0, 5);

    setResults(res); setStep(4);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════════════════════════════════════

  const baseStyles = {
    app: { minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)', color: '#0f172a', fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif" },
    header: { background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', boxShadow: '0 4px 20px rgba(3,105,161,0.3)' },
    container: { maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 80px' },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.3s ease' },
    btnPrimary: { background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: '#fff', boxShadow: '0 4px 20px rgba(14,165,233,0.4)' },
    btnSecondary: { background: '#fff', color: '#0369a1', border: '2px solid #0ea5e9', boxShadow: '0 4px 15px rgba(14,165,233,0.15)' },
    input: { width: '100%', padding: '16px 20px', background: '#fff', border: '2px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '15px', transition: 'all 0.3s ease', outline: 'none' },
    label: { display: 'block', fontSize: '12px', fontWeight: 700, color: '#0369a1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' },
    footer: { textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '14px' }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SÉLECTION LANGUE
  // ═══════════════════════════════════════════════════════════════════════════

  if (!lang) {
    return (
      <div style={baseStyles.app}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <GlowCard style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '50px' }}>
            <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #0ea5e9, #f97316)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', margin: '0 auto 30px', boxShadow: '0 20px 40px rgba(14,165,233,0.3)', transform: 'rotate(-5deg)' }}>🌍</div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Audit SEO Local</h1>
            <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '16px' }}>Choisissez votre langue / Scegli la tua lingua</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <button onClick={() => selectLanguage('fr')} style={{ ...baseStyles.btn, ...baseStyles.btnPrimary, padding: '24px', flexDirection: 'column', gap: '12px', borderRadius: '16px' }}>
                <span style={{ fontSize: '48px' }}>🇫🇷</span>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>Français</span>
              </button>
              <button onClick={() => selectLanguage('it')} style={{ ...baseStyles.btn, ...baseStyles.btnPrimary, padding: '24px', flexDirection: 'column', gap: '12px', borderRadius: '16px' }}>
                <span style={{ fontSize: '48px' }}>🇮🇹</span>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>Italiano</span>
              </button>
            </div>
          </GlowCard>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN
  // ═══════════════════════════════════════════════════════════════════════════

  if (!isAuthenticated) {
    return (
      <div style={baseStyles.app}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <GlowCard style={{ maxWidth: '440px', width: '100%', textAlign: 'center', padding: '50px' }}>
            <div style={{ width: '90px', height: '90px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', margin: '0 auto 30px', boxShadow: '0 20px 40px rgba(14,165,233,0.3)' }}>🔐</div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: '#0f172a' }}>{t.loginTitle}</h1>
            <p style={{ color: '#64748b', marginBottom: '32px' }}>{t.loginSubtitle}</p>
            <div style={{ marginBottom: '24px', textAlign: 'left' }}>
              <label style={baseStyles.label}>{t.password}</label>
              <input type="password" style={{ ...baseStyles.input, borderColor: passwordError ? '#ef4444' : '#e2e8f0' }} placeholder={t.passwordPlaceholder} value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} onFocus={(e) => e.target.style.borderColor = '#0ea5e9'} onBlur={(e) => e.target.style.borderColor = passwordError ? '#ef4444' : '#e2e8f0'} />
              {passwordError && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>❌ {t.passwordError}</p>}
            </div>
            <button style={{ ...baseStyles.btn, ...baseStyles.btnPrimary, width: '100%', padding: '18px' }} onClick={handleLogin}>{t.accessButton} →</button>
            <p style={{ marginTop: '30px', color: '#94a3b8', fontSize: '13px' }}>{t.footer}</p>
          </GlowCard>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 1 - API KEY
  // ═══════════════════════════════════════════════════════════════════════════

  if (step === 1) {
    return (
      <div style={baseStyles.app}>
        <header style={baseStyles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📊</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{t.headerTitle}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{t.headerSubtitle}</div>
            </div>
          </div>
          <span style={{ fontSize: '24px' }}>{lang === 'fr' ? '🇫🇷' : '🇮🇹'}</span>
        </header>

        <div style={baseStyles.container}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(249,115,22,0.1))', border: '2px solid rgba(14,165,233,0.3)', borderRadius: '100px', fontSize: '13px', fontWeight: 700, color: '#0369a1', marginBottom: '24px' }}>
              <span style={{ fontSize: '18px' }}>⚡</span> {t.step1Badge}
            </div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>
              {t.step1Title}<br />
              <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.step1Highlight}</span>
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>{t.step1Desc}</p>
          </div>

          <GlowCard style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(249,115,22,0.08))', borderRadius: '16px', padding: '24px', marginBottom: '28px', border: '1px solid rgba(14,165,233,0.2)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#0369a1' }}>🔑 {t.apiKeyTitle}</h3>
              <ol style={{ fontSize: '14px', color: '#64748b', lineHeight: 2, paddingLeft: '20px', margin: 0 }}>
                <li>{t.apiKeySteps[0]} <a href="https://serpapi.com/users/sign_up" target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', fontWeight: 600 }}>serpapi.com</a></li>
                <li>{t.apiKeySteps[1]}</li>
                <li>{t.apiKeySteps[2]}</li>
                <li>{t.apiKeySteps[3]}</li>
              </ol>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={baseStyles.label}>{t.apiKeyLabel}</label>
              <input type="password" style={baseStyles.input} placeholder={t.apiKeyPlaceholder} value={apiKey} onChange={(e) => setApiKey(e.target.value)} onFocus={(e) => e.target.style.borderColor = '#0ea5e9'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
            </div>
            <button style={{ ...baseStyles.btn, ...baseStyles.btnPrimary, width: '100%', padding: '18px', fontSize: '16px' }} onClick={() => apiKey && setStep(2)}>{t.continueButton} →</button>
          </GlowCard>

          <p style={baseStyles.footer}>{t.footer}</p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 2 - CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════════

  if (step === 2) {
    return (
      <div style={baseStyles.app}>
        <header style={baseStyles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📊</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{t.headerTitle}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{t.configSubtitle}</div>
            </div>
          </div>
        </header>

        <div style={baseStyles.container}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>{t.configTitle}</h2>

          <GlowCard style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏢</span>
              {t.businessInfoTitle}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={baseStyles.label}>{t.businessName}</label>
                <input style={baseStyles.input} placeholder={t.businessNamePlaceholder} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div>
                <label style={baseStyles.label}>{t.logoLabel}</label>
                <input style={baseStyles.input} placeholder={t.logoPlaceholder} value={businessLogo} onChange={(e) => setBusinessLogo(e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <label style={baseStyles.label}>{t.metierLabel}</label>
                <input style={baseStyles.input} placeholder={t.metierPlaceholder} value={metier} onChange={(e) => setMetier(e.target.value)} />
              </div>
              <div>
                <label style={baseStyles.label}>{t.panierLabel}</label>
                <input style={baseStyles.input} type="number" placeholder={t.panierPlaceholder} value={panierMoyen} onChange={(e) => setPanierMoyen(e.target.value)} />
              </div>
              <div>
                <label style={baseStyles.label}>{t.margeLabel}</label>
                <input style={baseStyles.input} type="number" placeholder={t.margePlaceholder} value={margePercent} onChange={(e) => setMargePercent(e.target.value)} />
              </div>
            </div>
          </GlowCard>

          <GlowCard style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #f97316, #ea580c)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📍</span>
              {t.establishmentsTitle}
            </h3>

            {locations.map((loc, i) => (
              <div key={loc.id} style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '16px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#fff' }}>{i + 1}</span>
                    {t.establishment}
                  </span>
                  {locations.length > 1 && <button onClick={() => removeLocation(loc.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#ef4444', padding: '8px 16px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s ease' }}>{t.delete}</button>}
                </div>

                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input style={{ ...baseStyles.input, flex: 1 }} placeholder={t.searchPlaceholder} value={loc.searchQuery} onChange={(e) => updateLocation(loc.id, 'searchQuery', e.target.value)} onKeyPress={(e) => e.key === 'Enter' && searchPlaces(loc.id, loc.searchQuery)} />
                    <button onClick={() => searchPlaces(loc.id, loc.searchQuery)} disabled={loc.loading} style={{ ...baseStyles.btn, ...baseStyles.btnPrimary, padding: '16px 24px', opacity: loc.loading ? 0.7 : 1 }}>{loc.loading ? '⏳' : '🔍'}</button>
                  </div>

                  {loc.showResults && loc.searchResults.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '2px solid #e2e8f0', borderRadius: '16px', marginTop: '8px', maxHeight: '300px', overflowY: 'auto', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                      {loc.searchResults.map((place, idx) => (
                        <div key={idx} onClick={() => selectPlace(loc.id, place)} style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(14,165,233,0.05)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                          <div style={{ fontWeight: 700, marginBottom: '4px', color: '#0f172a' }}>{place.name}</div>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>{place.address}</div>
                          {place.rating && <div style={{ marginTop: '6px' }}><RatingStars rating={place.rating} /></div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {loc.error && <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)' }}>❌ {loc.error}</div>}

                {loc.name && (
                  <div style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(22,163,74,0.05))', border: '2px solid rgba(34,197,94,0.3)', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a', marginBottom: '4px' }}>✅ {loc.name}</div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>{loc.city}</div>
                      </div>
                      {loc.rating && <RatingStars rating={loc.rating} />}
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ ...baseStyles.label, fontSize: '11px' }}>{t.cityLabel}</label>
                    <input style={baseStyles.input} placeholder={t.cityPlaceholder} value={loc.city} onChange={(e) => updateLocation(loc.id, 'city', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ ...baseStyles.label, fontSize: '11px' }}>{t.volumeLabel}</label>
                    <input style={baseStyles.input} type="number" placeholder="500" value={loc.searchVolume} onChange={(e) => updateLocation(loc.id, 'searchVolume', parseInt(e.target.value) || 500)} />
                  </div>
                </div>
              </div>
            ))}

            <button onClick={addLocation} style={{ width: '100%', padding: '18px', background: '#fff', border: '2px dashed #0ea5e9', borderRadius: '14px', color: '#0ea5e9', cursor: 'pointer', fontSize: '15px', fontWeight: 700, transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.target.style.background = 'rgba(14,165,233,0.05)'; e.target.style.borderStyle = 'solid'; }} onMouseOut={(e) => { e.target.style.background = '#fff'; e.target.style.borderStyle = 'dashed'; }}>{t.addEstablishment}</button>
          </GlowCard>

          <GlowCard style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🔍</span>
              {t.keywordsTitle}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>{t.keywordsDesc} <code style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, color: '#0369a1' }}>[métier]</code></p>
            
            {keywords.map((kw, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <input style={{ ...baseStyles.input, flex: 1 }} value={kw} onChange={(e) => updateKeyword(i, e.target.value)} placeholder={t.keywordPlaceholder} />
                {keywords.length > 1 && <button onClick={() => removeKeyword(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)', borderRadius: '12px', color: '#ef4444', padding: '0 18px', cursor: 'pointer', fontSize: '20px', fontWeight: 700 }}>×</button>}
              </div>
            ))}
            
            <button onClick={addKeyword} style={{ marginTop: '12px', padding: '14px 24px', background: '#fff', border: '2px dashed #22c55e', borderRadius: '12px', color: '#22c55e', cursor: 'pointer', fontWeight: 700, transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.target.style.background = 'rgba(34,197,94,0.05)'; e.target.style.borderStyle = 'solid'; }} onMouseOut={(e) => { e.target.style.background = '#fff'; e.target.style.borderStyle = 'dashed'; }}>{t.addKeyword}</button>
          </GlowCard>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ ...baseStyles.btn, ...baseStyles.btnSecondary }} onClick={() => setStep(1)}>← {t.backButton}</button>
            <button style={{ ...baseStyles.btn, ...baseStyles.btnPrimary, padding: '18px 40px', fontSize: '16px', opacity: (!businessName || !metier || locations.every(l => !l.placeId)) ? 0.5 : 1 }} onClick={runAnalysis} disabled={!businessName || !metier || locations.every(l => !l.placeId)}>🚀 {t.launchButton}</button>
          </div>

          <p style={baseStyles.footer}>{t.footer}</p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 3 - CHARGEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  if (step === 3) {
    return (
      <div style={baseStyles.app}>
        <header style={baseStyles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📊</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{t.headerTitle}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{t.analysisSubtitle}</div>
            </div>
          </div>
        </header>

        <div style={baseStyles.container}>
          <GlowCard style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', padding: '60px' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 40px' }}>
              <ProgressRing progress={progress} size={160} strokeWidth={12} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '42px', fontWeight: 800, background: 'linear-gradient(135deg, #0ea5e9, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{progress}%</div>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{t.analysisInProgress}</h3>
            <p style={{ fontSize: '15px', color: '#64748b', minHeight: '50px' }}>{progressText}</p>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '24px' }}>☕ {t.analysisWait}</p>
          </GlowCard>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 4 - RÉSULTATS
  // ═══════════════════════════════════════════════════════════════════════════

  if (step === 4 && results) {
    return (
      <div style={baseStyles.app}>
        <style>{`@media print { .no-print { display: none !important; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`}</style>
        
        <header style={baseStyles.header} className="no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {results.logo && <img src={results.logo} alt="" style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }} />}
            <div>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{t.headerTitle}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{results.business}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ ...baseStyles.btn, background: 'rgba(255,255,255,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)' }} onClick={() => { setStep(2); setResults(null); }}>← {t.newAudit}</button>
            <button style={{ ...baseStyles.btn, ...baseStyles.btnPrimary }} onClick={exportPDF}>📄 {t.exportPdf}</button>
          </div>
        </header>

        <div style={baseStyles.container}>
          {/* EN-TÊTE */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 28px', background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(249,115,22,0.1))', border: '2px solid rgba(14,165,233,0.3)', borderRadius: '100px', fontSize: '14px', fontWeight: 700, color: '#0369a1', marginBottom: '28px' }}>
              📊 {t.auditBadge} — 2025
            </div>
            {results.logo && <div style={{ marginBottom: '24px' }}><img src={results.logo} alt="" style={{ width: '140px', height: '140px', borderRadius: '28px', objectFit: 'contain', background: '#fff', padding: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }} /></div>}
            <h2 style={{ fontSize: '52px', fontWeight: 800, marginBottom: '16px', background: 'linear-gradient(135deg, #0369a1, #0ea5e9, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{results.business}</h2>
            <p style={{ color: '#64748b', fontSize: '20px' }}>{results.metier} — {results.summary.totalLocs} {t.establishments}</p>
          </div>

          {/* STATS PRINCIPALES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {[
              { value: results.summary.totalLocs, label: t.statsEstablishments, color: '#0ea5e9', icon: '🏢' },
              { value: results.summary.avgRating || 'N/A', label: t.statsAvgRating, color: '#f97316', icon: '⭐' },
              { value: results.summary.totalLocs * keywords.length, label: t.statsQueries, color: '#22c55e', icon: '🔍' },
              { value: `${results.summary.visiblePercent}%`, label: t.statsVisible, color: '#8b5cf6', icon: '👁️' },
            ].map((stat, i) => (
              <GlowCard key={i} color={stat.color} style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{stat.icon}</div>
                <div style={{ fontSize: '42px', fontWeight: 800, marginBottom: '8px' }}><AnimatedNumber value={stat.value} color={stat.color} /></div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </GlowCard>
            ))}
          </div>

          {/* DIAGNOSTIC VISIBILITÉ */}
          <GlowCard style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '8px', height: '32px', background: 'linear-gradient(180deg, #0ea5e9, #f97316)', borderRadius: '4px' }} />
              {t.visibilityDiagnostic}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              <VisibilityGauge percent={results.summary.visiblePercent} label="Visibilité Globale" />
              <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(22,163,74,0.05))', borderRadius: '16px', border: '2px solid rgba(34,197,94,0.2)' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: '#22c55e' }}>{results.summary.top3}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{t.top3Positions}</div>
                <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '6px', fontWeight: 700 }}>🟢 {t.excellent}</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.05))', borderRadius: '16px', border: '2px solid rgba(249,115,22,0.2)' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: '#f97316' }}>{results.summary.top7 - results.summary.top3}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{t.positions47}</div>
                <div style={{ fontSize: '12px', color: '#f97316', marginTop: '6px', fontWeight: 700 }}>🟠 {t.toImprove}</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(220,38,38,0.05))', borderRadius: '16px', border: '2px solid rgba(239,68,68,0.2)' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: '#ef4444' }}>{results.summary.totalLocs * keywords.length - results.summary.top7}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{t.positions8plus}</div>
                <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', fontWeight: 700 }}>🔴 {t.critical}</div>
              </div>
            </div>
          </GlowCard>

          {/* IMPACT FINANCIER */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '8px', height: '32px', background: 'linear-gradient(180deg, #0ea5e9, #f97316)', borderRadius: '4px' }} />
            {t.financialImpact}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <GlowCard color="#ef4444" style={{ borderLeft: '6px solid #ef4444' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{t.annualLoss}</div>
              <div style={{ fontSize: '56px', fontWeight: 800, color: '#ef4444', marginBottom: '12px' }}>-{results.financial.totalLoss}K€</div>
              <div style={{ fontSize: '15px', color: '#64748b' }}>{t.lossDesc}</div>
            </GlowCard>
            <GlowCard color="#22c55e" style={{ borderLeft: '6px solid #22c55e' }}>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{t.acquisitionPotential}</div>
              <div style={{ fontSize: '56px', fontWeight: 800, color: '#22c55e', marginBottom: '12px' }}>+{results.financial.potentialGain}K€</div>
              <div style={{ fontSize: '15px', color: '#64748b' }}>{t.acquisitionDesc}</div>
            </GlowCard>
          </div>

          {/* RÉPARTITION */}
          <GlowCard style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ef4444', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>📊 {t.lossDistribution}</h4>
            {results.locations.sort((a, b) => b.estimatedLoss - a.estimatedLoss).map((loc, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontWeight: 700, fontSize: '16px' }}>{loc.city}</span>
                  <StatusBadge status={loc.status} lang={lang} />
                </div>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>-{loc.estimatedLoss}K€</span>
              </div>
            ))}
          </GlowCard>

          {/* ROI */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {[
              { value: results.financial.investmentRange + '€', label: t.investment, color: '#0ea5e9' },
              { value: results.financial.roi + '%', label: t.roiEstimated, color: '#22c55e' },
              { value: results.financial.breakeven, label: t.breakeven, color: '#f97316' },
              { value: '+' + results.financial.leadsPerYear, label: t.leadsYear, color: '#8b5cf6' },
            ].map((m, i) => (
              <GlowCard key={i} color={m.color} style={{ textAlign: 'center', padding: '28px' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: m.color, marginBottom: '8px' }}>{m.value}</div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{m.label}</div>
              </GlowCard>
            ))}
          </div>

          {/* CONCURRENTS */}
          {results.topCompetitors?.length > 0 && (
            <GlowCard style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>🏆 {t.mainCompetitors}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {results.topCompetitors.map((comp, i) => (
                  <div key={i} style={{ padding: '20px', background: '#f8fafc', borderRadius: '14px', textAlign: 'center', border: '2px solid #e2e8f0' }}>
                    <div style={{ width: '48px', height: '48px', background: i === 0 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : i === 1 ? 'linear-gradient(135deg, #9ca3af, #6b7280)' : i === 2 ? 'linear-gradient(135deg, #d97706, #b45309)' : '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', color: i < 3 ? '#fff' : '#64748b', margin: '0 auto 12px', boxShadow: i < 3 ? '0 8px 20px rgba(0,0,0,0.2)' : 'none' }}>{i + 1}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{comp.name}</div>
                    {comp.rating && <div style={{ fontSize: '13px', color: '#f97316' }}>⭐ {comp.rating}</div>}
                  </div>
                ))}
              </div>
            </GlowCard>
          )}

          {/* DÉTAIL PAR ÉTABLISSEMENT */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '8px', height: '32px', background: 'linear-gradient(180deg, #0ea5e9, #f97316)', borderRadius: '4px' }} />
            {t.detailedAnalysis}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {results.locations.map((loc, i) => (
              <GlowCard key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>{loc.city}</div>
                  </div>
                  <StatusBadge status={loc.status} lang={lang} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ textAlign: 'center', padding: '20px', background: loc.rating >= 4.5 ? 'rgba(34,197,94,0.1)' : loc.rating >= 4.1 ? 'rgba(249,115,22,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: '14px', border: `2px solid ${loc.rating >= 4.5 ? 'rgba(34,197,94,0.3)' : loc.rating >= 4.1 ? 'rgba(249,115,22,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: loc.rating >= 4.5 ? '#22c55e' : loc.rating >= 4.1 ? '#f97316' : '#ef4444' }}>{loc.rating || 'N/A'}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{t.googleRating}</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '14px', border: '2px solid #e2e8f0' }}>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: '#0ea5e9' }}>{loc.reviews || 'N/A'}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{t.reviews}</div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>{t.positionsPerQuery}</div>
                {loc.rankings.map((r, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', marginBottom: '10px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>{r.keyword}</span>
                    <PositionBadge rank={r.rank} />
                  </div>
                ))}
              </GlowCard>
            ))}
          </div>

          {/* MATRICE */}
          <GlowCard style={{ overflowX: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>{t.matrixTitle}</h3>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '16px', background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: '#fff', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'left', borderRadius: '12px 0 0 12px' }}>Requête</th>
                  {results.locations.map((loc, i) => (
                    <th key={i} style={{ padding: '16px', background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: '#fff', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', borderRadius: i === results.locations.length - 1 ? '0 12px 12px 0' : 0 }}>{loc.city}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw, ki) => (
                  <tr key={ki}>
                    <td style={{ padding: '16px', background: '#f8fafc', fontSize: '14px', fontFamily: 'monospace', borderRadius: '12px 0 0 12px', border: '1px solid #e2e8f0', borderRight: 'none' }}>{kw}</td>
                    {results.locations.map((loc, li) => (
                      <td key={li} style={{ padding: '16px', background: '#f8fafc', textAlign: 'center', borderRadius: li === results.locations.length - 1 ? '0 12px 12px 0' : 0, border: '1px solid #e2e8f0', borderLeft: 'none', borderRight: li === results.locations.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                        <PositionBadge rank={loc.rankings[ki]?.rank} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '28px' }}>
              {[
                { color: '#22c55e', label: `#1-3 — ${t.legendExcellent}` },
                { color: '#f97316', label: `#4-7 — ${t.legendToImprove}` },
                { color: '#ef4444', label: `#8+ — ${t.legendCritical}` },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: l.color, boxShadow: `0 4px 10px ${l.color}40` }} />
                  {l.label}
                </div>
              ))}
            </div>
          </GlowCard>

          <p style={baseStyles.footer}>{t.footer}</p>
        </div>
      </div>
    );
  }

  return null;
}
