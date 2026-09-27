const CACHE='pnl-lab-2026-v1';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.json','./shared/data.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
