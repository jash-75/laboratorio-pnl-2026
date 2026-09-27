const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function go(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===id));window.scrollTo({top:0,behavior:'smooth'});}
$$('.nav button').forEach(b=>b.addEventListener('click',()=>go(b.dataset.view))); window.go=go;
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function noAcc(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function tokenWords(text){return text.replace(/[.,!?;:()¿¡]/g,'').split(/\s+/).filter(Boolean);}
function onlineSearch(label,q){return `<a class="search-link" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(q)}">${label} ↗</a>`;}
const GLOSSARY=[
 ['Token','pedacito de texto que el sistema puede manejar.'],['Word','palabra completa.'],['Char','caracter: letra, numero o simbolo.'],['Subword','subpalabra: parte de una palabra.'],['Stop Words','palabras muy comunes que, para algunas tareas, pueden quitarse.'],['Stemming','recorte mecanico para llevar palabras a una forma reducida.'],['Lemmatization','busqueda de la forma base con apoyo del contexto y el significado.'],['Bag of Words (BoW)','bolsa de palabras: cuenta apariciones; no lee como una persona.'],['TF-IDF','ponderacion que ayuda a distinguir terminos frecuentes en un documento pero menos comunes en el conjunto.'],['Vector','lista de numeros que representa algo.'],['Embedding','vector que intenta conservar relaciones de significado.'],['Cosine Similarity','medida basada en el angulo entre dos vectores.'],['Sequence','secuencia: elementos que aparecen en un orden.'],['Topic','tema que se repite o agrupa en documentos.'],['CNN','red que busca patrones locales.'],['RNN','red pensada para trabajar con secuencias.'],['LLM','modelo grande de lenguaje que trabaja con contexto y predice continuaciones de texto.']
];
function renderGlossary(){$('#glossary').innerHTML=GLOSSARY.map(([a,b])=>`<div><b>${a}</b><span>${b}</span></div>`).join('');}

const CASES=[
 {n:1,title:'Caso 1 · Del texto humano a piezas que la computadora puede manejar',subtitle:'Tokenizacion → Stop Words → Stemming / Lematizacion',problem:'Una escuela recibe muchos mensajes. Antes de clasificarlos o buscarlos, el sistema tiene que convertir el texto en piezas y reducir parte del ruido.',theory:[
  {title:'1. Tokenizacion',text:'Tokenizar significa separar el texto en unidades que podamos procesar. El material muestra tres formas sencillas: por palabra (Word), por caracter (Char) y por subpalabra (Subword).'},
  {title:'2. Stop Words',text:'Son palabras muy comunes que, en algunas tareas, aportan poco para distinguir un documento. No se eliminan siempre: depende del problema.'},
  {title:'3. Stemming',text:'Reduce palabras de manera mecanica, por ejemplo quitando partes o sufijos. Es rapido, pero puede dejar una forma que no sea una palabra correcta.'},
  {title:'4. Lematizacion',text:'Busca la forma base de una palabra tomando en cuenta su uso y significado. Suele ser mas cuidadosa que el stemming, pero necesita mas informacion.'}
 ],example:{text:'Los alumnos estan trabajando en proyectos de IA en el laboratorio.',tokens:['Los','alumnos','estan','trabajando','en','proyectos','de','IA','en','el','laboratorio'],stop:['Los','en','de','en','el'],clean:['alumnos','estan','trabajando','proyectos','IA','laboratorio'],pairs:[['trabajando','trabaj','trabajar'],['proyectos','proyect','proyecto']]},search:['tokenizacion PNL palabra caracter subpalabra','stemming vs lematizacion español ejemplos']},
 {n:2,title:'Caso 2 · Contar palabras no es lo mismo que medir su importancia',subtitle:'BoW → TF-IDF → Vector → Similitud Coseno → Embeddings',problem:'Un buscador escolar recibe una pregunta y tiene varios documentos. Necesita encontrar cual se parece mas al contenido de la pregunta.',theory:[
  {title:'1. BoW: Bag of Words',text:'Convierte cada documento en una lista de palabras y cuenta cuantas veces aparece cada una. Sirve para contar, pero no conserva bien el significado ni el orden.'},
  {title:'2. TF-IDF',text:'Agrega una idea nueva: no todas las palabras que aparecen merecen el mismo peso. TF mide presencia o frecuencia en el documento; IDF baja el peso de palabras que aparecen en muchos documentos. Recuerda: TF-IDF ≈ TF × IDF.'},
  {title:'3. Vector',text:'Una tabla de numeros puede representar cada documento. Asi la computadora puede comparar representaciones matematicamente.'},
  {title:'4. Similitud coseno',text:'Compara la orientacion de dos vectores. Dos vectores que apuntan en direcciones parecidas tienen alta similitud; si apuntan a lugares muy diferentes, la similitud baja.'},
  {title:'5. Embeddings',text:'Los embeddings tambien usan vectores, pero buscan representar relaciones semanticas. La idea importante para este curso: palabras relacionadas pueden quedar cercanas en un espacio de representacion.'}
 ],example:{query:'¿Cuando entrego el proyecto de IA?',docs:['D1: Entrega del proyecto de inteligencia artificial el viernes.','D2: Horario del laboratorio de programacion.','D3: Lista de materiales para la practica de redes.'],bow:[['proyecto','1','0','0'],['inteligencia','1','0','0'],['laboratorio','0','1','0'],['redes','0','0','1']],vectors:[['Pregunta','1','1','0'],['D1','1','1','0'],['D2','0','0','1']],cos:[['Pregunta vs D1','1.00','muy alta'],['Pregunta vs D2','0.00','muy baja']]},search:['Bag of Words TF-IDF explicacion sencilla español','similitud coseno vectores ejemplos PNL','word embeddings explicacion sencilla']},
 {n:3,title:'Caso 3 · Cada problema pide una herramienta distinta',subtitle:'Markov → TextRank → LDA → CNN / RNN → LLM',problem:'Un sistema escolar puede necesitar resumir, descubrir temas, continuar una secuencia, detectar patrones o trabajar con mucho contexto. No conviene pensar que una sola tecnica resuelve todo de la misma manera.',theory:[
  {title:'Cadenas de Markov',text:'Modelan una secuencia usando probabilidades de pasar de un estado a otro. Una pregunta util es: “si estoy aqui, ¿que podria venir despues?” El material las presenta como probabilidad estadistica secuencial.'},
  {title:'TextRank',text:'Usa una idea de grafos: unas oraciones se conectan con otras. Las mas importantes pueden recibir mayor peso y ayudar a formar un resumen.'},
  {title:'LDA',text:'Modela temas ocultos dentro de varios documentos. Intenta descubrir conjuntos de palabras que suelen aparecer juntas.'},
  {title:'CNN',text:'Las redes convolucionales pueden buscar patrones locales. En texto puede servir para detectar pequeñas combinaciones de palabras o caracteristicas cercanas.'},
  {title:'RNN',text:'Las redes recurrentes fueron diseñadas para trabajar con secuencias y mantener informacion de pasos anteriores. Esa memoria ayuda cuando el orden importa.'},
  {title:'LLM',text:'Los modelos grandes de lenguaje trabajan con mucho contexto textual y generan continuaciones. Una idea sencilla: reciben contexto, calculan probabilidades sobre posibles siguientes piezas de texto y producen una salida.'}
 ],example:{flows:[['Necesito resumir','TextRank','elige oraciones importantes'],['Necesito descubrir temas','LDA','agrupa palabras por temas'],['Necesito continuar una secuencia','Markov','probabilidad del siguiente paso'],['Necesito detectar un patron corto','CNN','busca rasgos locales'],['Necesito procesar una secuencia','RNN','usa informacion de pasos previos'],['Necesito trabajar con mucho contexto','LLM','genera texto a partir del contexto']]},search:['cadenas de Markov ejemplos sencillos','TextRank resumen automatico explicacion','LDA modelado de temas ejemplo sencillo','CNN RNN lenguaje natural explicacion basica','LLM modelos grandes de lenguaje explicacion basica']}
];

function theoryCards(theory){return `<div class="theory-grid">${theory.map((t,i)=>`<article class="theory-card"><div class="theory-no">${String(i+1).padStart(2,'0')}</div><h4>${t.title}</h4><p>${t.text}</p></article>`).join('')}</div>`;}
function exampleCase1(e){return `<div class="example-box"><h4>Ejemplo guiado: mira como se transforma</h4><div class="visual-flow"><div class="bubble blue"><b>Texto original</b><p>${e.text}</p></div><div class="arrow">↓</div><div class="bubble purple"><b>Tokens</b><p>${e.tokens.map(x=>`<span class="chip">${x}</span>`).join(' ')}</p></div><div class="arrow">↓</div><div class="bubble orange"><b>Quitamos algunas Stop Words</b><p>${e.stop.map(x=>`<span class="chip muted">${x}</span>`).join(' ')}</p><p><b>Queda:</b> ${e.clean.map(x=>`<span class="chip good">${x}</span>`).join(' ')}</p></div></div><div class="compare-table"><h4>¿Y las formas de una palabra?</h4><table><thead><tr><th>Palabra</th><th>Stemming (reduccion)</th><th>Lema (forma base)</th></tr></thead><tbody>${e.pairs.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="deduce"><b>Ahora deduce:</b> ${e.clean.length} piezas quedaron despues de quitar esas stop words. ¿Por que puede ser util tener menos ruido?</div></div>`;}
function exampleCase2(e){return `<div class="example-box"><h4>Ejemplo guiado: del texto a una comparacion</h4><div class="bubble blue"><b>Pregunta</b><p>${e.query}</p></div><div class="doc-grid">${e.docs.map(d=>`<div class="doc"><span>${d.slice(0,2)}</span><p>${d.slice(3)}</p></div>`).join('')}</div><h4>Una mini BoW</h4><table><thead><tr><th>Palabra</th><th>D1</th><th>D2</th><th>D3</th></tr></thead><tbody>${e.bow.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table><div class="two-col"><div><h4>Vectores sencillos</h4><table><tbody>${e.vectors.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div><h4>Similitud coseno (ejemplo simplificado)</h4><table><thead><tr><th>Comparacion</th><th>Valor</th><th>Lectura</th></tr></thead><tbody>${e.cos.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div><div class="deduce"><b>Ahora deduce:</b> si D1 apunta en la misma direccion que la pregunta, ¿que documento esperarias que el buscador mostrara primero?</div></div>`;}
function exampleCase3(e){return `<div class="example-box"><h4>Ejemplo guiado: una necesidad, una herramienta</h4><div class="model-grid">${e.flows.map(r=>`<div class="model-card"><div class="problem-pill">${r[0]}</div><div class="big-arrow">→</div><b>${r[1]}</b><span>${r[2]}</span></div>`).join('')}</div><div class="deduce"><b>Ahora deduce:</b> primero identifica el tipo de problema. Despues busca la tecnica cuyo funcionamiento encaja con esa necesidad.</div></div>`;}
function renderCase(cs){return `<article class="case"><div class="case-title"><span class="case-badge">CASO ${cs.n}</span><div><h3>${cs.title}</h3><p>${cs.subtitle}</p></div></div><div class="problem"><b>Situacion:</b> ${cs.problem}</div><h4>Teoria esencial</h4>${theoryCards(cs.theory)}${cs.n===1?exampleCase1(cs.example):cs.n===2?exampleCase2(cs.example):exampleCase3(cs.example)}<div class="practice"><h4>Mini practica</h4>${buildQuestions(cs)}</div><div class="search-more"><h4>¿Quieres ampliar?</h4><p>Elige un termino y revisa otra explicacion con tus palabras. Primero intenta entender aqui; despues compara.</p><div class="search-links">${cs.search.map((q,i)=>onlineSearch(i===0?'Buscar en Google':'Ver en Google: '+q,q)).join('')}</div></div></article>`;}
function buildQuestions(cs){const qs=cs.n===1?[
 ['¿Que hace la tokenizacion?',['Convierte el texto en piezas que podemos procesar','Traduce todo al ingles','Elimina todas las palabras'],0,'Correcto: convierte el texto en piezas.'],
 ['Si “de” aparece como Stop Word, ¿que significa?',['Que para esta tarea puede quitarse por ser muy comun','Que siempre es una palabra incorrecta','Que debe convertirse en embedding'],0,'Correcto: se puede considerar poco util para distinguir este problema.'],
 ['¿Que diferencia sencilla hay entre Stemming y Lematizacion?',['Stemming recorta; lematizacion busca la forma base con mas contexto','Son exactamente iguales','Una sirve para imagenes'],0,'Correcto: la lematizacion intenta conservar una forma linguistica mas correcta.']
]:cs.n===2?[
 ['¿Que hace BoW?',['Cuenta apariciones de palabras','Entiende intenciones humanas','Traduce frases'],0,'Correcto: cuenta. Por eso decimos “cuenta, pero no lee”.'],
 ['Si una palabra aparece en todos los documentos, su IDF suele…',['Bajar','Subir mucho','Volverse token'],0,'Correcto: IDF reduce el peso de terminos comunes en el conjunto.'],
 ['En el ejemplo, ¿que documento esta mas cerca de la pregunta?',['D1','D2','D3'],0,'Correcto: D1 comparte las ideas principales de la pregunta.'],
 ['¿Que aporta un embedding?',['Una representacion numerica que intenta conservar relaciones de significado','Solo un conteo de letras','Una lista de Stop Words'],0,'Correcto: busca representar relaciones semanticas en un espacio vectorial.']
]:[
 ['¿Que pregunta resume mejor una Cadena de Markov?',['Si estoy aqui, ¿que podria venir despues?','¿Cuantas palabras tiene el documento?','¿Que palabra debo eliminar?'],0,'Correcto: trabaja con transiciones probabilisticas en secuencias.'],
 ['¿Que tecnica del caso busca apoyar un resumen?',['TextRank','LDA','Stop Words'],0,'Correcto: TextRank busca elementos importantes de una red de oraciones.'],
 ['¿Que tecnica se relaciona con descubrir temas en muchos documentos?',['LDA','Markov','BoW'],0,'Correcto: LDA es modelado de topicos.'],
 ['¿Que diferencia basica se presenta entre CNN y RNN?',['CNN busca patrones locales; RNN trabaja con secuencias y pasos previos','CNN es para matematicas y RNN para imagenes','No hay diferencia'],0,'Correcto: esa es la idea basica del material.'],
 ['¿Que hace un LLM de forma sencilla?',['Trabaja con contexto y genera continuaciones de texto','Solo cuenta palabras','Solo elimina Stop Words'],0,'Correcto: trabaja con contexto y genera texto a partir de probabilidades sobre continuaciones.']
]; return qs.map((q,i)=>`<div class="q"><label>${i+1}. ${q[0]}</label><div class="choice">${q[1].map((o,j)=>`<button onclick="answer(${cs.n},${i},${j},this)">${o}</button>`).join('')}</div><div id="f-${cs.n}-${i}" class="feedback"></div></div>`).join('');}
function answer(c,q,ch,btn){const cfg=CASES[c-1],box=$(`#f-${c}-${q}`);const ok=(cfg.n===1?[0,0,0]:cfg.n===2?[0,0,0,0]:[0,0,0,0,0])[q]===ch;if(ok){box.className='feedback ok';box.textContent='✓ Bien. Vuelve a explicar con tus palabras por que.';}else{box.className='feedback bad';box.textContent='✗ Revisa la teoria justo arriba y vuelve a intentarlo.';}localStorage.setItem(`pnl-case-${c}-${q}`,ch);}
window.answer=answer;
function renderCases(){$('#cases').innerHTML=CASES.map(renderCase).join('');}

function renderTeams(){
 const richer=[
  ['¿Que deben explicar?','Token, Word, Char, Subword, ejemplo y razon para elegir una forma.'],
  ['¿Que deben comparar?','Stemming como recorte rapido frente a lematizacion como busqueda de la forma base con contexto.'],
  ['¿Que deben demostrar?','Una tabla BoW y una explicacion sencilla de TF, IDF y TF-IDF.'],
  ['¿Que deben dibujar?','Vectores, angulo, similitud coseno y el puente hacia embeddings.']
 ];
 $('#teams').innerHTML=PNL_DATA.TEAMS.map((t,i)=>`<article class="team"><span class="tag">Orden de exposicion de M2S1: ${i+1}</span><h3>${t.title}</h3><p><b>Guia ampliada:</b> ${t.guide}</p><div class="team-extra"><b>${richer[i][0]}</b><span>${richer[i][1]}</span></div><div class="team-product"><b>Producto sugerido</b><span>1 cartel o lamina + 1 ejemplo hecho por ustedes + 3 preguntas al grupo + una conclusion de 30 segundos.</span></div></article>`).join('');
}

function normalizeMatricula(raw){return String(raw??'').replace(/\D/g,'');}
function hashMatricula(raw){
 const s=String(PNL_DATA.MATRICULA_SALT)+'|'+normalizeMatricula(raw);
 let h=0xcbf29ce484222325n;
 const p=0x100000001b3n;
 for(let i=0;i<s.length;i++){
   const ch=s.charCodeAt(i);
   h ^= BigInt(ch & 0xff); h=BigInt.asUintN(64,h*p);
   if(ch>255){h ^= BigInt(ch>>8); h=BigInt.asUintN(64,h*p);}
 }
 return h.toString(16).padStart(16,'0');
}
function assignmentFromMatricula(raw){
 const digits=normalizeMatricula(raw);
 if(!/^\d{14}$/.test(digits)) return null;
 const code=PNL_DATA.MATRICULA_INDEX[hashMatricula(digits)];
 if(!code) return null;
 return PNL_DATA.ASSIGNMENTS.find(x=>x.code===code)||null;
}
async function loadTask(){
 const mat=normalizeMatricula($('#matriculaInput').value); const box=$('#taskArea');
 if(!/^\d{14}$/.test(mat)){
   box.innerHTML='<div class="callout"><b>Revisa tu matrícula.</b> Debe contener exactamente 14 números.</div>';return;
 }
 const a=assignmentFromMatricula(mat);
 if(!a){box.innerHTML='<div class="callout"><b>No encontramos esta matrícula.</b> Revisa los 14 números y, si siguen sin coincidir, consulta al docente.</div>';return;}
 const slot=a.slot; const d=a.data; localStorage.setItem('pnl-matricula',mat); localStorage.setItem('pnl-slot',slot);
 let detail='';
 if(a.case===1){detail=`<div class="task-intro"><div class="mini-badge">Caso 1</div><h3>${a.title}</h3><p>${a.topic}</p></div><div class="task-step"><b>1. Texto asignado</b><blockquote>${esc(d.text)}</blockquote></div><div class="task-step"><b>2. Lo que debes construir</b><p>Tokeniza por palabra, identifica las Stop Words propuestas y compara las formas de palabra indicadas.</p><div class="hint">No copies una respuesta. Muestra en tu hoja cada transformación.</div></div><div class="task-step"><b>3. Preguntas de razonamiento</b><ol><li>Separa el texto en tokens.</li><li>Marca las Stop Words indicadas y escribe el texto limpio.</li><li>Compara las tres formas dadas: ¿que puede hacer Stemming y que buscaria la lematizacion?</li><li>Explica por que conviene limpiar antes de comparar textos.</li><li>Escribe una pregunta que tu mismo harias en el examen.</li></ol></div>`;}
 if(a.case===2){detail=`<div class="task-intro"><div class="mini-badge">Caso 2</div><h3>${a.title}</h3><p>${a.topic}</p></div><div class="task-step"><b>1. Pregunta del buscador</b><blockquote>${esc(d.query)}</blockquote></div><div class="task-step"><b>2. Documentos</b><table><thead><tr><th>Documento</th><th>Texto</th></tr></thead><tbody>${d.docs.map((x,i)=>`<tr><td>D${i+1}</td><td>${esc(x)}</td></tr>`).join('')}</tbody></table></div><div class="task-step"><b>3. Lo que debes construir</b><ol><li>Haz una mini BoW con las palabras mas importantes.</li><li>Explica cual termino podria tener TF-IDF alto y por que.</li><li>Piensa en vectores para la pregunta y cada documento.</li><li>Explica cual documento quedaria mas cerca por similitud coseno y por que.</li><li>Compara en 3 renglones BoW, TF-IDF y embeddings.</li></ol></div>`;}
 if(a.case===3){detail=`<div class="task-intro"><div class="mini-badge">Caso 3</div><h3>${a.title}</h3><p>${a.topic}</p></div><div class="task-step"><b>1. Relaciona problema y tecnica</b><table><thead><tr><th>Necesidad</th><th>Tu eleccion</th><th>Por que?</th></tr></thead><tbody>${d.items.map(x=>`<tr><td>${esc(x)}</td><td>________________</td><td>________________</td></tr>`).join('')}</tbody></table></div><div class="task-step"><b>2. Explica una tecnica</b><p>Elige Markov, TextRank, LDA, CNN, RNN o LLM y dibuja <b>entrada → proceso → salida</b>.</p></div><div class="task-step"><b>3. Transfiere</b><ol><li>Explica por que no conviene usar la misma tecnica para todas las tareas.</li><li>Escribe una limitacion sencilla de la tecnica elegida.</li><li>Compara el enfoque clasico elegido con un LLM moderno.</li></ol></div>`;}
 box.innerHTML=`<article class="task case"><div class="task-meta"><span class="tag">Matrícula: ${esc(mat)}</span><span class="tag">Actividad ${String(slot).padStart(2,'0')}</span><span class="tag">${a.topic}</span></div>${detail}<div class="callout yellow"><b>Entrega en papel:</b> hojas blancas engrapadas. Incluye nombre, grupo, matrícula, caso, procedimiento, resultado y explicación. Fecha: miércoles 30 de septiembre de 2026.</div><button class="download" onclick="exportResult('${a.code}', '${esc(mat)}', ${a.case})">Guardar avance de práctica</button><p class="private-note">Este archivo sirve para análisis docente. No sustituye la entrega escrita.</p></article>`;
}
$('#loadTask').addEventListener('click',loadTask); $('#matriculaInput').addEventListener('keydown',e=>{if(e.key==='Enter')loadTask();});
function exportResult(code,mat,caseNo){const result={course:'PNL',code,matricula:mat,case:caseNo,date:new Date().toISOString(),practice:{}};for(let c=1;c<=3;c++){for(let q=0;q<6;q++){const v=localStorage.getItem(`pnl-case-${c}-${q}`);if(v!==null)result.practice[`caso${c}_pregunta${q+1}`]=Number(v);}}const blob=new Blob([JSON.stringify(result,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`avance_PNL_${mat}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),800);}window.exportResult=exportResult;
function net(){const online=navigator.onLine;$('#netText').textContent=online?'En línea · copia local activa':'Sin conexión · modo offline';$('#netDot').style.color=online?'#34d399':'#fbbf24';}window.addEventListener('online',net);window.addEventListener('offline',net);
renderGlossary();renderCases();renderTeams();net();
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});}
