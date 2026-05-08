import { useState, useEffect } from "react";

// ── BRAND COLOURS ──────────────────────────────────────────
const BRAND = {
  teal: "#338A93",
  tealLight: "#4AA8B2",
  tealDark: "#1E6870",
  gold: "#E8B25A",
  goldLight: "#F0C878",
  goldDark: "#C4903A",
  charcoal: "#2D2D2D",
};

const DARK = {
  bg: "#111111", bg2: "#1A1A1A", bg3: "#242424",
  text: "#F5F0E8", text2: "#C8BFB0", text3: "#7A7268",
  border: "#2E2E2E", border2: "#3A3A3A",
  card: "#1E1E1E", red: "#E07060", green: "#5BAF7A",
};

const LIGHT = {
  bg: "#F4F0E8", bg2: "#FFFFFF", bg3: "#EDE8DE",
  text: "#2D2D2D", text2: "#4A4440", text3: "#8A8278",
  border: "#DDD8CE", border2: "#CCCAC0",
  card: "#FFFFFF", red: "#C0483A", green: "#3A8A5A",
};

// ── DEFAULT PLAN ───────────────────────────────────────────
const DEFAULT_PLAN = {
  d1: {
    label:"Push Day", color:BRAND.gold, emoji:"💪",
    muscles:"Chest · Shoulders · Triceps",
    exercises:[
      {id:"d1_0",name:"Flat DB Chest Press",muscle:"Middle Chest",sets:3,reps:10,rest:"90s",startWeight:"5–6kg",cue:"Elbows 45° · 3sec down · feel chest not arms"},
      {id:"d1_1",name:"Incline Press Machine",muscle:"Upper Chest",sets:3,reps:10,rest:"90s",startWeight:"Machine only",cue:"Seat at upper chest · 3sec return · do not lock elbows"},
      {id:"d1_2",name:"Cable Chest Fly",muscle:"Inner Chest",sets:3,reps:12,rest:"60s",startWeight:"5–8kg",cue:"Arc movement · squeeze 1sec at centre · elbows slightly bent"},
      {id:"d1_3",name:"Seated DB Shoulder Press",muscle:"Front Deltoid",sets:3,reps:10,rest:"90s",startWeight:"4–5kg",cue:"Core braced · shoulders DOWN from ears · 3sec down"},
      {id:"d1_4",name:"Cable Lateral Raise",muscle:"Side Deltoid",sets:3,reps:12,rest:"60s",startWeight:"3–4kg",cue:"Lead with elbow not hand · shoulder height only · 3sec down"},
      {id:"d1_5",name:"Face Pulls",muscle:"Rear Delt + Rotator Cuff",sets:3,reps:15,rest:"60s",startWeight:"8–12kg",cue:"Rope to face · hands past ears · elbows UP and OUT"},
      {id:"d1_6",name:"Tricep Cable Pushdown",muscle:"Triceps",sets:3,reps:12,rest:"60s",startWeight:"8–10kg",cue:"Elbows pinned to sides · flare hands at bottom · 3sec up"},
    ]
  },
  d2: {
    label:"Pull Day", color:BRAND.teal, emoji:"🔙",
    muscles:"Back · Biceps · Rear Delts",
    exercises:[
      {id:"d2_0",name:"Lat Pulldown Wide Grip",muscle:"Latissimus Dorsi",sets:3,reps:12,rest:"90s",startWeight:"20–25kg",cue:"Chest up · elbows DOWN and BACK · 4sec return"},
      {id:"d2_1",name:"Seated Cable Row",muscle:"Rhomboids + Mid Trap",sets:3,reps:10,rest:"90s",startWeight:"15–20kg",cue:"Upright · pull to belly · squeeze blades 1sec · 4sec return"},
      {id:"d2_2",name:"Cable Straight Arm Pulldown",muscle:"Lats",sets:3,reps:12,rest:"60s",startWeight:"10–15kg",cue:"Arms straight · arc to thighs · feel lats under armpit"},
      {id:"d2_3",name:"Reverse DB Fly",muscle:"Posterior Deltoid",sets:3,reps:12,rest:"60s",startWeight:"3–4kg",cue:"Lean forward · arms like wings · elbows slightly bent"},
      {id:"d2_4",name:"DB Bicep Curl",muscle:"Biceps",sets:3,reps:12,rest:"60s",startWeight:"6–8kg",cue:"Elbows PINNED · squeeze at top 1sec · 3sec down · no swinging"},
      {id:"d2_5",name:"Hammer Curl",muscle:"Brachialis + Biceps",sets:2,reps:12,rest:"60s",startWeight:"6–8kg",cue:"Palms face each other · elbows pinned · 3sec down"},
    ]
  },
  d3: {
    label:"Leg Day", color:"#C06060", emoji:"🦵",
    muscles:"Quads · Hamstrings · Glutes · Calves",
    exercises:[
      {id:"d3_0",name:"Hex Bar Deadlift ⭐",muscle:"Glutes + Hamstrings + Erectors",sets:3,reps:8,rest:"2min",startWeight:"Bar 20kg",cue:"Hips lower than shoulders · brace HARD · drive through heels · squeeze glutes"},
      {id:"d3_1",name:"V-Squat Machine",muscle:"Glutes + Quads",sets:3,reps:12,rest:"90s",startWeight:"5–10kg/side",cue:"Back flat · knees track toes · full depth · 3sec down"},
      {id:"d3_2",name:"Leg Press Machine",muscle:"Quads + Glutes",sets:3,reps:12,rest:"90s",startWeight:"20–30kg",cue:"Feet shoulder width · knees NEVER cave · heels drive"},
      {id:"d3_3",name:"Lying Leg Curl",muscle:"Hamstrings",sets:3,reps:12,rest:"60s",startWeight:"15–20kg",cue:"Hips PRESSED · squeeze 1sec at top · 4sec down"},
      {id:"d3_4",name:"45° Hip Extension",muscle:"Glute Max + Hamstrings",sets:3,reps:10,rest:"90s",startWeight:"Bodyweight",cue:"Pad at hip crease · rise squeezing GLUTES · hold 2sec"},
      {id:"d3_5",name:"Hip Abductor Machine",muscle:"Glute Medius",sets:3,reps:15,rest:"60s",startWeight:"25–35kg",cue:"Sit tall · push outward · 3sec return · protects knees"},
      {id:"d3_6",name:"Seated Calf Raise",muscle:"Soleus",sets:3,reps:15,rest:"45s",startWeight:"10–15kg",cue:"Full stretch at bottom · hold 2sec at top · full range only"},
    ]
  },
  d4: {
    label:"Active Recovery", color:BRAND.teal, emoji:"🌿",
    muscles:"Full Body Restore · Core · Mobility",
    exercises:[
      {id:"d4_0",name:"Cycling Zone 2",muscle:"Cardiovascular",sets:1,reps:1,rest:"—",startWeight:"20min",cue:"HR 100–120 bpm · conversational pace · fat burning window"},
      {id:"d4_1",name:"Plank Hold",muscle:"Transverse Abdominis",sets:3,reps:1,rest:"45s",startWeight:"30sec",cue:"Straight line · brace like bracing for punch · hips never sag"},
      {id:"d4_2",name:"Dead Bug",muscle:"Deep Core",sets:3,reps:10,rest:"45s",startWeight:"Bodyweight",cue:"Lower back PRESSED into floor · opposite arm and leg extend"},
      {id:"d4_3",name:"Ab Crunch Machine",muscle:"Rectus Abdominis",sets:2,reps:15,rest:"60s",startWeight:"10–15kg",cue:"Exhale on crunch · 3sec return · feel abs not hip flexors"},
    ]
  },
  d5: {
    label:"Full Body", color:"#7090C8", emoji:"⚡",
    muscles:"All Muscle Groups · Metabolic · Power",
    exercises:[
      {id:"d5_0",name:"Kettlebell Swing",muscle:"Glutes + Core",sets:3,reps:15,rest:"60s",startWeight:"12kg",cue:"HIP movement · drive hips forward · power from glutes snapping"},
      {id:"d5_1",name:"Seated Cable Row",muscle:"Back + Biceps",sets:3,reps:12,rest:"60s",startWeight:"15–20kg",cue:"Lead with elbows · squeeze blades 1sec · 4sec return"},
      {id:"d5_2",name:"Chest Press Machine",muscle:"Chest + Triceps",sets:3,reps:12,rest:"60s",startWeight:"Light",cue:"Full range · 3sec return · feel chest contracting"},
      {id:"d5_3",name:"Battle Ropes Waves",muscle:"Full Body Metabolic",sets:3,reps:1,rest:"60s",startWeight:"30sec",cue:"Squat stance · core braced · alternate arms fast"},
      {id:"d5_4",name:"Box Step-Up",muscle:"Quads + Glutes",sets:3,reps:10,rest:"60s",startWeight:"Bodyweight",cue:"Drive through heel on box · stand tall · step down CONTROLLED"},
      {id:"d5_5",name:"Ab Crunch Machine",muscle:"Abs",sets:3,reps:15,rest:"60s",startWeight:"10–15kg",cue:"Exhale crunch · inhale return · slow deliberate"},
    ]
  }
};

