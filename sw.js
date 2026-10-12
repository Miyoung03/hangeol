// 한결 모노라인 R2: 내용은 변경해도 사용자 기록(localStorage)은 유지합니다.
const CACHE = 'hangeol-app-v6-monoline-20261012-r2';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('hangeol-app-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event=>{
 const request=event.request, url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin) return;
 event.respondWith((async()=>{
  try {
    // Always check online HTML to avoid displaying old code after a GitHub Pages deployment.
    const fresh=(request.mode==='navigate'||url.pathname.endsWith('/index.html'))
     ? await fetch(request,{cache:'no-store'}) : await fetch(request);
    if(fresh.ok){const cloned=fresh.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,cloned)).catch(()=>{}));}
    return fresh;
  } catch(_) {
    return (await caches.match(request)) || (await caches.match('./index.html')) || Response.error();
  }
 })());
});
