const fs = require('fs');
let lines = fs.readFileSync('/Users/vruddhishah/Desktop/Portfolio/play.html', 'utf8').split('\n');

function replaceLines(startMatch, endMatch, newContentStr) {
  const s = lines.findIndex(l => l.includes(startMatch));
  let e = lines.findIndex((l, i) => i > s && l.includes(endMatch));
  if(s !== -1 && e !== -1) {
     const target = newContentStr ? newContentStr.split('\n') : [];
     lines.splice(s, e - s, ...target); 
  }
}

// 1. Delete Toy 5 CSS
replaceLines('/* TOY 5 — GUITAR */', '/* TOY 6 — RASOI */', '');
// 2. Delete Toy 9 CSS
replaceLines('/* TOY 9 — SMOG CLOCK */', '/* TOY 10 — COFFEE - MOODY ARTISANAL */', '');
// 3. Delete Toy 5 HTML
replaceLines('<!-- TOY 5 -->', '<!-- TOY 6 -->', '');
// 4. Delete Toy 9 HTML
replaceLines('<!-- TOY 9 -->', '<!-- TOY 10 -->', '');
// 5. Delete Toy 5 JS
replaceLines('/* ══ TOY 5 — GUITAR ══ */', '/* ══ TOY 6 — RASOI LAB ══ */', '');
// 6. Delete Toy 9 JS
replaceLines('/* ══ TOY 9 — SMOG CLOCK ══ */', '/* ══ TOY 10 — COFFEE BREW ══ */', '');

