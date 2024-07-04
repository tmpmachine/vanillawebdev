let compoLife = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Decrease,
  };
  
  let data = {
    point: 3,
  };
  
  function Decrease() {
    data.point -= 1;
    
    refreshAmmo();
    
    if (data.point <= 0) {
      alert('You lose! Click OK to restart.')
      location.reload();
    }
  }
  
  function refreshAmmo() {
    $('._txtLifePoint').replaceChildren(data.point);
  }
  
  return SELF;
  
})();