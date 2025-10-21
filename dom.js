
/*
 Тоггл-транслитерации текста внутри .t1 (кириллица <-> латиница).
 */
(function(){
  const map = new Map(Object.entries({
    "А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ё":"YO","Ж":"ZH","З":"Z","И":"I","Й":"Y",
    "К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F",
    "Х":"KH","Ц":"TS","Ч":"CH","Ш":"SH","Щ":"SHCH","Ъ":"","Ы":"Y","Ь":"","Э":"E","Ю":"YU","Я":"YA",
    "а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"zh","з":"z","и":"i","й":"y",
    "к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f",
    "х":"kh","ц":"ts","ч":"ch","ш":"sh","щ":"shch","ъ":"","ы":"y","ь":"","э":"e","ю":"yu","я":"ya"
  }));

  function getTextNodes(root){
    const out = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if(!p) return NodeFilter.FILTER_SKIP;
        const tag = p.tagName?.toLowerCase();
        if(tag === 'script' || tag === 'style') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while(n = walker.nextNode()) out.push(n);
    return out;
  }

  function translit(s){
    let r = '';
    for(const ch of s){
      r += map.has(ch) ? map.get(ch) : ch;
    }
    return r;
  }

  const originals = new WeakMap();

  function toLatin(scope){
    for(const t of getTextNodes(scope)){
      if(!originals.has(t)) originals.set(t, t.nodeValue);
      t.nodeValue = translit(t.nodeValue);
    }
  }

  function restore(scope){
    for(const t of getTextNodes(scope)){
      const orig = originals.get(t);
      if(typeof orig === 'string') t.nodeValue = orig;
    }
  }

  function toggle(){
    const btn = document.getElementById('toggle-translit');
    const root = document.querySelector('.t1');
    if(!btn || !root) return;
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    if(pressed){
      restore(root);
      btn.setAttribute('aria-pressed','false');
      btn.textContent = 'включить латиницу';
    }else{
      toLatin(root);
      btn.setAttribute('aria-pressed','true');
      btn.textContent = 'вернуть кириллицу';
    }
  }

  window.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('toggle-translit');
    if(btn) btn.addEventListener('click', toggle);
  });
})();
