/**
 * Invariantes de la secuencia de servicios en móvil.
 *
 * Por qué existe: esta sección se validó durante semanas a 390x844 SIN barras de
 * navegador, que es lo que emula DevTools. Ningún teléfono en vertical con sus barras
 * llega a 844 de *small viewport*, así que el único entorno donde la pieza cabía era el
 * que no existe. En dispositivos reales "SERVICIOS" y la primera línea del titular
 * quedaban recortados por un `overflow:hidden`, en silencio.
 *
 * La banda realista de validación es 600-880, NO 844 como caso normal.
 *
 * Cómo se corre (con el servidor de producción levantado):
 *   for h in 600 640 667 700 734 769 800 852 880; do
 *     agent-browser set viewport 393 $h --session svc
 *     agent-browser eval "location.href='http://localhost:3000/es';'g'" --session svc
 *     sleep 2.2
 *     agent-browser eval "(()=>{const t=document.querySelector('.svc-track');scrollTo(0,t.getBoundingClientRect().top+scrollY+20);return 'ok'})()" --session svc
 *     agent-browser eval "(()=>{ $(cat scripts/svc-invariants.js) })()" --session svc
 *   done
 *
 * Repetir en /en: los títulos ingleses son más largos.
 *
 * La aserción que más importa es la 2. Un `overflow:hidden` convierte un desbordamiento
 * de layout en pérdida invisible de contenido, y eso es lo que nadie vio durante semanas.
 */
return (()=>{
const fail=[];
const hdr=document.querySelector('header').getBoundingClientRect();
const H=innerHeight, W=innerWidth;
const stage=document.querySelector('.svc-stage');
const sec=document.querySelector('.svc-track').closest('section');
const eb=sec.querySelector('.eyebrow');
const h2=sec.querySelector('h2');
const media=document.querySelector('.svc-media');
const img=media.querySelector('img');
const desc=document.querySelector('.svc-desc');
const r=e=>e.getBoundingClientRect();

// 1. el encabezado vive fuera del escenario fijo: nunca puede quedar recortado
if (document.querySelector('.svc-stage .eyebrow')) fail.push('el encabezado volvio a entrar en el escenario fijo');
// 2. nada recortado en silencio
document.querySelectorAll('.svc-stage,.svc-desc,.svc-deck').forEach(e=>{
  if (e.scrollHeight - e.clientHeight > 1) fail.push('recorte en .'+e.className.split(' ')[0]+': '+(e.scrollHeight-e.clientHeight)+'px');
});
// 3. cero recorte de imagen
const natR=img.naturalWidth/img.naturalHeight, boxR=r(media).width/r(media).height;
if (Math.abs(natR-boxR) > 0.005) fail.push('imagen recortada: box '+boxR.toFixed(3)+' vs nat '+natR.toFixed(3));
// 4. nada por debajo del pliegue dentro de la pantalla fija
if (r(desc).bottom > H + 1) fail.push('descripcion bajo el pliegue: '+Math.round(r(desc).bottom)+' > '+H);
// el texto de la descripcion cabe en su recuadro
const dp=desc.querySelector('p').getBoundingClientRect();
if (dp.top < r(desc).top - 1 || dp.bottom > r(desc).bottom + 1) fail.push('la descripcion no cabe en su recuadro');
if (r(stage).height > H + 1) fail.push('escenario mas alto que la pantalla');
// 5. sin desbordamiento horizontal
if (document.documentElement.scrollWidth > W) fail.push('scroll horizontal: '+document.documentElement.scrollWidth);
// 6. ningun titulo de servicio se parte
let wrapped=0;
document.querySelectorAll('.svc-title').forEach(t=>{
  const cs=getComputedStyle(t); const lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.1;
  const lines=Math.round(t.getBoundingClientRect().height/lh);
  if (lines>1) wrapped++;
  // Dos lineas se admiten: el titulo esta anclado abajo y el degradado lo cubre. Lo
  // que no se admite es que se salga de la foto o choque con el contador.
  if (lines>2) fail.push('titulo en '+lines+' lineas: "'+t.textContent.trim()+'"');
  const tb=t.getBoundingClientRect(), mb=r(media);
  if (tb.top < mb.top || tb.bottom > mb.bottom+1) fail.push('titulo fuera de la foto');
});
// 7bis. el recorrido fijado = pista menos escenario. Si no coinciden, la secuencia
// termina antes que la pista y ese resto se recorre como bone entre el ultimo
// recuadro y la cinta de a domicilio.
const trk=document.querySelector('.svc-track'), stg=document.querySelector('.svc-stage');
const scrollPx=parseFloat(getComputedStyle(trk).getPropertyValue('--svc-scroll'))/100*H;
if (Math.abs((trk.offsetHeight - stg.offsetHeight) - scrollPx) > 2)
  fail.push('pista y escenario descuadrados: '+(trk.offsetHeight-stg.offsetHeight)+' vs '+Math.round(scrollPx));
const rib=trk.nextElementSibling.getBoundingClientRect();
if (Math.abs(rib.top - trk.getBoundingClientRect().bottom) > 1) fail.push('hueco entre la pista y la cinta');

// 7. la imagen ocupa el ancho completo
if (Math.round(r(media).width) !== W) fail.push('la foto no ocupa el ancho: '+Math.round(r(media).width)+' de '+W);
// 8. la foto libra el menu y no deja holgura delante de ella
if (r(media).top < hdr.bottom - 1) fail.push('la foto se mete bajo el menu');
if (r(media).top > hdr.bottom + 1) fail.push('holgura sobre la foto: '+Math.round(r(media).top-hdr.bottom)+'px');

return JSON.stringify({H, ok: fail.length===0, fail, titlesWrapped: wrapped,
 imgW:Math.round(r(media).width), bleed: Math.round(r(media).width)===W,
 bonePerSide: Math.round((W-r(media).width)/2),
 headlinePx:+parseFloat(getComputedStyle(h2).fontSize).toFixed(1), panelH:Math.round(r(desc).height),
 descBottom:Math.round(r(desc).bottom), boneBelow:Math.round(H-r(desc).bottom)})})()
