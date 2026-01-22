"use client";
import React, { useState } from 'react';

const SECTOR_CONFIG = {
  automobile: { name: "Automobile / PL", avgBasket: 85000, margin: 0.08, ctrTop3: 0.35, conversionRate: 0.04, monthlySearches: 1200 },
  retail: { name: "Retail", avgBasket: 150, margin: 0.25, ctrTop3: 0.35, conversionRate: 0.03, monthlySearches: 2500 },
  healthcare: { name: "Santé", avgBasket: 1500, margin: 0.40, ctrTop3: 0.35, conversionRate: 0.05, monthlySearches: 800 },
  restaurant: { name: "Restauration", avgBasket: 35, margin: 0.30, ctrTop3: 0.40, conversionRate: 0.08, monthlySearches: 3000 },
  services: { name: "Services B2B", avgBasket: 5000, margin: 0.20, ctrTop3: 0.35, conversionRate: 0.03, monthlySearches: 600 },
};

const DEFAULT_KEYWORDS = [
  'vente [activité] [ville]',
  'entreprise [activité] [ville]',
  'réparation [activité] [ville]',
  'contrat entretien [activité] [ville]',
  'pièces [activité] [ville]',
  'location [activité] [ville]'
];

const StatusBadge = ({ status }) => {
  const config = {
    star: { bg: '#10b981', color: '#000', label: '★ Leader' },
    potentiel: { bg: '#f59e0b', color: '#000', label: '⚡ Potentiel' },
    urgent: { bg: '#ef4444', color: '#fff', label: '⚠️ Urgent' },
    critique: { bg: '#7f1d1d', color: '#fca5a5', label: '🚨 Critique' }
  }[status] || { bg: '#6b7280', color: '#fff', label: status };
  
  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '10px',
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

const PositionBadge = ({ rank }) => {
  let bg, color;
  if (rank === 'N/A' || rank === 'ERR' || rank === null) {
    bg = '#ef4444'; color = '#fff';
  } else if (rank === 1) {
    bg = '#10b981'; color = '#000';
  } else if (rank <= 3) {
    bg = '#14b8a6'; color = '#000';
  } else if (rank <= 10) {
    bg = '#3b82f6'; color = '#fff';
  } else if (rank <= 20) {
    bg = '#6b7280'; color = '#fff';
  } else {
    bg = '#ef4444'; color = '#fff';
  }

  const display = rank === 'N/A' || rank === null ? 'N/A' : 
                  typeof rank === 'number' && rank <= 20 ? `#${rank}` : `+${rank}`;

  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: 700,
      fontFamily: 'monospace',
      background: bg,
      color: color,
      minWidth: '40px',
      display: 'inline-block',
      textAlign: 'center'
    }}>
      {display}
    </span>
  );
};

