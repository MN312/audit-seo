"use client";
import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const PASSWORD = "Test2026_V1";

const DEFAULT_KEYWORDS = [
  '[métier] [ville]',
  'meilleur [métier] [ville]',
  '[métier] près de [ville]',
  'avis [métier] [ville]',
];

// Clients Partoo - Cas d'étude
const PARTOO_CLIENTS = [
  {
    name: "Carrefour",
    logo: "🏪",
    sector: "Grande distribution",
    results: { visibility: "+45%", reviews: "+120%", calls: "+35%" }
  },
  {
    name: "Toyota",
    logo: "🚗",
    sector: "Automobile",
    results: { visibility: "+60%", reviews: "+85%", calls: "+42%" }
  },
  {
    name: "Optical Center",
    logo: "👓",
    sector: "Optique",
    results: { visibility: "+55%", reviews: "+150%", calls: "+38%" }
  },
  {
    name: "Crédit Agricole",
    logo: "🏦",
    sector: "Banque",
    results: { visibility: "+40%", reviews: "+95%", calls: "+28%" }
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSANTS
// ═══════════════════════════════════════════════════════════════════════════════

const StatusBadge = ({ status }) => {
  const config = {
    excellent: { bg: '#10b981', color: '#000', label: '★ Excellent' },
    bon: { bg: '#10b981', color: '#000', label: '✓ Bon' },
    moyen: { bg: '#f59e0b', color: '#000', label: '⚡ À améliorer' },
    faible: { bg: '#ef4444', color: '#fff', label: '⚠️ Critique' },
    critique: { bg: '#7f1d1d', color: '#fca5a5', label: '🚨 Urgent' }
  }[status] || { bg: '#6b7280', color: '#fff', label: status };
  
  return (
    <span style={{
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      background: config.bg,
      color: config.color
    }}>
      {config.label}
    </span>
  );
};

// Badge de position avec nouvelles couleurs : 1-3 vert, 4-7 orange, 8+ rouge
const PositionBadge = ({ rank }) => {
  let bg, color;
  if (rank === 'N/A' || rank === 'ERR' || rank === null || rank === undefined) {
    bg = '#ef4444'; color = '#fff';
  } else if (rank >= 1 && rank <= 3) {
    bg = '#10b981'; color = '#000'; // Vert
  } else if (rank >= 4 && rank <= 7) {
    bg = '#f59e0b'; color = '#000'; // Orange
  } else {
    bg = '#ef4444'; color = '#fff'; // Rouge
  }

  const display = rank === 'N/A' || rank === null || rank === undefined ? 'N/A' : 
                  typeof rank === 'number' ? `#${rank}` : rank;

  return (
    <span style={{
      padding: '5px 12px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: 700,
      fontFamily: 'monospace',
      background: bg,
      color: color,
      minWidth: '44px',
      display: 'inline-block',
      textAlign: 'center'
    }}>
      {display}
    </span>
  );
};

// Badge de note avec couleurs : 4.5-5 vert, 4.1-4.4 orange, <4.1 rouge
const RatingBadge = ({ rating }) => {
  let bg, color;
  if (!rating || rating === 'N/A') {
    bg = '#6b7280'; color = '#fff';
  } else if (rating >= 4.5) {
    bg = '#10b981'; color = '#000'; // Vert
  } else if (rating >= 4.1) {
    bg = '#f59e0b'; color = '#000'; // Orange
  } else {
    bg = '#ef4444'; color = '#fff'; // Rouge
  }

  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 700,
      background: bg,
      color: color,
    }}>
      ⭐ {rating || 'N/A'}
    </span>
  );
};