const css = `    /* TOY 1 — TURNTABLE */
    .tt-wrap { display: flex; align-items: flex-end; justify-content: flex-start; gap: clamp(2rem, 5vw, 4rem); flex-wrap: wrap; margin-top: 1rem; }
    .vinyl-shelf { display: flex; flex-direction: column; gap: 1rem; }
    
    .v-record { cursor: grab; transition: transform .3s cubic-bezier(0.34, 1.56, 0.64, 1); filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15)); position: relative; width: 140px; height: 140px; }
    .v-record:hover { transform: translateY(-10px) rotate(-3deg) scale(1.05); filter: drop-shadow(0 20px 30px rgba(0,0,0,0.25)); }
    .v-record:active { cursor: grabbing; }
    
    .v-sleeve { position: absolute; inset: 0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-family: var(--mono); color: #fff; font-size: 1.2rem; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2), inset 4px 0 10px rgba(0,0,0,0.1); z-index: 2; border-left: 2px solid rgba(255,255,255,0.4); }
    .v-disc { position: absolute; width: 90%; height: 90%; top: 5%; right: -25%; background: radial-gradient(circle, #0F0F0F 30%, #1A1A1A 50%, #0a0a0a 70%, #151515 90%, #050505 100%); border-radius: 50%; box-shadow: -2px 0 10px rgba(0,0,0,0.5), inset 0 0 0 1px #333, inset 0 0 20px rgba(255,255,255,0.05); z-index: 1; display: flex; align-items: center; justify-content: center; }
    .v-disc::after { content: ''; position: absolute; inset: 10px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.03); mix-blend-mode: overlay; }
    .v-disc::before { content: ''; position: absolute; inset: 25px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.03); mix-blend-mode: overlay; }
    .v-label { width: 35%; height: 35%; border-radius: 50%; border: 2px solid #111; position: relative; }
    .v-label::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 6px; height: 6px; background: #EFEBE9; border-radius: 50%; box-shadow: inset 0 1px 3px rgba(0,0,0,0.8); }
    
    .tt-deck { width: clamp(280px, 35vw, 380px); background: #EFEBE9; border-radius: 20px; padding: 24px; position: relative; box-shadow: 0 30px 60px rgba(0,0,0,0.15), inset 0 2px 2px #FFF, 0 0 0 1px rgba(0,0,0,0.05); }
    .tt-body { background: linear-gradient(145deg, #1C1C1E, #0A0A0B); border-radius: 12px; padding: 20px; box-shadow: inset 0 1px 1px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5); position: relative; border: 1px solid #222; overflow: hidden; }
    
    .tt-brand { font-family: var(--mono); font-size: 0.55rem; color: #666; letter-spacing: 0.2em; text-align: center; margin-bottom: 20px; text-shadow: 0 1px 2px #000; }
    
    .tt-platter-zone { position: relative; display: flex; justify-content: center; margin-bottom: 30px; height: 180px; align-items: center; }
    .tt-platter { width: 160px; height: 160px; border-radius: 50%; background: linear-gradient(135deg, #2A2A2A, #111); box-shadow: inset 0 2px 5px rgba(255,255,255,0.1), 0 10px 20px rgba(0,0,0,0.6), 0 0 0 8px #181818, 0 0 0 9px #000; display: flex; align-items: center; justify-content: center; position: relative; filter: drop-shadow(0 0 2px rgba(255,255,255,0.1)); }
    .tt-ring { position: absolute; inset: 10px; border-radius: 50%; border: 2px dashed rgba(255,255,255,0.05); animation: spinPlatter 4s linear infinite; animation-play-state: paused; }
    .tt-pin { width: 8px; height: 8px; background: radial-gradient(circle, #EFEFEF, #888); border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 10; }
    
    /* Glowing underlight */
    .tt-glow { position: absolute; width: 160px; height: 160px; border-radius: 50%; background: var(--tt-color, transparent); filter: blur(25px); opacity: 0; transition: opacity 0.5s; z-index: 0; pointer-events: none; }
    
    /* The injected disc */
    .tt-slot { position: absolute; z-index: 5; width: 140px; height: 140px; display: none; align-items: center; justify-content: center; }
    .tt-slot .v-disc { right: 0; top: 0; width: 100%; height: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.4); animation: spinPlatter 1.8s linear infinite; animation-play-state: paused; }
    
    @keyframes spinPlatter { 100% { transform: rotate(360deg); } }
    
    .tt-tonearm { position: absolute; right: 8%; top: 15%; width: 40px; height: 120px; z-index: 10; transform-origin: top center; transform: rotate(10deg); transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); filter: drop-shadow(-5px 5px 5px rgba(0,0,0,0.5)); }
    .ta-base { width: 30px; height: 30px; border-radius: 50%; background: radial-gradient(circle, #EFEFEF -20%, #777 60%, #333); box-shadow: 0 4px 8px rgba(0,0,0,0.5); position: absolute; left: 5px; top: -5px; }
    .ta-arm { width: 6px; height: 100px; background: linear-gradient(to right, #999, #FFF, #777); border-radius: 3px; position: absolute; left: 17px; top: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.4); }
    .ta-head { width: 14px; height: 26px; background: #222; border-radius: 4px; position: absolute; bottom: -8px; left: 13px; transform: rotate(20deg); box-shadow: inset 0 1px 2px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.6); }
    .ta-head::after { content: ''; position: absolute; bottom: -3px; left: 6px; width: 2px; height: 4px; background: #aaa; }
    
    .deck-playing .tt-tonearm { transform: rotate(35deg); }
    .deck-playing .tt-slot .v-disc, .deck-playing .tt-ring { animation-play-state: running; }
    .deck-playing .tt-glow { opacity: 0.4; animation: pulseGlow 1s ease-in-out infinite alternate; }
    
    @keyframes pulseGlow { 0% { opacity: 0.4; transform: scale(1); } 100% { opacity: 0.6; transform: scale(1.05); } }
    
    .tt-controls { display: flex; gap: 15px; padding: 10px; background: #111; border-radius: 8px; border: 1px solid #222; box-shadow: inset 0 2px 5px #000; align-items: center; }
    .tt-screen { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .tt-track { font-family: var(--mono); font-size: 0.65rem; color: #FFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 5px;}
    .tt-status { font-family: var(--mono); font-size: 0.5rem; color: #00C85A; text-shadow: 0 0 5px rgba(0,200,90,0.4); letter-spacing: 0.1em; }
    .tt-status.err { color: #FF4E00; text-shadow: 0 0 5px #FF4E00; }
    
    .tt-btns { display: flex; gap: 8px; }
    .tt-btn { width: 36px; height: 36px; border-radius: 6px; background: linear-gradient(to bottom, #333, #1A1A1A); border: 1px solid #444; color: #FFF; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.5); transition: all 0.15s; }
    .tt-btn:hover { background: #444; border-color: #555; }
    .tt-btn:active { transform: translateY(2px); box-shadow: none; }
    .tt-play { border-color: var(--tt-color, #444); color: var(--tt-color, #fff); }
    
    .tt-particles { position: absolute; inset: 0; pointer-events: none; z-index: 20; overflow: visible; }
    .m-note { position: absolute; font-size: 1rem; color: var(--tt-color, #FFF); text-shadow: 0 0 8px var(--tt-color, #FFF); animation: noteFloat 2s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; opacity: 0; }
    
    @keyframes noteFloat { 
      0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)) scale(1.5); opacity: 0; }
    }`;