export default function AuditSEOLocal() {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [activity, setActivity] = useState('');
  const [sector, setSector] = useState('automobile');
  const [locations, setLocations] = useState([{ id: 1, name: '', city: '', placeId: '', lat: '', lon: '' }]);
  const [keywords, setKeywords] = useState(DEFAULT_KEYWORDS);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');

  const addLocation = () => {
    setLocations([...locations, { id: Date.now(), name: '', city: '', placeId: '', lat: '', lon: '' }]);
  };

  const updateLocation = (id, field, value) => {
    setLocations(locations.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const removeLocation = (id) => {
    if (locations.length > 1) setLocations(locations.filter(l => l.id !== id));
  };

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

  const runAnalysis = async () => {
    setIsLoading(true);
    setStep(3);
    setProgress(0);

    const validLocations = locations.filter(l => l.placeId && l.lat && l.lon && l.city);
    const totalQueries = validLocations.length * keywords.length;
    let completedQueries = 0;

    const analysisResults = {
      business: businessName,
      activity: activity,
      sector: SECTOR_CONFIG[sector],
      locations: [],
      summary: {
        totalLocations: validLocations.length,
        avgRating: 0,
        totalReviews: 0,
        top3Positions: 0,
        invisiblePositions: 0
      }
    };

    for (const location of validLocations) {
      const locationResult = {
        ...location,
        rankings: [],
        status: 'potentiel',
        rating: null,
        reviews: null,
        top3Count: 0,
        invisibleCount: 0
      };

      for (const keywordTemplate of keywords) {
        const keyword = keywordTemplate
          .replace('[activité]', activity)
          .replace('[ville]', location.city);

        setProgressText(`Analyse: "${keyword}"`);

        try {
          const response = await fetch('/api/serpapi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              apiKey,
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
                if (!locationResult.rating && result.rating) {
                  locationResult.rating = result.rating;
                }
                if (!locationResult.reviews && result.reviews) {
                  locationResult.reviews = result.reviews;
                }
                break;
              }
            }
          }

          locationResult.rankings.push({
            keyword,
            keywordTemplate,
            rank
          });

          if (typeof rank === 'number' && rank <= 3) {
            analysisResults.summary.top3Positions++;
            locationResult.top3Count++;
          } else if (rank === 'N/A') {
            analysisResults.summary.invisiblePositions++;
            locationResult.invisibleCount++;
          }

        } catch (error) {
          locationResult.rankings.push({
            keyword,
            keywordTemplate,
            rank: 'ERR'
          });
          locationResult.invisibleCount++;
          analysisResults.summary.invisiblePositions++;
        }

        completedQueries++;
        setProgress(Math.round((completedQueries / totalQueries) * 100));

        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const keywordCount = keywords.length;
      if (locationResult.top3Count >= keywordCount * 0.7) {
        locationResult.status = 'star';
      } else if (locationResult.top3Count >= keywordCount * 0.4) {
        locationResult.status = 'potentiel';
      } else if (locationResult.invisibleCount >= keywordCount * 0.7) {
        locationResult.status = 'critique';
      } else {
        locationResult.status = 'urgent';
      }

      if (locationResult.rating) {
        analysisResults.summary.avgRating += locationResult.rating;
      }
      if (locationResult.reviews) {
        analysisResults.summary.totalReviews += locationResult.reviews;
      }

      analysisResults.locations.push(locationResult);
    }

    const locationsWithRating = analysisResults.locations.filter(l => l.rating);
    if (locationsWithRating.length > 0) {
      analysisResults.summary.avgRating = (analysisResults.summary.avgRating / locationsWithRating.length).toFixed(1);
    }

    const config = SECTOR_CONFIG[sector];
    const totalKeywordTests = analysisResults.summary.totalLocations * keywords.length;
    const invisibleRate = analysisResults.summary.invisiblePositions / totalKeywordTests;
    
    analysisResults.locations.forEach(loc => {
      const locInvisibleRate = loc.invisibleCount / keywords.length;
      const monthlyLostVisits = config.monthlySearches * config.ctrTop3 * locInvisibleRate;
      loc.estimatedLoss = Math.round(monthlyLostVisits * 12 * config.conversionRate * config.avgBasket * config.margin / 1000);
    });

    const totalLoss = analysisResults.locations.reduce((sum, loc) => sum + loc.estimatedLoss, 0);
    
    analysisResults.financial = {
      totalLoss,
      potentialRecovery: Math.round(totalLoss * 0.65),
      roi: Math.round((totalLoss * 0.65 / 15) * 100),
      breakeven: '21j',
      leadsPerYear: Math.round(config.monthlySearches * analysisResults.summary.totalLocations * config.ctrTop3 * config.conversionRate * 12 * invisibleRate * 0.65),
      investmentRange: '12-18K'
    };

    analysisResults.summary.invisiblePercent = Math.round(invisibleRate * 100);

    setResults(analysisResults);
    setIsLoading(false);
    setStep(4);
  };

  const styles = {
    app: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)',
      color: '#fff',
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
    },
    header: {
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(10, 22, 40, 0.9)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #10b981, #06b6d4)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px',
    },
    card: {
      background: 'rgba(26, 41, 66, 0.8)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '28px',
      marginBottom: '24px',
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
      transition: 'all 0.2s',
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #10b981, #06b6d4)',
      color: '#fff',
    },
    btnSecondary: {
      background: 'rgba(255,255,255,0.05)',
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      background: '#1a2942',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '14px',
      fontFamily: 'monospace',
      boxSizing: 'border-box',
    },
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: 600,
      color: '#06b6d4',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '32px',
    },
    statCard: {
      background: 'rgba(26, 41, 66, 0.8)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '14px',
      padding: '24px',
      textAlign: 'center',
    },
  };

  // ÉTAPE 1: API Key
  if (step === 1) {
    return (
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📊</div>
            <div>
              <div style={{ fontWeight: 700 }}>Audit SEO Local</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Analyse Google Maps</div>
            </div>
          </div>
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
              marginBottom: '20px',
            }}>
              ⚡ Audit automatisé
            </div>
            <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>
              Analysez votre visibilité<br />
              <span style={{ color: '#10b981' }}>Google Maps</span>
            </h2>
            <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 40px' }}>
              Obtenez un audit SEO local complet avec estimation de l'impact financier
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
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔑 Comment obtenir une clé API SerpAPI ?
              </h3>
              <ol style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
                <li>Créez un compte gratuit sur <a href="https://serpapi.com/users/sign_up" target="_blank" rel="noreferrer" style={{ color: '#10b981' }}>serpapi.com</a></li>
                <li>Confirmez votre email</li>
                <li>Allez dans Dashboard → API Key</li>
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
        </div>
      </div>
    );
  }

  // ÉTAPE 2: Configuration
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

          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>🏢 Informations entreprise</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={styles.label}>Nom de l'entreprise</label>
                <input style={styles.input} placeholder="Ex: SODIMAVI" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div>
                <label style={styles.label}>Activité principale</label>
                <input style={styles.input} placeholder="Ex: poids lourds" value={activity} onChange={(e) => setActivity(e.target.value)} />
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <label style={styles.label}>Secteur</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {Object.entries(SECTOR_CONFIG).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setSector(key)}
                    style={{
                      padding: '12px',
                      background: sector === key ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
                      border: sector === key ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {val.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>📍 Établissements à analyser</h3>
            
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '20px',
            }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#f59e0b', marginBottom: '10px' }}>
                🗺️ Comment trouver un Place ID ?
              </h4>
              <ol style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8, paddingLeft: '18px', margin: 0 }}>
                <li><strong>Méthode simple :</strong> <a href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder" target="_blank" rel="noreferrer" style={{ color: '#10b981' }}>Place ID Finder Google</a></li>
                <li><strong>Coordonnées :</strong> clic droit sur Google Maps → "Plus d'infos sur cet endroit"</li>
              </ol>
            </div>

            {locations.map((loc, i) => (
              <div key={loc.id} style={{
                background: '#1a2942',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 600 }}>Établissement {i + 1}</span>
                  {locations.length > 1 && (
                    <button onClick={() => removeLocation(loc.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>
                      Supprimer
                    </button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input style={{ ...styles.input, background: '#0a1628' }} placeholder="Nom" value={loc.name} onChange={(e) => updateLocation(loc.id, 'name', e.target.value)} />
                  <input style={{ ...styles.input, background: '#0a1628' }} placeholder="Ville" value={loc.city} onChange={(e) => updateLocation(loc.id, 'city', e.target.value)} />
                  <input style={{ ...styles.input, background: '#0a1628', gridColumn: '1/-1' }} placeholder="Place ID" value={loc.placeId} onChange={(e) => updateLocation(loc.id, 'placeId', e.target.value)} />
                  <input style={{ ...styles.input, background: '#0a1628' }} placeholder="Latitude" value={loc.lat} onChange={(e) => updateLocation(loc.id, 'lat', e.target.value)} />
                  <input style={{ ...styles.input, background: '#0a1628' }} placeholder="Longitude" value={loc.lon} onChange={(e) => updateLocation(loc.id, 'lon', e.target.value)} />
                </div>
              </div>
            ))}
            <button onClick={addLocation} style={{ width: '100%', padding: '14px', background: 'transparent', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '10px', color: '#64748b', cursor: 'pointer' }}>
              + Ajouter un établissement
            </button>
          </div>

          <div style={styles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>🔍 Mots-clés à analyser</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>Utilisez [activité] et [ville] comme variables</p>
            {keywords.map((kw, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  value={kw}
                  onChange={(e) => updateKeyword(i, e.target.value)}
                />
                {keywords.length > 1 && (
                  <button onClick={() => removeKeyword(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', padding: '0 12px', cursor: 'pointer' }}>×</button>
                )}
              </div>
            ))}
            <button onClick={addKeyword} style={{ marginTop: '8px', padding: '10px 16px', background: 'rgba(16,185,129,0.1)', border: '1px dashed #10b981', borderRadius: '8px', color: '#10b981', cursor: 'pointer' }}>
              + Ajouter un mot-clé
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={() => setStep(1)}>← Retour</button>
            <button 
              style={{ ...styles.btn, ...styles.btnPrimary }} 
              onClick={runAnalysis}
              disabled={!businessName || !activity || locations.every(l => !l.placeId)}
            >
              🚀 Lancer l'analyse
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ÉTAPE 3: Chargement
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
          <div style={{ ...styles.card, maxWidth: '500px', margin: '80px auto', textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 32px',
              borderRadius: '50%',
              background: `conic-gradient(#10b981 ${progress * 3.6}deg, #1a2942 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: '#0a1628',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 700,
              }}>
                {progress}%
              </div>
            </div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Analyse en cours...</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>{progressText}</p>
          </div>
        </div>
      </div>
    );
  }

  // ÉTAPE 4: Résultats
  if (step === 4 && results) {
    return (
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📊</div>
            <div>
              <div style={{ fontWeight: 700 }}>Audit SEO Local</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Résultats</div>
            </div>
          </div>
          <button style={{ ...styles.btn, ...styles.btnSecondary, padding: '10px 20px' }} onClick={() => { setStep(1); setResults(null); }}>
            ← Nouvel audit
          </button>
        </header>

        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '20px',
              fontSize: '11px',
              color: '#3b82f6',
              marginBottom: '16px',
            }}>
              📊 Audit SEO Local 2025
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>
              Audit SEO Local<br />
              <span style={{ color: '#10b981' }}>{results.business}</span>
            </h2>
            <p style={{ color: '#64748b' }}>{results.activity} — {results.summary.totalLocations} établissement(s)</p>
          </div>

          <div style={styles.statsGrid}>
            {[
              { value: results.summary.totalLocations, label: 'Établissements', color: '#10b981' },
              { value: results.summary.avgRating || 'N/A', label: 'Note Moyenne', color: '#06b6d4' },
              { value: results.summary.totalLocations * keywords.length, label: 'Requêtes Testées', color: '#f59e0b' },
              { value: `${results.summary.invisiblePercent}%`, label: 'Invisibles', color: '#ef4444' },
            ].map((stat, i) => (
              <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${stat.color}` }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #10b981, #06b6d4)', borderRadius: '2px' }}></span>
            Impact Financier et ROI
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div style={{ ...styles.card, borderLeft: '4px solid #ef4444' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', marginBottom: '8px' }}>Perte Annuelle Estimée</div>
              <div style={{ fontSize: '48px', fontWeight: 800, color: '#ef4444', marginBottom: '8px' }}>-{results.financial.totalLoss}K€</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Chiffre d'affaires perdu par invisibilité</div>
            </div>
            <div style={{ ...styles.card, borderLeft: '4px solid #10b981' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', marginBottom: '8px' }}>Potentiel Récupérable</div>
              <div style={{ fontSize: '48px', fontWeight: 800, color: '#10b981', marginBottom: '8px' }}>+{results.financial.potentialRecovery}K€</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>65% du CA perdu récupérable en 12 mois</div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              📊 Répartition des pertes par site
            </div>
            {results.locations
              .sort((a, b) => b.estimatedLoss - a.estimatedLoss)
              .map((loc, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#1a2942',
                borderRadius: '8px',
                marginBottom: '8px',
              }}>
                <span style={{ fontSize: '13px' }}>{loc.name || loc.city}</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#ef4444' }}>-{loc.estimatedLoss}K€</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
            {[
              { value: results.financial.investmentRange + '€', label: 'Investissement SEO', color: '#06b6d4' },
              { value: results.financial.roi + '%', label: 'ROI Estimé', color: '#10b981' },
              { value: results.financial.breakeven, label: 'Break-Even', color: '#f59e0b' },
              { value: '+' + results.financial.leadsPerYear, label: 'Leads/an', color: '#3b82f6' },
            ].map((m, i) => (
              <div key={i} style={{ ...styles.statCard, padding: '20px' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>{m.label}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #10b981, #06b6d4)', borderRadius: '2px' }}></span>
            Synthèse des Établissements
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {results.locations.map((loc, i) => (
              <div key={i} style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700 }}>{results.business} {loc.name || loc.city}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{loc.city}</div>
                  </div>
                  <StatusBadge status={loc.status} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ textAlign: 'center', padding: '12px', background: '#1a2942', borderRadius: '8px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: loc.rating ? '#10b981' : '#64748b' }}>{loc.rating || 'N/A'}</div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b' }}>Note Google</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '12px', background: '#1a2942', borderRadius: '8px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#06b6d4' }}>{loc.reviews || 'N/A'}</div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b' }}>Avis</div>
                  </div>
                </div>

                <div style={{ fontSize: '10px', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  Positions Clés
                </div>
                {loc.rankings.map((r, j) => (
                  <div key={j} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#1a2942',
                    borderRadius: '6px',
                    marginBottom: '6px',
                  }}>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8' }}>{r.keyword}</span>
                    <PositionBadge rank={r.rank} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ ...styles.card, overflowX: 'auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>
              Matrice de Positionnement par Requête
            </h3>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', background: '#1a2942', fontSize: '10px', textTransform: 'uppercase', color: '#06b6d4', textAlign: 'left', borderRadius: '6px 0 0 6px' }}>Requête</th>
                  {results.locations.map((loc, i) => (
                    <th key={i} style={{ padding: '12px', background: '#1a2942', fontSize: '10px', textTransform: 'uppercase', color: '#06b6d4', textAlign: 'center', borderRadius: i === results.locations.length - 1 ? '0 6px 6px 0' : 0 }}>{loc.city}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw, ki) => (
                  <tr key={ki}>
                    <td style={{ padding: '12px', background: '#1a2942', fontSize: '12px', fontFamily: 'monospace', borderRadius: '6px 0 0 6px' }}>{kw}</td>
                    {results.locations.map((loc, li) => (
                      <td key={li} style={{ padding: '12px', background: '#1a2942', textAlign: 'center', borderRadius: li === results.locations.length - 1 ? '0 6px 6px 0' : 0 }}>
                        <PositionBadge rank={loc.rankings[ki]?.rank} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
              {[
                { color: '#10b981', label: '#1 - Leader' },
                { color: '#14b8a6', label: '#2-3 - Top 3' },
                { color: '#3b82f6', label: '#4-10 - Page 1' },
                { color: '#6b7280', label: '#11-20 - Page 2' },
                { color: '#ef4444', label: '+20 - Invisible' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: l.color }}></div>
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
