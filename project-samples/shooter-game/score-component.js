let compoScore = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Add,
  };
  
  let data = {
    point: 0,
  };
  
  function Add(amount) {
    data.point += amount;
    
    refreshScore();
    
    if (data.point >= 100) {
      alert('You win! Click OK to restart.');
      location.reload();
    }
  }
  
  function refreshScore() {
    $('._txtScore').replaceChildren(data.point);
  }
  
  return SELF;
  
})();