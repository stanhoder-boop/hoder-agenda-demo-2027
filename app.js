'use strict';
// Every name, venue and session is fictional demonstration content.
const sessions = [
 [15,'14:00','15:00','Organizacja','Witaj w Górskiej Przystani','Recepcja','Zespół powitalny','Odbiór przykładowych identyfikatorów, poznanie przestrzeni i spokojny początek wspólnego wyjazdu.'],
 [15,'15:00','15:45','Inspiracje','Razem na szczyt: otwarcie spotkania','Sala Panorama','Marta Jaskier','Wspólne cele, nowe perspektywy i to, co łączy nas jako zespół. Inspirujące otwarcie czterech dni spotkań.'],
 [15,'16:00','17:15','Warsztaty','Od pomysłu do wspólnego działania','Sala Świerk','Filip Borowy','Praktyczna praca w małych grupach. Zamieniamy pomysły na proste działania i sprawdzamy, jak dzielić się odpowiedzialnością.'],
 [15,'17:15','17:45','Przerwa','Kawa z widokiem','Foyer Panorama','Zespół gościnności','Czas na dobrą kawę, mały poczęstunek i pierwsze rozmowy poza salą warsztatową.'],
 [15,'18:00','19:00','Integracja','Poznajmy się z innej strony','Sala Panorama','Alicja Wrzos','Lekka, zespołowa aktywność, dzięki której odkryjemy wspólne zainteresowania i mniej znane talenty.'],
 [15,'19:30','21:30','Integracja','Kolacja powitalna','Restauracja Przystań','Zespół gościnności','Wspólny stół, swobodna atmosfera i czas na rozmowy. Pierwszy wieczór bez pośpiechu.'],
 [16,'08:00','09:00','Przerwa','Śniadanie i dobry start','Restauracja Przystań','Zespół gościnności','Spokojny poranek i śniadanie przed dniem pełnym nowych perspektyw.'],
 [16,'09:15','10:15','Inspiracje','Jakość zaczyna się od szczegółu','Sala Panorama','Leon Brzeziński','Przykłady pokazujące, jak codzienne decyzje wpływają na jakość współpracy i efekt końcowy.'],
 [16,'10:30','12:00','Warsztaty','Komunikacja, która łączy','Sala Świerk','Alicja Wrzos','Ćwiczymy jasne ustalenia, aktywne słuchanie i konstruktywną informację zwrotną na fikcyjnych sytuacjach.'],
 [16,'12:00','13:00','Przerwa','Lunch i rozmowy','Restauracja Przystań','Zespół gościnności','Przerwa obiadowa i przestrzeń na wymianę wrażeń z porannych warsztatów.'],
 [16,'13:30','15:00','Warsztaty','Małe usprawnienia, duży efekt','Sala Buk','Tomasz Potok','Tworzymy prototypy prostych usprawnień codziennej pracy. Nie potrzebujemy wielkich narzędzi, tylko dobrych pytań.'],
 [16,'15:30','17:00','Integracja','Zimowy spacer: zmień perspektywę','Punkt zbiórki: lobby','Klara Sosnowa','Przykładowy spacer w spokojnym tempie, zależny od pogody. Alternatywa wewnętrzna: zespołowa gra logiczna w sali Buk.'],
 [16,'19:00','22:00','Integracja','Wieczór dobrych historii','Sala Panorama','Filip Borowy','Kolacja, drużynowy quiz i historie, które warto opowiedzieć. Swobodny wieczór integracyjny.'],
 [17,'08:00','09:00','Przerwa','Śniadanie bez pośpiechu','Restauracja Przystań','Zespół gościnności','Dobry początek niedzieli przy wspólnym stole.'],
 [17,'09:30','10:30','Inspiracje','Zespół, na którym można polegać','Sala Panorama','Marta Jaskier','O zaufaniu, współpracy między zespołami i budowaniu przestrzeni do zadawania pytań.'],
 [17,'10:45','12:15','Warsztaty','Laboratorium współpracy','Sala Świerk','Leon Brzeziński','Zespołowe wyzwanie projektowe z ograniczonym czasem i zasobami. Liczą się rozmowa, podział ról i wspólne rozwiązanie.'],
 [17,'12:30','13:30','Przerwa','Lunch w Przystani','Restauracja Przystań','Zespół gościnności','Regeneracja i czas na nieformalne spotkania.'],
 [17,'14:00','15:30','Integracja','Wspólny szlak: gra zespołowa','Punkt zbiórki: lobby','Klara Sosnowa','Fikcyjna gra terenowa z zadaniami zespołowymi. Przy niesprzyjającej pogodzie zajęcia odbywają się wewnątrz.'],
 [17,'16:00','17:00','Warsztaty','Pomysły, które zabieramy ze sobą','Sala Buk','Tomasz Potok','Porządkujemy inspiracje i wybieramy rozwiązania warte przetestowania po spotkaniu.'],
 [17,'19:00','22:00','Integracja','Wieczór HODER: wspólna energia','Sala Panorama','Alicja Wrzos','Uroczysta kolacja w swobodnej atmosferze, podsumowanie zespołowych wyzwań i wspólne świętowanie.'],
 [18,'08:00','09:00','Przerwa','Ostatnia wspólna kawa','Restauracja Przystań','Zespół gościnności','Śniadanie, rozmowy i przygotowanie do finałowych spotkań.'],
 [18,'09:00','10:15','Warsztaty','Nasz następny krok','Sala Świerk','Filip Borowy','Zamieniamy wnioski z wyjazdu na przykładowy plan działania. Co warto zacząć, kontynuować i uprościć?'],
 [18,'10:30','11:30','Inspiracje','Dobry finał. Nowy początek.','Sala Panorama','Marta Jaskier','Najważniejsze wnioski, podziękowania i wspólne zakończenie programu.'],
 [18,'11:30','12:30','Organizacja','Do zobaczenia na kolejnym szlaku','Recepcja','Zespół powitalny','Przykładowe wymeldowanie i indywidualne wyjazdy. Godziny są wyłącznie demonstracyjne.']
].map((s,i)=>({id:`hoder-${i+1}`,day:s[0],start:s[1],end:s[2],category:s[3],title:s[4],location:s[5],speaker:s[6],description:s[7]}));
const days = {15:'Piątek',16:'Sobota',17:'Niedziela',18:'Poniedziałek'};
const storageKey = 'hoder-agenda-demo-2027-v1';
let saved = new Set();
let storageAvailable = true;
try { const data = JSON.parse(localStorage.getItem(storageKey) || '[]'); if(Array.isArray(data)) saved = new Set(data.filter(id=>sessions.some(s=>s.id===id))); } catch { storageAvailable = false; }
const state = {day:15, savedOnly:false, query:'', category:'all'};
const $ = selector=>document.querySelector(selector);
const escapeHTML = value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l').replace(/Ł/g,'L').toLowerCase();
let toastTimer;
let detailOpenerId = null;
function notify(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3200);}
function storageMessage(){ $('#storage-status').textContent = storageAvailable ? 'Twoje wybory zapisują się tylko w tej przeglądarce.' : 'Zapis lokalny jest niedostępny. Wybory działają do zamknięcia strony.'; }
function persist(){try{localStorage.setItem(storageKey,JSON.stringify([...saved]));storageAvailable=true;}catch{storageAvailable=false;notify('Wybór zapisany tylko na czas tej wizyty. Pamięć przeglądarki jest niedostępna.');}storageMessage();}
function filteredSessions(){return sessions.filter(s=>(state.day===null||s.day===state.day)&&(!state.savedOnly||saved.has(s.id))&&(state.category==='all'||s.category===state.category)&&normalize(`${s.title} ${s.speaker} ${s.location} ${s.category}`).includes(normalize(state.query)));}
function saveButton(s){return `<button class="save-button" data-save="${s.id}" aria-pressed="${saved.has(s.id)}" aria-label="${saved.has(s.id)?'Usuń z agendy':'Zapisz w agendzie'}: ${escapeHTML(s.title)}">${saved.has(s.id)?'✓ Zapisano':'+ Zapisz'}</button>`;}
function render(){
 const visible=filteredSessions();
 document.querySelectorAll('[data-day]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.day)===state.day)));
 $('#all-days').setAttribute('aria-pressed',String(state.day===null));
 $('#all-days').textContent=state.day===null?'✓ Wszystkie dni':'Wszystkie dni ↗';
 $('#view-all').setAttribute('aria-pressed',String(!state.savedOnly));$('#view-saved').setAttribute('aria-pressed',String(state.savedOnly));
 $('#saved-count').textContent=saved.size;$('#saved-count-tab').textContent=saved.size;
 $('#day-title').textContent=(state.savedOnly?'Moja agenda · ':'')+(state.day===null?'15–18 stycznia':`${days[state.day]}, ${state.day} stycznia`);
 $('#result-count').textContent=`Punkty programu: ${visible.length}`;
 $('#export').disabled=saved.size===0;$('#clear-saved').disabled=saved.size===0;
 $('#sessions').innerHTML=visible.length?visible.map(s=>`<article class="session-card"><div class="session-time">${state.day===null?`<span class="session-date">${s.day} STY · ${days[s.day]}</span>`:''}<strong>${s.start}</strong><small>do ${s.end}</small></div><div class="session-main"><span class="tag tag-${normalize(s.category)}">${s.category}</span><h4 style="margin:0"><button class="session-title" data-detail="${s.id}">${s.title}</button></h4><div class="session-meta"><span><span aria-hidden="true">⌖</span> ${s.location}</span><span><span aria-hidden="true">◌</span> ${s.speaker}</span></div></div><div class="session-actions">${saveButton(s)}<button class="details-link" data-detail="${s.id}" aria-label="Szczegóły: ${escapeHTML(s.title)}">Szczegóły ↗</button></div></article>`).join(''):`<div class="empty"><h4>${state.savedOnly&&saved.size===0?'Twój plan zaczyna się tutaj.':'Nie znaleziono punktów programu.'}</h4><p>${state.savedOnly&&saved.size===0?'Zapisz interesujące spotkania z całego programu.':'Zmień dzień, usuń filtry lub sprawdź cały program.'}</p><button class="button outline" id="empty-reset">Pokaż cały program</button></div>`;
}
function toggleSave(id){const s=sessions.find(s=>s.id===id);if(!s)return;saved.has(id)?saved.delete(id):saved.add(id);persist();render();if($('#session-dialog').open){const button=$('#dialog-content [data-save]');if(button)button.outerHTML=saveButton(s);}if(storageAvailable)notify(saved.has(id)?'Dodano do Twojej agendy.':'Usunięto z Twojej agendy.');}
function resetFilters(){state.query='';state.category='all';$('#search').value='';$('#category').value='all';render();}
function showDetails(id){const s=sessions.find(s=>s.id===id);if(!s)return;detailOpenerId=id;$('#dialog-content').innerHTML=`<span class="tag tag-${normalize(s.category)}">${s.category} · DEMO</span><h2 id="dialog-title">${s.title}</h2><div class="dialog-meta">${days[s.day]}, ${s.day} stycznia 2027 · ${s.start}–${s.end}<br>${s.location}<br>Prowadzenie: ${s.speaker}</div><p>${s.description}</p>${saveButton(s)}<p class="demo-small">Fikcyjny punkt programu. Wszystkie nazwy, osoby i lokalizacje są przykładowe. Strefa czasowa: Europe/Warsaw (UTC+1).</p>`;$('#session-dialog').showModal();}
// UTC timestamps make January's UTC+1 offset unambiguous in every calendar.
function utcTimestamp(day,time){return new Date(`2027-01-${day}T${time}:00+01:00`).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');}
function icsEscape(value){return String(value).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
function foldLine(line){let out='',chunk='',bytes=0;for(const char of line){const n=new TextEncoder().encode(char).length;if(bytes+n>75){out+=chunk+'\r\n';chunk=' ';bytes=1;}chunk+=char;bytes+=n;}return out+chunk;}
function buildCalendar(items){const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//HODER DEMO//Agenda 2027//PL','CALSCALE:GREGORIAN','X-WR-CALNAME:HODER DEMO - Moja agenda','X-WR-TIMEZONE:Europe/Warsaw'];for(const s of items)lines.push('BEGIN:VEVENT',`UID:${s.id}-202701@hoder-demo.invalid`,`DTSTAMP:${stamp}`,`DTSTART:${utcTimestamp(s.day,s.start)}`,`DTEND:${utcTimestamp(s.day,s.end)}`,`SUMMARY:${icsEscape('[DEMO] '+s.title)}`,`LOCATION:${icsEscape(s.location+' - miejsce fikcyjne')}`,`DESCRIPTION:${icsEscape(`DEMO. Wszystkie dane fikcyjne. Prowadzenie: ${s.speaker}. ${s.description} Godziny lokalne Europe/Warsaw (UTC+1).`)}`,'STATUS:TENTATIVE','TRANSP:TRANSPARENT','END:VEVENT');lines.push('END:VCALENDAR');return lines.map(foldLine).join('\r\n')+'\r\n';}
document.addEventListener('click',event=>{
 const save=event.target.closest('[data-save]');if(save){const id=save.dataset.save;toggleSave(id);const replacement=document.querySelector(`${$('#session-dialog').open?'#dialog-content':'#sessions'} [data-save="${id}"]`);if(replacement)replacement.focus();else $('#view-saved').focus();return;}
 const detail=event.target.closest('[data-detail]');if(detail){showDetails(detail.dataset.detail);return;}
 const day=event.target.closest('[data-day]');if(day){state.day=Number(day.dataset.day);render();return;}
 if(event.target.closest('#empty-reset')){state.savedOnly=false;state.day=null;resetFilters();$('#view-all').focus();}
});
$('#search').addEventListener('input',event=>{state.query=event.target.value.trim();render();});
$('#category').addEventListener('change',event=>{state.category=event.target.value;render();});
$('#reset').addEventListener('click',resetFilters);
$('#all-days').addEventListener('click',()=>{state.day=null;render();});
$('#view-all').addEventListener('click',()=>{state.savedOnly=false;render();});
$('#view-saved').addEventListener('click',()=>{state.savedOnly=true;state.day=null;resetFilters();});
$('#nav-saved').addEventListener('click',()=>{state.savedOnly=true;state.day=null;resetFilters();$('#program').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#view-saved').focus({preventScroll:true});});
$('.dialog-close').addEventListener('click',()=>$('#session-dialog').close());
$('#session-dialog').addEventListener('close',()=>{const opener=document.querySelector(`#sessions [data-detail="${detailOpenerId}"]`);(opener||$('#view-saved')).focus();});
$('#session-dialog').addEventListener('click',event=>{if(event.target===$('#session-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
$('#export').addEventListener('click',()=>{const items=sessions.filter(s=>saved.has(s.id));if(!items.length)return;const blob=new Blob([buildCalendar(items)],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='HODER-DEMO-moja-agenda-2027.ics';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Pobrano demonstracyjną agendę do kalendarza.');});
$('#print').addEventListener('click',()=>window.print());
$('#clear-saved').addEventListener('click',()=>{if(!saved.size)return;if(confirm('Usunąć wszystkie zapisane punkty z Twojej agendy w tej przeglądarce?')){saved.clear();persist();render();notify('Wyczyszczono Twoją agendę.');}});
window.addEventListener('storage',event=>{if(event.key===storageKey||event.key===null){try{const data=JSON.parse(event.newValue||'[]');saved=new Set(Array.isArray(data)?data.filter(id=>sessions.some(s=>s.id===id)):[]);render();}catch{/* Ignore malformed data from another tab. */}}});
storageMessage();render();