// ── STORAGE ────────────────────────────────────────────────
function useStor(key,def){
  const [v,sv]=useState(()=>{try{const s=localStorage.getItem(key);return s?JSON.parse(s):def;}catch{return def;}});
  const set=val=>{sv(val);try{localStorage.setItem(key,JSON.stringify(val));}catch{}};
  return[v,set];
}

function uid(){return Math.random().toString(36).slice(2,9);}
function today(){return new Date().toISOString().slice(0,10);}
function fmtDate(d){if(!d)return"—";const dt=new Date(d+"T00:00:00");return dt.toLocaleDateString("en-GB",{day:"numeric",month:"short"});}

// ── LOGO SVG (from your brand icon) ───────────────────────
function LLTLogo({size=32}){
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="52" cy="22" r="11" fill={BRAND.teal}/>
      <path d="M20 45 Q35 20 55 30 Q75 40 75 55 Q75 70 55 72 Q35 74 30 60 Z" fill={BRAND.teal}/>
      <path d="M18 58 Q35 50 60 55 Q75 58 72 68 Q45 72 25 65 Z" fill={BRAND.gold}/>
      <path d="M30 68 Q42 65 58 70 Q50 85 38 88 Q28 82 30 68 Z" fill={BRAND.teal}/>
    </svg>
  );
}

// ── SPARKLINE ──────────────────────────────────────────────
function Spark({pts,color,w=64,h=28}){
  if(!pts||pts.length<2)return <svg width={w} height={h}><line x1={4} y1={h/2} x2={w-4} y2={h/2} stroke="#555" strokeWidth={1} strokeDasharray="3,2"/></svg>;
  const mn=Math.min(...pts),mx=Math.max(...pts),rng=mx-mn||1;
  const pad=4;
  const coords=pts.map((v,i)=>({x:pad+(i/(pts.length-1))*(w-pad*2),y:h-pad-((v-mn)/rng)*(h-pad*2)}));
  const poly=coords.map(p=>`${p.x},${p.y}`).join(" ");
  const last=coords[coords.length-1];
  const up=pts[pts.length-1]>=pts[0];
  const gid=`sg${color.replace(/[^a-z0-9]/gi,"")}${w}`;
  return(
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.25"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <polygon points={`${pad},${h} ${poly} ${w-pad},${h}`} fill={`url(#${gid})`}/>
      <polyline points={poly} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={last.x} cy={last.y} r={3} fill={color}/>
      <text x={w} y={9} textAnchor="end" fill={up?"#5BAF7A":"#E07060"} fontSize={8} fontFamily="monospace">{up?"↑":"↓"}{pts[pts.length-1]}kg</text>
    </svg>
  );
}

