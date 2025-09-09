(function(){
  function toSkeleton(doc){
    var clone=doc.documentElement.cloneNode(true);
    var walker=doc.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT);
    var rm=[]; var n;
    while((n=walker.nextNode())){
      var el=walker.currentNode;
      var tag=el.tagName.toLowerCase();
      if(tag==='script'||tag==='style'||(tag==='link'&&el.rel==='stylesheet')){rm.push(el);continue}
      el.removeAttribute('class');
      el.removeAttribute('style');
      var attrs=[].slice.call(el.attributes);
      for(var i=0;i<attrs.length;i++){var a=attrs[i]; if(/^data-|^aria-/.test(a.name)) el.removeAttribute(a.name)}
    }
    rm.forEach(function(x){x.remove()});
    return '<!doctype html>'+clone.outerHTML;
  }
  function toContentHtml(doc){
    var clone=doc.documentElement.cloneNode(true);
    var walker=doc.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT);
    var rm=[]; var n;
    while((n=walker.nextNode())){
      var el=walker.currentNode; var tag=el.tagName.toLowerCase();
      if(tag==='script'||tag==='style'||(tag==='link'&&el.rel==='stylesheet')){rm.push(el);continue}
      el.removeAttribute('style');
    }
    rm.forEach(function(x){x.remove()});
    return '<!doctype html>'+clone.outerHTML;
  }
  function minifyHtml(s){return s.replace(/<!--[^]*?-->/g,'').replace(/\s+/g,' ').replace(/>\s+</g,'><').trim()}
  function fnv1a64(str){var hash=0xcbf29ce484222325n,prime=0x100000001b3n;for(var i=0;i<str.length;i++){hash^=BigInt(str.charCodeAt(i)&255);hash=(hash*prime)&0xffffffffffffffffn}return hash}
  function simhash64(text){var tokens=(text.toLowerCase().match(/[a-z0-9]+/g)||[]);var v=new Array(64).fill(0);for(var ti=0;ti<tokens.length;ti++){var h=fnv1a64(tokens[ti]);for(var i=0;i<64;i++){var bit=(h>>BigInt(i))&1n;v[i]+=bit===1n?1:-1}}var out=0n;for(var i=0;i<64;i++) if(v[i]>=0) out|=1n<<BigInt(i);return out.toString(16).padStart(16,'0')}
  function send(endpoint,body){
    try{
      return fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),keepalive:true,mode:'cors',credentials:'omit'});
    }catch(e){ return Promise.resolve(); }
  }
  function run(){
    var currentScript=document.currentScript; if(!currentScript) return;
    var orgId=currentScript.getAttribute('data-org');
    var endpoint=currentScript.getAttribute('data-endpoint');
    try{
      if(!endpoint){
        var srcOrigin=new URL(currentScript.src, location.href).origin;
        endpoint=srcOrigin+"/api/sdk/ingest";
      }
    }catch(e){ endpoint='/api/sdk/ingest'; }
    var apply=currentScript.getAttribute('data-apply')==='true';
    if(!orgId){console.warn('[Accessaurus] Missing data-org on script'); return}
    var sk=minifyHtml(toSkeleton(document));
    var content=minifyHtml(toContentHtml(document));
    var hash=simhash64(sk);
    var payload={orgId:orgId,pageUrl:location.href,hash:hash,skeleton:sk,html:content,ua:navigator.userAgent,ts:Date.now()};
    function fetchLatestTry(retries){
      try{
        var origin=new URL(endpoint, location.href).origin;
        var latest=origin+"/api/sdk/latest?orgId="+encodeURIComponent(orgId)+"&pageUrl="+encodeURIComponent(location.href)+"&hash="+encodeURIComponent(hash);
        fetch(latest,{method:'GET',credentials:'omit',mode:'cors'})
          .then(function(r){return r.ok?r.json():Promise.reject()})
          .then(function(body){
            var html=(body&&body.html)||''; if(!html) throw 0;
            var doc=new DOMParser().parseFromString(html,'text/html');
            if(doc&&doc.body){ var preserve=[].slice.call(document.body.querySelectorAll('style,link[rel="stylesheet"]')).map(function(n){return n.cloneNode(true)}); document.body.innerHTML=doc.body.innerHTML; preserve.forEach(function(n){ document.body.appendChild(n) }); }
          })
          .catch(function(){ if(retries>0) setTimeout(function(){ fetchLatestTry(retries-1) }, 300) })
      }catch(e){}
    }
    send(endpoint,payload).then(function(){ if(apply){ fetchLatestTry(10) } });
  }
  if(document.readyState==='complete'||document.readyState==='interactive') run(); else document.addEventListener('DOMContentLoaded', run);
})();