const html = `  <!-- TOY 1 — TURNTABLE -->
  <section class="toy" id="toy-turntable">
    <div class="tag-row r"><span class="tnum">01</span><span class="tpill">Music</span><span class="tpill">Aesthetic</span></div>
    <h2 class="toy-h r">Vinyl Sessions</h2>
    <p class="toy-p r">Drag a record onto the platter to spin live 24/7 web radio streams perfectly synced to GenZ particle animations.</p>
    <div class="tt-wrap r">
      <div class="vinyl-shelf">
        <div class="v-record" data-color="#FF4E00" data-stream="https://coderadio-admin.freecodecamp.org/radio/8000/radio.mp3" data-title="Lofi Code Radio" draggable="true">
          <div class="v-sleeve" style="background: linear-gradient(135deg, #FF4E00, #CC3B00)">Lofi</div>
          <div class="v-disc"><div class="v-label" style="background: #FF4E00"></div></div>
        </div>
        <div class="v-record" data-color="#00C85A" data-stream="https://icecast.omroep.nl/3fm-bb-mp3" data-title="3FM Serious Radio" draggable="true">
          <div class="v-sleeve" style="background: linear-gradient(135deg, #00C85A, #009842)">Pop</div>
          <div class="v-disc"><div class="v-label" style="background: #00C85A"></div></div>
        </div>
        <div class="v-record" data-color="#1430FF" data-stream="https://strm112.1.fm/ajazz_mobile_mp3" data-title="Smooth Jazz Lounge" draggable="true">
          <div class="v-sleeve" style="background: linear-gradient(135deg, #1430FF, #0E20BB)">Jazz</div>
          <div class="v-disc"><div class="v-label" style="background: #1430FF"></div></div>
        </div>
      </div>
      
      <div class="tt-deck" id="tt-deck">
        <audio id="tt-audio" crossorigin="anonymous" style="display:none"></audio>
        
        <div class="tt-body">
          <div class="tt-brand">VROO SOUND LAB ✦ MODEL 01</div>
          
          <div class="tt-platter-zone">
            <div class="tt-platter" id="tt-platter">
              <div class="tt-pin"></div>
              <div class="tt-ring"></div>
            </div>
            <div class="tt-slot" id="tt-slot"></div>
            <div class="tt-glow" id="tt-glow"></div>
            <div class="tt-particles" id="tt-particles"></div>
          </div>
          
          <div class="tt-tonearm" id="tt-tonearm">
            <div class="ta-base"></div>
            <div class="ta-arm"></div>
            <div class="ta-head"></div>
          </div>
          
          <div class="tt-controls">
            <div class="tt-screen">
              <div class="tt-track" id="tt-track">NO RECORD DETECTED</div>
              <div class="tt-status" id="tt-status">SYSTEM IDLE</div>
            </div>
            <div class="tt-btns">
              <button class="tt-btn tt-play" id="tt-btn-play">▶</button>
              <button class="tt-btn tt-eject" id="tt-eject">⏏</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Small polyfill to wait for DOM elements just in case
    });
  </script>`;

