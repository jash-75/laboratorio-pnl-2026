const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function go(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===id));window.scrollTo({top:0,behavior:'smooth'});}
$$('.nav button').forEach(b=>b.addEventListener('click',()=>go(b.dataset.view)));
window.go=go;
function esc(s){return String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\':'&#92;'}[m]));}
function tokenWords(text){return text.replace(/[.,!?;:()¿¡]/g,'').split(/\s+/).filter(Boolean)}
const CASES=[
 {n:1,title:'Caso 1 · Del texto a piezas útiles',desc:'Situación: la escuela recibe mensajes y primero necesita convertir el lenguaje en piezas que la computadora pueda manejar.',flow:['Texto crudo','Tokenización','Stop Words','Stemming / Lema','Datos útiles'],body:`<p><b>Idea sencilla:</b> antes de “entender”, la computadora necesita ordenar el texto.</p><div class="mini"><b>Ejemplo:</b> “Mañana entregaremos el proyecto de PNL en el salón.”<br><br><b>Palabras:</b> Mañana · entregaremos · el · proyecto · de · PNL · en · el · salón<br><b>Después:</b> podemos quitar palabras muy comunes, como “el”, “de” y “en”, si no ayudan a distinguir el mensaje.</div>`,questions:[['¿Qué es un token?',['Una pieza de texto','Una contraseña','Una imagen'],0,'Un token es una pieza que el sistema puede manejar. Puede ser palabra, carácter o subpalabra.'],['¿Para qué sirven las stop words?',['Quitar ruido o palabras muy comunes','Traducir el texto','Crear gráficos'],0,'Sirven para reducir palabras muy comunes que aportan poco a cierta tarea.'],['¿Cuál busca respetar mejor el significado de una palabra?',['Lematización','Stemming','Eliminar todo'],0,'La lematización usa información del significado y la forma correcta de la palabra.']]},
 {n:2,title:'Caso 2 · Contar, ponderar y comparar',desc:'Situación: un buscador debe encontrar qué documento se parece más a una pregunta de un alumno.',flow:['Documentos','BoW','TF-IDF','Vector','Similitud coseno'],body:`<p><b>Idea sencilla:</b> primero contamos palabras; después medimos cuáles son realmente importantes; finalmente comparamos dos representaciones numéricas.</p><div class="mini"><b>Regla útil:</b> BoW responde “¿cuántas veces aparece?”; TF-IDF pregunta “¿qué tan importante es aquí y qué tan rara es en el conjunto?”.</div>`,questions:[['Si una palabra aparece en todos los documentos, su IDF tiende a…',['Bajar','Subir mucho','Convertirse en token'],0,'IDF reduce el peso de términos que aparecen en muchos documentos.'],['¿Qué compara la similitud coseno?',['La orientación de dos vectores','El tamaño de dos archivos','La velocidad del procesador'],0,'Mide qué tan parecidas son las direcciones de dos vectores.'],['¿Qué representa un embedding?',['Información numérica relacionada con el significado','Solo una palabra en mayúsculas','Un archivo PDF'],0,'Un embedding representa información en un espacio de números.']]},
 {n:3,title:'Caso 3 · Elegir el modelo según el problema',desc:'Situación: un sistema escolar tiene diferentes necesidades. No todos los problemas se resuelven con la misma técnica.',flow:['Problema','Tipo de tarea','Modelo','Proceso','Salida'],body:`<p>El PDF termina mostrando técnicas y modelos con funciones diferentes. La idea no es memorizar nombres: es reconocer <b>para qué sirve cada uno</b>.</p><div class="mini"><ul><li><b>Markov:</b> trabajar con probabilidades de una secuencia.</li><li><b>TextRank:</b> buscar ideas importantes para formar un resumen.</li><li><b>LDA:</b> descubrir temas dentro de varios documentos.</li><li><b>CNN:</b> detectar patrones locales.</li><li><b>RNN:</b> trabajar con secuencias y memoria de pasos anteriores.</li><li><b>LLM:</b> modelos modernos capaces de trabajar con mucho contexto y generar texto.</li></ul></div>`,questions:[['Quiero resumir una nota larga. ¿Qué técnica del caso se relaciona directamente?',['TextRank','Markov','CNN'],0,'TextRank busca oraciones importantes para formar un resumen.'],['Quiero descubrir grupos de temas en muchos documentos.',['LDA','TF-IDF','Tokenización'],0,'LDA es un método de modelado de tópicos.'],['Quiero predecir una continuación de una secuencia de texto.',['Markov','Stop Words','BoW'],0,'Markov modela probabilidades de pasos de una secuencia.']]}
];
function renderCases(){
 const c=$('#cases'); c.innerHTML=CASES.map(cs=>`<article class="case"><h3>${cs.title}</h3><p>${cs.desc}</p><div class="flow">${cs.flow.map((x,i)=>`<div><small>Paso ${i+1}</small><b>${x}</b></div>`).join('')}</div>${cs.body}<div class="practice"><h4>Mini práctica</h4>${cs.questions.map((q,i)=>`<div class="q"><label>${i+1}. ${q[0]}</label><div class="choice">${q[1].map((opt,j)=>`<button onclick="answer(${cs.n},${i},${j},this)">${opt}</button>`).join('')}</div><div id="f-${cs.n}-${i}" class="feedback"></div></div>`).join('')}</div></article>`).join('');
}
function answer(caseNo,qNo,choice,btn){ const q=CASES[caseNo-1].questions[qNo], box=$(`#f-${caseNo}-${qNo}`); if(choice===q[2]){box.className='feedback ok';box.textContent='✓ Correcto. '+q[3]} else {box.className='feedback bad';box.textContent='✗ Revisa. '+q[3]} localStorage.setItem(`pnl-case-${caseNo}-${qNo}`,choice); }
window.answer=answer;
function renderTeams(){
 $('#teams').innerHTML=PNL_DATA.TEAMS.map(t=>`<article class="team"><span class="tag">Equipo ${t.team} · 5 integrantes</span><h3>${t.title}</h3><p><b>Integrantes de lista:</b> ${t.members.join(', ')}</p><p><b>Guía:</b> ${t.guide}</p></article>`).join('');
}
function loadTask(){
 const code=$('#codeInput').value.trim().toUpperCase(); const a=PNL_DATA.ASSIGNMENTS.find(x=>x.code===code); const box=$('#taskArea');
 if(!a){box.innerHTML='<div class="callout"><b>Clave no encontrada.</b> Revisa mayúsculas, números y guiones.</div>';return;}
 const d=a.data;
 let detail='';
 if(a.case===1){ const toks=tokenWords(d.text); detail=`<p><b>Texto asignado:</b> “${esc(d.text)}”</p><p><b>Tokens por palabra:</b> ${toks.map(esc).join(' · ')}</p><p><b>Stop Words sugeridas:</b> ${d.stop.map(esc).join(' · ')}</p><p><b>Palabras para comparar:</b> ${d.variants.map(esc).join(' / ')}</p>`; }
 if(a.case===2){ detail=`<p><b>Pregunta:</b> “${esc(d.query)}”</p><table><thead><tr><th>Documento</th><th>Texto</th></tr></thead><tbody>${d.docs.map((x,i)=>`<tr><td>D${i+1}</td><td>${esc(x)}</td></tr>`).join('')}</tbody></table>`; }
 if(a.case===3){ detail=`<table><thead><tr><th>Necesidad</th><th>¿Qué técnica usarías?</th></tr></thead><tbody>${d.items.map(x=>`<tr><td>${esc(x)}</td><td>________________________________</td></tr>`).join('')}</tbody></table>`; }
 const qlist=a.case===1?[
  'Separa el texto en tokens y marca con una X las stop words.',
  'Explica qué palabras se pueden quitar sin perder la idea principal.',
  'Compara las tres formas indicadas: ¿qué hace stemming y qué haría la lematización?',
  'Escribe una representación final limpia del texto.',
  'Explica con tus palabras por qué este paso ayuda antes de aplicar un modelo.',
  'Crea una pregunta de repaso y respóndela.'
 ]:a.case===2?[
  'Construye una tabla BoW sencilla con las palabras más importantes de los documentos.',
  'Indica una palabra que podría tener TF-IDF alto y explica por qué.',
  'Explica qué ocurriría con una palabra que aparece en los tres documentos.',
  'Describe cómo compararías la pregunta con cada documento mediante similitud coseno.',
  'Indica cuál documento esperarías que quedara más cerca y justifica sin usar una IA para escribir la explicación.',
  'Escribe una diferencia entre BoW, TF-IDF y embeddings.'
 ]:[
  'Relaciona cada necesidad con una técnica del material.',
  'Explica por qué no usarías la misma técnica para todos los problemas.',
  'Elige una de las técnicas y haz un dibujo del flujo entrada → proceso → salida.',
  'Escribe una limitación sencilla de la técnica elegida.',
  'Compara el enfoque clásico del caso con un LLM moderno.',
  'Escribe una pregunta que el docente podría hacerte en el examen.'
 ];
 box.innerHTML=`<article class="task case"><div class="task-meta"><span class="tag">${a.code}</span><span class="tag">Caso ${a.case}</span><span class="tag">${a.topic}</span></div><h3>${a.title}</h3>${detail}<h4>Lo que debes entregar en papel</h4><ol>${qlist.map(x=>`<li>${x}</li>`).join('')}</ol><div class="callout"><b>Formato de hojas:</b> nombre · grupo · código · procedimiento · respuesta · explicación. Escribe con letra legible y engrapa las hojas.</div><button class="download" onclick="exportResult('${a.code}')">Generar archivo de avance</button><p class="private-note">El archivo solo registra el avance de esta práctica. La evidencia principal sigue siendo tu trabajo escrito.</p></article>`;
 localStorage.setItem('pnl-last-code',a.code);
}
$('#loadTask').addEventListener('click',loadTask); $('#codeInput').addEventListener('keydown',e=>{if(e.key==='Enter')loadTask()});
function exportResult(code){
 const a=PNL_DATA.ASSIGNMENTS.find(x=>x.code===code); const result={course:'PNL',code,case:a.case,topic:a.topic,date:new Date().toISOString(),practice:{}};
 CASES.forEach(cs=>cs.questions.forEach((_,qi)=>{const v=localStorage.getItem(`pnl-case-${cs.n}-${qi}`); if(v!==null)result.practice[`caso${cs.n}_pregunta${qi+1}`]=Number(v)}));
 const blob=new Blob([JSON.stringify(result,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const link=document.createElement('a'); link.href=url; link.download=`avance_${code}.json`; link.click(); setTimeout(()=>URL.revokeObjectURL(url),800);
}
window.exportResult=exportResult;
function net(){const online=navigator.onLine; $('#netText').textContent=online?'En línea · copia local activa':'Sin conexión · modo offline'; $('#netDot').style.color=online?'#34d399':'#fbbf24'} window.addEventListener('online',net);window.addEventListener('offline',net);
renderCases();renderTeams();net();
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});}
