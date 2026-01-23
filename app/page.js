"use client";
import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const PASSWORD = "Test2026_V1";

const DEFAULT_KEYWORDS = {
  fr: [
    '[métier] [ville]',
    'meilleur [métier] [ville]',
    '[métier] près de [ville]',
    'avis [métier] [ville]',
  ],
  it: [
    '[métier] [ville]',
    'miglior [métier] [ville]',
    '[métier] vicino a [ville]',
    'recensioni [métier] [ville]',
  ]
};

// Traductions
const TRANSLATIONS = {
  fr: {
    // Login
    loginTitle: "Audit SEO Local",
    loginSubtitle: "Accès restreint",
    password: "Mot de passe",
    passwordPlaceholder: "Entrez le mot de passe...",
    passwordError: "Mot de passe incorrect",
    accessButton: "Accéder à l'outil →",
    
    // Header
    headerTitle: "Audit SEO Local",
    headerSubtitle: "Analyse Google Maps",
    configSubtitle: "Configuration",
    analysisSubtitle: "Analyse en cours...",
    resultsSubtitle: "Résultats",
    
    // Step 1
    step1Badge: "Audit automatisé",
    step1Title: "Analysez la visibilité",
    step1Highlight: "Google Maps",
    step1Desc: "Générez un audit complet avec analyse de la fiche, positionnement, concurrents et impact financier",
    apiKeyTitle: "Comment obtenir une clé API SerpAPI ?",
    apiKeySteps: [
      "Créez un compte gratuit sur",
      "Confirmez votre email",
      "Allez dans Dashboard → API Key",
      "Copiez votre clé (100 recherches/mois gratuites)"
    ],
    apiKeyLabel: "Votre clé API SerpAPI",
    apiKeyPlaceholder: "Collez votre clé API ici...",
    continueButton: "Continuer →",
    
    // Step 2
    configTitle: "Configuration de l'audit",
    businessInfoTitle: "Informations du prospect",
    businessName: "Nom de l'entreprise",
    businessNamePlaceholder: "Ex: Alsace Carreaux",
    logoLabel: "Logo (URL)",
    logoPlaceholder: "https://...",
    metierLabel: "Métier / Activité",
    metierPlaceholder: "Ex: carrelage, plombier...",
    panierLabel: "Panier moyen (€)",
    panierPlaceholder: "Ex: 500",
    margeLabel: "Marge (%)",
    margePlaceholder: "Ex: 15",
    
    establishmentsTitle: "Établissements à analyser",
    autoMessage: "Automatique : Entrez le Place ID → on récupère tout (nom, ville, note, photos, etc.)",
    placeIdTitle: "Comment trouver un Place ID ?",
    placeIdDesc: "Allez sur",
    placeIdLink: "Place ID Finder Google",
    placeIdDesc2: "→ cherchez l'établissement → copiez l'ID",
    establishment: "Établissement",
    delete: "Supprimer",
    placeIdPlaceholder: "Place ID (ex: ChIJN1t_tDeuEmsRUsoyG83frY4)",
    fetchButton: "Récupérer",
    cityLabel: "Ville (pour mots-clés)",
    cityPlaceholder: "Ville",
    volumeLabel: "Volume recherches/mois",
    coordsLabel: "Coordonnées",
    addEstablishment: "+ Ajouter un établissement",
    
    keywordsTitle: "Mots-clés à analyser",
    keywordsDesc: "Variable :",
    keywordPlaceholder: "Ex: [métier] [ville]",
    addKeyword: "+ Ajouter un mot-clé",
    
    backButton: "← Retour",
    launchButton: "🚀 Lancer l'analyse",
    
    // Step 3
    analysisInProgress: "Analyse en cours...",
    analysisWait: "L'analyse peut prendre quelques minutes",
    
    // Step 4
    auditBadge: "Audit SEO Local",
    establishments: "établissement(s)",
    
    statsEstablishments: "Établissements",
    statsAvgRating: "Note Moyenne",
    statsQueries: "Requêtes Testées",
    statsScore: "Score Fiche",
    
    visibilityDiagnostic: "Diagnostic Visibilité",
    top3Positions: "Positions Top 3",
    excellent: "Excellent",
    positions47: "Positions 4-7",
    toImprove: "À améliorer",
    positions8plus: "Positions 8+ / Invisible",
    critical: "Critique",
    
    financialImpact: "Impact Financier et ROI",
    annualLoss: "Perte Annuelle Estimée",
    lossDesc: "Chiffre d'affaires perdu par manque de visibilité",
    acquisitionPotential: "Possibilité d'Acquisition",
    acquisitionDesc: "65% du CA perdu récupérable en 12 mois",
    
    lossDistribution: "Répartition des pertes par établissement",
    investment: "Investissement",
    roiEstimated: "ROI Estimé",
    breakeven: "Break-Even",
    leadsYear: "Leads/an",
    
    mainCompetitors: "Principaux Concurrents",
    detailedAnalysis: "Analyse Détaillée par Établissement",
    googleRating: "Note Google",
    reviews: "Avis",
    auditTitle: "Audit de la Fiche Google",
    photos: "Photos",
    description: "Description",
    hours: "Horaires",
    website: "Site web",
    phone: "Téléphone",
    services: "Services",
    positionsPerQuery: "Positions par Requête",
    
    matrixTitle: "Matrice de Positionnement par Requête",
    legendExcellent: "Excellent",
    legendToImprove: "À améliorer",
    legendCritical: "Critique",
    
    newAudit: "← Nouvel audit",
    exportPdf: "📄 Exporter en PDF",
    
    footer: "Propulsé avec ❤️ — V1",
    
    // Status
    statusExcellent: "★ Excellent",
    statusGood: "✓ Bon",
    statusMedium: "⚡ À améliorer",
    statusWeak: "⚠️ Critique",
    statusUrgent: "🚨 Urgent",
  },
  it: {
    // Login
    loginTitle: "Audit SEO Locale",
    loginSubtitle: "Accesso riservato",
    password: "Password",
    passwordPlaceholder: "Inserisci la password...",
    passwordError: "Password errata",
    accessButton: "Accedi allo strumento →",
    
    // Header
    headerTitle: "Audit SEO Locale",
    headerSubtitle: "Analisi Google Maps",
    configSubtitle: "Configurazione",
    analysisSubtitle: "Analisi in corso...",
    resultsSubtitle: "Risultati",
    
    // Step 1
    step1Badge: "Audit automatizzato",
    step1Title: "Analizza la visibilità",
    step1Highlight: "Google Maps",
    step1Desc: "Genera un audit completo con analisi della scheda, posizionamento, concorrenti e impatto finanziario",
    apiKeyTitle: "Come ottenere una chiave API SerpAPI?",
    apiKeySteps: [
      "Crea un account gratuito su",
      "Conferma la tua email",
      "Vai su Dashboard → API Key",
      "Copia la tua chiave (100 ricerche/mese gratuite)"
    ],
    apiKeyLabel: "La tua chiave API SerpAPI",
    apiKeyPlaceholder: "Incolla qui la tua chiave API...",
    continueButton: "Continua →",
    
    // Step 2
    configTitle: "Configurazione dell'audit",
    businessInfoTitle: "Informazioni del prospect",
    businessName: "Nome dell'azienda",
    businessNamePlaceholder: "Es: Milano Piastrelle",
    logoLabel: "Logo (URL)",
    logoPlaceholder: "https://...",
    metierLabel: "Settore / Attività",
    metierPlaceholder: "Es: piastrelle, idraulico...",
    panierLabel: "Scontrino medio (€)",
    panierPlaceholder: "Es: 500",
    margeLabel: "Margine (%)",
    margePlaceholder: "Es: 15",
    
    establishmentsTitle: "Stabilimenti da analizzare",
    autoMessage: "Automatico: Inserisci il Place ID → recuperiamo tutto (nome, città, valutazione, foto, ecc.)",
    placeIdTitle: "Come trovare un Place ID?",
    placeIdDesc: "Vai su",
    placeIdLink: "Place ID Finder Google",
    placeIdDesc2: "→ cerca lo stabilimento → copia l'ID",
    establishment: "Stabilimento",
    delete: "Elimina",
    placeIdPlaceholder: "Place ID (es: ChIJN1t_tDeuEmsRUsoyG83frY4)",
    fetchButton: "Recupera",
    cityLabel: "Città (per parole chiave)",
    cityPlaceholder: "Città",
    volumeLabel: "Volume ricerche/mese",
    coordsLabel: "Coordinate",
    addEstablishment: "+ Aggiungi uno stabilimento",
    
    keywordsTitle: "Parole chiave da analizzare",
    keywordsDesc: "Variabile:",
    keywordPlaceholder: "Es: [métier] [ville]",
    addKeyword: "+ Aggiungi una parola chiave",
    
    backButton: "← Indietro",
    launchButton: "🚀 Avvia l'analisi",
    
    // Step 3
    analysisInProgress: "Analisi in corso...",
    analysisWait: "L'analisi può richiedere alcuni minuti",
    
    // Step 4
    auditBadge: "Audit SEO Locale",
    establishments: "stabilimento/i",
    
    statsEstablishments: "Stabilimenti",
    statsAvgRating: "Valutazione Media",
    statsQueries: "Query Testate",
    statsScore: "Punteggio Scheda",
    
    visibilityDiagnostic: "Diagnosi Visibilità",
    top3Positions: "Posizioni Top 3",
    excellent: "Eccellente",
    positions47: "Posizioni 4-7",
    toImprove: "Da migliorare",
    positions8plus: "Posizioni 8+ / Invisibile",
    critical: "Critico",
    
    financialImpact: "Impatto Finanziario e ROI",
    annualLoss: "Perdita Annuale Stimata",
    lossDesc: "Fatturato perso per mancanza di visibilità",
    acquisitionPotential: "Possibilità di Acquisizione",
    acquisitionDesc: "65% del fatturato perso recuperabile in 12 mesi",
    
    lossDistribution: "Distribuzione delle perdite per stabilimento",
    investment: "Investimento",
    roiEstimated: "ROI Stimato",
    breakeven: "Break-Even",
    leadsYear: "Lead/anno",
    
    mainCompetitors: "Principali Concorrenti",
    detailedAnalysis: "Analisi Dettagliata per Stabilimento",
    googleRating: "Valutazione Google",
    reviews: "Recensioni",
    auditTitle: "Audit della Scheda Google",
    photos: "Foto",
    description: "Descrizione",
    hours: "Orari",
    website: "Sito web",
    phone: "Telefono",
    services: "Servizi",
    positionsPerQuery: "Posizioni per Query",
    
    matrixTitle: "Matrice di Posizionamento per Query",
    legendExcellent: "Eccellente",
    legendToImprove: "Da migliorare",
    legendCritical: "Critico",
    
    newAudit: "← Nuovo audit",
    exportPdf: "📄 Esporta in PDF",
    
    footer: "Realizzato con ❤️ — V1",
    
    // Status
    statusExcellent: "★ Eccellente",
    statusGood: "✓ Buono",
    statusMedium: "⚡ Da migliorare",
    statusWeak: "⚠️ Critico",
    statusUrgent: "🚨 Urgente",
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSANTS
// ═══════════════════════════════════════════════════════════════════════════════

const StatusBadge = ({ status, lang }) => {
  const t = TRANSLATIONS[lang];
  const config = {
    excellent: { bg: '#22c55e', color: '#000', label: t.statusExcellent },
    bon: { bg: '#22c55e', color: '#000', label: t.statusGood },
    moyen: { bg: '#f59e0b', color: '#000', label: t.statusMedium },
    faible: { bg: '#ef4444', color: '#0f172a', label: t.statusWeak },
    critique: { bg: '#7f1d1d', color: '#fca5a5', label: t.statusUrgent }
  }[status] || { bg: '#6b7280', color: '#0f172a', label: status };
  
  return (
    <span style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', background: config.bg, color: config.color }}>
      {config.label}
    </span>
  );
};

const PositionBadge = ({ rank }) => {
  let bg, color;
  const numRank = typeof rank === 'string' && rank.startsWith('+') ? parseInt(rank.substring(1)) + 1 : rank;
  
  if (rank === 'N/A' || rank === 'ERR' || rank === null || rank === undefined) {
    bg = '#ef4444'; color = '#fff';
  } else if (typeof numRank === 'number' && numRank >= 1 && numRank <= 3) {
    bg = '#22c55e'; color = '#000';
  } else if (typeof numRank === 'number' && numRank >= 4 && numRank <= 7) {
    bg = '#f59e0b'; color = '#000';
  } else {
    bg = '#ef4444'; color = '#fff';
  }
  
  let display;
  if (rank === 'N/A' || rank === null || rank === undefined) {
    display = 'N/A';
  } else if (typeof rank === 'string' && rank.startsWith('+')) {
    display = rank; // Affiche "+20" par exemple
  } else if (typeof rank === 'number') {
    display = `#${rank}`;
  } else {
    display = rank;
  }
  
  return (
    <span style={{ padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, fontFamily: 'monospace', background: bg, color: color, minWidth: '44px', display: 'inline-block', textAlign: 'center' }}>
      {display}
    </span>
  );
};

const RatingBadge = ({ rating }) => {
  let bg, color;
  if (!rating || rating === 'N/A') { bg = '#6b7280'; color = '#fff'; }
  else if (rating >= 4.5) { bg = '#22c55e'; color = '#000'; }
  else if (rating >= 4.1) { bg = '#f59e0b'; color = '#000'; }
  else { bg = '#ef4444'; color = '#fff'; }
  return (
    <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '14px', fontWeight: 700, background: bg, color: color }}>
      ⭐ {rating || 'N/A'}
    </span>
  );
};