// Indicateur d'audit (check ou croix)
const AuditCheck = ({ ok, label }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    background: ok ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
    border: `1px solid ${ok ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
    borderRadius: '8px',
  }}>
    <span style={{ fontSize: '18px' }}>{ok ? '✅' : '❌'}</span>
    <span style={{ fontSize: '13px', color: ok ? '#10b981' : '#ef4444' }}>{label}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// APPLICATION PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════

export default function AuditSEOLocalV2() {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Steps
  const [step, setStep] = useState(1);
  
  // Config
  const [apiKey, setApiKey] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessLogo, setBusinessLogo] = useState('');
  const [metier, setMetier] = useState('');
  const [panierMoyen, setPanierMoyen] = useState('');
  const [margePercent, setMargePercent] = useState('15');
  const [locations, setLocations] = useState([{ 
    id: 1, 
    placeId: '', 
    name: '', 
    city: '', 
    lat: '', 
    lon: '', 
    loading: false, 
    error: '',
    rating: null,
    reviews: null,
    audit: null,
    searchVolume: 500,
  }]);
  const [keywords, setKeywords] = useState(DEFAULT_KEYWORDS);
  
  // Résultats
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTHENTIFICATION
  // ═══════════════════════════════════════════════════════════════════════════

  const handleLogin = () => {
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // GESTION DES ÉTABLISSEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  const addLocation = () => {
    setLocations([...locations, { 
      id: Date.now(), 
      placeId: '', 
      name: '', 
      city: '', 
      lat: '', 
      lon: '', 
      loading: false, 
      error: '',
      rating: null,
      reviews: null,
      audit: null,
      searchVolume: 500,
    }]);
  };

  const updateLocation = (id, field, value) => {
    setLocations(locations.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const removeLocation = (id) => {
    if (locations.length > 1) setLocations(locations.filter(l => l.id !== id));
  };

  const fetchPlaceDetails = async (locationId, placeId) => {
    if (!apiKey) {
      alert("Veuillez d'abord entrer votre clé API SerpAPI");
      return;
    }
    if (!placeId) {
      alert("Veuillez entrer un Place ID");
      return;
    }

    setLocations(locs => locs.map(l => l.id === locationId ? { ...l, loading: true, error: '' } : l));

    try {
      const response = await fetch('/api/serpapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          action: 'getPlaceDetails',
          placeId
        })
      });

      const data = await response.json();

      if (data.success) {
        setLocations(locs => locs.map(l => l.id === locationId ? {
          ...l,
          name: data.name || '',
          city: data.city || '',
          lat: data.lat || '',
          lon: data.lon || '',
          rating: data.rating,
          reviews: data.reviews,
          audit: data.audit,
          loading: false,
          error: ''
        } : l));
      } else {
        setLocations(locs => locs.map(l => l.id === locationId ? {
          ...l,
          loading: false,
          error: data.error || 'Lieu non trouvé'
        } : l));
      }
    } catch (error) {
      setLocations(locs => locs.map(l => l.id === locationId ? {
        ...l,
        loading: false,
        error: 'Erreur de connexion'
      } : l));
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // GESTION DES MOTS-CLÉS
  // ═══════════════════════════════════════════════════════════════════════════

  const updateKeyword = (index, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const addKeyword = () => {
    setKeywords([...keywords, '']);
  };

  const removeKeyword = (index) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index));
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ANALYSE
  // ═══════════════════════════════════════════════════════════════════════════

  const runAnalysis = async () => {
    setStep(3);
    setProgress(0);

    const validLocations = locations.filter(l => l.placeId && l.lat && l.lon);
    const totalQueries = validLocations.length * keywords.length;
    let completedQueries = 0;

    const panierMoyenNum = parseFloat(panierMoyen) || 500;
    const margeNum = parseFloat(margePercent) / 100 || 0.15;

    const analysisResults = {
      business: businessName,
      logo: businessLogo,
      metier: metier,
      panierMoyen: panierMoyenNum,
      marge: margeNum,
      locations: [],
      allCompetitors: [],
      summary: {
        totalLocations: validLocations.length,
        avgRating: 0,
        totalReviews: 0,
        top3Positions: 0,
        top7Positions: 0,
        invisiblePositions: 0,
        auditScore: 0,
      }
    };

    for (const location of validLocations) {
      const locationResult = {
        ...location,
        rankings: [],
        competitors: [],
        status: 'moyen',
        top3Count: 0,
        top7Count: 0,
        invisibleCount: 0,
      };

      for (const keywordTemplate of keywords) {
        const keyword = keywordTemplate
          .replace(/\[métier\]/g, metier)
          .replace(/\[ville\]/g, location.city);

        setProgressText(`Analyse: "${keyword}"`);

        try {
          const response = await fetch('/api/serpapi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              apiKey,
              action: 'searchRanking',
              keyword,
              lat: location.lat,
              lon: location.lon
            })
          });

          const data = await response.json();
          let rank = 'N/A';

          if (data.local_results) {
            for (let i = 0; i < data.local_results.length; i++) {
              const result = data.local_results[i];
              if (result.place_id === location.placeId) {
                rank = i + 1;
                break;
              }
            }
          }

          // Ajouter les concurrents
          if (data.competitors) {
            locationResult.competitors = data.competitors;
            // Ajouter à la liste globale
            data.competitors.forEach(comp => {
              if (!analysisResults.allCompetitors.find(c => c.placeId === comp.placeId)) {
                analysisResults.allCompetitors.push(comp);
              }
            });
          }

          locationResult.rankings.push({ keyword, keywordTemplate, rank });

          if (typeof rank === 'number') {
            if (rank <= 3) {
              analysisResults.summary.top3Positions++;
              locationResult.top3Count++;
            }
            if (rank <= 7) {
              analysisResults.summary.top7Positions++;
              locationResult.top7Count++;
            }
          } else {
            analysisResults.summary.invisiblePositions++;
            locationResult.invisibleCount++;
          }

        } catch (error) {
          locationResult.rankings.push({ keyword, keywordTemplate, rank: 'ERR' });
          locationResult.invisibleCount++;
          analysisResults.summary.invisiblePositions++;
        }

        completedQueries++;
        setProgress(Math.round((completedQueries / totalQueries) * 100));
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Calculer le statut de l'établissement
      const keywordCount = keywords.length;
      const top3Ratio = locationResult.top3Count / keywordCount;
      const top7Ratio = locationResult.top7Count / keywordCount;
      
      if (top3Ratio >= 0.7 && locationResult.rating >= 4.5) {
        locationResult.status = 'excellent';
      } else if (top3Ratio >= 0.5 || (top7Ratio >= 0.7 && locationResult.rating >= 4.1)) {
        locationResult.status = 'bon';
      } else if (top7Ratio >= 0.3) {
        locationResult.status = 'moyen';
      } else if (locationResult.invisibleCount >= keywordCount * 0.5) {
        locationResult.status = 'critique';
      } else {
        locationResult.status = 'faible';
      }

      // Calculer le score d'audit
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

    // Moyennes
    const locsWithRating = analysisResults.locations.filter(l => l.rating);
    if (locsWithRating.length > 0) {
      analysisResults.summary.avgRating = (analysisResults.summary.avgRating / locsWithRating.length).toFixed(1);
    }
    analysisResults.summary.auditScore = Math.round(analysisResults.summary.auditScore / validLocations.length);

    // Calcul financier
    const totalKeywordTests = analysisResults.summary.totalLocations * keywords.length;
    const invisibleRate = analysisResults.summary.invisiblePositions / totalKeywordTests;
    const poorPositionRate = (totalKeywordTests - analysisResults.summary.top7Positions) / totalKeywordTests;

    // Calcul des pertes par établissement
    analysisResults.locations.forEach(loc => {
      const locInvisibleRate = loc.invisibleCount / keywords.length;
      const locPoorRate = (keywords.length - loc.top7Count) / keywords.length;
      const searchVolume = loc.searchVolume || 500;
      const ctr = 0.35; // CTR moyen top 3
      const conversionRate = 0.04;
      
      const monthlyLostVisits = searchVolume * ctr * (locInvisibleRate + locPoorRate * 0.5);
      loc.estimatedLoss = Math.round(monthlyLostVisits * 12 * conversionRate * panierMoyenNum * margeNum / 1000);
    });

    const totalLoss = analysisResults.locations.reduce((sum, loc) => sum + loc.estimatedLoss, 0);

    analysisResults.financial = {
      totalLoss,
      potentialRecovery: Math.round(totalLoss * 0.65),
      roi: totalLoss > 0 ? Math.round((totalLoss * 0.65 / 15) * 100) : 0,
      breakeven: '2-3 mois',
      leadsPerYear: Math.round(totalLoss * 0.65 / (panierMoyenNum * margeNum) * 1000),
      investmentRange: '10-20K'
    };

    analysisResults.summary.invisiblePercent = Math.round(invisibleRate * 100);
    analysisResults.summary.poorPositionPercent = Math.round(poorPositionRate * 100);

    // Trier les concurrents par fréquence d'apparition
    const competitorCounts = {};
    analysisResults.allCompetitors.forEach(c => {
      if (competitorCounts[c.placeId]) {
        competitorCounts[c.placeId].count++;
      } else {
        competitorCounts[c.placeId] = { ...c, count: 1 };
      }
    });
    analysisResults.topCompetitors = Object.values(competitorCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setResults(analysisResults);
    setStep(4);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════════════════════════════════════

  const styles = {
    app: { 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)', 
      color: '#fff', 
      fontFamily: "'Segoe UI', -apple-system, sans-serif" 
    },
    header: { 
      borderBottom: '1px solid rgba(255,255,255,0.08)', 
      background: 'rgba(10, 22, 40, 0.95)', 
      padding: '16px 24px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)',
    },
    logo: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px' 
    },
    logoIcon: { 
      width: '44px', 
      height: '44px', 
      background: 'linear-gradient(135deg, #10b981, #06b6d4)', 
      borderRadius: '12px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontSize: '22px' 
    },
    container: { 
      maxWidth: '1300px', 
      margin: '0 auto', 
      padding: '40px 24px 80px' 
    },
    card: { 
      background: 'rgba(26, 41, 66, 0.85)', 
      border: '1px solid rgba(255,255,255,0.08)', 
      borderRadius: '16px', 
      padding: '28px', 
      marginBottom: '24px',
      backdropFilter: 'blur(10px)',
    },
    btn: { 
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '8px', 
      padding: '14px 28px', 
      borderRadius: '10px', 
      fontSize: '14px', 
      fontWeight: 600, 
      cursor: 'pointer', 
      border: 'none',
      transition: 'all 0.2s ease',
    },
    btnPrimary: { 
      background: 'linear-gradient(135deg, #10b981, #06b6d4)', 
      color: '#fff',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
    },
    btnSecondary: { 
      background: 'rgba(255,255,255,0.05)', 
      color: '#fff', 
      border: '1px solid rgba(255,255,255,0.15)' 
    },
    input: { 
      width: '100%', 
      padding: '14px 18px', 
      background: '#1a2942', 
      border: '1px solid rgba(255,255,255,0.1)', 
      borderRadius: '10px', 
      color: '#fff', 
      fontSize: '14px', 
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease',
    },
    label: { 
      display: 'block', 
      fontSize: '12px', 
      fontWeight: 600, 
      color: '#06b6d4', 
      marginBottom: '8px', 
      textTransform: 'uppercase', 
      letterSpacing: '0.5px' 
    },
    statsGrid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '16px', 
      marginBottom: '32px' 
    },
    statCard: { 
      background: 'rgba(26, 41, 66, 0.85)', 
      border: '1px solid rgba(255,255,255,0.08)', 
      borderRadius: '14px', 
      padding: '24px', 
      textAlign: 'center' 
    },
    footer: {
      textAlign: 'center',
      padding: '30px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      marginTop: '40px',
      color: '#64748b',
      fontSize: '14px',
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE DE CONNEXION
  // ═══════════════════════════════════════════════════════════════════════════

  if (!isAuthenticated) {
    return (
      <div style={styles.app}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{ 
            ...styles.card, 
            maxWidth: '420px', 
            width: '100%',
            textAlign: 'center',
            padding: '40px',
          }}>
            <div style={{ 
              width: '70px', 
              height: '70px', 
              background: 'linear-gradient(135deg, #10b981, #06b6d4)', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '32px',
              margin: '0 auto 24px',
              boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)',
            }}>
              🔐
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>
              Audit SEO Local
            </h1>
            <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '14px' }}>
              Outil interne Partoo - Accès restreint
            </p>
            
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={styles.label}>Mot de passe</label>
              <input
                type="password"
                style={{
                  ...styles.input,
                  borderColor: passwordError ? '#ef4444' : 'rgba(255,255,255,0.1)',
                }}
                placeholder="Entrez le mot de passe..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              {passwordError && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
                  ❌ Mot de passe incorrect
                </p>
              )}
            </div>

            <button
              style={{ ...styles.btn, ...styles.btnPrimary, width: '100%' }}
              onClick={handleLogin}
            >
              Accéder à l'outil →
            </button>

            <div style={styles.footer}>
              Propulsé avec ❤️ — V1
            </div>
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
              <div style={{ fontWeight: 700, fontSize: '16px' }}>Audit SEO Local</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Partoo</div>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>V1</div>
        </header>

        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 20px', 
              background: 'rgba(16, 185, 129, 0.1)', 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              borderRadius: '100px', 
              fontSize: '12px', 
              fontWeight: 600, 
              color: '#10b981', 
              marginBottom: '20px' 
            }}>
              ⚡ Audit automatisé avec IA
            </div>
            <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>
              Analysez la visibilité<br />
              <span style={{ color: '#10b981' }}>Google Maps</span> de vos prospects
            </h2>
            <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '650px', margin: '0 auto' }}>
              Générez un audit complet avec analyse de la fiche, positionnement, concurrents et impact financier
            </p>
          </div>

          <div style={{ ...styles.card, maxWidth: '700px', margin: '0 auto' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
            }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>
                🔑 Comment obtenir une clé API SerpAPI ?
              </h3>
              <ol style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.9, paddingLeft: '20px', margin: 0 }}>
                <li>Créez un compte gratuit sur <a href="https://serpapi.com/users/sign_up" target="_blank" rel="noreferrer" style={{ color: '#10b981' }}>serpapi.com</a></li>
                <li>Confirmez votre email</li>
                <li>Allez dans <strong>Dashboard → API Key</strong></li>
                <li>Copiez votre clé (100 recherches/mois gratuites)</li>
              </ol>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={styles.label}>Votre clé API SerpAPI</label>
              <input
                type="password"
                style={styles.input}
                placeholder="Collez votre clé API ici..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <button
              style={{ ...styles.btn, ...styles.btnPrimary, width: '100%' }}
              onClick={() => apiKey ? setStep(2) : alert('Veuillez entrer une clé API')}
            >
              Continuer →
            </button>
          </div>

          {/* Clients Partoo */}
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Ils nous font confiance
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {PARTOO_CLIENTS.map((client, i) => (
                <div key={i} style={{
                  ...styles.card,
                  textAlign: 'center',
                  padding: '24px 16px',
                  marginBottom: 0,
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{client.logo}</div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{client.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>{client.sector}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '4px', fontSize: '11px', color: '#10b981' }}>
                      Visibilité {client.results.visibility}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.footer}>
            Propulsé avec ❤️ — V1
          </div>
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
              <div style={{ fontWeight: 700 }}>Audit SEO Local</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Configuration</div>
            </div>
          </div>
        </header>

        <div style={styles.container}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>
            Configuration de l'audit
          </h2>

          {/* Infos entreprise */}
          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🏢 Informations du prospect
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={styles.label}>Nom de l'entreprise</label>
                <input 
                  style={styles.input} 
                  placeholder="Ex: Alsace Carreaux" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)} 
                />
              </div>
              <div>
                <label style={styles.label}>Logo (URL ou emoji)</label>
                <input 
                  style={styles.input} 
                  placeholder="🏪 ou https://..." 
                  value={businessLogo} 
                  onChange={(e) => setBusinessLogo(e.target.value)} 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={styles.label}>Métier / Activité</label>
                <input 
                  style={styles.input} 
                  placeholder="Ex: carrelage, plombier, restaurant..." 
                  value={metier} 
                  onChange={(e) => setMetier(e.target.value)} 
                />
              </div>
              <div>
                <label style={styles.label}>Panier moyen (€)</label>
                <input 
                  style={styles.input} 
                  type="number"
                  placeholder="Ex: 500" 
                  value={panierMoyen} 
                  onChange={(e) => setPanierMoyen(e.target.value)} 
                />
              </div>
              <div>
                <label style={styles.label}>Marge (%)</label>
                <input 
                  style={styles.input} 
                  type="number"
                  placeholder="Ex: 15" 
                  value={margePercent} 
                  onChange={(e) => setMargePercent(e.target.value)} 
                />
              </div>
            </div>
          </div>

          {/* Établissements */}
          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📍 Établissements à analyser
            </h3>

            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '20px',
            }}>
              <p style={{ fontSize: '13px', color: '#10b981', margin: 0 }}>
                <strong>✨ Automatique :</strong> Entrez le Place ID → on récupère tout (nom, adresse, note, photos, etc.)
              </p>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '20px',
            }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#f59e0b', marginBottom: '8px' }}>
                🗺️ Comment trouver un Place ID ?
              </h4>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                Allez sur <a href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder" target="_blank" rel="noreferrer" style={{ color: '#10b981' }}>Place ID Finder Google</a> → cherchez l'établissement → copiez l'ID
              </p>
            </div>

            {locations.map((loc, i) => (
              <div key={loc.id} style={{
                background: '#1a2942',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      width: '28px', 
                      height: '28px', 
                      background: '#06b6d4', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                    }}>{i + 1}</span>
                    Établissement
                  </span>
                  {locations.length > 1 && (
                    <button onClick={() => removeLocation(loc.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', color: '#ef4444', padding: '6px 12px', cursor: 'pointer', fontSize: '12px' }}>
                      Supprimer
                    </button>
                  )}
                </div>

                {/* Place ID + Bouton */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  <input
                    style={{ ...styles.input, background: '#0a1628', flex: 1 }}
                    placeholder="Place ID (ex: ChIJN1t_tDeuEmsRUsoyG83frY4)"
                    value={loc.placeId}
                    onChange={(e) => updateLocation(loc.id, 'placeId', e.target.value)}
                  />
                  <button
                    onClick={() => fetchPlaceDetails(loc.id, loc.placeId)}
                    disabled={loc.loading}
                    style={{
                      ...styles.btn,
                      ...styles.btnPrimary,
                      padding: '14px 24px',
                      opacity: loc.loading ? 0.6 : 1
                    }}
                  >
                    {loc.loading ? '⏳' : '🔍'} Récupérer
                  </button>
                </div>

                {/* Erreur */}
                {loc.error && (
                  <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px', padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>
                    ❌ {loc.error}
                  </div>
                )}

                {/* Infos récupérées */}
                {loc.name && (
                  <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    border: '1px solid rgba(16, 185, 129, 0.2)', 
                    borderRadius: '10px', 
                    padding: '16px', 
                    marginBottom: '16px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#10b981' }}>✅ {loc.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{loc.city}</div>
                      </div>
                      {loc.rating && <RatingBadge rating={loc.rating} />}
                    </div>
                    
                    {/* Mini audit preview */}
                    {loc.audit && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '12px' }}>
                        <AuditCheck ok={loc.audit.hasPhotos} label={`Photos (${loc.audit.photosCount})`} />
                        <AuditCheck ok={loc.audit.hasDescription} label="Description" />
                        <AuditCheck ok={loc.audit.hasHours} label="Horaires" />
                        <AuditCheck ok={loc.audit.hasWebsite} label="Site web" />
                      </div>
                    )}
                  </div>
                )}

                {/* Champs éditables */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ ...styles.label, fontSize: '10px' }}>Ville (pour mots-clés)</label>
                    <input 
                      style={{ ...styles.input, background: '#0a1628' }} 
                      placeholder="Ville" 
                      value={loc.city} 
                      onChange={(e) => updateLocation(loc.id, 'city', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label style={{ ...styles.label, fontSize: '10px' }}>Volume recherches/mois</label>
                    <input 
                      style={{ ...styles.input, background: '#0a1628' }} 
                      type="number"
                      placeholder="500" 
                      value={loc.searchVolume} 
                      onChange={(e) => updateLocation(loc.id, 'searchVolume', parseInt(e.target.value) || 500)} 
                    />
                  </div>
                  <div>
                    <label style={{ ...styles.label, fontSize: '10px' }}>Coordonnées</label>
                    <input 
                      style={{ ...styles.input, background: '#0a1628', fontSize: '12px' }} 
                      placeholder="Lat, Lon" 
                      value={loc.lat && loc.lon ? `${loc.lat}, ${loc.lon}` : ''} 
                      readOnly
                    />
                  </div>
                </div>
              </div>
            ))}

            <button onClick={addLocation} style={{ 
              width: '100%', 
              padding: '16px', 
              background: 'transparent', 
              border: '2px dashed rgba(255,255,255,0.2)', 
              borderRadius: '12px', 
              color: '#64748b', 
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}>
              + Ajouter un établissement
            </button>
          </div>

          {/* Mots-clés */}
          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🔍 Mots-clés à analyser
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              Variables disponibles : <code style={{ background: '#1a2942', padding: '2px 6px', borderRadius: '4px' }}>[métier]</code> et <code style={{ background: '#1a2942', padding: '2px 6px', borderRadius: '4px' }}>[ville]</code>
            </p>
            
            {keywords.map((kw, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  value={kw}
                  onChange={(e) => updateKeyword(i, e.target.value)}
                  placeholder="Ex: [métier] [ville]"
                />
                {keywords.length > 1 && (
                  <button 
                    onClick={() => removeKeyword(i)} 
                    style={{ 
                      background: 'rgba(239,68,68,0.1)', 
                      border: '1px solid rgba(239,68,68,0.3)', 
                      borderRadius: '8px', 
                      color: '#ef4444', 
                      padding: '0 14px', 
                      cursor: 'pointer',
                      fontSize: '18px',
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            
            <button 
              onClick={addKeyword} 
              style={{ 
                marginTop: '8px', 
                padding: '12px 20px', 
                background: 'rgba(16,185,129,0.1)', 
                border: '1px dashed #10b981', 
                borderRadius: '8px', 
                color: '#10b981', 
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              + Ajouter un mot-clé
            </button>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={() => setStep(1)}>
              ← Retour
            </button>
            <button
              style={{ 
                ...styles.btn, 
                ...styles.btnPrimary,
                opacity: (!businessName || !metier || locations.every(l => !l.placeId || !l.lat)) ? 0.5 : 1,
              }}
              onClick={runAnalysis}
              disabled={!businessName || !metier || locations.every(l => !l.placeId || !l.lat)}
            >
              🚀 Lancer l'analyse
            </button>
          </div>

          <div style={styles.footer}>
            Propulsé avec ❤️ — V1
          </div>
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
              <div style={{ fontWeight: 700 }}>Audit SEO Local</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Analyse en cours...</div>
            </div>
          </div>
        </header>

        <div style={styles.container}>
          <div style={{ 
            ...styles.card, 
            maxWidth: '500px', 
            margin: '80px auto', 
            textAlign: 'center',
            padding: '50px 40px',
          }}>
            <div style={{
              width: '140px',
              height: '140px',
              margin: '0 auto 32px',
              borderRadius: '50%',
              background: `conic-gradient(#10b981 ${progress * 3.6}deg, #1a2942 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)',
            }}>
              <div style={{
                width: '115px',
                height: '115px',
                borderRadius: '50%',
                background: '#0a1628',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 700,
              }}>
                {progress}%
              </div>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Analyse en cours...</h3>
            <p style={{ fontSize: '14px', color: '#64748b', minHeight: '40px' }}>{progressText}</p>
            <p style={{ fontSize: '12px', color: '#4a5568', marginTop: '20px' }}>
              ☕ L'analyse peut prendre quelques minutes
            </p>
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
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logo}>
            {results.logo && (
              results.logo.startsWith('http') ? (
                <img src={results.logo} alt="Logo" style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }} />
              ) : (
                <div style={{ ...styles.logoIcon, fontSize: '28px' }}>{results.logo}</div>
              )
            )}
            {!results.logo && <div style={styles.logoIcon}>📊</div>}
            <div>
              <div style={{ fontWeight: 700 }}>Audit SEO Local</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{results.business}</div>
            </div>
          </div>
          <button 
            style={{ ...styles.btn, ...styles.btnSecondary, padding: '10px 20px' }} 
            onClick={() => { setStep(2); setResults(null); }}
          >
            ← Nouvel audit
          </button>
        </header>

        <div style={styles.container}>
          {/* En-tête */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#3b82f6',
              marginBottom: '20px',
            }}>
              📊 Audit SEO Local — Janvier 2025
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
              {results.logo && (
                results.logo.startsWith('http') ? (
                  <img src={results.logo} alt="Logo" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '50px' }}>{results.logo}</span>
                )
              )}
              <h2 style={{ fontSize: '40px', fontWeight: 800 }}>
                <span style={{ color: '#10b981' }}>{results.business}</span>
              </h2>
            </div>
            
            <p style={{ color: '#64748b', fontSize: '16px' }}>
              {results.metier} — {results.summary.totalLocations} établissement(s)
            </p>
          </div>

          {/* Stats principales */}
          <div style={styles.statsGrid}>
            {[
              { value: results.summary.totalLocations, label: 'Établissements', color: '#10b981' },
              { 
                value: results.summary.avgRating || 'N/A', 
                label: 'Note Moyenne', 
                color: results.summary.avgRating >= 4.5 ? '#10b981' : results.summary.avgRating >= 4.1 ? '#f59e0b' : '#ef4444'
              },
              { value: results.summary.totalLocations * keywords.length, label: 'Requêtes Testées', color: '#06b6d4' },
              { 
                value: `${results.summary.auditScore}%`, 
                label: 'Score Fiche', 
                color: results.summary.auditScore >= 70 ? '#10b981' : results.summary.auditScore >= 50 ? '#f59e0b' : '#ef4444'
              },
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
              <span style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #10b981, #06b6d4)', borderRadius: '2px' }}></span>
              Diagnostic Visibilité
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ 
                padding: '24px', 
                background: 'rgba(16, 185, 129, 0.1)', 
                border: '1px solid rgba(16, 185, 129, 0.3)', 
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#10b981' }}>{results.summary.top3Positions}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Positions Top 3</div>
                <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>🟢 Excellent</div>
              </div>
              <div style={{ 
                padding: '24px', 
                background: 'rgba(245, 158, 11, 0.1)', 
                border: '1px solid rgba(245, 158, 11, 0.3)', 
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#f59e0b' }}>{results.summary.top7Positions - results.summary.top3Positions}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Positions 4-7</div>
                <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '4px' }}>🟠 À améliorer</div>
              </div>
              <div style={{ 
                padding: '24px', 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.3)', 
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#ef4444' }}>
                  {results.summary.totalLocations * keywords.length - results.summary.top7Positions}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Positions 8+ / Invisible</div>
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>🔴 Critique</div>
              </div>
            </div>
          </div>

          {/* Impact Financier */}
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #10b981, #06b6d4)', borderRadius: '2px' }}></span>
            Impact Financier et ROI
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div style={{ ...styles.card, borderLeft: '4px solid #ef4444', marginBottom: 0 }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', marginBottom: '10px' }}>
                Perte Annuelle Estimée
              </div>
              <div style={{ fontSize: '52px', fontWeight: 800, color: '#ef4444', marginBottom: '10px' }}>
                -{results.financial.totalLoss}K€
              </div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                Chiffre d'affaires perdu par manque de visibilité
              </div>
            </div>
            <div style={{ ...styles.card, borderLeft: '4px solid #10b981', marginBottom: 0 }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', marginBottom: '10px' }}>
                Potentiel Récupérable
              </div>
              <div style={{ fontSize: '52px', fontWeight: 800, color: '#10b981', marginBottom: '10px' }}>
                +{results.financial.potentialRecovery}K€
              </div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                65% du CA perdu récupérable en 12 mois avec Partoo
              </div>
            </div>
          </div>

          {/* Répartition pertes */}
          <div style={styles.card}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              📊 Répartition des pertes par établissement
            </div>
            {results.locations.sort((a, b) => b.estimatedLoss - a.estimatedLoss).map((loc, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 18px',
                background: '#1a2942',
                borderRadius: '10px',
                marginBottom: '10px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px' }}>{loc.name || loc.city}</span>
                  <StatusBadge status={loc.status} />
                </div>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#ef4444' }}>-{loc.estimatedLoss}K€</span>
              </div>
            ))}
          </div>

          {/* ROI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '32px' }}>
            {[
              { value: results.financial.investmentRange + '€', label: 'Investissement', color: '#06b6d4' },
              { value: results.financial.roi + '%', label: 'ROI Estimé', color: '#10b981' },
              { value: results.financial.breakeven, label: 'Break-Even', color: '#f59e0b' },
              { value: '+' + results.financial.leadsPerYear, label: 'Leads/an', color: '#3b82f6' },
            ].map((m, i) => (
              <div key={i} style={{ ...styles.statCard, padding: '22px' }}>
                <div style={{ fontSize: '26px', fontWeight: 800, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Principaux concurrents */}
          {results.topCompetitors && results.topCompetitors.length > 0 && (
            <div style={styles.card}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🏆 Principaux Concurrents
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {results.topCompetitors.map((comp, i) => (
                  <div key={i} style={{
                    padding: '16px',
                    background: '#1a2942',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : '#4a5568',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#000',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {comp.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {comp.rating ? `⭐ ${comp.rating}` : ''} {comp.reviews ? `(${comp.reviews} avis)` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Synthèse établissements */}
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #10b981, #06b6d4)', borderRadius: '2px' }}></span>
            Analyse Détaillée par Établissement
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {results.locations.map((loc, i) => (
              <div key={i} style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>{loc.name || loc.city}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{loc.city}</div>
                  </div>
                  <StatusBadge status={loc.status} />
                </div>

                {/* Note et avis */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '16px', 
                    background: loc.rating >= 4.5 ? 'rgba(16, 185, 129, 0.1)' : loc.rating >= 4.1 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${loc.rating >= 4.5 ? 'rgba(16, 185, 129, 0.3)' : loc.rating >= 4.1 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    borderRadius: '10px',
                  }}>
                    <div style={{ 
                      fontSize: '28px', 
                      fontWeight: 800, 
                      color: loc.rating >= 4.5 ? '#10b981' : loc.rating >= 4.1 ? '#f59e0b' : '#ef4444'
                    }}>
                      {loc.rating || 'N/A'}
                    </div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Note Google</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px', background: '#1a2942', borderRadius: '10px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#06b6d4' }}>{loc.reviews || 'N/A'}</div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>Avis</div>
                  </div>
                </div>

                {/* Audit de la fiche */}
                {loc.audit && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                      Audit de la Fiche Google
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <AuditCheck ok={loc.audit.hasPhotos} label={`Photos (${loc.audit.photosCount})`} />
                      <AuditCheck ok={loc.audit.hasDescription} label="Description" />
                      <AuditCheck ok={loc.audit.hasHours} label="Horaires" />
                      <AuditCheck ok={loc.audit.hasWebsite} label="Site web" />
                      <AuditCheck ok={loc.audit.hasPhone} label="Téléphone" />
                      <AuditCheck ok={loc.audit.hasServices} label="Services" />
                    </div>
                  </div>
                )}

                {/* Positions */}
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  Positions par Requête
                </div>
                {loc.rankings.map((r, j) => (
                  <div key={j} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    background: '#1a2942',
                    borderRadius: '8px',
                    marginBottom: '8px',
                  }}>
                    <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#94a3b8' }}>{r.keyword}</span>
                    <PositionBadge rank={r.rank} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Matrice */}
          <div style={{ ...styles.card, overflowX: 'auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>
              Matrice de Positionnement par Requête
            </h3>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px', background: '#1a2942', fontSize: '11px', textTransform: 'uppercase', color: '#06b6d4', textAlign: 'left', borderRadius: '8px 0 0 8px' }}>Requête</th>
                  {results.locations.map((loc, i) => (
                    <th key={i} style={{ padding: '14px', background: '#1a2942', fontSize: '11px', textTransform: 'uppercase', color: '#06b6d4', textAlign: 'center', borderRadius: i === results.locations.length - 1 ? '0 8px 8px 0' : 0 }}>{loc.city}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw, ki) => (
                  <tr key={ki}>
                    <td style={{ padding: '14px', background: '#1a2942', fontSize: '13px', fontFamily: 'monospace', borderRadius: '8px 0 0 8px' }}>{kw}</td>
                    {results.locations.map((loc, li) => (
                      <td key={li} style={{ padding: '14px', background: '#1a2942', textAlign: 'center', borderRadius: li === results.locations.length - 1 ? '0 8px 8px 0' : 0 }}>
                        <PositionBadge rank={loc.rankings[ki]?.rank} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Légende */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px', flexWrap: 'wrap' }}>
              {[
                { color: '#10b981', label: '#1-3 — Excellent' },
                { color: '#f59e0b', label: '#4-7 — À améliorer' },
                { color: '#ef4444', label: '#8+ — Critique' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: l.color }}></div>
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Clients Partoo */}
          <div style={{ marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Ils ont choisi Partoo — Résultats obtenus
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {PARTOO_CLIENTS.map((client, i) => (
                <div key={i} style={{
                  ...styles.card,
                  textAlign: 'center',
                  padding: '24px 16px',
                  marginBottom: 0,
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{client.logo}</div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{client.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>{client.sector}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ padding: '6px 10px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '6px', fontSize: '12px', color: '#10b981' }}>
                      Visibilité {client.results.visibility}
                    </span>
                    <span style={{ padding: '6px 10px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '6px', fontSize: '12px', color: '#06b6d4' }}>
                      Avis {client.results.reviews}
                    </span>
                    <span style={{ padding: '6px 10px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '6px', fontSize: '12px', color: '#3b82f6' }}>
                      Appels {client.results.calls}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.footer}>
            Propulsé avec ❤️ — V1
          </div>
        </div>
      </div>
    );
  }

  return null;
}
