let compoSkill = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    CanDash,
    RestoreDashStamina,
    DecreaseDashStamina,
  };
  
  let data = {
    dashLimit: 80,
    dashPoint: 80,
  };
  
  function CanDash() {
    return data.dashPoint > 0;
  }
  
  function RestoreDashStamina() {
    data.dashPoint = Math.min(data.dashLimit, data.dashPoint + 1);
    refreshScore();
  }
  
  function DecreaseDashStamina() {
    data.dashPoint -= 1;
    refreshScore();
  }
  
  function refreshScore() {
    $('._txtDashStamina').replaceChildren(data.dashPoint);
  }
  
  return SELF;
  
})();