const AuditCheck = ({ ok, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: ok ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${ok ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, borderRadius: '8px' }}>
    <span style={{ fontSize: '18px' }}>{ok ? '✅' : '❌'}</span>
    <span style={{ fontSize: '13px', color: ok ? '#22c55e' : '#ef4444' }}>{label}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// APPLICATION PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════

export default function AuditSEOLocalV2() {
  const [lang, setLang] = useState(null); // null = pas encore choisi
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
  const [locations, setLocations] = useState([{ id: 1, placeId: '', name: '', city: '', lat: '', lon: '', loading: false, error: '', rating: null, reviews: null, audit: null, searchVolume: 500, searchQuery: '', searchResults: [], showResults: false }]);
  const [keywords, setKeywords] = useState([]);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');

  const t = lang ? TRANSLATIONS[lang] : TRANSLATIONS.fr;

  const selectLanguage = (selectedLang) => {
    setLang(selectedLang);
    setKeywords(DEFAULT_KEYWORDS[selectedLang]);
  };

  const handleLogin = () => {
    if (passwordInput === PASSWORD) { setIsAuthenticated(true); setPasswordError(false); }
    else { setPasswordError(true); }
  };

  const addLocation = () => {
    setLocations([...locations, { id: Date.now(), placeId: '', name: '', city: '', lat: '', lon: '', loading: false, error: '', rating: null, reviews: null, audit: null, searchVolume: 500, searchQuery: '', searchResults: [], showResults: false }]);
  };

  const updateLocation = (id, field, value) => {
    setLocations(locations.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const removeLocation = (id) => {
    if (locations.length > 1) setLocations(locations.filter(l => l.id !== id));
  };

  const searchPlaces = async (locationId, query) => {
    if (!apiKey) { alert(lang === 'it' ? "Inserisci prima la chiave API SerpAPI" : "Veuillez d'abord entrer votre clé API SerpAPI"); return; }
    if (!query || query.length < 3) { return; }
    
    setLocations(locs => locs.map(l => l.id === locationId ? { ...l, loading: true, error: '', showResults: false } : l));
    
    try {
      const response = await fetch('/api/serpapi', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ apiKey, action: 'searchPlaces', query }) 
      });
      const data = await response.json();
      
      if (data.success && data.places.length > 0) {
        setLocations(locs => locs.map(l => l.id === locationId ? { 
          ...l, 
          loading: false, 
          searchResults: data.places,
          showResults: true,
          error: '' 
        } : l));
      } else {
        setLocations(locs => locs.map(l => l.id === locationId ? { 
          ...l, 
          loading: false, 
          searchResults: [],
          showResults: false,
          error: lang === 'it' ? 'Nessun risultato trovato' : 'Aucun résultat trouvé' 
        } : l));
      }
    } catch (error) {
      setLocations(locs => locs.map(l => l.id === locationId ? { ...l, loading: false, error: lang === 'it' ? 'Errore di connessione' : 'Erreur de connexion' } : l));
    }
  };

  const selectPlace = (locationId, place) => {
    // Extraire la ville depuis l'adresse
    let city = '';
    if (place.address) {
      const parts = place.address.split(',');
      if (parts.length >= 2) {
        const cityPart = parts[parts.length - 2].trim();
        city = cityPart.replace(/\d{5}/, '').trim();
      }
    }
    
    setLocations(locs => locs.map(l => l.id === locationId ? { 
      ...l, 
      placeId: place.placeId,
      name: place.name,
      city: city,
      lat: place.lat,
      lon: place.lon,
      rating: place.rating,
      reviews: place.reviews,
      searchQuery: place.name,
      searchResults: [],
      showResults: false,
      error: ''
    } : l));
  };

  const updateKeyword = (index, value) => { const newKeywords = [...keywords]; newKeywords[index] = value; setKeywords(newKeywords); };
  const addKeyword = () => setKeywords([...keywords, '']);
  const removeKeyword = (index) => { if (keywords.length > 1) setKeywords(keywords.filter((_, i) => i !== index)); };

  const exportPDF = () => { window.print(); };

  const runAnalysis = async () => {
    setStep(3);
    setProgress(0);
    const validLocations = locations.filter(l => l.placeId && l.lat && l.lon);
    const totalQueries = validLocations.length * keywords.length;
    let completedQueries = 0;
    const panierMoyenNum = parseFloat(panierMoyen) || 500;
    const margeNum = parseFloat(margePercent) / 100 || 0.15;

    const analysisResults = {
      business: businessName, logo: businessLogo, metier: metier, panierMoyen: panierMoyenNum, marge: margeNum,
      locations: [], allCompetitors: [],
      summary: { totalLocations: validLocations.length, avgRating: 0, totalReviews: 0, top3Positions: 0, top7Positions: 0, invisiblePositions: 0, auditScore: 0 }
    };

    for (const location of validLocations) {
      const locationResult = { ...location, rankings: [], competitors: [], status: 'moyen', top3Count: 0, top7Count: 0, invisibleCount: 0 };

      for (const keywordTemplate of keywords) {
        const keyword = keywordTemplate.replace(/\[métier\]/g, metier).replace(/\[ville\]/g, location.city);
        setProgressText(`${lang === 'it' ? 'Analisi' : 'Analyse'}: "${keyword}"`);

        try {
          const response = await fetch('/api/serpapi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apiKey, action: 'searchRanking', keyword, lat: location.lat, lon: location.lon }) });
          const data = await response.json();
          let rank = 'N/A';
          if (data.local_results) {
            for (let i = 0; i < data.local_results.length; i++) {
              if (data.local_results[i].place_id === location.placeId) { rank = i + 1; break; }
            }
            // Si non trouvé dans les résultats, marquer la position comme > nombre de résultats
            if (rank === 'N/A' && data.local_results.length > 0) {
              rank = '+' + data.local_results.length;
            }
          }
          if (data.competitors) {
            locationResult.competitors = data.competitors;
            data.competitors.forEach(comp => { if (!analysisResults.allCompetitors.find(c => c.placeId === comp.placeId)) { analysisResults.allCompetitors.push(comp); } });
          }
          locationResult.rankings.push({ keyword, keywordTemplate, rank });
          if (typeof rank === 'number') {
            if (rank <= 3) { analysisResults.summary.top3Positions++; locationResult.top3Count++; }
            if (rank <= 7) { analysisResults.summary.top7Positions++; locationResult.top7Count++; }
          } else { analysisResults.summary.invisiblePositions++; locationResult.invisibleCount++; }
        } catch (error) {
          locationResult.rankings.push({ keyword, keywordTemplate, rank: 'ERR' });
          locationResult.invisibleCount++; analysisResults.summary.invisiblePositions++;
        }
        completedQueries++;
        setProgress(Math.round((completedQueries / totalQueries) * 100));
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const keywordCount = keywords.length;
      const top3Ratio = locationResult.top3Count / keywordCount;
      const top7Ratio = locationResult.top7Count / keywordCount;
      if (top3Ratio >= 0.7 && locationResult.rating >= 4.5) { locationResult.status = 'excellent'; }
      else if (top3Ratio >= 0.5 || (top7Ratio >= 0.7 && locationResult.rating >= 4.1)) { locationResult.status = 'bon'; }
      else if (top7Ratio >= 0.3) { locationResult.status = 'moyen'; }
      else if (locationResult.invisibleCount >= keywordCount * 0.5) { locationResult.status = 'critique'; }
      else { locationResult.status = 'faible'; }

      if (locationResult.audit) {
        let auditScore = 0;
        if (locationResult.audit.hasPhotos) auditScore += 20;
        if (locationResult.audit.photosCount >= 10) auditScore += 10;
        if (locationResult.audit.hasDescription) auditScore += 20;
        if (locationResult.audit.hasHours) auditScore += 15;
        if (locationResult.audit.hasWebsite) auditScore += 15;
        if (locationResult.audit.hasPhone) auditScore += 10;
        if (locationResult.audit.hasServices) auditScore += 10;
        locationResult.auditScore = auditScore;
        analysisResults.summary.auditScore += auditScore;
      }
      if (locationResult.rating) analysisResults.summary.avgRating += locationResult.rating;
      if (locationResult.reviews) analysisResults.summary.totalReviews += locationResult.reviews;
      analysisResults.locations.push(locationResult);
    }

    const locsWithRating = analysisResults.locations.filter(l => l.rating);
    if (locsWithRating.length > 0) { analysisResults.summary.avgRating = (analysisResults.summary.avgRating / locsWithRating.length).toFixed(1); }
    analysisResults.summary.auditScore = Math.round(analysisResults.summary.auditScore / validLocations.length);

    const totalKeywordTests = analysisResults.summary.totalLocations * keywords.length;
    const invisibleRate = analysisResults.summary.invisiblePositions / totalKeywordTests;

    analysisResults.locations.forEach(loc => {
      const locInvisibleRate = loc.invisibleCount / keywords.length;
      const locPoorRate = (keywords.length - loc.top7Count) / keywords.length;
      const searchVolume = loc.searchVolume || 500;
      const monthlyLostVisits = searchVolume * 0.35 * (locInvisibleRate + locPoorRate * 0.5);
      loc.estimatedLoss = Math.round(monthlyLostVisits * 12 * 0.04 * panierMoyenNum * margeNum / 1000);
    });

    const totalLoss = analysisResults.locations.reduce((sum, loc) => sum + loc.estimatedLoss, 0);
    analysisResults.financial = {
      totalLoss,
      potentialGain: Math.round(totalLoss * 0.65),
      roi: totalLoss > 0 ? Math.round((totalLoss * 0.65 / 15) * 100) : 0,
      breakeven: '2-3 ' + (lang === 'it' ? 'mesi' : 'mois'),
      leadsPerYear: Math.round(totalLoss * 0.65 / (panierMoyenNum * margeNum) * 1000),
      investmentRange: '10-20K'
    };
    analysisResults.summary.invisiblePercent = Math.round(invisibleRate * 100);

    const competitorCounts = {};
    analysisResults.allCompetitors.forEach(c => {
      if (competitorCounts[c.placeId]) { competitorCounts[c.placeId].count++; }
      else { competitorCounts[c.placeId] = { ...c, count: 1 }; }
    });
    analysisResults.topCompetitors = Object.values(competitorCounts).sort((a, b) => b.count - a.count).slice(0, 5);

    setResults(analysisResults);
    setStep(4);
  };

  const styles = {
    app: { minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)', color: '#0f172a', fontFamily: "'Segoe UI', -apple-system, sans-serif" },
    header: { borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#0f172a', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#0f172a' },
    logo: { display: 'flex', alignItems: 'center', gap: '12px' },
    logoIcon: { width: '44px', height: '44px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' },
    container: { maxWidth: '1300px', margin: '0 auto', padding: '40px 24px 80px' },
    card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
    btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 28px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.2s ease' },
    btnPrimary: { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#0f172a', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)' },
    btnSecondary: { background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0' },
    input: { width: '100%', padding: '14px 18px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#0f172a', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' },
    label: { display: 'block', fontSize: '12px', fontWeight: 600, color: '#6366f1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' },
    statCard: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' },
    footer: { textAlign: 'center', padding: '30px', borderTop: '1px solid #e2e8f0', marginTop: '40px', color: '#64748b', fontSize: '14px' }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SÉLECTION DE LANGUE
  // ═══════════════════════════════════════════════════════════════════════════

  if (!lang) {
    return (
      <div style={styles.app}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ ...styles.card, maxWidth: '500px', width: '100%', textAlign: 'center', padding: '50px' }}>
            <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #22c55e, #6366f1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 30px', boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)' }}>🌍</div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Audit SEO Local</h1>
            <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '16px' }}>Choisissez votre langue / Scegli la tua lingua</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <button onClick={() => selectLanguage('fr')} style={{ ...styles.btn, ...styles.btnPrimary, padding: '20px', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '36px' }}>🇫🇷</span>
                <span style={{ fontSize: '16px' }}>Français</span>
              </button>
              <button onClick={() => selectLanguage('it')} style={{ ...styles.btn, ...styles.btnPrimary, padding: '20px', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '36px' }}>🇮🇹</span>
                <span style={{ fontSize: '16px' }}>Italiano</span>
              </button>
            </div>

            <div style={styles.footer}>Propulsé avec ❤️ — V1</div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE DE CONNEXION
  // ═══════════════════════════════════════════════════════════════════════════

  if (!isAuthenticated) {
    return (
      <div style={styles.app}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ ...styles.card, maxWidth: '420px', width: '100%', textAlign: 'center', padding: '40px' }}>
            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #22c55e, #6366f1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 24px', boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)' }}>🔐</div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>{t.loginTitle}</h1>
            <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '14px' }}>{t.loginSubtitle}</p>
            
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={styles.label}>{t.password}</label>
              <input type="password" style={{ ...styles.input, borderColor: passwordError ? '#ef4444' : 'rgba(255,255,255,0.1)' }} placeholder={t.passwordPlaceholder} value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} />
              {passwordError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>❌ {t.passwordError}</p>}
            </div>

            <button style={{ ...styles.btn, ...styles.btnPrimary, width: '100%' }} onClick={handleLogin}>{t.accessButton}</button>
            <div style={styles.footer}>{t.footer}</div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 1: API Key
  // ═══════════════════════════════════════════════════════════════════════════

  if (step === 1) {
    return (
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📊</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px' }}>{t.headerTitle}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{t.headerSubtitle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>{lang === 'fr' ? '🇫🇷' : '🇮🇹'}</span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>V1</span>
          </div>
        </header>

        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '100px', fontSize: '12px', fontWeight: 600, color: '#22c55e', marginBottom: '20px' }}>⚡ {t.step1Badge}</div>
            <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>{t.step1Title}<br /><span style={{ color: '#22c55e' }}>{t.step1Highlight}</span></h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>{t.step1Desc}</p>
          </div>

          <div style={{ ...styles.card, maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>🔑 {t.apiKeyTitle}</h3>
              <ol style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.9, paddingLeft: '20px', margin: 0 }}>
                <li>{t.apiKeySteps[0]} <a href="https://serpapi.com/users/sign_up" target="_blank" rel="noreferrer" style={{ color: '#22c55e' }}>serpapi.com</a></li>
                <li>{t.apiKeySteps[1]}</li>
                <li>{t.apiKeySteps[2]}</li>
                <li>{t.apiKeySteps[3]}</li>
              </ol>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={styles.label}>{t.apiKeyLabel}</label>
              <input type="password" style={styles.input} placeholder={t.apiKeyPlaceholder} value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </div>

            <button style={{ ...styles.btn, ...styles.btnPrimary, width: '100%' }} onClick={() => apiKey ? setStep(2) : alert(lang === 'it' ? 'Inserisci una chiave API' : 'Veuillez entrer une clé API')}>{t.continueButton}</button>
          </div>

          <div style={styles.footer}>{t.footer}</div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 2: Configuration
  // ═══════════════════════════════════════════════════════════════════════════

  if (step === 2) {
    return (
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📊</div>
            <div>
              <div style={{ fontWeight: 700 }}>{t.headerTitle}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{t.configSubtitle}</div>
            </div>
          </div>
          <span style={{ fontSize: '20px' }}>{lang === 'fr' ? '🇫🇷' : '🇮🇹'}</span>
        </header>

        <div style={styles.container}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>{t.configTitle}</h2>

          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>🏢 {t.businessInfoTitle}</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={styles.label}>{t.businessName}</label>
                <input style={styles.input} placeholder={t.businessNamePlaceholder} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>{t.logoLabel}</label>
                <input style={styles.input} placeholder={t.logoPlaceholder} value={businessLogo} onChange={(e) => setBusinessLogo(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={styles.label}>{t.metierLabel}</label>
                <input style={styles.input} placeholder={t.metierPlaceholder} value={metier} onChange={(e) => setMetier(e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>{t.panierLabel}</label>
                <input style={styles.input} type="number" placeholder={t.panierPlaceholder} value={panierMoyen} onChange={(e) => setPanierMoyen(e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>{t.margeLabel}</label>
                <input style={styles.input} type="number" placeholder={t.margePlaceholder} value={margePercent} onChange={(e) => setMargePercent(e.target.value)} />
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>📍 {t.establishmentsTitle}</h3>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', color: '#22c55e', margin: 0 }}><strong>✨ {lang === 'it' ? 'Cerca un\'attività e selezionala dalla lista' : 'Recherchez un établissement et sélectionnez-le dans la liste'}</strong></p>
            </div>

            {locations.map((loc, i) => (
              <div key={loc.id} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '28px', height: '28px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>{i + 1}</span>
                    {t.establishment}
                  </span>
                  {locations.length > 1 && <button onClick={() => removeLocation(loc.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', color: '#ef4444', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}>{t.delete}</button>}
                </div>

                {/* Champ de recherche */}
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      style={{ ...styles.input, background: '#fff', flex: 1 }} 
                      placeholder={lang === 'it' ? 'Cerca un\'attività (es: Pizzeria Roma)...' : 'Rechercher un établissement (ex: Boulangerie Paris)...'} 
                      value={loc.searchQuery} 
                      onChange={(e) => updateLocation(loc.id, 'searchQuery', e.target.value)} 
                      onKeyPress={(e) => e.key === 'Enter' && searchPlaces(loc.id, loc.searchQuery)}
                    />
                    <button 
                      onClick={() => searchPlaces(loc.id, loc.searchQuery)} 
                      disabled={loc.loading || !loc.searchQuery || loc.searchQuery.length < 3} 
                      style={{ ...styles.btn, ...styles.btnPrimary, padding: '14px 24px', opacity: (loc.loading || !loc.searchQuery || loc.searchQuery.length < 3) ? 0.6 : 1 }}
                    >
                      {loc.loading ? '⏳' : '🔍'}
                    </button>
                  </div>
                  
                  {/* Résultats de recherche */}
                  {loc.showResults && loc.searchResults.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', marginTop: '8px', maxHeight: '300px', overflowY: 'auto', zIndex: 100 }}>
                      {loc.searchResults.map((place, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => selectPlace(loc.id, place)}
                          style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'background 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <div style={{ fontWeight: 600, marginBottom: '4px' }}>{place.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{place.address}</div>
                          {place.rating && (
                            <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px' }}>⭐ {place.rating} ({place.reviews} {lang === 'it' ? 'recensioni' : 'avis'})</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {loc.error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px', padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>❌ {loc.error}</div>}

                {/* Établissement sélectionné */}
                {loc.name && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#22c55e' }}>✅ {loc.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{loc.city}</div>
                      </div>
                      {loc.rating && <RatingBadge rating={loc.rating} />}
                    </div>
                  </div>
                )}

                {/* Champs éditables */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ ...styles.label, fontSize: '10px' }}>{t.cityLabel}</label>
                    <input style={{ ...styles.input, background: '#fff' }} placeholder={t.cityPlaceholder} value={loc.city} onChange={(e) => updateLocation(loc.id, 'city', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ ...styles.label, fontSize: '10px' }}>{t.volumeLabel}</label>
                    <input style={{ ...styles.input, background: '#fff' }} type="number" placeholder="500" value={loc.searchVolume} onChange={(e) => updateLocation(loc.id, 'searchVolume', parseInt(e.target.value) || 500)} />
                  </div>
                </div>
              </div>
            ))}

            <button onClick={addLocation} style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }} onMouseOut={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}>{t.addEstablishment}</button>
          </div>

          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>🔍 {t.keywordsTitle}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{t.keywordsDesc} <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>[métier]</code></p>
            
            {keywords.map((kw, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <input style={{ ...styles.input, flex: 1 }} value={kw} onChange={(e) => updateKeyword(i, e.target.value)} placeholder={t.keywordPlaceholder} />
                {keywords.length > 1 && <button onClick={() => removeKeyword(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', padding: '0 14px', cursor: 'pointer', fontSize: '18px' }}>×</button>}
              </div>
            ))}
            
            <button onClick={addKeyword} style={{ marginTop: '8px', padding: '12px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }} onMouseOut={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}>{t.addKeyword}</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={() => setStep(1)}>{t.backButton}</button>
            <button style={{ ...styles.btn, ...styles.btnPrimary, opacity: (!businessName || !metier || locations.every(l => !l.placeId || !l.lat)) ? 0.5 : 1 }} onClick={runAnalysis} disabled={!businessName || !metier || locations.every(l => !l.placeId || !l.lat)}>{t.launchButton}</button>
          </div>

          <div style={styles.footer}>{t.footer}</div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 3: Chargement
  // ═══════════════════════════════════════════════════════════════════════════

  if (step === 3) {
    return (
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📊</div>
            <div>
              <div style={{ fontWeight: 700 }}>{t.headerTitle}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{t.analysisSubtitle}</div>
            </div>
          </div>
        </header>

        <div style={styles.container}>
          <div style={{ ...styles.card, maxWidth: '500px', margin: '80px auto', textAlign: 'center', padding: '50px 40px' }}>
            <div style={{ width: '140px', height: '140px', margin: '0 auto 32px', borderRadius: '50%', background: `conic-gradient(#22c55e ${progress * 3.6}deg, #1a2942 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
              <div style={{ width: '115px', height: '115px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 700 }}>{progress}%</div>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{t.analysisInProgress}</h3>
            <p style={{ fontSize: '14px', color: '#64748b', minHeight: '40px' }}>{progressText}</p>
            <p style={{ fontSize: '12px', color: '#4a5568', marginTop: '20px' }}>☕ {t.analysisWait}</p>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ÉTAPE 4: Résultats
  // ═══════════════════════════════════════════════════════════════════════════

  if (step === 4 && results) {
    return (
      <div style={styles.app} id="audit-report">
        <style>{`@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none !important; } }`}</style>
        
        <header style={styles.header} className="no-print">
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📊</div>
            <div>
              <div style={{ fontWeight: 700 }}>{t.headerTitle}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{results.business}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ ...styles.btn, ...styles.btnSecondary, padding: '10px 20px' }} onClick={() => { setStep(2); setResults(null); }}>{t.newAudit}</button>
            <button style={{ ...styles.btn, ...styles.btnPrimary, padding: '10px 20px' }} onClick={exportPDF}>{t.exportPdf}</button>
          </div>
        </header>

        <div style={styles.container}>
          {/* En-tête avec logo agrandi */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', fontSize: '12px', color: '#3b82f6', marginBottom: '24px' }}>📊 {t.auditBadge} — 2025</div>
            
            {/* Logo agrandi */}
            {results.logo && (
              <div style={{ marginBottom: '24px' }}>
                <img src={results.logo} alt="Logo" style={{ width: '150px', height: '150px', borderRadius: '20px', objectFit: 'contain', background: '#fff', padding: '15px', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }} onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
            
            <h2 style={{ fontSize: '44px', fontWeight: 800, marginBottom: '12px' }}>
              <span style={{ color: '#22c55e' }}>{results.business}</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '18px' }}>{results.metier} — {results.summary.totalLocations} {t.establishments}</p>
          </div>

          {/* Stats */}
          <div style={styles.statsGrid}>
            {[
              { value: results.summary.totalLocations, label: t.statsEstablishments, color: '#22c55e' },
              { value: results.summary.avgRating || 'N/A', label: t.statsAvgRating, color: results.summary.avgRating >= 4.5 ? '#22c55e' : results.summary.avgRating >= 4.1 ? '#f59e0b' : '#ef4444' },
              { value: results.summary.totalLocations * keywords.length, label: t.statsQueries, color: '#6366f1' },
              { value: results.summary.totalReviews, label: t.reviews, color: '#3b82f6' },
            ].map((stat, i) => (
              <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${stat.color}` }}>
                <div style={{ fontSize: '38px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Diagnostic visibilité */}
          <div style={{ ...styles.card, marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #22c55e, #6366f1)', borderRadius: '2px' }}></span>
              {t.visibilityDiagnostic}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#22c55e' }}>{results.summary.top3Positions}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{t.top3Positions}</div>
                <div style={{ fontSize: '11px', color: '#22c55e', marginTop: '4px' }}>🟢 {t.excellent}</div>
              </div>
              <div style={{ padding: '24px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#f59e0b' }}>{results.summary.top7Positions - results.summary.top3Positions}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{t.positions47}</div>
                <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '4px' }}>🟠 {t.toImprove}</div>
              </div>
              <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#ef4444' }}>{results.summary.totalLocations * keywords.length - results.summary.top7Positions}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{t.positions8plus}</div>
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>🔴 {t.critical}</div>
              </div>
            </div>
          </div>

          {/* Impact Financier */}
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #22c55e, #6366f1)', borderRadius: '2px' }}></span>
            {t.financialImpact}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div style={{ ...styles.card, borderLeft: '4px solid #ef4444', marginBottom: 0 }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', marginBottom: '10px' }}>{t.annualLoss}</div>
              <div style={{ fontSize: '52px', fontWeight: 800, color: '#ef4444', marginBottom: '10px' }}>-{results.financial.totalLoss}K€</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>{t.lossDesc}</div>
            </div>
            <div style={{ ...styles.card, borderLeft: '4px solid #22c55e', marginBottom: 0 }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', marginBottom: '10px' }}>{t.acquisitionPotential}</div>
              <div style={{ fontSize: '52px', fontWeight: 800, color: '#22c55e', marginBottom: '10px' }}>+{results.financial.potentialGain}K€</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>{t.acquisitionDesc}</div>
            </div>
          </div>

          {/* Répartition pertes */}
          <div style={styles.card}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>📊 {t.lossDistribution}</div>
            {results.locations.sort((a, b) => b.estimatedLoss - a.estimatedLoss).map((loc, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: '#f1f5f9', borderRadius: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px' }}>{loc.city}</span>
                  <StatusBadge status={loc.status} lang={lang} />
                </div>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#ef4444' }}>-{loc.estimatedLoss}K€</span>
              </div>
            ))}
          </div>

          {/* ROI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '32px' }}>
            {[
              { value: results.financial.investmentRange + '€', label: t.investment, color: '#6366f1' },
              { value: results.financial.roi + '%', label: t.roiEstimated, color: '#22c55e' },
              { value: results.financial.breakeven, label: t.breakeven, color: '#f59e0b' },
              { value: '+' + results.financial.leadsPerYear, label: t.leadsYear, color: '#3b82f6' },
            ].map((m, i) => (
              <div key={i} style={{ ...styles.statCard, padding: '22px' }}>
                <div style={{ fontSize: '26px', fontWeight: 800, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Concurrents */}
          {results.topCompetitors && results.topCompetitors.length > 0 && (
            <div style={styles.card}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>🏆 {t.mainCompetitors}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {results.topCompetitors.map((comp, i) => (
                  <div key={i} style={{ padding: '16px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : '#4a5568', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', color: '#000' }}>{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{comp.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{comp.rating ? `⭐ ${comp.rating}` : ''} {comp.reviews ? `(${comp.reviews})` : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Établissements détaillés */}
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #22c55e, #6366f1)', borderRadius: '2px' }}></span>
            {t.detailedAnalysis}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {results.locations.map((loc, i) => (
              <div key={i} style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>{loc.city}</div>
                  </div>
                  <StatusBadge status={loc.status} lang={lang} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ textAlign: 'center', padding: '16px', background: loc.rating >= 4.5 ? 'rgba(16, 185, 129, 0.1)' : loc.rating >= 4.1 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${loc.rating >= 4.5 ? 'rgba(16, 185, 129, 0.3)' : loc.rating >= 4.1 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, borderRadius: '10px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: loc.rating >= 4.5 ? '#22c55e' : loc.rating >= 4.1 ? '#f59e0b' : '#ef4444' }}>{loc.rating || 'N/A'}</div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>{t.googleRating}</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px', background: '#f1f5f9', borderRadius: '10px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#6366f1' }}>{loc.reviews || 'N/A'}</div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>{t.reviews}</div>
                  </div>
                </div>

                <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{t.positionsPerQuery}</div>
                {loc.rankings.map((r, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f1f5f9', borderRadius: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748b' }}>{r.keyword}</span>
                    <PositionBadge rank={r.rank} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Matrice */}
          <div style={{ ...styles.card, overflowX: 'auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>{t.matrixTitle}</h3>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px', background: '#f1f5f9', fontSize: '11px', textTransform: 'uppercase', color: '#6366f1', textAlign: 'left', borderRadius: '8px 0 0 8px' }}>{lang === 'it' ? 'Query' : 'Requête'}</th>
                  {results.locations.map((loc, i) => (
                    <th key={i} style={{ padding: '14px', background: '#f1f5f9', fontSize: '11px', textTransform: 'uppercase', color: '#6366f1', textAlign: 'center', borderRadius: i === results.locations.length - 1 ? '0 8px 8px 0' : 0 }}>{loc.city}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw, ki) => (
                  <tr key={ki}>
                    <td style={{ padding: '14px', background: '#f1f5f9', fontSize: '13px', fontFamily: 'monospace', borderRadius: '8px 0 0 8px' }}>{kw}</td>
                    {results.locations.map((loc, li) => (
                      <td key={li} style={{ padding: '14px', background: '#f1f5f9', textAlign: 'center', borderRadius: li === results.locations.length - 1 ? '0 8px 8px 0' : 0 }}>
                        <PositionBadge rank={loc.rankings[ki]?.rank} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px', flexWrap: 'wrap' }}>
              {[
                { color: '#22c55e', label: `#1-3 — ${t.legendExcellent}` },
                { color: '#f59e0b', label: `#4-7 — ${t.legendToImprove}` },
                { color: '#ef4444', label: `#8+ — ${t.legendCritical}` },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: l.color }}></div>
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.footer}>{t.footer}</div>
        </div>
      </div>
    );
  }

  return null;
}
