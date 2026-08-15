// UI/game-flow enhancements layered on top of the core puzzle engine.
(function(){
  const startBtn=document.getElementById('startPuzzleBtn');
  const liquidSelect=document.getElementById('liquidCount');
  const board=document.getElementById('playerBoard');

  function syncLiquidTools(){
    const showBlue=Number(liquidSelect.value)===3;
    document.querySelectorAll('.blue-only').forEach(el=>el.classList.toggle('hidden',!showBlue));
  }
  liquidSelect?.addEventListener('change',syncLiquidTools);
  syncLiquidTools();

  if(startBtn){
    startBtn.onclick=()=>{
      if(!validate()) return;
      scramble();
      player=cp(start||p.tiles);
      mode('player');
      msg('playerStatus','The mechanism is armed. Rotate the conduits, then open the valves.');
      setTimeout(()=>document.getElementById('playerBoard')?.scrollIntoView({behavior:'smooth',block:'center'}),100);
    };
  }

  const oldMsg=msg;
  msg=function(id,text,cls=''){
    oldMsg(id,text,cls);
    if(id==='playerStatus'&&cls==='fail'){
      board?.classList.remove('shake');
      void board?.offsetWidth;
      board?.classList.add('shake');
    }
  };

  const oldPlayerRender=playerRender;
  playerRender=function(){
    oldPlayerRender();
    document.querySelectorAll('#playerBoard .tile').forEach(el=>{
      if(el.querySelector('.lock')) el.setAttribute('aria-label','Fixed conduit');
      else el.setAttribute('aria-label','Rotatable conduit');
    });
  };

  document.getElementById('playerTab')?.addEventListener('click',()=>{
    if(!start){
      msg('playerStatus','DM preview: use START PUZZLE to create a fresh randomized starting state.');
    }
  });
})();
