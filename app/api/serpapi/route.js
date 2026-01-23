import { NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';

// Partoo colors
const PARTOO_BLUE = '0c4a6e';
const PARTOO_DARK = '0f172a';
const PARTOO_LIGHT_BLUE = 'e0f2fe';

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      bizName,
      logo,
      activity,
      typeEtablissement, // "hôtels", "magasins", "agences", etc.
      imgRechercheDirect,
      imgRechercheDecouverte,
      imgFicheGoogle,
      imgAvisGoogle,
      auditData, // Les données de l'audit SEO
      lang = 'fr'
    } = data;

    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';
    pptx.title = `Audit SEO Local - ${bizName}`;
    pptx.author = 'Partoo';
    
    // ============================================
    // SLIDE 1: Cover Partoo + Logo Client
    // ============================================
    const slide1 = pptx.addSlide();
    slide1.background = { color: PARTOO_LIGHT_BLUE };
    
    // Logo Partoo
    slide1.addImage({
      path: 'https://www.partoo.co/wp-content/uploads/2023/03/logo-partoo.svg',
      x: 0.5, y: 0.5, w: 1.5, h: 0.5
    });
    
    // Titre
    slide1.addText('La plateforme tout-en-un\npour votre marketing local', {
      x: 0.5, y: 2, w: 5, h: 1.5,
      fontSize: 32, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    
    // Badges
    const badges = ['PRESENCE', 'SOCIAL', 'AVIS', 'NPS', 'CONCURRENCE', 'ASSISTANT IA', 'CRM', 'MESSAGE'];
    badges.forEach((badge, i) => {
      slide1.addText(badge, {
        x: 0.5 + (i % 4) * 1.3, y: 3.8 + Math.floor(i / 4) * 0.4, w: 1.2, h: 0.3,
        fontSize: 10, fontFace: 'Arial', color: '475569',
        fill: { color: 'FFFFFF' }, line: { color: 'cbd5e1', pt: 1 },
        align: 'center', valign: 'middle'
      });
    });
    
    // Logo Client
    if (logo) {
      slide1.addImage({ path: logo, x: 0.5, y: 4.8, w: 2, h: 0.8 });
    } else {
      slide1.addText(bizName, {
        x: 0.5, y: 4.8, w: 3, h: 0.5,
        fontSize: 24, fontFace: 'Arial', bold: true, color: '1e293b'
      });
    }

    // ============================================
    // SLIDE 2: Pourquoi Google est indispensable
    // ============================================
    const slide2 = pptx.addSlide();
    slide2.background = { color: 'f8fafc' };
    
    // Titre
    slide2.addText('Pourquoi Google est indispensable ?', {
      x: 0.5, y: 0.3, w: 9, h: 0.6,
      fontSize: 28, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    
    // Ligne bleue sous le titre
    slide2.addShape(pptx.shapes.RECTANGLE, {
      x: 0.5, y: 0.85, w: 0.8, h: 0.05, fill: { color: '0ea5e9' }
    });
    
    // Box Direct (90%)
    slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 1.2, w: 4, h: 2.2,
      fill: { color: 'FFFFFF' }, shadow: { type: 'outer', blur: 10, opacity: 0.1, offset: 3 }
    });
    slide2.addText('Direct', {
      x: 0.5, y: 1.35, w: 4, h: 0.4,
      fontSize: 16, fontFace: 'Arial', bold: true, color: '1e293b', align: 'center'
    });
    slide2.addText('90%', {
      x: 0.5, y: 1.7, w: 4, h: 0.6,
      fontSize: 48, fontFace: 'Arial', bold: true, color: '0ea5e9', align: 'center'
    });
    slide2.addText(`des clients vont "googler" vos\n${typeEtablissement || 'établissements'} pour vérifier des\ninformations comme la\nlocalisation, les horaires, les avis,\nles disponibilités ou la confiance`, {
      x: 0.7, y: 2.3, w: 3.6, h: 1,
      fontSize: 11, fontFace: 'Arial', color: '475569', align: 'center'
    });
    
    // Box Recherches (70%)
    slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 5, y: 1.2, w: 4, h: 2.2,
      fill: { color: 'FFFFFF' }, shadow: { type: 'outer', blur: 10, opacity: 0.1, offset: 3 }
    });
    slide2.addText('Recherches', {
      x: 5, y: 1.35, w: 4, h: 0.4,
      fontSize: 16, fontFace: 'Arial', bold: true, color: '1e293b', align: 'center'
    });
    slide2.addText('70%', {
      x: 5, y: 1.7, w: 4, h: 0.6,
      fontSize: 48, fontFace: 'Arial', bold: true, color: '0ea5e9', align: 'center'
    });
    slide2.addText('des recherches se font via les\nfiches d\'établissement Google', {
      x: 5.2, y: 2.4, w: 3.6, h: 0.6,
      fontSize: 11, fontFace: 'Arial', color: '475569', align: 'center'
    });
    
    // Bas de page
    slide2.addText('Google impacte directement le chiffre d\'affaires local:', {
      x: 0.5, y: 3.7, w: 9, h: 0.3,
      fontSize: 14, fontFace: 'Arial', color: '1e293b'
    });
    
    // Checkmark vert
    slide2.addShape(pptx.shapes.OVAL, {
      x: 0.5, y: 4.1, w: 0.35, h: 0.35, fill: { color: 'd1fae5' }
    });
    slide2.addText('✓', {
      x: 0.5, y: 4.1, w: 0.35, h: 0.35,
      fontSize: 14, fontFace: 'Arial', color: '059669', align: 'center', valign: 'middle'
    });
    
    slide2.addText(`Les ${typeEtablissement || 'établissements'} qui ressortent bien sur Google génèrent en moyenne`, {
      x: 1, y: 4.05, w: 7, h: 0.25,
      fontSize: 13, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    slide2.addText('+30%', {
      x: 1, y: 4.3, w: 0.8, h: 0.3,
      fontSize: 20, fontFace: 'Arial', bold: true, color: '059669'
    });
    slide2.addText('d\'achat en plus.', {
      x: 1.8, y: 4.35, w: 2, h: 0.25,
      fontSize: 13, fontFace: 'Arial', bold: true, color: '1e293b'
    });

    // ============================================
    // SLIDE 3: Les deux types de recherches locales
    // ============================================
    const slide3 = pptx.addSlide();
    slide3.background = { color: 'f8fafc' };
    
    slide3.addText('Les deux types de recherches locales', {
      x: 0.5, y: 0.3, w: 9, h: 0.6,
      fontSize: 28, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    
    slide3.addShape(pptx.shapes.RECTANGLE, {
      x: 0.5, y: 0.85, w: 0.8, h: 0.05, fill: { color: '0ea5e9' }
    });
    
    // Direct 30%
    slide3.addText('Direct', {
      x: 0.5, y: 2.5, w: 1.5, h: 0.4,
      fontSize: 24, fontFace: 'Arial', bold: true, color: '0ea5e9'
    });
    slide3.addText('30%', {
      x: 0.5, y: 2.9, w: 1.5, h: 0.6,
      fontSize: 48, fontFace: 'Arial', bold: true, color: '0ea5e9'
    });
    
    // Image recherche directe
    if (imgRechercheDirect) {
      slide3.addImage({ data: imgRechercheDirect, x: 2.2, y: 1.2, w: 2.3, h: 4 });
    } else {
      slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 2.2, y: 1.2, w: 2.3, h: 4,
        fill: { color: 'e2e8f0' }, line: { color: 'cbd5e1', pt: 1 }
      });
      slide3.addText('📱\nScreenshot\nrecherche directe', {
        x: 2.2, y: 2.5, w: 2.3, h: 1,
        fontSize: 12, fontFace: 'Arial', color: '64748b', align: 'center'
      });
    }
    
    // Image recherche découverte
    if (imgRechercheDecouverte) {
      slide3.addImage({ data: imgRechercheDecouverte, x: 5.5, y: 1.2, w: 2.3, h: 4 });
    } else {
      slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 5.5, y: 1.2, w: 2.3, h: 4,
        fill: { color: 'e2e8f0' }, line: { color: 'cbd5e1', pt: 1 }
      });
      slide3.addText('📱\nScreenshot\nrecherche découverte', {
        x: 5.5, y: 2.5, w: 2.3, h: 1,
        fontSize: 12, fontFace: 'Arial', color: '64748b', align: 'center'
      });
    }
    
    // Découverte 70%
    slide3.addText('Découverte', {
      x: 8, y: 2.5, w: 1.8, h: 0.4,
      fontSize: 24, fontFace: 'Arial', bold: true, color: '0ea5e9'
    });
    slide3.addText('70%', {
      x: 8, y: 2.9, w: 1.5, h: 0.6,
      fontSize: 48, fontFace: 'Arial', bold: true, color: '0ea5e9'
    });

    // ============================================
    // SLIDES 4-9: AUDIT SEO (Données générées)
    // ============================================
    if (auditData) {
      // SLIDE 4: Résumé de l'audit
      const slide4 = pptx.addSlide();
      slide4.background = { color: PARTOO_DARK };
      
      slide4.addText('📊 Audit SEO Local — 2025', {
        x: 2.5, y: 0.3, w: 5, h: 0.4,
        fontSize: 14, fontFace: 'Arial', color: 'FFFFFF', align: 'center',
        fill: { color: '1e3a5f' }
      });
      
      // Logo
      if (logo) {
        slide4.addImage({ path: logo, x: 3.5, y: 0.9, w: 3, h: 1.2 });
      }
      
      slide4.addText(bizName, {
        x: 0, y: 2.2, w: 10, h: 0.5,
        fontSize: 36, fontFace: 'Arial', bold: true, color: '22d3ee', align: 'center'
      });
      
      slide4.addText(`${activity || 'Entreprise'} — ${auditData.sum?.tot || 0} établissement(s)`, {
        x: 0, y: 2.75, w: 10, h: 0.3,
        fontSize: 14, fontFace: 'Arial', color: '94a3b8', align: 'center'
      });
      
      // Stats boxes
      const stats = [
        { val: auditData.sum?.tot || 0, label: 'ÉTABLISSEMENTS', color: '22d3ee' },
        { val: auditData.sum?.avgR || 'N/A', label: 'NOTE MOYENNE', color: '22d3ee' },
        { val: auditData.kws?.length || 0, label: 'REQUÊTES TESTÉES', color: 'f59e0b' },
        { val: auditData.sum?.totRev || 0, label: 'AVIS', color: 'f97316' }
      ];
      
      stats.forEach((s, i) => {
        slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: 0.8 + i * 2.2, y: 3.2, w: 2, h: 0.9,
          fill: { color: '1e3a5f' }, line: { color: '0ea5e9', pt: 1 }
        });
        slide4.addText(String(s.val), {
          x: 0.8 + i * 2.2, y: 3.25, w: 2, h: 0.5,
          fontSize: 28, fontFace: 'Arial', bold: true, color: s.color, align: 'center'
        });
        slide4.addText(s.label, {
          x: 0.8 + i * 2.2, y: 3.75, w: 2, h: 0.3,
          fontSize: 9, fontFace: 'Arial', color: '64748b', align: 'center'
        });
      });
      
      // Diagnostic Visibilité
      slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: 4.3, w: 8.4, h: 0.9,
        fill: { color: '1e293b' }
      });
      
      slide4.addText('Diagnostic Visibilité', {
        x: 0.9, y: 4.35, w: 2, h: 0.25,
        fontSize: 12, fontFace: 'Arial', bold: true, color: 'FFFFFF'
      });
      
      const diag = [
        { val: auditData.sum?.t3 || 0, label: 'Positions Top 3', status: 'Excellent', color: '22c55e' },
        { val: (auditData.sum?.t7 || 0) - (auditData.sum?.t3 || 0), label: 'Positions 4-7', status: 'À améliorer', color: 'f59e0b' },
        { val: auditData.sum?.inv || 0, label: 'Positions 8+ / Invisible', status: 'Critique', color: 'ef4444' }
      ];
      
      diag.forEach((d, i) => {
        slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: 0.9 + i * 2.8, y: 4.65, w: 2.6, h: 0.5,
          fill: { color: i === 0 ? '064e3b' : i === 1 ? '78350f' : '7f1d1d' }
        });
        slide4.addText(String(d.val), {
          x: 0.9 + i * 2.8, y: 4.65, w: 2.6, h: 0.3,
          fontSize: 20, fontFace: 'Arial', bold: true, color: d.color, align: 'center'
        });
        slide4.addText(d.label, {
          x: 0.9 + i * 2.8, y: 4.95, w: 2.6, h: 0.15,
          fontSize: 8, fontFace: 'Arial', color: '94a3b8', align: 'center'
        });
      });

      // SLIDE 5: Métriques financières et concurrents
      const slide5 = pptx.addSlide();
      slide5.background = { color: 'f8fafc' };
      
      // Métriques en haut
      const metrics = [
        { val: `${auditData.fin?.partooCost?.toLocaleString() || '10-20K'}€`, label: 'INVESTISSEMENT', color: '22d3ee' },
        { val: `${auditData.fin?.roi || 82}%`, label: 'ROI ESTIMÉ', color: '22d3ee' },
        { val: auditData.fin?.be || '2-3 mois', label: 'BREAK-EVEN', color: 'f59e0b' },
        { val: `+${auditData.fin?.lpy || 823}`, label: 'LEADS/AN', color: 'f97316' }
      ];
      
      metrics.forEach((m, i) => {
        slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: 0.5 + i * 2.35, y: 0.3, w: 2.2, h: 0.7,
          fill: { color: PARTOO_DARK }
        });
        slide5.addText(m.val, {
          x: 0.5 + i * 2.35, y: 0.35, w: 2.2, h: 0.4,
          fontSize: 20, fontFace: 'Arial', bold: true, color: m.color, align: 'center'
        });
        slide5.addText(m.label, {
          x: 0.5 + i * 2.35, y: 0.75, w: 2.2, h: 0.2,
          fontSize: 8, fontFace: 'Arial', color: '94a3b8', align: 'center'
        });
      });
      
      // Principaux Concurrents
      slide5.addText('🏆 Principaux Concurrents', {
        x: 0.5, y: 1.2, w: 4, h: 0.3,
        fontSize: 14, fontFace: 'Arial', bold: true, color: '1e293b'
      });
      
      const topComp = auditData.topComp || [];
      topComp.slice(0, 5).forEach((c, i) => {
        slide5.addShape(pptx.shapes.OVAL, {
          x: 0.5 + i * 1.9, y: 1.6, w: 0.4, h: 0.4,
          fill: { color: i === 0 ? 'fef3c7' : 'f1f5f9' }
        });
        slide5.addText(String(i + 1), {
          x: 0.5 + i * 1.9, y: 1.6, w: 0.4, h: 0.4,
          fontSize: 14, fontFace: 'Arial', bold: true, color: i === 0 ? 'd97706' : '64748b', align: 'center', valign: 'middle'
        });
        slide5.addText(c.name?.substring(0, 20) || `Concurrent ${i + 1}`, {
          x: 1 + i * 1.9, y: 1.65, w: 1.5, h: 0.2,
          fontSize: 10, fontFace: 'Arial', bold: true, color: '1e293b'
        });
        if (c.rating) {
          slide5.addText(`⭐ ${c.rating} (${c.reviews || 0})`, {
            x: 1 + i * 1.9, y: 1.85, w: 1.5, h: 0.15,
            fontSize: 8, fontFace: 'Arial', color: 'd97706'
          });
        }
      });
      
      // Analyse détaillée par établissement
      slide5.addText('Analyse Détaillée par Établissement', {
        x: 0.5, y: 2.2, w: 5, h: 0.3,
        fontSize: 14, fontFace: 'Arial', bold: true, color: '1e293b'
      });
      
      // Afficher jusqu'à 3 établissements sur cette slide
      const locsToShow = (auditData.locs || []).slice(0, 3);
      locsToShow.forEach((loc, i) => {
        const x = 0.5 + i * 3.1;
        
        slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x, y: 2.6, w: 3, h: 2.5,
          fill: { color: PARTOO_DARK }
        });
        
        slide5.addText(loc.city || `Établissement ${i + 1}`, {
          x, y: 2.7, w: 2, h: 0.3,
          fontSize: 14, fontFace: 'Arial', bold: true, color: 'FFFFFF'
        });
        
        // Badge URGENT
        slide5.addText('🚨 URGENT', {
          x: x + 2, y: 2.7, w: 0.9, h: 0.25,
          fontSize: 9, fontFace: 'Arial', color: 'fbbf24',
          fill: { color: '78350f' }, align: 'center'
        });
        
        // Note et avis
        slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: x + 0.1, y: 3.05, w: 1.2, h: 0.6,
          fill: { color: '0f4c5c' }
        });
        slide5.addText(loc.rat ? String(loc.rat) : 'N/A', {
          x: x + 0.1, y: 3.1, w: 1.2, h: 0.35,
          fontSize: 22, fontFace: 'Arial', bold: true, color: loc.rat >= 4.5 ? '22d3ee' : loc.rat >= 4 ? 'f59e0b' : 'ef4444', align: 'center'
        });
        slide5.addText('NOTE GOOGLE', {
          x: x + 0.1, y: 3.45, w: 1.2, h: 0.15,
          fontSize: 7, fontFace: 'Arial', color: '64748b', align: 'center'
        });
        
        slide5.addText(loc.rev ? String(loc.rev) : 'N/A', {
          x: x + 1.5, y: 3.1, w: 1.2, h: 0.35,
          fontSize: 22, fontFace: 'Arial', bold: true, color: 'f59e0b', align: 'center'
        });
        slide5.addText('AVIS', {
          x: x + 1.5, y: 3.45, w: 1.2, h: 0.15,
          fontSize: 7, fontFace: 'Arial', color: '64748b', align: 'center'
        });
        
        // Positions par requête
        slide5.addText('POSITIONS PAR REQUÊTE', {
          x: x + 0.1, y: 3.7, w: 2.8, h: 0.2,
          fontSize: 9, fontFace: 'Arial', bold: true, color: 'ef4444'
        });
        
        (loc.ranks || []).slice(0, 4).forEach((r, j) => {
          slide5.addText(r.kw?.substring(0, 25) || 'Mot-clé', {
            x: x + 0.1, y: 3.95 + j * 0.25, w: 2, h: 0.2,
            fontSize: 9, fontFace: 'Arial', color: 'FFFFFF'
          });
          const posColor = typeof r.rk === 'number' ? (r.rk <= 3 ? '22c55e' : r.rk <= 7 ? 'f59e0b' : 'ef4444') : 'ef4444';
          slide5.addText(typeof r.rk === 'number' ? `#${r.rk}` : '+20', {
            x: x + 2.1, y: 3.95 + j * 0.25, w: 0.7, h: 0.2,
            fontSize: 9, fontFace: 'Arial', bold: true, color: 'FFFFFF', fill: { color: posColor }, align: 'center'
          });
        });
      });
    }

    // ============================================
    // SLIDE 10: Apparaître sur les recherches découvertes
    // ============================================
    const slide10 = pptx.addSlide();
    slide10.background = { color: 'f8fafc' };
    
    slide10.addText('Apparaître sur les recherches découvertes', {
      x: 0.5, y: 0.3, w: 9, h: 0.5,
      fontSize: 26, fontFace: 'Arial', bold: true, color: '1e293b', underline: true
    });
    
    const pillars = [
      { icon: '👥', title: 'Réputation', items: ['Avis : volume, note moyenne, fraîcheur', 'Traitement : taux de réponse, délais, mots clés'] },
      { icon: '📈', title: 'Optimisation', items: ['Database : complétion & mise à jour', 'Fonctionnalités : actualités, produits, messages…'] },
      { icon: '🔗', title: 'Pertinence', items: ['Multidiffusion : uniformisation sur les plateformes d\'autorité de Google'] }
    ];
    
    pillars.forEach((p, i) => {
      slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.5 + i * 3.1, y: 1.2, w: 3, h: 3.5,
        fill: { color: 'FFFFFF' }, shadow: { type: 'outer', blur: 8, opacity: 0.1, offset: 2 }
      });
      slide10.addText(p.icon, {
        x: 0.5 + i * 3.1, y: 1.4, w: 3, h: 0.6,
        fontSize: 32, align: 'center'
      });
      slide10.addText(p.title, {
        x: 0.5 + i * 3.1, y: 2.1, w: 3, h: 0.4,
        fontSize: 20, fontFace: 'Arial', bold: true, color: '1e293b', align: 'center'
      });
      p.items.forEach((item, j) => {
        slide10.addText(`• ${item}`, {
          x: 0.7 + i * 3.1, y: 2.6 + j * 0.5, w: 2.6, h: 0.45,
          fontSize: 10, fontFace: 'Arial', color: '475569'
        });
      });
    });

    // ============================================
    // SLIDE 11: Optimisation avec screenshot fiche
    // ============================================
    const slide11 = pptx.addSlide();
    slide11.background = { color: 'f8fafc' };
    
    // Icône et titre
    slide11.addText('📈 Optimisation:', {
      x: 0.5, y: 0.3, w: 4, h: 0.4,
      fontSize: 16, fontFace: 'Arial', color: '0ea5e9'
    });
    slide11.addText('Les sites clés pour améliorer votre référencement', {
      x: 0.5, y: 0.7, w: 6, h: 0.5,
      fontSize: 24, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    
    // Liste des optimisations
    const optList = [
      'Mettre à jour les données', 'Indiquer les horaires except.',
      'Ajouter jusqu\'à 10 catégories', 'Ajouter 100 photos',
      'Ajouter les URL secondaires', 'Ajouter les horaires d\'ouverture',
      'Publier des Googles Posts', 'Préciser la géolocalisation',
      'Récupérer la propriété', 'Ajoutez vos réseaux sociaux',
      'Rédiger des descriptions', 'Supprimer les doublons',
      'Répondre à tous les avis', 'Ajoutez votre contact WhatsApp',
      'Compléter les attributs'
    ];
    
    optList.forEach((item, i) => {
      const col = i < 8 ? 0 : 1;
      const row = i < 8 ? i : i - 8;
      slide11.addText('✓', {
        x: 0.5 + col * 2.8, y: 1.4 + row * 0.38, w: 0.3, h: 0.3,
        fontSize: 14, fontFace: 'Arial', color: '22c55e'
      });
      slide11.addText(item, {
        x: 0.85 + col * 2.8, y: 1.4 + row * 0.38, w: 2.4, h: 0.3,
        fontSize: 11, fontFace: 'Arial', color: '1e293b'
      });
    });
    
    // Image fiche Google
    if (imgFicheGoogle) {
      slide11.addImage({ data: imgFicheGoogle, x: 6.5, y: 1, w: 3, h: 4.2 });
    } else {
      slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 6.5, y: 1, w: 3, h: 4.2,
        fill: { color: 'e2e8f0' }, line: { color: 'cbd5e1', pt: 1 }
      });
      slide11.addText('📱\nScreenshot\nfiche Google Maps', {
        x: 6.5, y: 2.3, w: 3, h: 1,
        fontSize: 12, fontFace: 'Arial', color: '64748b', align: 'center'
      });
    }

    // ============================================
    // SLIDE 12: Réputation avec screenshot avis
    // ============================================
    const slide12 = pptx.addSlide();
    slide12.background = { color: 'f8fafc' };
    
    slide12.addText('👥 Réputation:', {
      x: 0.5, y: 0.3, w: 4, h: 0.4,
      fontSize: 16, fontFace: 'Arial', color: '0ea5e9'
    });
    slide12.addText('Les sites clés pour améliorer votre référencement', {
      x: 0.5, y: 0.7, w: 6, h: 0.5,
      fontSize: 24, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    
    // Liste réputation
    const repList = [
      { icon: '⚙️', text: 'Le nombre d\'avis' },
      { icon: '🕐', text: 'Le dépôt régulier d\'avis (5 -10 min /mois)' },
      { icon: '👍', text: 'La note' },
      { icon: '💬', text: 'Réponse aux avis en 24/48h' },
      { icon: '📝', text: 'Contenu des avis divergents' }
    ];
    
    repList.forEach((item, i) => {
      slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.5, y: 1.4 + i * 0.6, w: 0.5, h: 0.5,
        fill: { color: 'e0f2fe' }
      });
      slide12.addText(item.icon, {
        x: 0.5, y: 1.4 + i * 0.6, w: 0.5, h: 0.5,
        fontSize: 16, align: 'center', valign: 'middle'
      });
      slide12.addText(item.text, {
        x: 1.1, y: 1.5 + i * 0.6, w: 4, h: 0.35,
        fontSize: 14, fontFace: 'Arial', color: '1e293b'
      });
    });
    
    // Image avis Google
    if (imgAvisGoogle) {
      slide12.addImage({ data: imgAvisGoogle, x: 5.5, y: 0.8, w: 4.2, h: 4.4 });
    } else {
      slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 5.5, y: 0.8, w: 4.2, h: 4.4,
        fill: { color: 'e2e8f0' }, line: { color: 'cbd5e1', pt: 1 }
      });
      slide12.addText('📱\nScreenshot\navis Google', {
        x: 5.5, y: 2.5, w: 4.2, h: 1,
        fontSize: 14, fontFace: 'Arial', color: '64748b', align: 'center'
      });
    }

    // ============================================
    // SLIDE 13: Pertinence - Plateformes
    // ============================================
    const slide13 = pptx.addSlide();
    slide13.background = { color: 'f8fafc' };
    
    slide13.addText('🔗 Pertinence:', {
      x: 0.5, y: 0.3, w: 4, h: 0.4,
      fontSize: 16, fontFace: 'Arial', color: '0ea5e9'
    });
    slide13.addText('Les sites clés pour améliorer votre référencement', {
      x: 0.5, y: 0.7, w: 6, h: 0.5,
      fontSize: 24, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    
    const platforms = ['GBP', 'G-Maps', 'Facebook', 'Factual', 'Apple plans', 'Siri', 'TikTok*', 'Snapchat', 'Waze', 'Here', 'Tomtom', 'Mappy*', 'Hoodspot', 'Justacoté', '118 000'];
    platforms.forEach((p, i) => {
      const col = i % 8;
      const row = Math.floor(i / 8);
      slide13.addShape(pptx.shapes.OVAL, {
        x: 0.5 + col * 1.15, y: 1.4 + row * 1.2, w: 0.8, h: 0.8,
        fill: { color: 'e0f2fe' }
      });
      slide13.addText(p.substring(0, 3), {
        x: 0.5 + col * 1.15, y: 1.6 + row * 1.2, w: 0.8, h: 0.4,
        fontSize: 10, fontFace: 'Arial', bold: true, color: '0c4a6e', align: 'center'
      });
      slide13.addText(p, {
        x: 0.3 + col * 1.15, y: 2.25 + row * 1.2, w: 1.2, h: 0.3,
        fontSize: 8, fontFace: 'Arial', color: '475569', align: 'center'
      });
    });
    
    slide13.addText('*Mappy & TikTok sont en cours de discussions', {
      x: 0.5, y: 3.8, w: 5, h: 0.25,
      fontSize: 9, fontFace: 'Arial', italic: true, color: '94a3b8'
    });
    
    slide13.addText('ET DES DIZAINES D\'AUTRES SITES CONNECTÉS…', {
      x: 0.5, y: 4.2, w: 9, h: 0.3,
      fontSize: 12, fontFace: 'Arial', bold: true, color: '64748b', align: 'center'
    });

    // ============================================
    // SLIDE 14: Facilitez le contact
    // ============================================
    const slide14 = pptx.addSlide();
    slide14.background = { color: PARTOO_DARK };
    
    slide14.addText('Facilitez le contact pour vos\nclients', {
      x: 0, y: 1.8, w: 10, h: 1.2,
      fontSize: 42, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center'
    });
    
    // Icônes Partoo
    ['🔵', '🟠', '🟢'].forEach((icon, i) => {
      slide14.addText(icon, {
        x: 3.8 + i * 0.8, y: 3.2, w: 0.6, h: 0.6,
        fontSize: 28, align: 'center'
      });
    });
    
    // Logo Partoo en bas à droite
    slide14.addText('⭕ partoo', {
      x: 8, y: 4.8, w: 1.5, h: 0.4,
      fontSize: 14, fontFace: 'Arial', color: 'FFFFFF'
    });

    // ============================================
    // SLIDE 15: Partoo - Présentation entreprise
    // ============================================
    const slide15 = pptx.addSlide();
    slide15.background = { color: 'f8fafc' };
    
    slide15.addText('Partoo', {
      x: 4.5, y: 0.5, w: 5, h: 0.6,
      fontSize: 36, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    slide15.addText('Une entreprise au plus proche de ses clients', {
      x: 4.5, y: 1.1, w: 5, h: 0.4,
      fontSize: 16, fontFace: 'Arial', color: '0ea5e9'
    });
    
    const partooStats = [
      { icon: '🤝', text: '1200 enseignes clientes' },
      { icon: '🚀', text: 'Présence dans 150 pays' },
      { icon: '📊', text: 'Croissance annuelle de +40%' },
      { icon: '👥', text: 'Équipe de 350 collaborateurs' }
    ];
    
    partooStats.forEach((s, i) => {
      slide15.addText(s.icon, {
        x: 4.5, y: 1.7 + i * 0.55, w: 0.5, h: 0.5,
        fontSize: 20
      });
      slide15.addText(s.text, {
        x: 5.1, y: 1.8 + i * 0.55, w: 4, h: 0.4,
        fontSize: 14, fontFace: 'Arial', color: '1e293b'
      });
    });

    // ============================================
    // SLIDE 16: Vision Partoo
    // ============================================
    const slide16 = pptx.addSlide();
    slide16.background = { color: 'f8fafc' };
    
    slide16.addText('⭕ partoo', {
      x: 0.5, y: 0.5, w: 1.5, h: 0.4,
      fontSize: 14, fontFace: 'Arial', color: '0c4a6e'
    });
    
    slide16.addText('Notre vision', {
      x: 0.5, y: 1.2, w: 4, h: 0.6,
      fontSize: 32, fontFace: 'Arial', bold: true, color: '1e293b'
    });
    
    slide16.addText('Notre Vision est de construire LA plateforme\nmarketing', {
      x: 0.5, y: 2, w: 4.5, h: 0.8,
      fontSize: 14, fontFace: 'Arial', color: '475569'
    });
    
    const vision = ['• tout-en-un', '• collaborative', '• et simple d\'utilisation'];
    vision.forEach((v, i) => {
      slide16.addText(v, {
        x: 0.7, y: 2.8 + i * 0.35, w: 3, h: 0.3,
        fontSize: 13, fontFace: 'Arial', bold: true, color: '1e293b'
      });
    });
    
    slide16.addText('dans le but d\'aider tous les réseaux à convertir\nles intentions d\'achats', {
      x: 0.5, y: 3.9, w: 4.5, h: 0.6,
      fontSize: 14, fontFace: 'Arial', color: '475569'
    });

    // ============================================
    // SLIDE 17 (SUPPRIMÉE - Logos clients)
    // ============================================
    // Page 17 supprimée comme demandé

    // ============================================
    // SLIDE 18: Un outil pour tout gérer
    // ============================================
    const slide18 = pptx.addSlide();
    slide18.background = { color: PARTOO_DARK };
    
    slide18.addText('⭕ partoo', {
      x: 3.5, y: 0.5, w: 3, h: 0.5,
      fontSize: 24, fontFace: 'Arial', color: 'FFFFFF', align: 'center'
    });
    
    slide18.addText('Un outil pour tout gérer', {
      x: 0, y: 1.2, w: 10, h: 0.7,
      fontSize: 36, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center'
    });
    
    const tools = ['Présence', 'Store Locator', 'Réseaux sociaux', 'Reviews', 'Booster', 'Messages'];
    tools.forEach((tool, i) => {
      slide18.addText(tool, {
        x: 0.5 + i * 1.55, y: 4.6, w: 1.5, h: 0.3,
        fontSize: 10, fontFace: 'Arial', color: 'FFFFFF', align: 'center'
      });
    });

    // ============================================
    // SLIDE 19: Préparez la suite
    // ============================================
    const slide19 = pptx.addSlide();
    slide19.background = { color: PARTOO_DARK };
    
    slide19.addText('Préparez la suite', {
      x: 0, y: 2, w: 10, h: 0.8,
      fontSize: 48, fontFace: 'Arial', bold: true, italic: true, color: 'FFFFFF', align: 'center'
    });
    
    ['🔵', '🟠', '🟢'].forEach((icon, i) => {
      slide19.addText(icon, {
        x: 3.8 + i * 0.8, y: 3, w: 0.6, h: 0.6,
        fontSize: 28, align: 'center'
      });
    });
    
    slide19.addText('⭕ partoo', {
      x: 8, y: 4.8, w: 1.5, h: 0.4,
      fontSize: 14, fontFace: 'Arial', color: 'FFFFFF'
    });

    // Generate the PPTX file
    const pptxBuffer = await pptx.write({ outputType: 'base64' });
    
    return NextResponse.json({
      success: true,
      filename: `Audit_SEO_${bizName.replace(/[^a-zA-Z0-9]/g, '_')}.pptx`,
      data: pptxBuffer
    });

  } catch (error) {
    console.error('PPTX Generation Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
