"use client";
import React, { useState } from 'react';

const PASSWORD = "Test2026_V1";
const BLUE = '#0c4a6e';
const BG = '#0f172a';

const PARTOO_PRICING = {1:800,2:1580,3:2340,4:3080,5:3800,6:4500,7:5180,8:5840,9:6480,10:7100,11:7700,12:8280,13:8840,14:9380,15:9900,16:10400,17:10880,18:11340,19:11780,20:12200,21:12600,22:12980,23:13340,24:13680,25:14000,26:14300,27:14580,28:14840,29:15080,30:15300};
const getPartooPricing = (n) => n <= 0 ? 0 : n <= 30 ? PARTOO_PRICING[n] : Math.round(15300 + (n - 30) * 500);

const T = {
  fr: { login:"Audit SEO Local",sub:"Outil d'analyse",pwd:"Mot de passe",pwdPh:"Entrez le mot de passe",pwdErr:"Incorrect",access:"Accéder",header:"Audit SEO Local",badge:"Automatisé",title:"Analysez votre visibilité locale",desc:"Audit complet avec positionnement et impact financier",apiTitle:"Clé API SerpAPI",apiLabel:"Clé API",apiPh:"Collez votre clé",cont:"Continuer",config:"Configuration",bizTitle:"Informations",bizName:"Nom de l'entreprise *",bizPh:"Ex: MiNiTAUX",logoL:"Logo URL",logoPh:"https://...",actL:"Activité",actPh:"Ex: courtier immobilier",panL:"Panier moyen €",panPh:"500",marL:"Marge %",marPh:"15",etabTitle:"Établissements",etab:"Établissement",cityL:"Ville",cityPh:"Ville",volL:"Volume recherches/mois",volInfo:"Retrouvez cette donnée sur Semrush.com",volUpload:"Capture Semrush",addEtab:"Ajouter un établissement",kwTitle:"Mots-clés à analyser",kwPh:"Ex: courtier immobilier",addKw:"Ajouter",back:"Retour",launch:"Lancer l'analyse",analyzing:"Analyse en cours",wait:"Veuillez patienter",report:"Rapport d'audit",etabs:"établissement(s)",statEtab:"Établissements",statNote:"Note moyenne",statReq:"Requêtes",statVis:"Visibilité",diag:"Diagnostic visibilité",top3:"Top 3",exc:"Excellent",pos47:"Position 4-7",imp:"À améliorer",pos8:"Position 8+",crit:"Critique",fin:"Impact financier",loss:"Perte annuelle estimée",lossD:"CA perdu par manque de visibilité",pot:"Potentiel récupérable",potD:"Récupérable en 12 mois",dist:"Répartition par établissement",inv:"Investissement Partoo",roi:"ROI estimé",be:"Break-even",leads:"Leads/an",comp:"Concurrents principaux",detail:"Analyse détaillée",note:"Note",avis:"Avis",posReq:"Positions",matrix:"Positionnement",newA:"Nouvel audit",pdf:"Exporter PDF",search:"Rechercher...",footer:"V1",fomo:"Ce que vos concurrents gagnent pendant que vous perdez",fomoSub:"Chaque jour sans action = CA offert à la concurrence",fomoMonth:"Perte ce mois",fomoYear:"Perte cette année",fomoComp:"Gain concurrent #1",roiTitle:"Retour sur investissement détaillé",roiCost:"Investissement Partoo",roiGain:"Gain potentiel an 1",roiNet:"Bénéfice net",roi12:"12 mois",roi24:"24 mois",roi36:"36 mois",roiFor:"Pour 1€ investi",benchTitle:"Benchmark sectoriel",benchYou:"Vous",benchAvg:"Moyenne secteur",benchTop:"Leaders",benchNote:"Note Google",benchAvis:"Nombre d'avis",benchPos:"Position moyenne",benchWhere:"Où vous situez-vous ?",avisTitle:"Gestion des avis",avisResp:"Réponse sous 24/48h",avisReg:"Dépôt avis régulier",avisNote:"Note entre 4.1 et 5",pertTitle:"Pertinence",pertinent:"Pertinent",nonPertinent:"Non pertinent",optTitle:"Optimisation fiche",optPresent:"Ce qui est présent",optMissing:"Ce qui manque",optPresentPh:"Ex: Photos, horaires...",optMissingPh:"Ex: Posts Google, Q&A...",concurrentDirect:"Concurrent direct" },
  it: { login:"Audit SEO Locale",sub:"Strumento di analisi",pwd:"Password",pwdPh:"Inserisci password",pwdErr:"Errata",access:"Accedi",header:"Audit SEO Locale",badge:"Automatizzato",title:"Analizza la visibilità locale",desc:"Audit completo con posizionamento e impatto",apiTitle:"Chiave API SerpAPI",apiLabel:"Chiave API",apiPh:"Incolla chiave",cont:"Continua",config:"Configurazione",bizTitle:"Informazioni",bizName:"Nome azienda *",bizPh:"Es: MiNiTAUX",logoL:"Logo URL",logoPh:"https://...",actL:"Attività",actPh:"Es: agente immobiliare",panL:"Scontrino medio €",panPh:"500",marL:"Margine %",marPh:"15",etabTitle:"Stabilimenti",etab:"Stabilimento",cityL:"Città",cityPh:"Città",volL:"Volume ricerche/mese",volInfo:"Trova su Semrush.com",volUpload:"Screenshot Semrush",addEtab:"Aggiungi stabilimento",kwTitle:"Parole chiave",kwPh:"Es: agente immobiliare",addKw:"Aggiungi",back:"Indietro",launch:"Avvia analisi",analyzing:"Analisi in corso",wait:"Attendere",report:"Rapporto audit",etabs:"stabilimento/i",statEtab:"Stabilimenti",statNote:"Valutazione",statReq:"Query",statVis:"Visibilità",diag:"Diagnosi visibilità",top3:"Top 3",exc:"Eccellente",pos47:"Posizione 4-7",imp:"Da migliorare",pos8:"Posizione 8+",crit:"Critico",fin:"Impatto finanziario",loss:"Perdita annuale stimata",lossD:"Fatturato perso",pot:"Potenziale recuperabile",potD:"Recuperabile in 12 mesi",dist:"Distribuzione",inv:"Investimento Partoo",roi:"ROI stimato",be:"Break-even",leads:"Lead/anno",comp:"Concorrenti principali",detail:"Analisi dettagliata",note:"Nota",avis:"Recensioni",posReq:"Posizioni",matrix:"Posizionamento",newA:"Nuovo audit",pdf:"Esporta PDF",search:"Cerca...",footer:"V1",fomo:"Cosa guadagnano i concorrenti mentre perdi",fomoSub:"Ogni giorno senza azione = fatturato regalato",fomoMonth:"Perdita mese",fomoYear:"Perdita anno",fomoComp:"Guadagno concorrente #1",roiTitle:"ROI dettagliato",roiCost:"Investimento Partoo",roiGain:"Guadagno anno 1",roiNet:"Beneficio netto",roi12:"12 mesi",roi24:"24 mesi",roi36:"36 mesi",roiFor:"Per 1€ investito",benchTitle:"Benchmark settoriale",benchYou:"Tu",benchAvg:"Media settore",benchTop:"Leader",benchNote:"Valutazione Google",benchAvis:"Numero recensioni",benchPos:"Posizione media",benchWhere:"Dove ti posizioni?",avisTitle:"Gestione recensioni",avisResp:"Risposta entro 24/48h",avisReg:"Deposito recensioni regolare",avisNote:"Nota tra 4.1 e 5",pertTitle:"Pertinenza",pertinent:"Pertinente",nonPertinent:"Non pertinente",optTitle:"Ottimizzazione scheda",optPresent:"Presente",optMissing:"Mancante",optPresentPh:"Es: Foto, orari...",optMissingPh:"Es: Post Google, Q&A...",concurrentDirect:"Concorrente diretto" }
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
    key:<><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>,
    upload:<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    info:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    clock:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    dollar:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    barChart:<><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    star:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    crosshair:<><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
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

const Checkbox = ({ checked, onChange, label }) => (
  <label style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',padding:'8px 0'}}>
    <div onClick={()=>onChange(!checked)} style={{width:'22px',height:'22px',borderRadius:'6px',border:checked?'none':'2px solid #cbd5e1',background:checked?'#059669':'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff'}}>{checked&&<Ic n="check" s={14}/>}</div>
    <span style={{fontSize:'14px',color:'#374151'}}>{label}</span>
  </label>
);

const st = {
  page:{minHeight:'100vh',background:BG,color:'#1e293b',fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"},
  header:{background:'#fff',borderBottom:'1px solid #cbd5e1',padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between'},
  container:{maxWidth:'1100px',margin:'0 auto',padding:'40px 24px'},
  card:{background:'#fff',borderRadius:'12px',boxShadow:'0 4px 24px rgba(0,0,0,0.2)',padding:'24px',marginBottom:'20px'},
  btn:{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'12px 24px',borderRadius:'8px',fontSize:'14px',fontWeight:600,cursor:'pointer',border:'none',transition:'all 0.2s'},
  btnP:{background:BLUE,color:'#fff',boxShadow:'0 4px 14px rgba(12,74,110,0.4)'},
  btnS:{background:'#f1f5f9',color:'#475569',border:'1px solid #cbd5e1'},
  btnO:{background:'#fff',color:BLUE,border:'2px solid '+BLUE},
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
  const [logo, setLogo] = useState('');
  const [met, setMet] = useState('');
  const [pan, setPan] = useState('');
  const [mar, setMar] = useState('15');
  const [locs, setLocs] = useState([{id:1,pid:'',name:'',city:'',lat:'',lon:'',ld:false,err:'',rat:null,rev:null,vol:'',q:'',res:[],sh:false,semrushImg:null,avisResp:false,avisReg:false,avisNote:false,pertinent:null,optPresent:'',optMissing:''}]);
  const [kws, setKws] = useState(['']);
  const [results, setResults] = useState(null);
  const [prog, setProg] = useState(0);
  const [progT, setProgT] = useState('');

  const t = lang ? T[lang] : T.fr;
  const login = () => pwd === PASSWORD ? setAuth(true) : setPwdErr(true);
  const addLoc = () => setLocs([...locs,{id:Date.now(),pid:'',name:'',city:'',lat:'',lon:'',ld:false,err:'',rat:null,rev:null,vol:'',q:'',res:[],sh:false,semrushImg:null,avisResp:false,avisReg:false,avisNote:false,pertinent:null,optPresent:'',optMissing:''}]);
  const upLoc = (id,k,v) => setLocs(locs.map(l=>l.id===id?{...l,[k]:v}:l));
  const rmLoc = id => locs.length > 1 && setLocs(locs.filter(l=>l.id!==id));
  const extractCity = (addr) => { if(!addr)return'';const parts=addr.split(',').map(p=>p.trim());for(let i=parts.length-2;i>=0;i--){const c=parts[i].replace(/\d{5}/g,'').trim();if(c&&c.length>2&&!/france|itali|germany|belgi/i.test(c))return c;}return parts[0]||''; };

  const searchP = async (id,q) => {
    if(!apiKey||q.length<3)return;
    setLocs(ls=>ls.map(l=>l.id===id?{...l,ld:true,err:'',sh:false}:l));
    try{
      const r=await fetch('/api/serpapi',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({apiKey,action:'searchPlaces',query:q})});
      const d=await r.json();
      setLocs(ls=>ls.map(l=>l.id===id?{...l,ld:false,res:d.places||[],sh:d.places?.length>0,err:d.places?.length?'':'Aucun résultat'}:l));
    }catch{setLocs(ls=>ls.map(l=>l.id===id?{...l,ld:false,err:'Erreur'}:l));}
  };

  const selP = (id,p) => {
    const city=extractCity(p.address);
    setLocs(ls=>ls.map(l=>l.id===id?{...l,pid:p.placeId,name:p.name,city,lat:p.lat,lon:p.lon,rat:p.rating,rev:p.reviews,q:p.name,res:[],sh:false}:l));
  };

  const handleSemrushUpload = (id,e) => { const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>upLoc(id,'semrushImg',ev.target.result);r.readAsDataURL(f);} };
  const canLaunch = biz.trim() && locs.some(l=>l.pid) && kws.some(k=>k.trim());

  const run = async () => {
    setStep(3);setProg(0);
    const validKws=kws.filter(k=>k.trim());
    const valid=locs.filter(l=>l.pid&&l.lat);
    const tot=valid.length*validKws.length;
    let done=0,pn=parseFloat(pan)||500,mg=parseFloat(mar)/100||0.15;
    const r={biz,logo,met,pan:pn,mar:mg,locs:[],comp:[],sum:{tot:valid.length,avgR:0,totRev:0,t3:0,t7:0,inv:0}};

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
    r.locs.forEach(l=>{const ir=l.inv/validKws.length,pr=(validKws.length-l.t7)/validKws.length,v=parseInt(l.vol)||500;l.loss=Math.round(v*0.35*(ir+pr*0.5)*12*0.04*pn*mg/1000);});
    const tl=r.locs.reduce((s,l)=>s+l.loss,0);
    const partooCost=getPartooPricing(r.sum.tot);
    const gainYear1=Math.round(tl*0.65*1000);
    const netBenefit=gainYear1-partooCost;
    r.fin={tl,pg:Math.round(tl*0.65),partooCost,gainYear1,netBenefit,roi:partooCost>0?Math.round((gainYear1/partooCost)*100):0,roiMultiple:partooCost>0?(gainYear1/partooCost).toFixed(1):'0',be:gainYear1>partooCost?Math.round((partooCost/gainYear1)*12)+' mois':'N/A',lpy:Math.round(tl*0.65/(pn*mg)*1000)};
    r.kws=validKws;
    const cc={};r.comp.forEach(c=>cc[c.placeId]=cc[c.placeId]?{...cc[c.placeId],cnt:cc[c.placeId].cnt+1}:{...c,cnt:1});r.topComp=Object.values(cc).sort((a,b)=>b.cnt-a.cnt).slice(0,5);
    setResults(r);setStep(4);
  };

  // LANG
  if(!lang)return(
    <div style={st.page}><div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={st.card}>
        <div style={{width:'56px',height:'56px',background:'#e0f2fe',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:BLUE}}><Ic n="globe" s={26}/></div>
        <h1 style={{fontSize:'22px',fontWeight:600,marginBottom:'6px',textAlign:'center'}}>Audit SEO Local</h1>
        <p style={{color:'#64748b',marginBottom:'24px',textAlign:'center',fontSize:'14px'}}>Sélectionnez votre langue</p>
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

  // STEP 1
  if(step===1)return(
    <div style={st.page}>
      <header style={st.header}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><div style={{color:BLUE}}><Ic n="chart" s={22}/></div><span style={{fontWeight:600}}>{t.header}</span></div></header>
      <div style={st.container}>
        <div style={{maxWidth:'500px',margin:'0 auto',textAlign:'center'}}>
          <Badge v="pri">{t.badge}</Badge>
          <h1 style={{fontSize:'28px',fontWeight:600,margin:'14px 0 10px',color:'#fff'}}>{t.title}</h1>
          <p style={{color:'#94a3b8',fontSize:'15px',marginBottom:'32px'}}>{t.desc}</p>
          <div style={st.card}>
            <div style={{background:'#f8fafc',borderRadius:'10px',padding:'18px',marginBottom:'24px',textAlign:'left'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}}><div style={{color:BLUE}}><Ic n="key" s={18}/></div><span style={{fontWeight:600}}>{t.apiTitle}</span></div>
              <ol style={{fontSize:'13px',color:'#64748b',lineHeight:1.9,paddingLeft:'18px',margin:0}}>
                <li>Créez un compte sur <a href="https://serpapi.com" target="_blank" rel="noreferrer" style={{color:BLUE,fontWeight:500}}>serpapi.com</a></li>
                <li>Confirmez votre email</li>
                <li>Dashboard → API Key</li>
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

  // STEP 2
  if(step===2)return(
    <div style={st.page}>
      <header style={st.header}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><div style={{color:BLUE}}><Ic n="chart" s={22}/></div><span style={{fontWeight:600}}>{t.header}</span></div><button style={{...st.btn,...st.btnS}} onClick={()=>setStep(1)}>{t.back}</button></header>
      <div style={st.container}>
        <h1 style={{fontSize:'24px',fontWeight:600,marginBottom:'28px',textAlign:'center',color:'#fff'}}>{t.config}</h1>
        
        <div style={st.card}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px'}}><div style={{width:'36px',height:'36px',background:'#e0f2fe',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:BLUE}}><Ic n="building" s={18}/></div><h2 style={{fontSize:'15px',fontWeight:600}}>{t.bizTitle}</h2></div>
          <div style={{...st.row,gridTemplateColumns:'1fr 1fr'}}><div><label style={st.label}>{t.bizName}</label><input style={st.input} placeholder={t.bizPh} value={biz} onChange={e=>setBiz(e.target.value)}/></div><div><label style={st.label}>{t.logoL}</label><input style={st.input} placeholder={t.logoPh} value={logo} onChange={e=>setLogo(e.target.value)}/></div></div>
          <div style={{...st.row,gridTemplateColumns:'1fr 1fr 1fr'}}><div><label style={st.label}>{t.actL}</label><input style={st.input} placeholder={t.actPh} value={met} onChange={e=>setMet(e.target.value)}/></div><div><label style={st.label}>{t.panL}</label><input style={st.input} type="number" placeholder={t.panPh} value={pan} onChange={e=>setPan(e.target.value)}/></div><div><label style={st.label}>{t.marL}</label><input style={st.input} type="number" placeholder={t.marPh} value={mar} onChange={e=>setMar(e.target.value)}/></div></div>
        </div>

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
                {l.sh&&l.res.length>0&&(<div style={{position:'absolute',top:'100%',left:0,right:0,background:'#fff',border:'1px solid #cbd5e1',borderRadius:'10px',marginTop:'8px',maxHeight:'320px',overflowY:'auto',zIndex:100,boxShadow:'0 10px 40px rgba(0,0,0,0.15)'}}>{l.res.map((p,j)=>(<div key={j} onClick={()=>selP(l.id,p)} style={{padding:'14px 16px',borderBottom:'1px solid #f1f5f9',cursor:'pointer'}}><div style={{fontWeight:600,marginBottom:'3px',fontSize:'14px'}}>{p.name}</div><div style={{fontSize:'12px',color:'#64748b'}}>{p.address}</div>{p.rating&&<div style={{marginTop:'5px',fontSize:'13px',color:'#d97706',fontWeight:500}}>★ {p.rating}</div>}</div>))}</div>)}
              </div>
              {l.err&&<div style={{color:'#dc2626',fontSize:'13px',marginBottom:'12px',padding:'10px 14px',background:'#fee2e2',borderRadius:'8px'}}>{l.err}</div>}
              {l.name&&(<div style={{background:'#d1fae5',borderRadius:'8px',padding:'14px 16px',marginBottom:'16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontWeight:600,color:'#059669',marginBottom:'2px',display:'flex',alignItems:'center',gap:'8px',fontSize:'14px'}}><Ic n="check" s={16}/>{l.name}</div><div style={{fontSize:'13px',color:'#64748b'}}>{l.city}</div></div>{l.rat&&<span style={{color:'#d97706',fontWeight:600,fontSize:'14px'}}>★ {l.rat}</span>}</div>)}
              <div style={{...st.row,gridTemplateColumns:'1fr 1fr'}}><div><label style={st.label}>{t.cityL}</label><input style={st.input} placeholder={t.cityPh} value={l.city} onChange={e=>upLoc(l.id,'city',e.target.value)}/></div><div><label style={st.label}>{t.volL}</label><input style={st.input} type="number" placeholder="500" value={l.vol} onChange={e=>upLoc(l.id,'vol',e.target.value)}/><div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'8px',fontSize:'11px',color:'#64748b'}}><Ic n="info" s={12}/>{t.volInfo}</div></div></div>
              <div style={{marginTop:'12px',marginBottom:'20px'}}><label style={{...st.btn,...st.btnO,padding:'10px 16px',fontSize:'13px',cursor:'pointer'}}><Ic n="upload" s={16}/>{t.volUpload}<input type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleSemrushUpload(l.id,e)}/></label>{l.semrushImg&&<img src={l.semrushImg} alt="Semrush" style={{marginTop:'12px',maxWidth:'100%',borderRadius:'8px',border:'1px solid #e2e8f0'}}/>}</div>
              
              <div style={{background:'#fff',borderRadius:'8px',padding:'16px',marginBottom:'16px',border:'1px solid #e2e8f0'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}><div style={{color:'#d97706'}}><Ic n="star" s={16}/></div><span style={{fontWeight:600,fontSize:'14px'}}>{t.avisTitle}</span><span style={{fontSize:'11px',color:'#94a3b8'}}>(optionnel)</span></div>
                <Checkbox checked={l.avisResp} onChange={v=>upLoc(l.id,'avisResp',v)} label={t.avisResp}/>
                <Checkbox checked={l.avisReg} onChange={v=>upLoc(l.id,'avisReg',v)} label={t.avisReg}/>
                <Checkbox checked={l.avisNote} onChange={v=>upLoc(l.id,'avisNote',v)} label={t.avisNote}/>
              </div>

              <div style={{background:'#fff',borderRadius:'8px',padding:'16px',marginBottom:'16px',border:'1px solid #e2e8f0'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}><div style={{color:'#8b5cf6'}}><Ic n="crosshair" s={16}/></div><span style={{fontWeight:600,fontSize:'14px'}}>{t.pertTitle}</span><span style={{fontSize:'11px',color:'#94a3b8'}}>(optionnel)</span></div>
                <div style={{display:'flex',gap:'12px'}}><button onClick={()=>upLoc(l.id,'pertinent',true)} style={{...st.btn,flex:1,background:l.pertinent===true?'#d1fae5':'#f8fafc',color:l.pertinent===true?'#059669':'#64748b',border:l.pertinent===true?'2px solid #059669':'1px solid #e2e8f0'}}><Ic n="check" s={16}/>{t.pertinent}</button><button onClick={()=>upLoc(l.id,'pertinent',false)} style={{...st.btn,flex:1,background:l.pertinent===false?'#fee2e2':'#f8fafc',color:l.pertinent===false?'#dc2626':'#64748b',border:l.pertinent===false?'2px solid #dc2626':'1px solid #e2e8f0'}}><Ic n="x" s={16}/>{t.nonPertinent}</button></div>
              </div>

              <div style={{background:'#fff',borderRadius:'8px',padding:'16px',border:'1px solid #e2e8f0'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}><div style={{color:'#0ea5e9'}}><Ic n="settings" s={16}/></div><span style={{fontWeight:600,fontSize:'14px'}}>{t.optTitle}</span><span style={{fontSize:'11px',color:'#94a3b8'}}>(optionnel)</span></div>
                <div style={{...st.row,gridTemplateColumns:'1fr 1fr'}}><div><label style={st.label}>{t.optPresent}</label><textarea style={{...st.input,minHeight:'80px',resize:'vertical'}} placeholder={t.optPresentPh} value={l.optPresent} onChange={e=>upLoc(l.id,'optPresent',e.target.value)}/></div><div><label style={st.label}>{t.optMissing}</label><textarea style={{...st.input,minHeight:'80px',resize:'vertical'}} placeholder={t.optMissingPh} value={l.optMissing} onChange={e=>upLoc(l.id,'optMissing',e.target.value)}/></div></div>
              </div>
            </div>
          ))}
          <button onClick={addLoc} style={{...st.btn,...st.btnO,width:'100%'}}><Ic n="plus" s={18}/>{t.addEtab}</button>
        </div>

        <div style={st.card}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px'}}><div style={{width:'36px',height:'36px',background:'#d1fae5',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:'#059669'}}><Ic n="target" s={18}/></div><h2 style={{fontSize:'15px',fontWeight:600}}>{t.kwTitle}</h2></div>
          {kws.map((k,i)=>(<div key={i} style={{display:'flex',gap:'10px',marginBottom:'12px',alignItems:'center'}}><span style={{minWidth:'90px',fontSize:'13px',fontWeight:500,color:'#64748b'}}>Mot-clé {i+1}</span><input style={{...st.input,flex:1}} value={k} onChange={e=>{const n=[...kws];n[i]=e.target.value;setKws(n);}} placeholder={t.kwPh}/>{kws.length>1&&<button onClick={()=>setKws(kws.filter((_,j)=>j!==i))} style={{...st.btn,background:'#fee2e2',color:'#dc2626',padding:'10px 14px',boxShadow:'none'}}><Ic n="x" s={16}/></button>}</div>))}
          <button onClick={()=>setKws([...kws,''])} style={{...st.btn,...st.btnO,marginTop:'8px'}}><Ic n="plus" s={16}/>{t.addKw}</button>
        </div>

        <div style={{textAlign:'center',marginTop:'32px'}}><button style={{...st.btn,...st.btnP,padding:'14px 40px',fontSize:'15px',opacity:canLaunch?1:0.5}} onClick={run} disabled={!canLaunch}>{t.launch}<Ic n="arrow" s={18}/></button></div>
      </div>
    </div>
  );

  // STEP 3
  if(step===3)return(
    <div style={st.page}><header style={st.header}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><div style={{color:BLUE}}><Ic n="chart" s={22}/></div><span style={{fontWeight:600}}>{t.header}</span></div></header>
      <div style={st.container}><div style={{...st.card,maxWidth:'450px',margin:'60px auto',textAlign:'center',padding:'50px 40px'}}><div style={{fontSize:'56px',fontWeight:700,color:BLUE,marginBottom:'16px'}}>{prog}%</div><div style={{height:'8px',background:'#e2e8f0',borderRadius:'4px',overflow:'hidden',marginBottom:'28px'}}><div style={{width:prog+'%',height:'100%',background:BLUE,borderRadius:'4px',transition:'width 0.3s'}}/></div><h2 style={{fontSize:'18px',fontWeight:600,marginBottom:'10px'}}>{t.analyzing}</h2><p style={{fontSize:'14px',color:'#64748b',marginBottom:'6px'}}>{progT}</p><p style={{fontSize:'13px',color:'#94a3b8'}}>{t.wait}</p></div></div>
    </div>
  );

  // STEP 4
  if(step===4&&results){
    const r=results;
    const avgRat=parseFloat(r.sum.avgR)||4.0;
    const avgRev=Math.round(r.locs.reduce((s,l)=>s+(l.rev||0),0)/r.locs.length)||50;
    const avgPos=r.locs.length>0?(r.locs.reduce((s,l)=>{const pos=l.ranks.filter(x=>typeof x.rk==='number').map(x=>x.rk);return s+(pos.length?pos.reduce((a,b)=>a+b,0)/pos.length:10);},0)/r.locs.length).toFixed(1):'8';
    const topCompRat=r.topComp?.[0]?.rating||4.8;
    const topCompRev=r.topComp?.[0]?.reviews||150;
    const lossMonth=Math.round(r.fin.tl/12);
    const compGain=Math.round(r.fin.tl*0.8);

    return(
      <div style={st.page}>
        <style>{`@media print{.noprint{display:none!important}}`}</style>
        <header style={st.header} className="noprint"><div style={{display:'flex',alignItems:'center',gap:'14px'}}>{r.logo&&<img src={r.logo} alt="" style={{width:'40px',height:'40px',borderRadius:'8px',objectFit:'cover'}}/>}<div><div style={{fontWeight:600,fontSize:'15px'}}>{r.biz}</div><div style={{fontSize:'13px',color:'#64748b'}}>{r.met}</div></div></div><div style={{display:'flex',gap:'10px'}}><button style={{...st.btn,...st.btnS}} onClick={()=>{setStep(2);setResults(null);}}>{t.newA}</button><button style={{...st.btn,...st.btnP}} onClick={()=>window.print()}><Ic n="download" s={16}/>{t.pdf}</button></div></header>
        <div style={st.container}>
          <div style={{textAlign:'center',marginBottom:'40px'}}><Badge v="pri">{t.report}</Badge><h1 style={{fontSize:'32px',fontWeight:700,marginTop:'14px',marginBottom:'8px',color:'#fff'}}>{r.biz}</h1><p style={{color:'#94a3b8',fontSize:'15px'}}>{r.sum.tot} {t.etabs}</p></div>

          {/* FOMO */}
          <div style={{...st.card,background:'linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%)',color:'#fff',marginBottom:'24px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}><div style={{width:'48px',height:'48px',background:'rgba(255,255,255,0.2)',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center'}}><Ic n="clock" s={24}/></div><div><h2 style={{fontSize:'20px',fontWeight:700,marginBottom:'4px'}}>{t.fomo}</h2><p style={{fontSize:'14px',opacity:0.9}}>{t.fomoSub}</p></div></div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}><div style={{background:'rgba(255,255,255,0.15)',borderRadius:'10px',padding:'20px',textAlign:'center'}}><div style={{fontSize:'12px',opacity:0.8,marginBottom:'8px',textTransform:'uppercase'}}>{t.fomoMonth}</div><div style={{fontSize:'32px',fontWeight:700}}>-{lossMonth}K€</div></div><div style={{background:'rgba(255,255,255,0.15)',borderRadius:'10px',padding:'20px',textAlign:'center'}}><div style={{fontSize:'12px',opacity:0.8,marginBottom:'8px',textTransform:'uppercase'}}>{t.fomoYear}</div><div style={{fontSize:'32px',fontWeight:700}}>-{r.fin.tl}K€</div></div><div style={{background:'rgba(255,255,255,0.25)',borderRadius:'10px',padding:'20px',textAlign:'center',border:'2px solid rgba(255,255,255,0.3)'}}><div style={{fontSize:'12px',opacity:0.8,marginBottom:'8px',textTransform:'uppercase'}}>{t.fomoComp}</div><div style={{fontSize:'32px',fontWeight:700}}>+{compGain}K€</div></div></div>
          </div>

          {/* STATS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'32px'}}>{[{ic:'building',v:r.sum.tot,l:t.statEtab},{ic:'chart',v:r.sum.avgR?'★ '+r.sum.avgR:'N/A',l:t.statNote},{ic:'target',v:r.kws.length,l:t.statReq},{ic:'trending',v:r.sum.visPct+'%',l:t.statVis}].map((x,i)=>(<div key={i} style={{...st.card,marginBottom:0,padding:'22px'}}><div style={{width:'44px',height:'44px',background:'#f1f5f9',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',color:BLUE,marginBottom:'14px'}}><Ic n={x.ic} s={20}/></div><div style={{fontSize:'28px',fontWeight:700,marginBottom:'4px',color:'#1e293b'}}>{x.v}</div><div style={{fontSize:'13px',color:'#64748b'}}>{x.l}</div></div>))}</div>

          {/* DIAG */}
          <div style={st.card}><h2 style={{fontSize:'16px',fontWeight:600,marginBottom:'20px'}}>{t.diag}</h2><div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}><div style={{padding:'22px',background:'#d1fae5',borderRadius:'10px',textAlign:'center'}}><div style={{fontSize:'36px',fontWeight:700,color:'#059669'}}>{r.sum.t3}</div><div style={{fontSize:'13px',color:'#059669',fontWeight:600}}>{t.top3}</div></div><div style={{padding:'22px',background:'#fef3c7',borderRadius:'10px',textAlign:'center'}}><div style={{fontSize:'36px',fontWeight:700,color:'#d97706'}}>{r.sum.t7-r.sum.t3}</div><div style={{fontSize:'13px',color:'#d97706',fontWeight:600}}>{t.pos47}</div></div><div style={{padding:'22px',background:'#fee2e2',borderRadius:'10px',textAlign:'center'}}><div style={{fontSize:'36px',fontWeight:700,color:'#dc2626'}}>{r.sum.tot*r.kws.length-r.sum.t7}</div><div style={{fontSize:'13px',color:'#dc2626',fontWeight:600}}>{t.pos8}</div></div></div></div>

          {/* BENCHMARK */}
          <div style={st.card}><div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}><div style={{width:'44px',height:'44px',background:'#e0f2fe',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',color:BLUE}}><Ic n="barChart" s={22}/></div><div><h2 style={{fontSize:'18px',fontWeight:700}}>{t.benchTitle}</h2><p style={{fontSize:'13px',color:'#64748b'}}>{t.benchWhere}</p></div></div><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th style={{padding:'14px 16px',background:'#f8fafc',fontSize:'13px',fontWeight:600,color:'#64748b',textAlign:'left'}}></th><th style={{padding:'14px 16px',background:'#fee2e2',fontSize:'13px',fontWeight:600,color:'#dc2626',textAlign:'center'}}>{t.benchYou}</th><th style={{padding:'14px 16px',background:'#fef3c7',fontSize:'13px',fontWeight:600,color:'#d97706',textAlign:'center'}}>{t.benchAvg}</th><th style={{padding:'14px 16px',background:'#d1fae5',fontSize:'13px',fontWeight:600,color:'#059669',textAlign:'center'}}>{t.benchTop}</th></tr></thead><tbody><tr><td style={{padding:'16px',fontSize:'14px',fontWeight:500,borderBottom:'1px solid #f1f5f9'}}>{t.benchNote}</td><td style={{padding:'16px',textAlign:'center',borderBottom:'1px solid #f1f5f9'}}><span style={{fontSize:'20px',fontWeight:700,color:avgRat>=4.5?'#059669':avgRat>=4?'#d97706':'#dc2626'}}>★ {avgRat}</span></td><td style={{padding:'16px',textAlign:'center',borderBottom:'1px solid #f1f5f9'}}><span style={{fontSize:'20px',fontWeight:700,color:'#64748b'}}>★ 4.3</span></td><td style={{padding:'16px',textAlign:'center',borderBottom:'1px solid #f1f5f9'}}><span style={{fontSize:'20px',fontWeight:700,color:'#059669'}}>★ {topCompRat}</span></td></tr><tr><td style={{padding:'16px',fontSize:'14px',fontWeight:500,borderBottom:'1px solid #f1f5f9'}}>{t.benchAvis}</td><td style={{padding:'16px',textAlign:'center',borderBottom:'1px solid #f1f5f9'}}><span style={{fontSize:'20px',fontWeight:700,color:avgRev>=100?'#059669':avgRev>=50?'#d97706':'#dc2626'}}>{avgRev}</span></td><td style={{padding:'16px',textAlign:'center',borderBottom:'1px solid #f1f5f9'}}><span style={{fontSize:'20px',fontWeight:700,color:'#64748b'}}>85</span></td><td style={{padding:'16px',textAlign:'center',borderBottom:'1px solid #f1f5f9'}}><span style={{fontSize:'20px',fontWeight:700,color:'#059669'}}>{topCompRev}</span></td></tr><tr><td style={{padding:'16px',fontSize:'14px',fontWeight:500}}>{t.benchPos}</td><td style={{padding:'16px',textAlign:'center'}}><span style={{fontSize:'20px',fontWeight:700,color:parseFloat(avgPos)<=3?'#059669':parseFloat(avgPos)<=7?'#d97706':'#dc2626'}}>#{avgPos}</span></td><td style={{padding:'16px',textAlign:'center'}}><span style={{fontSize:'20px',fontWeight:700,color:'#64748b'}}>#6</span></td><td style={{padding:'16px',textAlign:'center'}}><span style={{fontSize:'20px',fontWeight:700,color:'#059669'}}>#1-2</span></td></tr></tbody></table></div></div>

          {/* FIN */}
          <h2 style={{fontSize:'16px',fontWeight:600,marginBottom:'16px',color:'#fff'}}>{t.fin}</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}><div style={{...st.card,borderLeft:'4px solid #dc2626',marginBottom:0}}><div style={{fontSize:'12px',color:'#64748b',fontWeight:600,marginBottom:'8px',textTransform:'uppercase'}}>{t.loss}</div><div style={{fontSize:'42px',fontWeight:700,color:'#dc2626',marginBottom:'6px'}}>-{r.fin.tl}K€</div><div style={{fontSize:'14px',color:'#64748b'}}>{t.lossD}</div></div><div style={{...st.card,borderLeft:'4px solid #059669',marginBottom:0}}><div style={{fontSize:'12px',color:'#64748b',fontWeight:600,marginBottom:'8px',textTransform:'uppercase'}}>{t.pot}</div><div style={{fontSize:'42px',fontWeight:700,color:'#059669',marginBottom:'6px'}}>+{r.fin.pg}K€</div><div style={{fontSize:'14px',color:'#64748b'}}>{t.potD}</div></div></div>

          {/* ROI */}
          <div style={st.card}><div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}><div style={{width:'44px',height:'44px',background:'#d1fae5',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',color:'#059669'}}><Ic n="dollar" s={22}/></div><h2 style={{fontSize:'18px',fontWeight:700}}>{t.roiTitle}</h2></div><div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'24px'}}><div style={{padding:'20px',background:'#fee2e2',borderRadius:'10px',textAlign:'center'}}><div style={{fontSize:'12px',color:'#dc2626',fontWeight:600,marginBottom:'8px',textTransform:'uppercase'}}>{t.roiCost}</div><div style={{fontSize:'28px',fontWeight:700,color:'#dc2626'}}>{r.fin.partooCost.toLocaleString()}€</div><div style={{fontSize:'11px',color:'#64748b',marginTop:'4px'}}>({r.sum.tot} étab.)</div></div><div style={{padding:'20px',background:'#d1fae5',borderRadius:'10px',textAlign:'center'}}><div style={{fontSize:'12px',color:'#059669',fontWeight:600,marginBottom:'8px',textTransform:'uppercase'}}>{t.roiGain}</div><div style={{fontSize:'28px',fontWeight:700,color:'#059669'}}>{r.fin.gainYear1.toLocaleString()}€</div></div><div style={{padding:'20px',background:r.fin.netBenefit>0?'#e0f2fe':'#fee2e2',borderRadius:'10px',textAlign:'center'}}><div style={{fontSize:'12px',color:r.fin.netBenefit>0?BLUE:'#dc2626',fontWeight:600,marginBottom:'8px',textTransform:'uppercase'}}>{t.roiNet}</div><div style={{fontSize:'28px',fontWeight:700,color:r.fin.netBenefit>0?BLUE:'#dc2626'}}>{r.fin.netBenefit>0?'+':''}{r.fin.netBenefit.toLocaleString()}€</div></div></div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px'}}><div style={{padding:'16px',background:'#f8fafc',borderRadius:'8px',textAlign:'center'}}><div style={{fontSize:'11px',color:'#64748b',fontWeight:600,marginBottom:'6px'}}>{t.roi12}</div><div style={{fontSize:'22px',fontWeight:700,color:'#059669'}}>+{r.fin.gainYear1.toLocaleString()}€</div></div><div style={{padding:'16px',background:'#f8fafc',borderRadius:'8px',textAlign:'center'}}><div style={{fontSize:'11px',color:'#64748b',fontWeight:600,marginBottom:'6px'}}>{t.roi24}</div><div style={{fontSize:'22px',fontWeight:700,color:'#059669'}}>+{Math.round(r.fin.gainYear1*2.2).toLocaleString()}€</div></div><div style={{padding:'16px',background:'#f8fafc',borderRadius:'8px',textAlign:'center'}}><div style={{fontSize:'11px',color:'#64748b',fontWeight:600,marginBottom:'6px'}}>{t.roi36}</div><div style={{fontSize:'22px',fontWeight:700,color:'#059669'}}>+{Math.round(r.fin.gainYear1*3.5).toLocaleString()}€</div></div><div style={{padding:'16px',background:'linear-gradient(135deg,#059669 0%,#10b981 100%)',borderRadius:'8px',textAlign:'center'}}><div style={{fontSize:'11px',color:'rgba(255,255,255,0.9)',fontWeight:600,marginBottom:'6px'}}>{t.roiFor}</div><div style={{fontSize:'22px',fontWeight:700,color:'#fff'}}>{r.fin.roiMultiple}€</div></div></div></div>

          {/* REPARTITION */}
          <div style={st.card}><h3 style={{fontSize:'14px',fontWeight:600,color:'#dc2626',marginBottom:'16px',textTransform:'uppercase'}}>{t.dist}</h3>{r.locs.sort((a,b)=>b.loss-a.loss).map((l,i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',background:'#f8fafc',borderRadius:'8px',marginBottom:'10px'}}><div style={{display:'flex',alignItems:'center',gap:'14px'}}><span style={{fontWeight:600,fontSize:'15px'}}>{l.city}</span><Badge v={l.stat==='excellent'?'ok':l.stat==='bon'?'pri':l.stat==='moyen'?'warn':'err'}>{l.stat}</Badge></div><span style={{fontSize:'18px',fontWeight:700,color:'#dc2626'}}>-{l.loss}K€</span></div>))}</div>

          {/* METRICS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'32px'}}>{[{v:r.fin.partooCost.toLocaleString()+'€',l:t.inv},{v:r.fin.roi+'%',l:t.roi},{v:r.fin.be,l:t.be},{v:'+'+r.fin.lpy,l:t.leads}].map((x,i)=>(<div key={i} style={{...st.card,marginBottom:0,textAlign:'center',padding:'22px'}}><div style={{fontSize:'24px',fontWeight:700,color:BLUE,marginBottom:'4px'}}>{x.v}</div><div style={{fontSize:'12px',color:'#64748b'}}>{x.l}</div></div>))}</div>

          {/* COMP */}
          {r.topComp?.length>0&&(<div style={st.card}><h2 style={{fontSize:'16px',fontWeight:600,marginBottom:'18px'}}>{t.comp}</h2><div style={{display:'flex',gap:'12px',overflowX:'auto'}}>{r.topComp.map((c,i)=>(<div key={i} style={{flex:'0 0 180px',padding:'16px',background:'#f8fafc',borderRadius:'10px',textAlign:'center'}}><div style={{width:'32px',height:'32px',background:i===0?'#fef3c7':'#f1f5f9',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'14px',color:i===0?'#d97706':'#64748b',margin:'0 auto 10px'}}>{i+1}</div><div style={{fontSize:'13px',fontWeight:600,marginBottom:'4px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} title={c.name}>{c.name}</div>{c.rating&&<div style={{fontSize:'13px',color:'#d97706',fontWeight:500}}>★ {c.rating}</div>}</div>))}</div></div>)}

          {/* DETAIL */}
          <h2 style={{fontSize:'16px',fontWeight:600,marginBottom:'18px',color:'#fff'}}>{t.detail}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(400px,1fr))',gap:'20px',marginBottom:'32px'}}>{r.locs.map((l,i)=>(<div key={i} style={st.card}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'18px'}}><div style={{fontSize:'20px',fontWeight:700}}>{l.city}</div><Badge v={l.stat==='excellent'?'ok':l.stat==='bon'?'pri':l.stat==='moyen'?'warn':'err'}>{l.stat}</Badge></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'18px'}}><div style={{padding:'18px',background:'#f8fafc',borderRadius:'10px',textAlign:'center'}}><div style={{fontSize:'28px',fontWeight:700,color:l.rat>=4.5?'#059669':l.rat>=4?'#d97706':'#dc2626'}}>★ {l.rat||'N/A'}</div><div style={{fontSize:'12px',color:'#64748b',fontWeight:500,marginTop:'4px'}}>{t.note}</div></div><div style={{padding:'18px',background:'#f8fafc',borderRadius:'10px',textAlign:'center'}}><div style={{fontSize:'28px',fontWeight:700,color:BLUE}}>{l.rev||'N/A'}</div><div style={{fontSize:'12px',color:'#64748b',fontWeight:500,marginTop:'4px'}}>{t.avis}</div></div></div>{l.topCompetitor&&(<div style={{background:'#fef3c7',borderRadius:'10px',padding:'14px 16px',marginBottom:'18px'}}><div style={{fontSize:'11px',fontWeight:600,color:'#d97706',marginBottom:'8px',textTransform:'uppercase'}}>{t.concurrentDirect}</div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontWeight:600,fontSize:'14px',marginBottom:'2px'}}>{l.topCompetitor.name}</div><div style={{fontSize:'13px',color:'#64748b'}}>Position #{l.topCompetitor.position}</div></div><div style={{textAlign:'right'}}>{l.topCompetitor.rating&&<div style={{fontSize:'16px',fontWeight:700,color:'#d97706'}}>★ {l.topCompetitor.rating}</div>}{l.topCompetitor.reviews&&<div style={{fontSize:'12px',color:'#64748b'}}>{l.topCompetitor.reviews} avis</div>}</div></div></div>)}{(l.avisResp||l.avisReg||l.avisNote)&&(<div style={{background:'#f8fafc',borderRadius:'10px',padding:'14px 16px',marginBottom:'14px'}}><div style={{fontSize:'11px',fontWeight:600,color:'#64748b',marginBottom:'10px',textTransform:'uppercase'}}>{t.avisTitle}</div><div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>{l.avisResp&&<Badge v="ok">✓ {t.avisResp}</Badge>}{!l.avisResp&&<Badge v="err">✗ {t.avisResp}</Badge>}{l.avisReg&&<Badge v="ok">✓ {t.avisReg}</Badge>}{!l.avisReg&&<Badge v="err">✗ {t.avisReg}</Badge>}{l.avisNote&&<Badge v="ok">✓ {t.avisNote}</Badge>}{!l.avisNote&&<Badge v="err">✗ {t.avisNote}</Badge>}</div></div>)}{l.pertinent!==null&&(<div style={{background:'#f8fafc',borderRadius:'10px',padding:'14px 16px',marginBottom:'14px'}}><div style={{fontSize:'11px',fontWeight:600,color:'#64748b',marginBottom:'10px',textTransform:'uppercase'}}>{t.pertTitle}</div><Badge v={l.pertinent?'ok':'err'}>{l.pertinent?'✓ '+t.pertinent:'✗ '+t.nonPertinent}</Badge></div>)}{(l.optPresent||l.optMissing)&&(<div style={{background:'#f8fafc',borderRadius:'10px',padding:'14px 16px',marginBottom:'14px'}}><div style={{fontSize:'11px',fontWeight:600,color:'#64748b',marginBottom:'10px',textTransform:'uppercase'}}>{t.optTitle}</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>{l.optPresent&&<div><div style={{fontSize:'11px',color:'#059669',fontWeight:600,marginBottom:'6px'}}>✓ {t.optPresent}</div><div style={{fontSize:'13px',color:'#374151'}}>{l.optPresent}</div></div>}{l.optMissing&&<div><div style={{fontSize:'11px',color:'#dc2626',fontWeight:600,marginBottom:'6px'}}>✗ {t.optMissing}</div><div style={{fontSize:'13px',color:'#374151'}}>{l.optMissing}</div></div>}</div></div>)}{l.semrushImg&&(<div style={{marginBottom:'18px'}}><div style={{fontSize:'12px',fontWeight:600,color:'#64748b',marginBottom:'8px',textTransform:'uppercase'}}>Données Semrush</div><img src={l.semrushImg} alt="Semrush" style={{width:'100%',borderRadius:'8px',border:'1px solid #e2e8f0'}}/></div>)}<div style={{fontSize:'12px',fontWeight:600,color:'#64748b',marginBottom:'12px',textTransform:'uppercase'}}>{t.posReq}</div>{l.ranks.map((x,j)=>(<div key={j} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 14px',background:'#f8fafc',borderRadius:'8px',marginBottom:'8px'}}><span style={{fontSize:'13px',color:'#475569'}}>{x.kw}</span><PosBadge r={x.rk}/></div>))}</div>))}</div>

          {/* POSITIONNEMENT */}
          <div style={{...st.card,overflowX:'auto'}}><h2 style={{fontSize:'16px',fontWeight:600,marginBottom:'18px'}}>{t.matrix}</h2><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th style={{padding:'14px 16px',background:'#f8fafc',fontSize:'13px',fontWeight:600,color:'#64748b',textAlign:'left'}}>Mot-clé</th>{r.locs.map((l,i)=><th key={i} style={{padding:'14px 16px',background:'#f8fafc',fontSize:'13px',fontWeight:600,color:'#64748b',textAlign:'center'}}>{l.city}</th>)}</tr></thead><tbody>{r.kws.map((k,ki)=>(<tr key={ki}><td style={{padding:'14px 16px',fontSize:'14px',borderBottom:'1px solid #f1f5f9'}}>{k}</td>{r.locs.map((l,li)=><td key={li} style={{padding:'14px 16px',textAlign:'center',borderBottom:'1px solid #f1f5f9'}}><PosBadge r={l.ranks[ki]?.rk}/></td>)}</tr>))}</tbody></table></div>

          <p style={{textAlign:'center',color:'#64748b',fontSize:'12px',marginTop:'40px'}}>{t.footer}</p>
        </div>
      </div>
    );
  }

  return null;
}
