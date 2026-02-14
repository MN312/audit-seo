"use client";
import React, { useState } from 'react';

const PASSWORD = "Test2026_V1";
const BLUE = '#0c4a6e';
const BG = '#0f172a';

const PARTOO_PRICING = {1:800,2:1580,3:2340,4:3080,5:3800,6:4500,7:5180,8:5840,9:6480,10:7100,11:7700,12:8280,13:8840,14:9380,15:9900,16:10400,17:10880,18:11340,19:11780,20:12200,21:12600,22:12980,23:13340,24:13680,25:14000,26:14300,27:14580,28:14840,29:15080,30:15300};
const getPartooPricing = (n) => n <= 0 ? 0 : n <= 30 ? PARTOO_PRICING[n] : Math.round(15300 + (n - 30) * 500);

const T = {
  fr: {
    login:"Audit SEO Local",sub:"Outil d'analyse",pwd:"Mot de passe",pwdPh:"Entrez le mot de passe",pwdErr:"Incorrect",access:"Accéder",
    header:"Audit SEO Local",badge:"Automatisé",title:"Analysez votre visibilité locale",desc:"Audit complet avec positionnement et impact financier",
    apiTitle:"Clé API SerpAPI",apiLabel:"Clé API",apiPh:"Collez votre clé",cont:"Continuer",
    config:"Configuration",bizName:"Nom de l'entreprise *",bizPh:"Ex: Maisons STILL",
    etabTitle:"Établissements",etab:"Établissement",cityL:"Ville",cityPh:"Ville",
    volL:"Volume recherches/mois",volInfo:"Retrouvez cette donnée sur Semrush.com",
    addEtab:"Ajouter un établissement",kwTitle:"Mots-clés à analyser",kwPh:"Ex: constructeur maison",addKw:"Ajouter",
    back:"Retour",launch:"Lancer l'analyse",analyzing:"Analyse en cours",wait:"Veuillez patienter",
    report:"Rapport d'audit",etabs:"établissement(s)",statEtab:"Établissements",statNote:"Note moyenne",statReq:"Requêtes",statVis:"Visibilité",
    diag:"Diagnostic visibilité",top3:"Top 3",exc:"Excellent",pos47:"Position 4-7",imp:"À améliorer",pos8:"Position 8+",crit:"Critique",
    comp:"Concurrents principaux",detail:"Analyse détaillée",note:"Note",avis:"Avis",posReq:"Positions",matrix:"Positionnement",
    newA:"Nouvel audit",pdf:"Exporter PDF",search:"Rechercher...",
    // Étape 2 - Financier
    step2Title:"Calcul de l'impact financier",step2Desc:"Avec votre client, renseignez le panier moyen",
    panL:"Panier moyen €",panPh:"Ex: 250000",calculate:"Calculer l'impact",
    fin:"Impact financier",loss:"Perte annuelle estimée",lossD:"CA perdu par manque de visibilité",
    pot:"Potentiel récupérable",potD:"Récupérable en 12 mois",inv:"Investissement Partoo",roi:"ROI estimé",be:"Break-even",leads:"Leads/an",
    fomo:"Ce que vos concurrents gagnent pendant que vous perdez",fomoMonth:"Perte ce mois",fomoYear:"Perte cette année",
    // Étape 3 - Solutions
    step3Title:"Comment Partoo peut vous aider",solutionsBtn:"Voir les solutions Partoo",
    pillar1:"Optimisation",pillar2:"Réputation",pillar3:"Pertinence",
    pillarTitle:"Les sites clés pour améliorer votre référencement",
    // Optimisation items
    opt1:"Mettre à jour les données",opt2:"Indiquer les horaires except.",opt3:"Ajouter jusqu'à 10 catégories",opt4:"Ajouter 100 photos",
    opt5:"Ajouter les URL secondaires",opt6:"Ajouter les horaires d'ouverture",opt7:"Publier des Googles Posts",opt8:"Préciser la géolocalisation",
    opt9:"Récupérer la propriété",opt10:"Ajoutez vos réseaux sociaux",opt11:"Rédiger des descriptions",opt12:"Supprimer les doublons",
    opt13:"Répondre à tous les avis",opt14:"Ajoutez votre contact WhatsApp",opt15:"Compléter les attributs",
    // Réputation items
    rep1:"Le nombre d'avis",rep2:"Le dépôt régulier d'avis (5-10 min/mois)",rep3:"La note",rep4:"Réponse aux avis en 24/48h",rep5:"Contenu des avis divergents",
    // Pertinence
    pertNote:"*Mappy & TikTok sont en cours de discussions",pertMore:"ET DES DIZAINES D'AUTRES SITES CONNECTÉS…",
    backToReport:"Retour au rapport"
  },
  it: {
    login:"Audit SEO Locale",sub:"Strumento di analisi",pwd:"Password",pwdPh:"Inserisci password",pwdErr:"Errata",access:"Accedi",
    header:"Audit SEO Locale",badge:"Automatizzato",title:"Analizza la visibilità locale",desc:"Audit completo con posizionamento e impatto",
    apiTitle:"Chiave API SerpAPI",apiLabel:"Chiave API",apiPh:"Incolla chiave",cont:"Continua",
    config:"Configurazione",bizName:"Nome azienda *",bizPh:"Es: Case STILL",
    etabTitle:"Stabilimenti",etab:"Stabilimento",cityL:"Città",cityPh:"Città",
    volL:"Volume ricerche/mese",volInfo:"Trova su Semrush.com",
    addEtab:"Aggiungi stabilimento",kwTitle:"Parole chiave",kwPh:"Es: costruttore casa",addKw:"Aggiungi",
    back:"Indietro",launch:"Avvia analisi",analyzing:"Analisi in corso",wait:"Attendere",
    report:"Rapporto audit",etabs:"stabilimento/i",statEtab:"Stabilimenti",statNote:"Valutazione",statReq:"Query",statVis:"Visibilità",
    diag:"Diagnosi visibilità",top3:"Top 3",exc:"Eccellente",pos47:"Posizione 4-7",imp:"Da migliorare",pos8:"Posizione 8+",crit:"Critico",
    comp:"Concorrenti principali",detail:"Analisi dettagliata",note:"Nota",avis:"Recensioni",posReq:"Posizioni",matrix:"Posizionamento",
    newA:"Nuovo audit",pdf:"Esporta PDF",search:"Cerca...",
    // Étape 2
    step2Title:"Calcolo dell'impatto finanziario",step2Desc:"Con il cliente, inserisci lo scontrino medio",
    panL:"Scontrino medio €",panPh:"Es: 250000",calculate:"Calcola impatto",
    fin:"Impatto finanziario",loss:"Perdita annuale stimata",lossD:"Fatturato perso",
    pot:"Potenziale recuperabile",potD:"Recuperabile in 12 mesi",inv:"Investimento Partoo",roi:"ROI stimato",be:"Break-even",leads:"Lead/anno",
    fomo:"Cosa guadagnano i concorrenti mentre perdi",fomoMonth:"Perdita mese",fomoYear:"Perdita anno",
    // Étape 3
    step3Title:"Come Partoo può aiutarti",solutionsBtn:"Vedi soluzioni Partoo",
    pillar1:"Ottimizzazione",pillar2:"Reputazione",pillar3:"Pertinenza",
    pillarTitle:"I siti chiave per migliorare il tuo posizionamento",
    opt1:"Aggiornare i dati",opt2:"Indicare orari eccezionali",opt3:"Aggiungere fino a 10 categorie",opt4:"Aggiungere 100 foto",
    opt5:"Aggiungere URL secondari",opt6:"Aggiungere orari di apertura",opt7:"Pubblicare Google Posts",opt8:"Precisare la geolocalizzazione",
    opt9:"Recuperare la proprietà",opt10:"Aggiungere i social",opt11:"Scrivere descrizioni",opt12:"Eliminare duplicati",
    opt13:"Rispondere a tutte le recensioni",opt14:"Aggiungere contatto WhatsApp",opt15:"Completare gli attributi",
    rep1:"Il numero di recensioni",rep2:"Deposito regolare (5-10 min/mese)",rep3:"La valutazione",rep4:"Risposta in 24/48h",rep5:"Contenuto recensioni divergenti",
    pertNote:"*Mappy & TikTok in corso di discussione",pertMore:"E DECINE DI ALTRI SITI CONNESSI…",
    backToReport:"Torna al rapporto"
  }
};

