(function(){
  var SUPABASE_URL = "https://lcutykiqvezdpdbsdjon.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdXR5a2lxdmV6ZHBkYnNkam9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MjA0NzgsImV4cCI6MjEwMTE5NjQ3OH0.mHTiaQwZhjLvxvIFfb1pgZ9CDdYK-60LdIrzAoeVgQc";

  var style = document.createElement('style');
  style.textContent = `
    .echowall-wrap{
      font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;
      display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
      gap:14px; max-width:1080px; margin:0 auto;
    }
    .echowall-card{
      background:white; border:1px solid rgba(27,36,48,0.12); border-radius:14px;
      padding:18px; font-size:0.9rem; color:#1B2430;
    }
    .echowall-stars{color:#E8A33D; font-size:0.85rem; margin-bottom:8px; letter-spacing:2px;}
    .echowall-quote{color:#3a4250; margin-bottom:12px; line-height:1.5;}
    .echowall-who-name{font-weight:700; font-size:0.85rem;}
    .echowall-who-role{font-size:0.78rem; color:#8a91a0;}
    .echowall-badge{
      text-align:center; margin-top:14px; font-size:0.72rem; color:#b0b6c0;
    }
    .echowall-badge a{color:#8a91a0; text-decoration:none;}
    .echowall-empty{color:#8a91a0; font-size:0.9rem; text-align:center; padding:20px;}
  `;
  document.head.appendChild(style);

  function escapeHtml(str){
    var d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  function render(container, items){
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="echowall-empty">No testimonials yet.</div>';
      return;
    }
    var wrap = document.createElement('div');
    wrap.className = 'echowall-wrap';
    items.forEach(function(item){
      var stars = '★'.repeat(item.rating || 0) + '☆'.repeat(5 - (item.rating || 0));
      var card = document.createElement('div');
      card.className = 'echowall-card';
      card.innerHTML =
        '<div class="echowall-stars">' + stars + '</div>' +
        '<div class="echowall-quote">"' + escapeHtml(item.quote) + '"</div>' +
        '<div class="echowall-who-name">' + escapeHtml(item.name) + '</div>' +
        '<div class="echowall-who-role">' + escapeHtml(item.role) + '</div>';
      wrap.appendChild(card);
    });
    container.innerHTML = '';
    container.appendChild(wrap);
    var badge = document.createElement('div');
    badge.className = 'echowall-badge';
    badge.innerHTML = 'Powered by EchoWall';
    container.appendChild(badge);
  }

  function init(){
    var scriptTag = document.currentScript || (function(){
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();

    var container = document.createElement('div');
    container.innerHTML = '<div class="echowall-empty">Loading testimonials...</div>';
    scriptTag.parentNode.insertBefore(container, scriptTag.nextSibling);

    var url = SUPABASE_URL + '/rest/v1/Testimonials?select=*&Approved=eq.true';
    fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
      }
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ render(container, data); })
    .catch(function(){
      container.innerHTML = '<div class="echowall-empty">Could not load testimonials.</div>';
    });
  }

  init();
})();
