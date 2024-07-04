let compoTimer = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Increase,
  };
  
  let data = {
    point: 0,
  };
  
  function Increase() {
    data.point += 1;
    
    refreshUI();
    
    if (data.point > 100) {
      game.Stop();
      alert('Time\'s up, you win! Click OK to restart.');
      location.reload();
    }
  }
  
  function refreshUI() {
    $('._txtTimer').replaceChildren(data.point);
  }
  
  return SELF;
  
})();