const Ic = ({ n, s = 20 }) => {
  const p = {
    lock:<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    chart:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    pin:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    building:<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></>,
    target:<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    trending:<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    check:<polyline points="20 6 9 17 4 12"/>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrow:<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    download:<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    trash:<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></>,
    globe:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    dollar:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    star:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    users:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    link:<><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
  };
  return <svg width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">{p[n]}</svg>;
};

const Badge = ({ children, v = 'def' }) => {
  const c = { def:{bg:'#f1f5f9',c:'#475569'},ok:{bg:'#d1fae5',c:'#059669'},warn:{bg:'#fef3c7',c:'#d97706'},err:{bg:'#fee2e2',c:'#dc2626'},pri:{bg:'#e0f2fe',c:BLUE} }[v] || { bg:'#f1f5f9',c:'#475569' };
  return <span style={{display:'inline-flex',alignItems:'center',padding:'5px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:600,background:c.bg,color:c.c}}>{children}</span>;
};

const PosBadge = ({ r }) => {
  const n = typeof r === 'string' && r.startsWith('+') ? 99 : r;
  let v = 'err';
  if (n !== 'N/A' && n !== null && typeof n === 'number') { if (n <= 3) v = 'ok'; else if (n <= 7) v = 'warn'; }
  return <Badge v={v}>{r === 'N/A' || r === null ? 'N/A' : typeof r === 'number' ? '#' + r : r}</Badge>;
};

const st = {
  page:{minHeight:'100vh',background:BG,color:'#1e293b',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"},
  header:{background:'#fff',borderBottom:'1px solid #cbd5e1',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between'},
  container:{maxWidth:'1100px',margin:'0 auto',padding:'40px 24px'},
  card:{background:'#fff',borderRadius:'12px',boxShadow:'0 4px 24px rgba(0,0,0,0.2)',padding:'24px',marginBottom:'20px'},
  btn:{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:600,cursor:'pointer',border:'none',transition:'all 0.2s'},
  btnP:{background:BLUE,color:'#fff',boxShadow:'0 4px 14px rgba(12,74,110,0.4)'},
  btnS:{background:'#f1f5f9',color:'#475569',border:'1px solid #cbd5e1'},
  btnO:{background:'#fff',color:BLUE,border:'2px solid '+BLUE},
  btnG:{background:'#059669',color:'#fff',boxShadow:'0 4px 14px rgba(5,150,105,0.4)'},
  input:{width:'100%',padding:'12px 14px',background:'#fff',border:'1px solid #cbd5e1',borderRadius:'8px',fontSize:'14px',color:'#1e293b',outline:'none',boxSizing:'border-box'},
  label:{display:'block',fontSize:'13px',fontWeight:500,color:'#64748b',marginBottom:'6px'},
  row:{display:'grid',gap:'16px',marginBottom:'16px'},
};

export default function App() {
  const [lang, setLang] = useState(null);
  const [auth, setAuth] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdErr, setPwdErr] = useState(false);
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [biz, setBiz] = useState('');
  const [locs, setLocs] = useState([{id:1,pid:'',name:'',city:'',lat:'',lon:'',ld:false,err:'',rat:null,rev:null,vol:'',q:'',res:[],sh:false}]);
  const [kws, setKws] = useState(['']);
  const [results, setResults] = useState(null);
  const [prog, setProg] = useState(0);
  const [progT, setProgT] = useState('');
  const [pan, setPan] = useState('');
  const [showFinancial, setShowFinancial] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [solutionTab, setSolutionTab] = useState(1); // 1=Optimisation, 2=Réputation, 3=Pertinence

  const t = lang ? T[lang] : T.fr;
  const login = () => pwd === PASSWORD ? setAuth(true) : setPwdErr(true);
  const addLoc = () => setLocs([...locs,{id:Date.now(),pid:'',name:'',city:'',lat:'',lon:'',ld:false,err:'',rat:null,rev:null,vol:'',q:'',res:[],sh:false}]);
  const upLoc = (id,k,v) => setLocs(locs.map(l=>l.id===id?{...l,[k]:v}:l));
  const rmLoc = id => locs.length > 1 && setLocs(locs.filter(l=>l.id!==id));
  const extractCity = (addr) => { if(!addr)return'';const parts=addr.split(',').map(p=>p.trim());for(let i=parts.length-2;i>=0;i--){const c=parts[i].replace(/\d{5}/g,'').trim();if(c&&c.length>2&&!/france|itali|germany|belgi/i.test(c))return c;}return parts[0]||''; };

  const searchP = async (id,q) => {
    if(!apiKey||q.length<3)return;
    setLocs(ls=>ls.map(l=>l.id===id?{...l,ld:true,err:'',sh:false}:l));
    try{
      const r=await fetch('/api/serpapi',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({apiKey,action:'searchPlaces',query:q,limit:30})});
      const d=await r.json();
      setLocs(ls=>ls.map(l=>l.id===id?{...l,ld:false,res:d.places||[],sh:d.places?.length>0,err:d.places?.length?'':'Aucun résultat'}:l));
    }catch{setLocs(ls=>ls.map(l=>l.id===id?{...l,ld:false,err:'Erreur'}:l));}
  };

  const selP = (id,p) => {
    const city=extractCity(p.address);
    setLocs(ls=>ls.map(l=>l.id===id?{...l,pid:p.placeId,name:p.name,city,lat:p.lat,lon:p.lon,rat:p.rating,rev:p.reviews,q:p.name,res:[],sh:false}:l));
  };

  const canLaunch = biz.trim() && locs.some(l=>l.pid) && kws.some(k=>k.trim());

  const run = async () => {
    setStep(3);setProg(0);setShowFinancial(false);setShowSolutions(false);
    const validKws=kws.filter(k=>k.trim());
    const valid=locs.filter(l=>l.pid&&l.lat);
    const tot=valid.length*validKws.length;
    let done=0;
    const r={biz,locs:[],comp:[],sum:{tot:valid.length,avgR:0,totRev:0,t3:0,t7:0,inv:0}};

    for(const loc of valid){
      const lr={...loc,ranks:[],stat:'moyen',t3:0,t7:0,inv:0,topCompetitor:null};
      for(const kw of validKws){
        setProgT(kw);
        try{
          const rs=await fetch('/api/serpapi',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({apiKey,action:'searchRanking',keyword:kw,lat:loc.lat,lon:loc.lon})});
          const d=await rs.json();
          let rk='N/A';
          if(d.local_results){
            for(let i=0;i<d.local_results.length;i++)if(d.local_results[i].place_id===loc.pid){rk=i+1;break;}
            if(rk==='N/A'&&d.local_results.length)rk='+'+d.local_results.length;
            if(!lr.topCompetitor&&d.local_results.length>0){const fc=d.local_results.find(c=>c.place_id!==loc.pid);if(fc)lr.topCompetitor={name:fc.title,rating:fc.rating,reviews:fc.reviews,position:d.local_results.indexOf(fc)+1};}
          }
          if(d.competitors)d.competitors.forEach(c=>{if(!r.comp.find(x=>x.placeId===c.placeId))r.comp.push(c);});
          lr.ranks.push({kw,rk});
          if(typeof rk==='number'){if(rk<=3){r.sum.t3++;lr.t3++;}if(rk<=7){r.sum.t7++;lr.t7++;}}else{r.sum.inv++;lr.inv++;}
        }catch{lr.ranks.push({kw,rk:'ERR'});lr.inv++;r.sum.inv++;}
        done++;setProg(Math.round(done/tot*100));
        await new Promise(x=>setTimeout(x,1500));
      }
      const kc=validKws.length;
      if(lr.t3/kc>=0.7&&lr.rat>=4.5)lr.stat='excellent';else if(lr.t3/kc>=0.5)lr.stat='bon';else if(lr.t7/kc>=0.3)lr.stat='moyen';else if(lr.inv/kc>=0.5)lr.stat='critique';else lr.stat='faible';
      if(lr.rat)r.sum.avgR+=lr.rat;if(lr.rev)r.sum.totRev+=lr.rev;
      r.locs.push(lr);
    }
    const wr=r.locs.filter(l=>l.rat);if(wr.length)r.sum.avgR=(r.sum.avgR/wr.length).toFixed(1);
    const tt=r.sum.tot*validKws.length;r.sum.visPct=Math.round((tt-r.sum.inv)/tt*100);
    r.kws=validKws;
    const cc={};r.comp.forEach(c=>cc[c.placeId]=cc[c.placeId]?{...cc[c.placeId],cnt:cc[c.placeId].cnt+1}:{...c,cnt:1});r.topComp=Object.values(cc).sort((a,b)=>b.cnt-a.cnt).slice(0,5);
    setResults(r);setStep(4);
  };

  // Calcul financier
  const calcFinancial = () => {
    if(!results||!pan)return null;
    const pn=parseFloat(pan)||0;
    const convRate=0.04;
    results.locs.forEach(l=>{
      const ir=l.inv/results.kws.length;
      const pr=(results.kws.length-l.t7)/results.kws.length;
      const v=parseInt(l.vol)||500;
      l.loss=Math.round(v*0.35*(ir+pr*0.5)*12*convRate*pn/1000);
    });
    const tl=results.locs.reduce((s,l)=>s+(l.loss||0),0);
    const partooCost=getPartooPricing(results.sum.tot);
    const gainYear1=Math.round(tl*0.65*1000);
    const netBenefit=gainYear1-partooCost;
    return {
      tl,pg:Math.round(tl*0.65),partooCost,gainYear1,netBenefit,
      roi:partooCost>0?Math.round((gainYear1/partooCost)*100):0,
      roiMultiple:partooCost>0?(gainYear1/partooCost).toFixed(1):'0',
      be:gainYear1>partooCost?Math.round((partooCost/gainYear1)*12)+' mois':'N/A',
      lpy:Math.round(tl*0.65/pn*1000)
    };
  };

  // LANG SELECTION
  if(!lang)return(
    <div style={st.page}><div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={st.card}>
        <div style={{width:'56px',height:'56px',background:'#e0f2fe',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:BLUE}}><Ic n="globe" s={26}/></div>
        <h1 style={{fontSize:'22px',fontWeight:600,marginBottom:'6px',textAlign:'center'}}>Audit SEO Local</h1>
        <p style={{color:'#64748b',marginBottom:'24px',textAlign:'center',fontSize:'14px'}}>Sélectionnez votre langue / Seleziona la lingua</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
          <button onClick={()=>setLang('fr')} style={{...st.btn,...st.btnS,padding:'20px',flexDirection:'column',gap:'4px'}}><span style={{fontSize:'20px',fontWeight:700}}>FR</span><span style={{fontSize:'12px',color:'#94a3b8'}}>Français</span></button>
          <button onClick={()=>setLang('it')} style={{...st.btn,...st.btnS,padding:'20px',flexDirection:'column',gap:'4px'}}><span style={{fontSize:'20px',fontWeight:700}}>IT</span><span style={{fontSize:'12px',color:'#94a3b8'}}>Italiano</span></button>
        </div>
      </div>
    </div></div>
  );

  // LOGIN
  if(!auth)return(
    <div style={st.page}><div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{...st.card,width:'380px'}}>
        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <div style={{width:'52px',height:'52px',background:'#e0f2fe',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',color:BLUE}}><Ic n="lock" s={24}/></div>
          <h1 style={{fontSize:'20px',fontWeight:600,marginBottom:'4px'}}>{t.login}</h1>
          <p style={{color:'#64748b',fontSize:'14px'}}>{t.sub}</p>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label style={st.label}>{t.pwd}</label>
          <input type="password" style={{...st.input,borderColor:pwdErr?'#ef4444':'#cbd5e1'}} placeholder={t.pwdPh} value={pwd} onChange={e=>{setPwd(e.target.value);setPwdErr(false);}} onKeyPress={e=>e.key==='Enter'&&login()}/>
          {pwdErr&&<p style={{color:'#ef4444',fontSize:'12px',marginTop:'6px'}}>{t.pwdErr}</p>}
        </div>
        <button style={{...st.btn,...st.btnP,width:'100%'}} onClick={login}>{t.access}<Ic n="arrow" s={16}/></button>
      </div>
    </div></div>
  );

  // STEP 1 - API KEY
  if(step===1)return(
    <div style={st.page}>
      <header style={st.header}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><div style={{color:BLUE}}><Ic n="chart" s={22}/></div><span style={{fontWeight:600}}>{t.header}</span></div></header>
      <div style={st.container}>
        <div style={{maxWidth:'500px',margin:'0 auto',textAlign:'center'}}>
          <Badge v="pri">{t.badge}</Badge>
          <h1 style={{fontSize:'28px',fontWeight:700,marginTop:'16px',marginBottom:'10px',color:'#fff'}}>{t.title}</h1>
          <p style={{color:'#94a3b8',marginBottom:'40px'}}>{t.desc}</p>
          <div style={st.card}>
            <h2 style={{fontSize:'16px',fontWeight:600,marginBottom:'16px',textAlign:'left'}}>{t.apiTitle}</h2>
            <div style={{background:'#f8fafc',borderRadius:'8px',padding:'14px',marginBottom:'20px',textAlign:'left',fontSize:'13px',color:'#64748b'}}>
              <ol style={{margin:0,paddingLeft:'18px'}}>
                <li>Créez un compte sur <a href="https://serpapi.com" target="_blank" rel="noreferrer" style={{color:BLUE}}>serpapi.com</a></li>
                <li>Copiez votre clé API</li>
                <li>100 recherches/mois gratuites</li>
              </ol>
            </div>
            <div style={{marginBottom:'20px',textAlign:'left'}}>
              <label style={st.label}>{t.apiLabel}</label>
              <input type="password" style={st.input} placeholder={t.apiPh} value={apiKey} onChange={e=>setApiKey(e.target.value)}/>
            </div>
            <button style={{...st.btn,...st.btnP,width:'100%'}} onClick={()=>apiKey&&setStep(2)}>{t.cont}<Ic n="arrow" s={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );

  // STEP 2 - CONFIG
  if(step===2)return(
    <div style={st.page}>
      <header style={st.header}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><div style={{color:BLUE}}><Ic n="chart" s={22}/></div><span style={{fontWeight:600}}>{t.header}</span></div><button style={{...st.btn,...st.btnS}} onClick={()=>setStep(1)}>{t.back}</button></header>
      <div style={st.container}>
        <h1 style={{fontSize:'24px',fontWeight:600,marginBottom:'28px',textAlign:'center',color:'#fff'}}>{t.config}</h1>
        
        {/* Nom entreprise uniquement */}
        <div style={st.card}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px'}}><div style={{width:'36px',height:'36px',background:'#e0f2fe',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:BLUE}}><Ic n="building" s={18}/></div><h2 style={{fontSize:'15px',fontWeight:600}}>{t.bizName.replace(' *','')}</h2></div>
          <input style={st.input} placeholder={t.bizPh} value={biz} onChange={e=>setBiz(e.target.value)}/>
        </div>

        {/* Établissements */}
        <div style={st.card}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px'}}><div style={{width:'36px',height:'36px',background:'#fef3c7',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:'#d97706'}}><Ic n="pin" s={18}/></div><h2 style={{fontSize:'15px',fontWeight:600}}>{t.etabTitle}</h2></div>
          {locs.map((l,i)=>(
            <div key={l.id} style={{background:'#f8fafc',borderRadius:'10px',padding:'20px',marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <span style={{fontWeight:600,display:'flex',alignItems:'center',gap:'10px'}}><span style={{width:'26px',height:'26px',background:BLUE,borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:700,color:'#fff'}}>{i+1}</span>{t.etab}</span>
                {locs.length>1&&<button onClick={()=>rmLoc(l.id)} style={{...st.btn,background:'#fee2e2',color:'#dc2626',padding:'8px 12px',boxShadow:'none'}}><Ic n="trash" s={14}/></button>}
              </div>
              <div style={{position:'relative',marginBottom:'16px'}}>
                <div style={{display:'flex',gap:'10px'}}><input style={{...st.input,flex:1}} placeholder={t.search} value={l.q} onChange={e=>upLoc(l.id,'q',e.target.value)} onKeyPress={e=>e.key==='Enter'&&searchP(l.id,l.q)}/><button style={{...st.btn,...st.btnP,padding:'12px 16px'}} onClick={()=>searchP(l.id,l.q)} disabled={l.ld}>{l.ld?'...':<Ic n="search" s={18}/>}</button></div>
                {l.sh&&l.res.length>0&&(<div style={{position:'absolute',top:'100%',left:0,right:0,background:'#fff',border:'1px solid #cbd5e1',borderRadius:'10px',marginTop:'8px',maxHeight:'400px',overflowY:'auto',zIndex:100,boxShadow:'0 10px 40px rgba(0,0,0,0.15)'}}>{l.res.slice(0,30).map((p,j)=>(<div key={j} onClick={()=>selP(l.id,p)} style={{padding:'14px 16px',borderBottom:'1px solid #f1f5f9',cursor:'pointer'}}><div style={{fontWeight:600,marginBottom:'3px',fontSize:'14px'}}>{p.name}</div><div style={{fontSize:'12px',color:'#64748b'}}>{p.address}</div>{p.rating&&<div style={{marginTop:'5px',fontSize:'13px',color:'#d97706',fontWeight:500}}>★ {p.rating} ({p.reviews} {t.avis})</div>}</div>))}</div>)}
              </div>
              {l.err&&<div style={{color:'#dc2626',fontSize:'13px',marginBottom:'12px',padding:'10px 14px',background:'#fee2e2',borderRadius:'8px'}}>{l.err}</div>}
              {l.name&&(<div style={{background:'#d1fae5',borderRadius:'8px',padding:'14px 16px',marginBottom:'16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontWeight:600,color:'#059669',marginBottom:'2px',display:'flex',alignItems:'center',gap:'8px',fontSize:'14px'}}><Ic n="check" s={16}/>{l.name}</div><div style={{fontSize:'13px',color:'#64748b'}}>{l.city}</div></div>{l.rat&&<span style={{color:'#d97706',fontWeight:600,fontSize:'14px'}}>★ {l.rat}</span>}</div>)}
              <div style={{...st.row,gridTemplateColumns:'1fr 1fr'}}><div><label style={st.label}>{t.cityL}</label><input style={st.input} placeholder={t.cityPh} value={l.city} onChange={e=>upLoc(l.id,'city',e.target.value)}/></div><div><label style={st.label}>{t.volL}</label><input style={st.input} type="number" placeholder="500" value={l.vol} onChange={e=>upLoc(l.id,'vol',e.target.value)}/><div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'8px',fontSize:'11px',color:'#64748b'}}><Ic n="info" s={12}/>{t.volInfo}</div></div></div>
            </div>
          ))}
          <button onClick={addLoc} style={{...st.btn,...st.btnO,width:'100%'}}><Ic n="plus" s={18}/>{t.addEtab}</button>
        </div>

        {/* Mots-clés */}
        <div style={st.card}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px'}}><div style={{width:'36px',height:'36px',background:'#d1fae5',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:'#059669'}}><Ic n="target" s={18}/></div><h2 style={{fontSize:'15px',fontWeight:600}}>{t.kwTitle}</h2></div>
          {kws.map((k,i)=>(<div key={i} style={{display:'flex',gap:'10px',marginBottom:'12px',alignItems:'center'}}><span style={{minWidth:'90px',fontSize:'13px',fontWeight:500,color:'#64748b'}}>Mot-clé {i+1}</span><input style={{...st.input,flex:1}} value={k} onChange={e=>{const n=[...kws];n[i]=e.target.value;setKws(n);}} placeholder={t.kwPh}/>{kws.length>1&&<button onClick={()=>setKws(kws.filter((_,j)=>j!==i))} style={{...st.btn,background:'#fee2e2',color:'#dc2626',padding:'10px 14px',boxShadow:'none'}}><Ic n="x" s={16}/></button>}</div>))}
          <button onClick={()=>setKws([...kws,''])} style={{...st.btn,...st.btnO,marginTop:'8px'}}><Ic n="plus" s={16}/>{t.addKw}</button>
        </div>

        <div style={{textAlign:'center',marginTop:'32px'}}><button style={{...st.btn,...st.btnP,padding:'14px 40px',fontSize:'15px',opacity:canLaunch?1:0.5}} onClick={run} disabled={!canLaunch}>{t.launch}<Ic n="arrow" s={18}/></button></div>
      </div>
    </div>
  );

  // STEP 3 - LOADING
  if(step===3)return(
    <div style={st.page}><header style={st.header}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><div style={{color:BLUE}}><Ic n="chart" s={22}/></div><span style={{fontWeight:600}}>{t.header}</span></div></header>
      <div style={st.container}><div style={{...st.card,maxWidth:'450px',margin:'60px auto',textAlign:'center',padding:'50px 40px'}}><div style={{fontSize:'56px',fontWeight:700,color:BLUE,marginBottom:'16px'}}>{prog}%</div><div style={{height:'8px',background:'#e2e8f0',borderRadius:'4px',overflow:'hidden',marginBottom:'28px'}}><div style={{width:prog+'%',height:'100%',background:BLUE,borderRadius:'4px',transition:'width 0.3s'}}/></div><h2 style={{fontSize:'18px',fontWeight:600,marginBottom:'10px'}}>{t.analyzing}</h2><p style={{fontSize:'14px',color:'#64748b',marginBottom:'6px'}}>{progT}</p><p style={{fontSize:'13px',color:'#94a3b8'}}>{t.wait}</p></div></div>
    </div>
  );

  // STEP 4 - RESULTS
  if(step===4&&results){
    const r=results;
    const fin=showFinancial?calcFinancial():null;

    // PAGE SOLUTIONS PARTOO
    if(showSolutions){
      return(
        <div style={st.page}>
          <style>{`@media print{.noprint{display:none!important}}`}</style>
          <header style={st.header} className="noprint">
            <div style={{display:'flex',alignItems:'center',gap:'14px'}}><div style={{fontWeight:600,fontSize:'15px'}}>{r.biz}</div></div>
            <button style={{...st.btn,...st.btnS}} onClick={()=>setShowSolutions(false)}><Ic n="arrow" s={16}/>{t.backToReport}</button>
          </header>
          <div style={{background:'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',minHeight:'calc(100vh - 60px)'}}>
            <div style={st.container}>
              {/* Titre principal */}
              <div style={{textAlign:'center',marginBottom:'40px',paddingTop:'20px'}}>
                <h1 style={{fontSize:'28px',fontWeight:700,color:'#0f172a',marginBottom:'8px'}}>Apparaître sur les recherches découvertes</h1>
              </div>

              {/* 3 Piliers overview */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'24px',marginBottom:'40px'}}>
                {[
                  {id:1,icon:'📈',title:t.pillar1,color:'#0ea5e9',items:['Database : complétion & mise à jour','Fonctionnalités : actualités, produits, messages…']},
                  {id:2,icon:'👥',title:t.pillar2,color:'#f59e0b',items:['Avis : volume, note moyenne, fraîcheur','Traitement : taux de réponse, délais, mots clés']},
                  {id:3,icon:'🔗',title:t.pillar3,color:'#8b5cf6',items:['Multidiffusion : uniformisation sur les plateformes d\'autorité de Google']}
                ].map(p=>(
                  <div key={p.id} onClick={()=>setSolutionTab(p.id)} style={{background:'#fff',borderRadius:'16px',padding:'24px',cursor:'pointer',border:solutionTab===p.id?`3px solid ${p.color}`:'3px solid transparent',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',transition:'all 0.2s'}}>
                    <div style={{fontSize:'32px',marginBottom:'12px'}}>{p.icon}</div>
                    <h3 style={{fontSize:'18px',fontWeight:700,color:'#0f172a',marginBottom:'12px'}}>{p.title}</h3>
                    {p.items.map((item,i)=><p key={i} style={{fontSize:'13px',color:'#64748b',marginBottom:'6px'}}>{item}</p>)}
                  </div>
                ))}
              </div>

              {/* Contenu détaillé selon l'onglet */}
              <div style={{...st.card,padding:'32px'}}>
                {/* OPTIMISATION */}
                {solutionTab===1&&(
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
                      <div style={{width:'48px',height:'48px',background:'#e0f2fe',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>📈</div>
                      <div>
                        <div style={{color:'#0ea5e9',fontSize:'14px',fontWeight:600}}>{t.pillar1}:</div>
                        <h2 style={{fontSize:'22px',fontWeight:700,color:'#0f172a'}}>{t.pillarTitle}</h2>
                      </div>
                    </div>
                    <div style={{width:'60px',height:'4px',background:'#0ea5e9',borderRadius:'2px',marginBottom:'32px'}}/>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px 48px'}}>
                      {[t.opt1,t.opt2,t.opt3,t.opt4,t.opt5,t.opt6,t.opt7,t.opt8,t.opt9,t.opt10,t.opt11,t.opt12,t.opt13,t.opt14,t.opt15].map((item,i)=>(
                        <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'8px 0'}}>
                          <div style={{width:'28px',height:'28px',background:'#d1fae5',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#059669',flexShrink:0}}>✓</div>
                          <span style={{fontSize:'15px',color:'#1e293b'}}>{item}</span>
                          {i===13&&<span style={{background:'#8b5cf6',color:'#fff',fontSize:'10px',padding:'2px 8px',borderRadius:'4px',fontWeight:600}}>NEW</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RÉPUTATION */}
                {solutionTab===2&&(
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
                      <div style={{width:'48px',height:'48px',background:'#fef3c7',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>👥</div>
                      <div>
                        <div style={{color:'#f59e0b',fontSize:'14px',fontWeight:600}}>{t.pillar2}:</div>
                        <h2 style={{fontSize:'22px',fontWeight:700,color:'#0f172a'}}>{t.pillarTitle}</h2>
                      </div>
                    </div>
                    <div style={{width:'60px',height:'4px',background:'#f59e0b',borderRadius:'2px',marginBottom:'32px'}}/>
                    <div style={{display:'flex',alignItems:'flex-start',gap:'40px'}}>
                      <div style={{width:'60px',background:'linear-gradient(to top, #bfdbfe, #3b82f6)',borderRadius:'8px',height:'300px',position:'relative'}}>
                        <div style={{position:'absolute',top:'-10px',left:'50%',transform:'translateX(-50)',fontSize:'24px'}}>▲</div>
                      </div>
                      <div style={{flex:1}}>
                        {[
                          {icon:'⚙️',text:t.rep1},
                          {icon:'🕐',text:t.rep2},
                          {icon:'👍',text:t.rep3},
                          {icon:'💬',text:t.rep4},
                          {icon:'📝',text:t.rep5}
                        ].map((item,i)=>(
                          <div key={i} style={{display:'flex',alignItems:'center',gap:'16px',padding:'20px 0',borderBottom:i<4?'1px solid #f1f5f9':'none'}}>
                            <div style={{width:'48px',height:'48px',background:'#f1f5f9',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>{item.icon}</div>
                            <span style={{fontSize:'16px',color:'#1e293b',fontWeight:500}}>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* PERTINENCE */}
                {solutionTab===3&&(
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
                      <div style={{width:'48px',height:'48px',background:'#ede9fe',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>🔗</div>
                      <div>
                        <div style={{color:'#8b5cf6',fontSize:'14px',fontWeight:600}}>{t.pillar3}:</div>
                        <h2 style={{fontSize:'22px',fontWeight:700,color:'#0f172a'}}>{t.pillarTitle}</h2>
                      </div>
                    </div>
                    <div style={{width:'60px',height:'4px',background:'#8b5cf6',borderRadius:'2px',marginBottom:'32px'}}/>
                    
                    {/* Plateformes principales */}
                    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'20px',marginBottom:'24px'}}>
                      {['GBP','G-Maps','Facebook','Factual','Apple plans','Siri','TikTok*'].map((p,i)=>(
                        <div key={i} style={{textAlign:'center'}}>
                          <div style={{width:'56px',height:'56px',background:['#e0f2fe','#d1fae5','#dbeafe','#fef3c7','#f3f4f6','#fef3c7','#fce7f3'][i],borderRadius:'50%',margin:'0 auto 8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>
                            {['G','📍','f','F','','🔊','♪'][i]}
                          </div>
                          <span style={{fontSize:'12px',color:'#64748b'}}>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'20px',marginBottom:'24px'}}>
                      {['Snapchat','Waze','Here','Tomtom','Mappy*','Hoodspot','Justacoté','118 000'].map((p,i)=>(
                        <div key={i} style={{textAlign:'center'}}>
                          <div style={{width:'56px',height:'56px',background:'#f1f5f9',borderRadius:'50%',margin:'0 auto 8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>
                            {['👻','W','H','T','M','H','J','118'][i]}
                          </div>
                          <span style={{fontSize:'12px',color:'#64748b'}}>{p}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p style={{fontSize:'12px',color:'#94a3b8',fontStyle:'italic',marginBottom:'24px'}}>{t.pertNote}</p>
                    <div style={{background:'#f8fafc',borderRadius:'8px',padding:'16px',textAlign:'center'}}>
                      <p style={{fontSize:'14px',fontWeight:600,color:'#64748b'}}>{t.pertMore}</p>
                    </div>
                    
                    {/* Logos GPS */}
                    <div style={{marginTop:'24px',display:'flex',gap:'24px',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                      {['Instagram (via Facebook)','Garmin (via Here)','Via Michelin (via TomTom)','Renault (via Waze)','GPS embarqués (via Here)'].map((p,i)=>(
                        <div key={i} style={{textAlign:'center',padding:'12px'}}>
                          <div style={{width:'40px',height:'40px',background:'#f1f5f9',borderRadius:'8px',margin:'0 auto 6px'}}/>
                          <span style={{fontSize:'10px',color:'#94a3b8'}}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // PAGE RAPPORT PRINCIPAL
    return(
      <div style={st.page}>
        <style>{`@media print{.noprint{display:none!important}}`}</style>
        <header style={st.header} className="noprint">
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}><div><div style={{fontWeight:600,fontSize:'15px'}}>{r.biz}</div></div></div>
          <div style={{display:'flex',gap:'10px'}}>
            <button style={{...st.btn,...st.btnS}} onClick={()=>{setStep(2);setResults(null);setShowFinancial(false);setPan('');}}>{t.newA}</button>
            <button style={{...st.btn,...st.btnP}} onClick={()=>window.print()}><Ic n="download" s={16}/>{t.pdf}</button>
          </div>
        </header>
        <div style={st.container}>
          {/* Header rapport */}
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <Badge v="pri">{t.report}</Badge>
            <h1 style={{fontSize:'32px',fontWeight:700,marginTop:'14px',marginBottom:'8px',color:'#fff'}}>{r.biz}</h1>
            <p style={{color:'#94a3b8',fontSize:'15px'}}>{r.sum.tot} {t.etabs}</p>
          </div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'24px'}}>
            {[
              {l:t.statEtab,v:r.sum.tot,c:'#0ea5e9'},
              {l:t.statNote,v:r.sum.avgR||'N/A',c:'#f59e0b'},
              {l:t.statReq,v:r.kws.length,c:'#8b5cf6'},
              {l:t.statVis,v:r.sum.visPct+'%',c:r.sum.visPct>=50?'#059669':'#ef4444'}
            ].map((s,i)=>(
              <div key={i} style={{...st.card,textAlign:'center',padding:'20px'}}>
                <div style={{fontSize:'28px',fontWeight:700,color:s.c}}>{s.v}</div>
                <div style={{fontSize:'12px',color:'#64748b',marginTop:'4px'}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Diagnostic */}
          <div style={st.card}>
            <h3 style={{fontSize:'16px',fontWeight:600,marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px'}}><Ic n="target" s={18}/>{t.diag}</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
              <div style={{background:'#d1fae5',borderRadius:'10px',padding:'16px',textAlign:'center'}}><div style={{fontSize:'24px',fontWeight:700,color:'#059669'}}>{r.sum.t3}</div><div style={{fontSize:'12px',color:'#059669'}}>{t.top3}</div><div style={{fontSize:'10px',color:'#6b7280',marginTop:'4px'}}>{t.exc}</div></div>
              <div style={{background:'#fef3c7',borderRadius:'10px',padding:'16px',textAlign:'center'}}><div style={{fontSize:'24px',fontWeight:700,color:'#d97706'}}>{r.sum.t7-r.sum.t3}</div><div style={{fontSize:'12px',color:'#d97706'}}>{t.pos47}</div><div style={{fontSize:'10px',color:'#6b7280',marginTop:'4px'}}>{t.imp}</div></div>
              <div style={{background:'#fee2e2',borderRadius:'10px',padding:'16px',textAlign:'center'}}><div style={{fontSize:'24px',fontWeight:700,color:'#dc2626'}}>{r.sum.inv}</div><div style={{fontSize:'12px',color:'#dc2626'}}>{t.pos8}</div><div style={{fontSize:'10px',color:'#6b7280',marginTop:'4px'}}>{t.crit}</div></div>
            </div>
          </div>

          {/* Détail par établissement */}
          <div style={st.card}>
            <h3 style={{fontSize:'16px',fontWeight:600,marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px'}}><Ic n="building" s={18}/>{t.detail}</h3>
            {r.locs.map((l,i)=>(
              <div key={i} style={{background:'#f8fafc',borderRadius:'10px',padding:'20px',marginBottom:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                  <div>
                    <h4 style={{fontWeight:600,fontSize:'15px',marginBottom:'4px'}}>{l.name}</h4>
                    <p style={{fontSize:'13px',color:'#64748b'}}>{l.city}</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    {l.rat&&<div style={{color:'#d97706',fontWeight:600}}>★ {l.rat}</div>}
                    {l.rev&&<div style={{fontSize:'12px',color:'#64748b'}}>{l.rev} {t.avis}</div>}
                  </div>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                  {l.ranks.map((rk,j)=>(
                    <div key={j} style={{background:'#fff',borderRadius:'6px',padding:'8px 12px',display:'flex',alignItems:'center',gap:'8px',border:'1px solid #e2e8f0'}}>
                      <span style={{fontSize:'12px',color:'#64748b'}}>{rk.kw}</span>
                      <PosBadge r={rk.rk}/>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Concurrents */}
          {r.topComp&&r.topComp.length>0&&(
            <div style={st.card}>
              <h3 style={{fontSize:'16px',fontWeight:600,marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px'}}><Ic n="users" s={18}/>{t.comp}</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px'}}>
                {r.topComp.slice(0,5).map((c,i)=>(
                  <div key={i} style={{background:'#f8fafc',borderRadius:'8px',padding:'14px',display:'flex',alignItems:'center',gap:'12px'}}>
                    <div style={{width:'32px',height:'32px',background:i===0?'#fef3c7':'#f1f5f9',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:i===0?'#d97706':'#64748b',fontSize:'14px'}}>{i+1}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:600,fontSize:'13px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.name}</div>
                      {c.rating&&<div style={{fontSize:'12px',color:'#d97706'}}>★ {c.rating}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ÉTAPE 2 - CALCUL FINANCIER */}
          <div style={{...st.card,background:'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',color:'#fff',border:'2px solid #0ea5e9'}}>
            <h3 style={{fontSize:'18px',fontWeight:600,marginBottom:'8px',color:'#fff'}}>{t.step2Title}</h3>
            <p style={{fontSize:'14px',color:'#94a3b8',marginBottom:'20px'}}>{t.step2Desc}</p>
            
            <div style={{display:'flex',gap:'16px',alignItems:'flex-end',marginBottom:'24px'}}>
              <div style={{flex:1}}>
                <label style={{...st.label,color:'#94a3b8'}}>{t.panL}</label>
                <input style={{...st.input,background:'#1e293b',border:'1px solid #475569',color:'#fff'}} type="number" placeholder={t.panPh} value={pan} onChange={e=>setPan(e.target.value)}/>
              </div>
              <button style={{...st.btn,...st.btnG,padding:'12px 32px'}} onClick={()=>setShowFinancial(true)} disabled={!pan}>{t.calculate}</button>
            </div>

            {/* Résultats financiers */}
            {showFinancial&&fin&&(
              <div style={{borderTop:'1px solid #475569',paddingTop:'24px'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px',marginBottom:'20px'}}>
                  <div style={{background:'#fee2e2',borderRadius:'10px',padding:'20px',textAlign:'center'}}>
                    <div style={{fontSize:'12px',color:'#dc2626',marginBottom:'4px'}}>{t.fomoMonth}</div>
                    <div style={{fontSize:'28px',fontWeight:700,color:'#dc2626'}}>{Math.round(fin.tl/12).toLocaleString()}K€</div>
                  </div>
                  <div style={{background:'#fee2e2',borderRadius:'10px',padding:'20px',textAlign:'center'}}>
                    <div style={{fontSize:'12px',color:'#dc2626',marginBottom:'4px'}}>{t.fomoYear}</div>
                    <div style={{fontSize:'28px',fontWeight:700,color:'#dc2626'}}>{fin.tl.toLocaleString()}K€</div>
                  </div>
                </div>
                
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px'}}>
                  <div style={{background:'#1e293b',borderRadius:'8px',padding:'16px',textAlign:'center'}}>
                    <div style={{fontSize:'11px',color:'#94a3b8',marginBottom:'4px'}}>{t.inv}</div>
                    <div style={{fontSize:'18px',fontWeight:700,color:'#0ea5e9'}}>{fin.partooCost.toLocaleString()}€</div>
                  </div>
                  <div style={{background:'#1e293b',borderRadius:'8px',padding:'16px',textAlign:'center'}}>
                    <div style={{fontSize:'11px',color:'#94a3b8',marginBottom:'4px'}}>{t.pot}</div>
                    <div style={{fontSize:'18px',fontWeight:700,color:'#22c55e'}}>+{fin.pg}K€</div>
                  </div>
                  <div style={{background:'#1e293b',borderRadius:'8px',padding:'16px',textAlign:'center'}}>
                    <div style={{fontSize:'11px',color:'#94a3b8',marginBottom:'4px'}}>{t.roi}</div>
                    <div style={{fontSize:'18px',fontWeight:700,color:'#f59e0b'}}>{fin.roi}%</div>
                  </div>
                  <div style={{background:'#1e293b',borderRadius:'8px',padding:'16px',textAlign:'center'}}>
                    <div style={{fontSize:'11px',color:'#94a3b8',marginBottom:'4px'}}>{t.be}</div>
                    <div style={{fontSize:'18px',fontWeight:700,color:'#8b5cf6'}}>{fin.be}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ÉTAPE 3 - BOUTON SOLUTIONS */}
          <div style={{textAlign:'center',marginTop:'32px'}}>
            <button style={{...st.btn,...st.btnG,padding:'16px 48px',fontSize:'16px'}} onClick={()=>setShowSolutions(true)}>
              <Ic n="trending" s={20}/>{t.solutionsBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
