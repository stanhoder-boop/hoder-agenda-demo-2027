const vm=require('node:vm');const fs=require('node:fs');const assert=require('node:assert/strict');const path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
function setup(storage){const nodes=new Map();const node=id=>{if(!nodes.has(id))nodes.set(id,{value:'',textContent:'',innerHTML:'',open:false,classList:{add(){},remove(){}},addEventListener(){},setAttribute(){},focus(){},scrollIntoView(){},showModal(){this.open=true},close(){this.open=false}});return nodes.get(id)};const ctx=vm.createContext({document:{querySelector:node,querySelectorAll:()=>[],addEventListener(){}},localStorage:storage,window:{addEventListener(){}},TextEncoder,setTimeout,clearTimeout,Date,console});vm.runInContext(code,ctx);return{ctx,node,run:s=>vm.runInContext(s,ctx)}}
const storage={getItem:()=>null,setItem(){}};const app=setup(storage);
assert.equal(app.run('sessions.length'),24);assert.equal(app.run('filteredSessions().length'),6);
assert.equal(app.run('state.day=null; filteredSessions().length'),24);
assert.equal(app.run("state.query='jakosc'; filteredSessions().length"),1);
assert.equal(app.run("state.query=''; state.category='Warsztaty'; filteredSessions().length"),6);
assert.equal(app.run("state.category='all'; toggleSave('hoder-1'); saved.size"),1);
assert.equal(app.run('state.savedOnly=true; filteredSessions().length'),1);
assert.equal(app.run("toggleSave('hoder-1'); filteredSessions().length"),0);
assert.equal(app.run("utcTimestamp(15,'14:00')"),'20270115T130000Z');
assert.equal(app.run("utcTimestamp(18,'12:30')"),'20270118T113000Z');
const calendar=app.run('buildCalendar(sessions)');assert.equal((calendar.match(/BEGIN:VEVENT/g)||[]).length,24);assert.equal((calendar.match(/SUMMARY:\[DEMO\]/g)||[]).length,24);calendar.split('\r\n').forEach(line=>assert(Buffer.byteLength(line)<=75));
assert(app.run('sessions.every(s=>s.start<s.end && s.day>=15 && s.day<=18)'));assert.equal(app.run('new Set(sessions.map(s=>s.id)).size'),24);
for(const raw of ['broken json','{}','["unknown-id"]']){const a=setup({getItem:()=>raw,setItem(){}});assert.equal(a.run('saved.size'),0);assert.equal(a.run('filteredSessions().length'),6)}
const blocked=setup({getItem(){throw Error('disabled')},setItem(){throw Error('disabled')}});blocked.run("toggleSave('hoder-1')");assert.equal(blocked.run('saved.size'),1);assert.equal(blocked.run('storageAvailable'),false);
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');assert(html.includes('lang="pl"'));assert(html.includes('WERSJA DEMO'));assert(html.includes('15–18 stycznia 2027'));assert(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(html));
console.log('PASS: 24 unique sessions / 4 days; chronology; filtering and accent-insensitive search; save/unsave; saved-only; invalid and blocked storage; ICS event count, UTC+1 conversion and 75-octet folding; Polish/demo/date/relative-assets checks.');
