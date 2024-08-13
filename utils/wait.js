let wait = (function() {
  
  let SELF = {
    until,
  };
  
  function until(stateCheckCallback, delayCheck=100, delayTimeout=null) {
    
    let useTimeout = delayTimeout !== null;
    delayCheck = delayCheck ?? 100;
    
    return new Promise((resolve, reject) => {
      let timeout;
      
      if (useTimeout) {
        timeout = window.setTimeout(() => {
          window.clearInterval(interval);
          resolve(false);
        }, delayTimeout);
      }
      
      let interval = window.setInterval(() => {
        let shouldResolve = stateCheckCallback();
        if (shouldResolve) {
          window.clearInterval(interval);
          window.clearTimeout(timeout);
          resolve();
        }
        
      }, delayCheck);
    });
    
  }
  
  return SELF;
  
})();
