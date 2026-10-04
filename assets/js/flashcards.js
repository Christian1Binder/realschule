function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function renderTable(table){
    if(!table?.rows?.length) return '';
    const head=(table.headers||[]).map(h=>`<th>${esc(h)}</th>`).join('');
    const rows=table.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('');
    return `<div class="rich-table-wrap"><table class="rich-table">${head?`<thead><tr>${head}</tr></thead>`:''}<tbody>${rows}</tbody></table></div>`;
}

function renderSide(side,fallback=''){
    if(typeof side==='string') return `<p>${esc(side)}</p>`;
    const data=side||{};
    const text=data.text ?? fallback;
    const image=data.image?.src ? `<figure class="flashcard-media"><img src="${esc(data.image.src)}" alt="${esc(data.image.alt||'Lernbild')}">${data.image.caption?`<figcaption>${esc(data.image.caption)}</figcaption>`:''}</figure>` : '';
    return `${text?`<p>${esc(text)}</p>`:''}${image}${renderTable(data.table)}`;
}

export function initFlashcards(containerId, flashcards) {
    const container=document.getElementById(containerId); if(!container) return;
    let currentIndex=0;
    function renderCard(index){
        const d=flashcards[index];
        const front=d.front ?? (d.q!==undefined?{text:d.q,image:d.image,table:d.table}:{});
        const back=d.back ?? (d.a!==undefined?{text:d.a}:{});
        container.innerHTML=`<div class="flashcard" tabindex="0" role="button" aria-label="Lernkarte umdrehen"><div class="flashcard-front">${renderSide(front,d.q)}</div><div class="flashcard-back">${renderSide(back,d.a)}</div></div><div class="flashcard-controls"><button id="btn-prev-${containerId}" ${index===0?'disabled':''}>Zurück</button><span>${index+1} / ${flashcards.length}</span><button id="btn-next-${containerId}" ${index===flashcards.length-1?'disabled':''}>Weiter</button></div>`;
        const card=container.querySelector('.flashcard');
        const flip=()=>card.classList.toggle('flipped'); card.addEventListener('click',flip); card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip();}});
        container.querySelector(`#btn-prev-${containerId}`).addEventListener('click',e=>{e.stopPropagation();if(currentIndex>0){currentIndex--;renderCard(currentIndex);}});
        container.querySelector(`#btn-next-${containerId}`).addEventListener('click',e=>{e.stopPropagation();if(currentIndex<flashcards.length-1){currentIndex++;renderCard(currentIndex);}});
    }
    renderCard(currentIndex);
}