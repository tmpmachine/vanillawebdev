let app = (function() {
  
  let SELF = {
    Init,
  };
  
  function Init() {
    DOMEvents.Init();
    uiTask.RefreshList();
  }
  
  return SELF;
  
})();