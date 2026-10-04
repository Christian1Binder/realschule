const OWNER='Christian1Binder';
const REPO='realschule';
const BRANCH='main';
let token='';

const utf8ToBase64 = str => {
  const bytes = new TextEncoder().encode(str);
  let binary='';
  bytes.forEach(b=>binary+=String.fromCharCode(b));
  return btoa(binary);
};

async function github(path, options={}) {
  const headers={Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(options.headers||{})};
  if(token) headers.Authorization=`Bearer ${token}`;
  const res=await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/${path}`,{...options,headers});
  if(!res.ok){let msg=`GitHub-Fehler ${res.status}`;try{const j=await res.json();if(j.message)msg+=': '+j.message;}catch{}throw new Error(msg);}
  return res.status===204?null:res.json();
}

function askToken(){
  if(token) return token;
  const entered=prompt('Zum Veröffentlichen wird ein GitHub Fine-grained Personal Access Token mit Schreibrecht auf „Contents“ für Christian1Binder/realschule benötigt.\n\nDer Token wird nur für diese Browser-Sitzung im Arbeitsspeicher gehalten und NICHT gespeichert.\n\nGitHub-Token eingeben:');
  if(!entered) throw new Error('Veröffentlichung abgebrochen.');
  token=entered.trim();
  return token;
}

async function publishData(data){
  askToken();
  const grade=Number(data.grade), slug=data.slug;
  if(!grade||!slug) throw new Error('Klasse oder Fach-Slug fehlt.');
  const filePath=`data/grade-${grade}/${slug}.json`;
  const meta=await github(`contents/${filePath}?ref=${encodeURIComponent(BRANCH)}`);
  const payload={...data};
  delete payload.schemaVersion;
  await github(`contents/${filePath}`,{
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({message:`Lerninhalte aktualisieren: Klasse ${grade} ${data.subject}`,content:utf8ToBase64(JSON.stringify(payload,null,2)),sha:meta.sha,branch:BRANCH})
  });
  return filePath;
}

export function setupPublisher(data){
  const editBtn=document.getElementById('open-editor-btn');
  if(!editBtn)return;
  const btn=document.createElement('button');
  btn.type='button';
  btn.className='btn btn-primary';
  btn.id='publish-content-btn';
  btn.textContent='Änderungen veröffentlichen';
  btn.style.marginLeft='.5rem';
  editBtn.insertAdjacentElement('afterend',btn);
  const state=document.createElement('span');
  state.id='publish-state';
  state.className='small';
  state.style.marginLeft='.6rem';
  btn.insertAdjacentElement('afterend',state);
  btn.onclick=async()=>{
    const old=btn.textContent;
    btn.disabled=true;btn.textContent='Veröffentliche …';state.textContent='';
    try{
      const path=await publishData(data);
      btn.textContent='✓ Veröffentlicht';
      state.textContent=` ${path} wurde in GitHub aktualisiert. GitHub Pages benötigt meist nur einen kurzen Moment.`;
      setTimeout(()=>btn.textContent=old,5000);
    }catch(e){
      btn.textContent=old;
      state.textContent=' '+e.message;
      alert('Veröffentlichung fehlgeschlagen:\n'+e.message);
    }finally{btn.disabled=false;}
  };
}
