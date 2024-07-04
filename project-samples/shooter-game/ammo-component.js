let compoAmmo = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Decrease,
    HasAmmo,
  };
  
  let data = {
    ammo: 30,
  };
  
  function HasAmmo() {
    return data.ammo > 0;
  }
  
  function Decrease() {
    data.ammo -= 1;
    
    refreshAmmo();
  }
  
  function refreshAmmo() {
    $('._txtAmmo').replaceChildren(data.ammo);
  }
  
  return SELF;
  
})();