const CACHE='hangeol-custom-r12-20261013';
const FILES=['./','./index.html','./app.js?v=20261013-custom-r12','./manifest.webmanifest?v=20261013-custom-r12','./icon-192.png?v=20261013-custom-r12','./icon-180.png?v=20261013-custom-r12','./icon-512.png?v=20261013-custom-r12','./logo-hangeol.png?v=20261013-custom-r12'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('hangeol-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request))) });