const js = `    /* ══ TOY 1 — TURNTABLE ══ */
    (function() {
      const records = document.querySelectorAll('.v-record');
      const deck = document.getElementById('tt-deck');
      const slot = document.getElementById('tt-slot');
      const audio = document.getElementById('tt-audio');
      const btnPlay = document.getElementById('tt-btn-play');
      const btnEject = document.getElementById('tt-eject');
      const trackLbl = document.getElementById('tt-track');
      const statusLbl = document.getElementById('tt-status');
      const glow = document.getElementById('tt-glow');
      const particles = document.getElementById('tt-particles');
      
      if(!deck) return;

      let currentRecord = null;
      let isPlaying = false;
      let particleInterval;

      records.forEach(r => {
        r.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', r.dataset.stream);
          setTimeout(() => r.style.opacity = '0.5', 0);
        });
        r.addEventListener('dragend', e => {
          r.style.opacity = '1';
        });
      });

      deck.addEventListener('dragover', e => { e.preventDefault(); deck.style.transform = 'scale(1.02)'; });
      deck.addEventListener('dragleave', e => { e.preventDefault(); deck.style.transform = 'scale(1)'; });
      deck.addEventListener('drop', e => {
        e.preventDefault();
        deck.style.transform = 'scale(1)';
        const streamSrc = e.dataTransfer.getData('text/plain');
        const dragged = Array.from(records).find(r => r.dataset.stream === streamSrc);
        if(!dragged) return;
        loadRecord(dragged);
      });

      function loadRecord(recordNode) {
        if(isPlaying) togglePlay();
        currentRecord = recordNode;
        audio.src = currentRecord.dataset.stream;
        
        const c = currentRecord.dataset.color;
        deck.style.setProperty('--tt-color', c);
        
        slot.innerHTML = currentRecord.querySelector('.v-disc').outerHTML;
        slot.style.display = 'flex';
        
        trackLbl.textContent = currentRecord.dataset.title.toUpperCase();
        statusLbl.textContent = 'RECORD PLACED - READY';
        statusLbl.className = 'tt-status';
        btnPlay.textContent = '▶';
        
        // Auto-play on drop
        setTimeout(togglePlay, 400);
      }

      function spawnParticle() {
        if(!isPlaying) return;
        const note = document.createElement('div');
        note.className = 'm-note';
        note.textContent = ['♪', '♫', '♬'][Math.floor(Math.random()*3)];
        
        // Shoot outwards from center
        const angle = Math.random() * Math.PI * 2;
        const dist = 70 + Math.random() * 50;
        note.style.setProperty('--dx', (Math.cos(angle)*dist) + 'px');
        note.style.setProperty('--dy', (Math.sin(angle)*dist - 20) + 'px');
        
        note.style.left = '100px';
        note.style.top = '100px';
        particles.appendChild(note);
        setTimeout(() => note.remove(), 2000);
      }

      function togglePlay() {
        if(!currentRecord) return;
        if(isPlaying) {
          audio.pause();
          isPlaying = false;
          deck.classList.remove('deck-playing');
          btnPlay.textContent = '▶';
          statusLbl.textContent = 'PAUSED';
          clearInterval(particleInterval);
        } else {
          statusLbl.textContent = 'CONNECTING TO STREAM...';
          audio.play().then(() => {
            isPlaying = true;
            deck.classList.add('deck-playing');
            btnPlay.textContent = '⏸';
            statusLbl.textContent = 'LIVE STREAMING';
            particleInterval = setInterval(spawnParticle, 400);
          }).catch((err) => {
            statusLbl.textContent = 'STREAM UNAVAILABLE';
            statusLbl.className = 'tt-status err';
            deck.classList.remove('deck-playing');
          });
        }
      }

      btnPlay.addEventListener('click', () => { togglePlay(); });
      btnEject.addEventListener('click', () => {
        if(isPlaying) togglePlay();
        currentRecord = null;
        slot.style.display = 'none';
        slot.innerHTML = '';
        audio.src = '';
        trackLbl.textContent = 'NO RECORD DETECTED';
        statusLbl.textContent = 'SYSTEM IDLE';
        statusLbl.className = 'tt-status';
        deck.style.setProperty('--tt-color', 'transparent');
      });
    })();`;

replaceLines('/* TOY 1 — CASSETTE */', '/* TOY 2 — BURN IT */', css);
replaceLines('<!-- TOY 1 -->', '<!-- TOY 2 -->', html);
replaceLines('/* ══ TOY 1 — CASSETTE ══ */', '/* ══ TOY 2 — BURN IT ══ */', js);

fs.writeFileSync('/Users/vruddhishah/Desktop/Portfolio/play.html', lines.join('\n'));
console.log('Successfully completed surgical replacements for play.html');