// ── TREND CHART ────────────────────────────────────────────
function TrendChart({sessions,color,name,T,onClose}){
  const[hover,setHover]=useState(null);
  const pts=sessions.filter(s=>s.best>0);
  if(!pts.length)return null;
  const mn=Math.min(...pts.map(p=>p.best)),mx=Math.max(...pts.map(p=>p.best)),rng=mx-mn||1;
  const W=300,H=150,pl=38,pr=12,pt_=16,pb=40,cW=W-pl-pr,cH=H-pt_-pb;
  const coords=pts.map((s,i)=>({x:pl+(i/Math.max(pts.length-1,1))*cW,y:pt_+cH-((s.best-mn)/rng)*cH,...s}));
  const poly=coords.map(p=>`${p.x},${p.y}`).join(" ");
  const gain=pts.length>1?pts[pts.length-1].best-pts[0].best:0;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:T.bg2,border:`1px solid ${color}50`,borderRadius:12,width:"100%",maxWidth:360,overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
        <div style={{background:`linear-gradient(135deg,${color}20,${T.bg2})`,padding:"14px 16px",borderBottom:`1px solid ${color}30`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div>
              <div style={{fontSize:15,fontWeight:700,color:T.text}}>{name}</div>
              <div style={{fontSize:9,fontFamily:"monospace",color:T.text3,letterSpacing:1}}>WEIGHT PROGRESSION</div>
            </div>
            <button onClick={onClose} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:6,padding:"5px 10px",color:T.text3,cursor:"pointer",fontSize:12}}>✕</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
            {[["Start",`${pts[0]?.best}kg`,T.text3],["Best",`${Math.max(...pts.map(p=>p.best))}kg`,BRAND.gold],["Latest",`${pts[pts.length-1]?.best}kg`,color],["Gain",`${gain>=0?"+":""}${gain}kg`,gain>=0?"#5BAF7A":"#E07060"]].map(([l,v,c])=>(
              <div key={l} style={{background:T.bg3,borderRadius:6,padding:"6px 4px",textAlign:"center"}}>
                <div style={{fontSize:13,fontWeight:700,color:c,marginBottom:1}}>{v}</div>
                <div style={{fontSize:8,fontFamily:"monospace",color:T.text3,letterSpacing:1,textTransform:"uppercase"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:"14px 14px 6px"}}>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
            <defs><linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.25"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
            {[0,0.25,0.5,0.75,1].map(p=>{const y=pt_+cH*(1-p),v=(mn+rng*p).toFixed(1);return<g key={p}><line x1={pl} y1={y} x2={W-pr} y2={y} stroke={T.border} strokeWidth={0.5}/><text x={pl-4} y={y+3} textAnchor="end" fill={T.text3} fontSize={7} fontFamily="monospace">{v}</text></g>;})}
            {coords.length>1&&<polygon points={`${coords[0].x},${pt_+cH} ${poly} ${coords[coords.length-1].x},${pt_+cH}`} fill="url(#cg2)"/>}
            {coords.length>1&&<polyline points={poly} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"/>}
            {coords.map((p,i)=>(
              <g key={i} style={{cursor:"pointer"}} onClick={()=>setHover(hover===i?null:i)}>
                <circle cx={p.x} cy={p.y} r={hover===i?6:4} fill={hover===i?color:T.bg2} stroke={color} strokeWidth={2}/>
                <text x={p.x} y={H-6} textAnchor="middle" fill={T.text3} fontSize={7} fontFamily="monospace">{fmtDate(p.date)}</text>
                {hover===i&&<g><rect x={p.x-28} y={p.y-28} width={56} height={20} rx={4} fill={T.bg3} stroke={color} strokeWidth={1}/><text x={p.x} y={p.y-14} textAnchor="middle" fill={color} fontSize={10} fontFamily="monospace" fontWeight="bold">{p.best}kg</text></g>}
              </g>
            ))}
          </svg>
        </div>
        <div style={{padding:"0 14px 14px",maxHeight:120,overflowY:"auto"}}>
          {[...pts].reverse().map((s,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",borderRadius:4,background:T.bg3,marginBottom:3}}>
              <span style={{fontSize:10,fontFamily:"monospace",color:T.text3}}>{fmtDate(s.date)}</span>
              <div style={{display:"flex",gap:10}}>
                <span style={{fontSize:11,fontFamily:"monospace",color}}>{s.best}kg best</span>
                <span style={{fontSize:11,fontFamily:"monospace",color:T.text3}}>{s.totalSets} sets</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── LOG ROW ────────────────────────────────────────────────
function LogRow({entry,idx,onEdit,onDelete,color,T}){
  const[editing,setEditing]=useState(false);
  const[eKg,setEKg]=useState(entry.kg);
  const[eReps,setEReps]=useState(entry.reps);
  if(editing)return(
    <div style={{display:"flex",gap:6,padding:"6px 8px",background:T.bg3,borderRadius:6,marginBottom:4,alignItems:"center"}}>
      <input value={eKg} onChange={e=>setEKg(e.target.value)} placeholder="kg" style={{width:52,background:T.bg,border:`1px solid ${color}50`,borderRadius:4,padding:"5px 6px",fontFamily:"monospace",fontSize:13,color:T.text,textAlign:"center"}}/>
      <span style={{color:T.text3}}>×</span>
      <input value={eReps} onChange={e=>setEReps(e.target.value)} placeholder="reps" style={{width:52,background:T.bg,border:`1px solid ${color}50`,borderRadius:4,padding:"5px 6px",fontFamily:"monospace",fontSize:13,color:T.text,textAlign:"center"}}/>
      <button onClick={()=>{onEdit(idx,{...entry,kg:eKg,reps:eReps});setEditing(false);}} style={{flex:1,padding:"5px 8px",background:`${color}25`,border:`1px solid ${color}`,borderRadius:4,color,fontSize:11,cursor:"pointer",fontFamily:"monospace",fontWeight:700}}>Save</button>
      <button onClick={()=>setEditing(false)} style={{padding:"5px 8px",background:T.bg3,border:`1px solid ${T.border}`,borderRadius:4,color:T.text3,fontSize:11,cursor:"pointer"}}>✕</button>
    </div>
  );
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",background:T.bg3,borderRadius:6,marginBottom:4}}>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:9,fontFamily:"monospace",color:T.text3,background:T.bg,padding:"1px 5px",borderRadius:3}}>S{idx+1}</span>
        <span style={{fontSize:14,fontFamily:"monospace",color,fontWeight:700}}>{entry.kg}{entry.kg!=="BW"&&entry.kg!=="—"?"kg":""} × {entry.reps}</span>
        {entry.feel&&<span style={{fontSize:13}}>{entry.feel.split(" ")[0]}</span>}
      </div>
      <div style={{display:"flex",gap:4}}>
        <button onClick={()=>setEditing(true)} style={{padding:"4px 10px",background:"transparent",border:`1px solid ${T.border2}`,borderRadius:4,color:T.text3,fontSize:11,cursor:"pointer"}}>Edit</button>
        <button onClick={()=>onDelete(idx)} style={{padding:"4px 10px",background:"transparent",border:`1px solid ${T.red}40`,borderRadius:4,color:T.red,fontSize:11,cursor:"pointer"}}>Del</button>
      </div>
    </div>
  );
}

// ── EXERCISE CARD ──────────────────────────────────────────
function ExCard({ex,dayColor,sessionKey,sessions,onLog,onEditLog,onDeleteLog,T}){
  const[open,setOpen]=useState(false);
  const[tab,setTab]=useState("log");
  const[kg,setKg]=useState("");
  const[reps,setReps]=useState("");
  const[feel,setFeel]=useState(null);
  const[saved,setSaved]=useState(false);
  const[showChart,setShowChart]=useState(false);
  const todayKey=today();
  const todaySets=(sessions[sessionKey]?.[todayKey])||[];
  const allDates=Object.keys(sessions[sessionKey]||{}).sort();
  const isBW=["Bodyweight","Free","—","30sec","20min","8min","Low resistance"].includes(ex.startWeight);
  const trendData=allDates.map(dt=>{
    const sets=sessions[sessionKey]?.[dt]||[];
    const nums=sets.filter(s=>!isNaN(parseFloat(s.kg))).map(s=>parseFloat(s.kg));
    return{date:dt,best:nums.length?Math.max(...nums):0,totalSets:sets.length,maxReps:Math.max(...sets.map(s=>parseInt(s.reps)||0),0)};
  }).filter(s=>s.best>0);
  const sparkPts=trendData.map(s=>s.best);
  function doSave(){
    const entry={kg:isBW?"BW":(kg||"0"),reps:reps||"0",feel,time:new Date().toLocaleTimeString(),date:todayKey};
    onLog(sessionKey,todayKey,entry);
    setSaved(true);setKg("");setReps("");setFeel(null);
    setTimeout(()=>setSaved(false),1200);
  }
  function adj(v,sv,d,mn=0){const n=parseFloat(v)||0;sv(String(Math.max(mn,parseFloat((n+d).toFixed(1)))));}
  const bestKg=todaySets.filter(s=>!isNaN(parseFloat(s.kg))).map(s=>parseFloat(s.kg));
  const maxToday=bestKg.length?Math.max(...bestKg):null;
  return(
    <>
      {showChart&&<TrendChart sessions={trendData} color={dayColor} name={ex.name} T={T} onClose={()=>setShowChart(false)}/>}
      <div style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${dayColor}`,borderRadius:10,marginBottom:8,overflow:"hidden",boxShadow:T===LIGHT?"0 1px 4px rgba(0,0,0,0.08)":"none"}}>
        <div onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",padding:"13px 14px",cursor:"pointer",gap:10}}>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:3,lineHeight:1.3}}>{ex.name}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <span style={{fontSize:10,fontFamily:"monospace",color:dayColor,background:`${dayColor}18`,padding:"2px 7px",borderRadius:4}}>{ex.muscle}</span>
              <span style={{fontSize:10,fontFamily:"monospace",color:T.text3}}>{ex.sets}×{ex.reps} · {ex.rest} · {ex.startWeight}</span>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {sparkPts.length>1&&<div onClick={e=>{e.stopPropagation();setShowChart(true);}}><Spark pts={sparkPts} color={dayColor}/></div>}
            {maxToday!==null&&<span style={{fontSize:11,fontFamily:"monospace",color:dayColor,background:`${dayColor}15`,padding:"2px 7px",borderRadius:4}}>{maxToday}kg</span>}
            <span style={{color:T.text3,fontSize:12,transform:open?"rotate(180deg)":"none",transition:"0.2s"}}>▾</span>
          </div>
        </div>
        {open&&(
          <div style={{borderTop:`1px solid ${T.border}`,padding:"12px 14px"}}>
            <div style={{background:`${dayColor}10`,border:`1px solid ${dayColor}25`,borderRadius:8,padding:"9px 12px",marginBottom:12,fontSize:12,color:T.text2,lineHeight:1.55}}>
              <span style={{fontSize:9,fontFamily:"monospace",color:dayColor,letterSpacing:1,textTransform:"uppercase",marginRight:6,fontWeight:700}}>FORM · </span>{ex.cue}
            </div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {[["log","Log Set"],["history","History"]].map(([k,l])=>(
                <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${tab===k?dayColor:T.border}`,background:tab===k?`${dayColor}20`:T.bg3,color:tab===k?dayColor:T.text3,fontSize:12,cursor:"pointer",fontFamily:"monospace",fontWeight:tab===k?700:400,transition:"all 0.15s"}}>{l}</button>
              ))}
            </div>
            {tab==="log"&&(
              <>
                {todaySets.length>0&&(
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:9,fontFamily:"monospace",color:T.text3,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Today's Sets</div>
                    {todaySets.map((s,i)=><LogRow key={i} entry={s} idx={i} color={dayColor} T={T} onEdit={(i,u)=>onEditLog(sessionKey,todayKey,i,u)} onDelete={i=>onDeleteLog(sessionKey,todayKey,i)}/>)}
                  </div>
                )}
                {!isBW&&(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                    {[[kg,setKg,2.5,"Weight (kg)",[5,10,15,20,25,30],dayColor],[reps,setReps,1,"Reps",[8,10,12,15],BRAND.teal]].map(([v,sv,step,lbl,quick,c],qi)=>(
                      <div key={qi}>
                        <div style={{fontSize:9,fontFamily:"monospace",color:T.text3,textTransform:"uppercase",letterSpacing:2,marginBottom:7,textAlign:"center"}}>{lbl}</div>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <button onClick={()=>adj(v,sv,-step,qi===1?1:0)} style={{width:36,height:36,borderRadius:"50%",background:T.bg3,border:`1px solid ${c}50`,color:c,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                          <input type="number" value={v} onChange={e=>sv(e.target.value)} placeholder="0" style={{flex:1,background:T.bg,border:`1px solid ${T.border2}`,borderRadius:8,padding:"8px 4px",fontFamily:"monospace",fontSize:20,color:T.text,textAlign:"center",fontWeight:700}}/>
                          <button onClick={()=>adj(v,sv,step,0)} style={{width:36,height:36,borderRadius:"50%",background:T.bg3,border:`1px solid ${c}50`,color:c,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                        </div>
                        <div style={{display:"flex",gap:4,justifyContent:"center",marginTop:6,flexWrap:"wrap"}}>
                          {quick.map(q=><button key={q} onClick={()=>sv(String(q))} style={{padding:"3px 8px",borderRadius:12,border:`1px solid ${v==q?c:T.border}`,background:v==q?`${c}25`:T.bg3,color:v==q?c:T.text3,fontSize:11,cursor:"pointer",fontFamily:"monospace",transition:"all 0.15s"}}>{q}</button>)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:9,fontFamily:"monospace",color:T.text3,textTransform:"uppercase",letterSpacing:2,marginBottom:7,textAlign:"center"}}>How Did It Feel?</div>
                  <div style={{display:"flex",gap:6}}>
                    {["😰 Hard","😊 Good","😄 Easy"].map(f=>(
                      <button key={f} onClick={()=>setFeel(feel===f?null:f)} style={{flex:1,padding:"8px 4px",borderRadius:8,border:`1px solid ${feel===f?dayColor:T.border}`,background:feel===f?`${dayColor}20`:T.bg3,color:feel===f?dayColor:T.text3,fontSize:12,cursor:"pointer",fontFamily:"monospace",transition:"all 0.15s"}}>{f}</button>
                    ))}
                  </div>
                </div>
                <button onClick={doSave} style={{width:"100%",padding:"12px",borderRadius:10,background:saved?`${dayColor}30`:`linear-gradient(135deg,${dayColor},${dayColor}CC)`,border:`1px solid ${dayColor}`,color:saved?dayColor:BRAND.charcoal,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"monospace",letterSpacing:1,transition:"all 0.15s"}}>
                  {saved?"✓ SAVED":isBW?"LOG SET (BW)":"LOG SET"}
                </button>
              </>
            )}
            {tab==="history"&&(
              <div>
                {allDates.length===0?<div style={{textAlign:"center",padding:"20px 0",color:T.text3,fontFamily:"monospace",fontSize:12}}>No history yet — log your first set</div>:(
                  <>
                    {sparkPts.length>1&&<button onClick={()=>setShowChart(true)} style={{width:"100%",marginBottom:10,padding:"9px",borderRadius:8,background:`${dayColor}15`,border:`1px solid ${dayColor}35`,color:dayColor,fontSize:12,cursor:"pointer",fontFamily:"monospace",fontWeight:700}}>📈 View Full Trend Chart</button>}
                    {[...allDates].reverse().slice(0,10).map(dt=>{
                      const sets=sessions[sessionKey]?.[dt]||[];
                      const nums=sets.filter(s=>!isNaN(parseFloat(s.kg))).map(s=>parseFloat(s.kg));
                      const best=nums.length?Math.max(...nums):null;
                      return(
                        <div key={dt} style={{background:T.bg3,borderRadius:8,padding:"9px 11px",marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                            <span style={{fontSize:12,fontFamily:"monospace",color:T.text2,fontWeight:600}}>{fmtDate(dt)}</span>
                            {best&&<span style={{fontSize:12,fontFamily:"monospace",color:dayColor,fontWeight:700}}>Best: {best}kg</span>}
                          </div>
                          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                            {sets.map((s,i)=><span key={i} style={{fontSize:11,fontFamily:"monospace",color:dayColor,background:`${dayColor}18`,padding:"2px 8px",borderRadius:4}}>{s.kg}{s.kg!=="BW"?"kg":""} × {s.reps}</span>)}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ── ADD EXERCISE MODAL ─────────────────────────────────────
function AddExModal({dayColor,T,onAdd,onClose}){
  const[name,setName]=useState("");
  const[muscle,setMuscle]=useState("");
  const[sets,setSets]=useState("3");
  const[reps,setReps]=useState("10");
  const[rest,setRest]=useState("60s");
  const[sw,setSw]=useState("");
  const[cue,setCue]=useState("");
  function submit(){
    if(!name.trim())return;
    onAdd({id:uid(),name:name.trim(),muscle:muscle||"Custom",sets:parseInt(sets)||3,reps:parseInt(reps)||10,rest:rest||"60s",startWeight:sw||"Light",cue:cue||"Controlled movement · feel the muscle"});
    onClose();
  }
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:T.bg2,border:`1px solid ${dayColor}40`,borderRadius:"14px 14px 0 0",width:"100%",maxWidth:480,padding:20,maxHeight:"88vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontSize:18,fontWeight:700,color:T.text}}>Add Exercise</div>
          <button onClick={onClose} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:8,padding:"6px 12px",color:T.text3,cursor:"pointer",fontSize:13}}>✕</button>
        </div>
        {[["Exercise Name *",name,setName,"e.g. Incline DB Press"],["Muscle Group",muscle,setMuscle,"e.g. Upper Chest"],["Start Weight",sw,setSw,"e.g. 10kg or Bodyweight"],["Form Cue",cue,setCue,"Key coaching cue"]].map(([l,v,sv,ph])=>(
          <div key={l} style={{marginBottom:12}}>
            <div style={{fontSize:10,fontFamily:"monospace",color:T.text3,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>{l}</div>
            <input value={v} onChange={e=>sv(e.target.value)} placeholder={ph} style={{width:"100%",background:T.bg3,border:`1px solid ${T.border2}`,borderRadius:8,padding:"11px 12px",color:T.text,fontSize:13,boxSizing:"border-box"}}/>
          </div>
        ))}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:18}}>
          {[["Sets",sets,setSets],["Reps",reps,setReps],["Rest",rest,setRest]].map(([l,v,sv])=>(
            <div key={l}>
              <div style={{fontSize:10,fontFamily:"monospace",color:T.text3,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>{l}</div>
              <input value={v} onChange={e=>sv(e.target.value)} style={{width:"100%",background:T.bg3,border:`1px solid ${T.border2}`,borderRadius:8,padding:"11px 8px",color:T.text,fontSize:13,textAlign:"center",boxSizing:"border-box"}}/>
            </div>
          ))}
        </div>
        <button onClick={submit} style={{width:"100%",padding:"14px",borderRadius:10,background:`linear-gradient(135deg,${dayColor},${dayColor}CC)`,border:"none",color:BRAND.charcoal,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"monospace",letterSpacing:1}}>+ Add Exercise</button>
      </div>
    </div>
  );
}

// ── DAY SCREEN ─────────────────────────────────────────────
function DayScreen({dayKey,plan,sessions,onLog,onEditLog,onDeleteLog,onAddEx,onDeleteEx,T,onBack}){
  const[section,setSection]=useState("exercises");
  const[addModal,setAddModal]=useState(false);
  const day=plan[dayKey];
  const todaySets=day.exercises.reduce((a,ex)=>a+((sessions[`${dayKey}_${ex.id}`]?.[today()])||[]).length,0);
  const warmups=[
    {name:"Cycling Easy",detail:"5 min · low resistance · HR 90–100"},
    {name:"Joint Mobility",detail:"Arm circles · hip circles · leg swings · 10 each"},
    {name:"Muscle Activation",detail:"Target muscles today · light sets · wake up neural patterns"},
    {name:"Warm-Up Sets",detail:"First exercise at 50% weight · 8 reps · learn the movement"},
  ];
  const cooldowns=[
    {name:"Stretch Target Muscles",detail:"30–45 sec each · breathe slowly into the stretch"},
    {name:"Hip Flexor Stretch",detail:"45 sec each side · push hips forward gently"},
    {name:"Foam Roll Sore Areas",detail:"Pause 20–30sec on tight spots · breathe slowly"},
    {name:"Diaphragmatic Breathwork",detail:"5 min · 4 count in · 6 count out · nervous system reset"},
  ];
  return(
    <>
      {addModal&&<AddExModal dayColor={day.color} T={T} onAdd={ex=>{onAddEx(dayKey,ex);setAddModal(false);}} onClose={()=>setAddModal(false)}/>}
      <div style={{background:T.bg,minHeight:"100vh",color:T.text,fontFamily:"Georgia,serif"}}>
        <div style={{background:`linear-gradient(135deg,${day.color}18,${T.bg})`,padding:"16px 16px 12px",borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:100,backdropFilter:"blur(8px)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <button onClick={onBack} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 13px",color:T.text3,fontSize:12,cursor:"pointer",fontFamily:"monospace"}}>← Back</button>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:26}}>{day.emoji}</span>
              <div>
                <div style={{fontSize:20,fontWeight:700,color:T.text,lineHeight:1}}>{day.label}</div>
                <div style={{fontSize:10,fontFamily:"monospace",color:T.text3,marginTop:1}}>{day.muscles}</div>
              </div>
            </div>
            {todaySets>0&&<span style={{fontSize:12,fontFamily:"monospace",color:day.color,background:`${day.color}18`,padding:"3px 10px",borderRadius:6,fontWeight:700}}>{todaySets} sets</span>}
          </div>
          <div style={{display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
            {[["warmup","Warm-Up"],["exercises","Exercises"],["cardio","Cardio"],["cooldown","Cool-Down"]].map(([k,l])=>(
              <button key={k} onClick={()=>setSection(k)} style={{flex:"none",padding:"7px 14px",borderRadius:20,border:`1px solid ${section===k?day.color:T.border}`,background:section===k?`${day.color}25`:T.bg3,color:section===k?day.color:T.text3,fontSize:12,cursor:"pointer",fontFamily:"monospace",whiteSpace:"nowrap",fontWeight:section===k?700:400,transition:"all 0.15s"}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{padding:"0 14px 80px"}}>
          {section==="warmup"&&(
            <>
              <div style={{margin:"16px 0 10px",display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:3,height:12,background:day.color,borderRadius:2}}/>
                <span style={{fontFamily:"monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:T.text3}}>Warm-Up · Prepare Your Body</span>
                <div style={{flex:1,height:1,background:T.border}}/>
              </div>
              <div style={{background:`${day.color}10`,border:`1px solid ${day.color}25`,borderRadius:10,padding:"11px 13px",marginBottom:12,fontSize:12,color:T.text2,lineHeight:1.6}}>
                Before every set — breathe in · brace core · shoulders back · chest up · then begin
              </div>
              {warmups.map((w,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"11px 12px",background:T.card,borderRadius:10,marginBottom:6,alignItems:"flex-start",border:`1px solid ${T.border}`,boxShadow:T===LIGHT?"0 1px 3px rgba(0,0,0,0.06)":"none"}}>
                  <div style={{width:24,height:24,borderRadius:"50%",background:`${day.color}20`,border:`1px solid ${day.color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:10,color:day.color,fontFamily:"monospace",fontWeight:700}}>{i+1}</span>
                  </div>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:2}}>{w.name}</div>
                    <div style={{fontSize:11,color:T.text3,fontFamily:"monospace"}}>{w.detail}</div>
                  </div>
                </div>
              ))}
              <button onClick={()=>setSection("exercises")} style={{width:"100%",marginTop:10,padding:"13px",borderRadius:10,background:`linear-gradient(135deg,${day.color},${day.color}CC)`,border:"none",color:BRAND.charcoal,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"monospace",letterSpacing:1}}>Start Exercises →</button>
            </>
          )}
          {section==="exercises"&&(
            <>
              <div style={{margin:"16px 0 10px",display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:3,height:12,background:day.color,borderRadius:2}}/>
                <span style={{fontFamily:"monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:T.text3}}>Exercises · Tap To Expand</span>
                <div style={{flex:1,height:1,background:T.border}}/>
              </div>
              {day.exercises.map((ex)=>(
                <div key={ex.id} style={{position:"relative"}}>
                  <ExCard ex={ex} dayColor={day.color} sessionKey={`${dayKey}_${ex.id}`} sessions={sessions} onLog={onLog} onEditLog={onEditLog} onDeleteLog={onDeleteLog} T={T}/>
                  <button onClick={()=>onDeleteEx(dayKey,ex.id)} style={{position:"absolute",top:14,right:12,background:"transparent",border:"none",color:T.text3,fontSize:11,cursor:"pointer",opacity:0.35,padding:"0 4px"}} title="Remove">✕</button>
                </div>
              ))}
              <button onClick={()=>setAddModal(true)} style={{width:"100%",marginTop:4,padding:"13px",borderRadius:10,background:"transparent",border:`1.5px dashed ${day.color}60`,color:day.color,fontSize:13,cursor:"pointer",fontFamily:"monospace",letterSpacing:1,fontWeight:700}}>+ Add Custom Exercise</button>
              <button onClick={()=>setSection("cardio")} style={{width:"100%",marginTop:10,padding:"12px",borderRadius:10,background:`${day.color}20`,border:`1px solid ${day.color}50`,color:day.color,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"monospace"}}>Done → Cardio Finisher</button>
            </>
          )}
          {section==="cardio"&&(
            <>
              <div style={{margin:"16px 0 10px",display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:3,height:12,background:day.color,borderRadius:2}}/>
                <span style={{fontFamily:"monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:T.text3}}>Cardio Finisher</span>
                <div style={{flex:1,height:1,background:T.border}}/>
              </div>
              <div style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${day.color}`,borderRadius:10,padding:"16px 14px",marginBottom:12,boxShadow:T===LIGHT?"0 1px 4px rgba(0,0,0,0.07)":"none"}}>
                <div style={{fontSize:17,fontWeight:700,color:T.text,marginBottom:6}}>🚴 Cycling — 10 Minutes</div>
                <div style={{fontSize:12,fontFamily:"monospace",color:T.text3,marginBottom:12}}>Moderate resistance · HR 110–125 bpm</div>
                <div style={{background:`${day.color}10`,border:`1px solid ${day.color}25`,borderRadius:8,padding:"10px 12px",fontSize:12,color:T.text2,lineHeight:1.65}}>
                  10 min cycling after strength training pulls glucose from bloodstream into depleted muscles. Direct blood sugar management. Your diabetes medication works WITH this — every single session.
                </div>
              </div>
              <button onClick={()=>setSection("cooldown")} style={{width:"100%",padding:"12px",borderRadius:10,background:`${day.color}20`,border:`1px solid ${day.color}50`,color:day.color,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"monospace"}}>Done → Cool Down</button>
            </>
          )}
          {section==="cooldown"&&(
            <>
              <div style={{margin:"16px 0 10px",display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:3,height:12,background:day.color,borderRadius:2}}/>
                <span style={{fontFamily:"monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:T.text3}}>Cool-Down</span>
                <div style={{flex:1,height:1,background:T.border}}/>
              </div>
              <div style={{background:"#FFF0EE",border:"1px solid #E0A090",borderRadius:10,padding:"10px 13px",marginBottom:12,fontSize:11,fontFamily:"monospace",color:"#C05040"}}>
                ⚕️ BP medication — always cool down. Abrupt stop can cause sharp blood pressure drop.
              </div>
              {cooldowns.map((c,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"11px 12px",background:T.card,borderRadius:10,marginBottom:6,alignItems:"flex-start",border:`1px solid ${T.border}`}}>
                  <div style={{width:24,height:24,borderRadius:"50%",background:`${day.color}20`,border:`1px solid ${day.color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:10,color:day.color,fontFamily:"monospace",fontWeight:700}}>{i+1}</span>
                  </div>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:2}}>{c.name}</div>
                    <div style={{fontSize:11,color:T.text3,fontFamily:"monospace"}}>{c.detail}</div>
                  </div>
                </div>
              ))}
              <div style={{background:`linear-gradient(135deg,${day.color}14,${T.bg})`,border:`1px solid ${day.color}30`,borderRadius:12,padding:"20px 16px",textAlign:"center",marginTop:12}}>
                <div style={{fontSize:40,marginBottom:8}}>🏆</div>
                <div style={{fontSize:20,fontWeight:700,color:T.text,marginBottom:4}}>Session Complete</div>
                <div style={{fontSize:12,fontFamily:"monospace",color:T.text3,marginBottom:14}}>{todaySets} sets logged today · {day.label}</div>
                <div style={{background:`${day.color}10`,border:`1px solid ${day.color}25`,borderRadius:8,padding:"12px 14px",marginBottom:14}}>
                  <div style={{fontSize:9,fontFamily:"monospace",letterSpacing:2,color:day.color,textTransform:"uppercase",marginBottom:6}}>3 Wins Today</div>
                  <div style={{fontSize:13,color:T.text2,lineHeight:1.8,fontStyle:"italic"}}>I showed up.<br/>I logged my numbers.<br/>I am the man building Sarojini Nivas.</div>
                </div>
                <button onClick={onBack} style={{width:"100%",padding:"13px",borderRadius:10,background:`linear-gradient(135deg,${BRAND.teal},${BRAND.tealLight})`,border:"none",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"monospace",letterSpacing:1}}>← Back to Home</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ── PROGRESS SCREEN ────────────────────────────────────────
function ProgressScreen({plan,sessions,T,onBack}){
  const[filterDay,setFilterDay]=useState("all");
  const[chartEx,setChartEx]=useState(null);
  const allEx=[];
  Object.entries(plan).forEach(([dk,day])=>{
    day.exercises.forEach(ex=>{
      const sk=`${dk}_${ex.id}`;
      const dates=Object.keys(sessions[sk]||{}).sort();
      if(dates.length>0){
        const trendData=dates.map(dt=>{
          const sets=sessions[sk]?.[dt]||[];
          const nums=sets.filter(s=>!isNaN(parseFloat(s.kg))).map(s=>parseFloat(s.kg));
          return{date:dt,best:nums.length?Math.max(...nums):0,totalSets:sets.length};
        });
        allEx.push({sk,name:ex.name,muscle:ex.muscle,dayKey:dk,dayLabel:day.label,color:day.color,emoji:day.emoji,sessions:trendData});
      }
    });
  });
  const filtered=filterDay==="all"?allEx:allEx.filter(e=>e.dayKey===filterDay);
  const totalGain=filtered.reduce((a,e)=>{
    const pts=e.sessions.filter(s=>s.best>0);
    if(pts.length<2)return a;
    return a+(pts[pts.length-1].best-pts[0].best);
  },0);
  return(
    <>
      {chartEx&&<TrendChart sessions={chartEx.sessions} color={chartEx.color} name={chartEx.name} T={T} onClose={()=>setChartEx(null)}/>}
      <div style={{background:T.bg,minHeight:"100vh",color:T.text,fontFamily:"Georgia,serif"}}>
        <div style={{background:`linear-gradient(180deg,${BRAND.teal}18,${T.bg})`,padding:"24px 16px 14px",borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:50}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <button onClick={onBack} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 13px",color:T.text3,fontSize:12,cursor:"pointer",fontFamily:"monospace"}}>← Back</button>
            <div style={{flex:1}}>
              <div style={{fontSize:24,fontWeight:700,color:T.text}}>Strength <span style={{color:BRAND.gold}}>Trends</span></div>
              <div style={{fontSize:10,fontFamily:"monospace",color:T.text3}}>Tap any exercise to see full chart</div>
            </div>
            {totalGain>0&&<div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:700,color:T.green}}>+{totalGain.toFixed(1)}kg</div><div style={{fontSize:8,fontFamily:"monospace",color:T.text3,textTransform:"uppercase",letterSpacing:1}}>Total Gain</div></div>}
          </div>
          <div style={{display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none"}}>
            <button onClick={()=>setFilterDay("all")} style={{flex:"none",padding:"5px 12px",borderRadius:16,border:`1px solid ${filterDay==="all"?BRAND.gold:T.border}`,background:filterDay==="all"?`${BRAND.gold}25`:T.bg3,color:filterDay==="all"?BRAND.gold:T.text3,fontSize:11,cursor:"pointer",fontFamily:"monospace",fontWeight:filterDay==="all"?700:400}}>All</button>
            {Object.entries(plan).map(([k,d])=>(
              <button key={k} onClick={()=>setFilterDay(k)} style={{flex:"none",padding:"5px 11px",borderRadius:16,border:`1px solid ${filterDay===k?d.color:T.border}`,background:filterDay===k?`${d.color}25`:T.bg3,color:filterDay===k?d.color:T.text3,fontSize:11,cursor:"pointer",fontFamily:"monospace",whiteSpace:"nowrap",fontWeight:filterDay===k?700:400}}>{d.emoji} {d.label.split(" ")[0]}</button>
            ))}
          </div>
        </div>
        <div style={{padding:"14px 14px 60px"}}>
          {filtered.length===0?(
            <div style={{textAlign:"center",padding:"70px 20px"}}>
              <div style={{fontSize:52,marginBottom:14}}>📈</div>
              <div style={{fontSize:17,color:T.text3,fontFamily:"monospace",marginBottom:6}}>No data yet</div>
              <div style={{fontSize:12,color:T.text3,fontFamily:"monospace"}}>Log sessions to see your strength trends</div>
            </div>
          ):(
            filtered.map(ex=>{
              const pts=ex.sessions.filter(s=>s.best>0).map(s=>s.best);
              const trend=pts.length>1?pts[pts.length-1]-pts[0]:0;
              const pct=pts.length>1&&pts[0]>0?((trend/pts[0])*100).toFixed(0):0;
              return(
                <div key={ex.sk} onClick={()=>setChartEx(ex)} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${ex.color}`,borderRadius:10,padding:"13px 14px",marginBottom:8,cursor:"pointer",boxShadow:T===LIGHT?"0 1px 4px rgba(0,0,0,0.07)":"none"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:3}}>{ex.name}</div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                        <span style={{fontSize:9,fontFamily:"monospace",color:ex.color,background:`${ex.color}18`,padding:"1px 7px",borderRadius:4}}>{ex.muscle}</span>
                        <span style={{fontSize:9,fontFamily:"monospace",color:T.text3}}>{ex.emoji} {ex.dayLabel} · {ex.sessions.length} session{ex.sessions.length!==1?"s":""}</span>
                      </div>
                      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                        {[["START",ex.sessions[0]?.best>0?`${ex.sessions[0].best}kg`:"BW",T.text3],["LATEST",ex.sessions[ex.sessions.length-1]?.best>0?`${ex.sessions[ex.sessions.length-1].best}kg`:"BW",ex.color],["GAIN",trend!==0?`${trend>=0?"+":""}${trend}kg`:"—",trend>=0?T.green:T.red],["% UP",parseFloat(pct)!==0?`${pct}%`:"—",parseFloat(pct)>=0?T.green:T.red]].map(([l,v,c])=>(
                          <div key={l}><div style={{fontSize:8,fontFamily:"monospace",color:T.text3,letterSpacing:1,marginBottom:2}}>{l}</div><div style={{fontSize:16,fontWeight:700,color:c}}>{v}</div></div>
                        ))}
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                      <Spark pts={pts} color={ex.color} w={72} h={32}/>
                      <span style={{fontSize:9,fontFamily:"monospace",color:T.text3}}>tap for chart →</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {filtered.length>0&&(
            <div style={{background:`linear-gradient(135deg,${BRAND.teal}12,${BRAND.gold}10)`,border:`1px solid ${BRAND.teal}25`,borderRadius:12,padding:"16px",marginTop:8,textAlign:"center"}}>
              <div style={{fontSize:9,fontFamily:"monospace",letterSpacing:3,color:BRAND.teal,textTransform:"uppercase",marginBottom:6}}>Your Strength Journey</div>
              <div style={{fontSize:13,color:T.text2,lineHeight:1.8,fontStyle:"italic"}}>Every weight increase is your body adapting.<br/>The trend line never lies — it only goes up.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── HOME SCREEN ────────────────────────────────────────────
function HomeScreen({plan,sessions,T,isDark,toggleDark,setScreen,setActiveDay}){
  const totalSets=Object.values(sessions).reduce((a,bd)=>a+Object.values(bd).flat().length,0);
  const totalDays=new Set(Object.values(sessions).flatMap(bd=>Object.keys(bd))).size;
  const trending=Object.keys(sessions).filter(sk=>Object.keys(sessions[sk]||{}).length>=2).length;
  return(
    <div style={{background:T.bg,minHeight:"100vh",color:T.text,fontFamily:"Georgia,serif"}}>
      {/* Hero */}
      <div style={{background:isDark?"linear-gradient(180deg,#0A1A1C,#111111)":"linear-gradient(180deg,#E0F0F2,#F4F0E8)",padding:"32px 16px 22px",textAlign:"center",borderBottom:`1px solid ${T.border}`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 50% at 50% 0%,${BRAND.teal}15,transparent)`,pointerEvents:"none"}}/>
        {/* Theme toggle */}
        <div style={{position:"absolute",top:16,right:16}}>
          <button onClick={toggleDark} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:20,padding:"6px 12px",color:T.text2,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6}}>
            {isDark?"☀️ Light":"🌙 Dark"}
          </button>
        </div>
        {/* Brand header */}
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:10,marginBottom:14}}>
          <LLTLogo size={40}/>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:12,fontWeight:700,color:BRAND.teal,letterSpacing:2,textTransform:"uppercase",lineHeight:1}}>Limitless Life Tribe</div>
            <div style={{fontSize:9,fontFamily:"monospace",color:T.text3,letterSpacing:1,marginTop:2}}>Training Protocol · Dubai</div>
          </div>
        </div>
        <div style={{fontSize:30,fontWeight:700,lineHeight:1.1,marginBottom:4,color:T.text}}>
          Nidhin's<br/><span style={{color:BRAND.gold}}>Gym Tracker</span>
        </div>
        <div style={{fontSize:10,fontFamily:"monospace",color:T.text3,marginBottom:20,letterSpacing:1}}>112kg → 80kg · 5-Day Programme</div>
        {/* Stats bar */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:0,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden",maxWidth:360,margin:"0 auto",boxShadow:T===LIGHT?"0 2px 8px rgba(0,0,0,0.1)":"none"}}>
          {[["5","DAYS",BRAND.gold],[String(totalSets),"SETS",BRAND.teal],[String(totalDays),"SESSIONS",BRAND.teal],[String(trending),"TRENDING","#5BAF7A"]].map(([v,l,c],i)=>(
            <div key={i} style={{padding:"10px 4px",borderRight:i<3?`1px solid ${T.border}`:"none",textAlign:"center",background:T.bg2}}>
              <div style={{fontSize:22,fontWeight:700,color:c,lineHeight:1,marginBottom:2}}>{v}</div>
              <div style={{fontSize:7,fontFamily:"monospace",letterSpacing:1,color:T.text3,textTransform:"uppercase"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical */}
      <div style={{background:isDark?"#160A0A":"#FFF5F5",borderBottom:`1px solid ${isDark?"#2A1515":"#FFD0C8"}`,padding:"9px 16px",display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:14}}>⚕️</span>
        <div style={{fontSize:10,fontFamily:"monospace",color:isDark?"#C06060":"#A04030",lineHeight:1.5}}>
          <strong>Medical:</strong> Blood sugar check before session · HR below 140 bpm · Always cool down
        </div>
      </div>

      <div style={{padding:"16px 14px 20px"}}>
        {/* Progress button */}
        {totalSets>0&&(
          <button onClick={()=>setScreen("progress")} style={{width:"100%",marginBottom:14,padding:"13px",borderRadius:10,background:`linear-gradient(135deg,${BRAND.teal}20,${BRAND.gold}15)`,border:`1px solid ${BRAND.teal}35`,color:BRAND.teal,fontSize:13,cursor:"pointer",fontFamily:"monospace",letterSpacing:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontWeight:700,boxShadow:T===LIGHT?"0 1px 4px rgba(0,0,0,0.08)":"none"}}>
            <span style={{fontSize:17}}>📈</span> View Strength Trend Graphs
          </button>
        )}

        <div style={{fontFamily:"monospace",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:T.text3,marginBottom:10}}>Select Today's Session</div>

        {Object.entries(plan).map(([key,d])=>{
          const daySets=d.exercises.reduce((a,ex)=>a+((sessions[`${key}_${ex.id}`]?.[today()])||[]).length,0);
          const allSets=d.exercises.reduce((a,ex)=>a+Object.values(sessions[`${key}_${ex.id}`]||{}).flat().length,0);
          return(
            <div key={key} onClick={()=>{setActiveDay(key);setScreen("day");}} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`4px solid ${d.color}`,borderRadius:10,padding:"14px 16px",marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:T===LIGHT?"0 1px 5px rgba(0,0,0,0.08)":"none",transition:"all 0.15s"}}>
              <span style={{fontSize:28}}>{d.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:700,color:T.text,marginBottom:2}}>{d.label}</div>
                <div style={{fontSize:11,fontFamily:"monospace",color:T.text3}}>{d.muscles}</div>
                {allSets>0&&<div style={{fontSize:9,fontFamily:"monospace",color:T.text3,marginTop:2}}>{allSets} total sets logged</div>}
              </div>
              <div style={{textAlign:"right"}}>
                {daySets>0&&<div style={{fontSize:11,fontFamily:"monospace",color:d.color,background:`${d.color}18`,padding:"3px 9px",borderRadius:5,marginBottom:4,fontWeight:700}}>{daySets} today</div>}
                <div style={{fontSize:20,color:d.color,fontWeight:700}}>›</div>
              </div>
            </div>
          );
        })}

        {/* Golden rules */}
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden",marginTop:12,boxShadow:T===LIGHT?"0 1px 4px rgba(0,0,0,0.06)":"none"}}>
          <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`,fontFamily:"monospace",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:T.text3,background:T.bg3}}>Golden Rules</div>
          {[["⏱","Tempo","3 sec down · 1 sec up — every rep"],["❤️","HR","Stay below 140 bpm always"],["🔺","Overload","2 clean sessions → add 2.5–5kg"],["🧠","Form","Brace core · neutral spine · always"],["🚴","Cardio","10 min cycling after every session"]].map(([icon,title,detail],i)=>(
            <div key={title} style={{display:"flex",gap:10,padding:"9px 14px",borderBottom:i<4?`1px solid ${T.border}40`:"none",alignItems:"center"}}>
              <span style={{fontSize:15}}>{icon}</span>
              <span style={{fontSize:12,fontWeight:600,color:T.text2,minWidth:64}}>{title}</span>
              <span style={{fontSize:11,color:T.text3,fontFamily:"monospace"}}>{detail}</span>
            </div>
          ))}
        </div>

        {/* Brand footer */}
        <div style={{textAlign:"center",padding:"20px 0 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <LLTLogo size={28}/>
          <div style={{fontFamily:"monospace",fontSize:8,letterSpacing:3,color:T.text3,textTransform:"uppercase"}}>Limitless Life Tribe · Dubai · 112kg → 80kg</div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────
export default function App(){
  const[plan,setPlan]=useStor("llt-plan-v3",DEFAULT_PLAN);
  const[sessions,setSessions]=useStor("llt-sessions-v3",{});
  const[isDark,setIsDark]=useStor("llt-dark",true);
  const[screen,setScreen]=useState("home");
  const[activeDay,setActiveDay]=useState(null);
  const T=isDark?DARK:LIGHT;

  useEffect(()=>{
    const updated={...plan};let changed=false;
    Object.entries(updated).forEach(([dk,day])=>{day.exercises.forEach((ex,i)=>{if(!ex.id){ex.id=`${dk}_${i}`;changed=true;}});});
    if(changed)setPlan(updated);
  },[]);

  function logSet(sk,date,entry){setSessions(prev=>({...prev,[sk]:{...(prev[sk]||{}),[date]:[...(prev[sk]?.[date]||[]),entry]}}));}
  function editLog(sk,date,idx,updated){setSessions(prev=>{const ns=[...(prev[sk]?.[date]||[])];ns[idx]=updated;return{...prev,[sk]:{...(prev[sk]||{}),[date]:ns}};});}
  function deleteLog(sk,date,idx){setSessions(prev=>{const ns=[...(prev[sk]?.[date]||[])];ns.splice(idx,1);return{...prev,[sk]:{...(prev[sk]||{}),[date]:ns}};});}
  function addEx(dk,ex){setPlan(prev=>({...prev,[dk]:{...prev[dk],exercises:[...prev[dk].exercises,ex]}}));}
  function deleteEx(dk,id){setPlan(prev=>({...prev,[dk]:{...prev[dk],exercises:prev[dk].exercises.filter(e=>e.id!==id)}}));}

  if(screen==="progress")return<ProgressScreen plan={plan} sessions={sessions} T={T} onBack={()=>setScreen("home")}/>;
  if(screen==="day"&&activeDay)return<DayScreen dayKey={activeDay} plan={plan} sessions={sessions} onLog={logSet} onEditLog={editLog} onDeleteLog={deleteLog} onAddEx={addEx} onDeleteEx={deleteEx} T={T} onBack={()=>setScreen("home")}/>;
  return<HomeScreen plan={plan} sessions={sessions} T={T} isDark={isDark} toggleDark={()=>setIsDark(!isDark)} setScreen={setScreen} setActiveDay={setActiveDay}/>;
}
