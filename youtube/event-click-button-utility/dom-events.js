let DOMEvents = (function() {
    
    let eventsMap = {
        onclick: {
            'change-fruit': () => changeFruit(),
            'translate': () => translate(),
        },
    };
    
    let listening = function(selector, dataKey, eventType, callbacks) {
      let elements = document.querySelectorAll(selector);
      for (let el of elements) {
        let callbackFunc = callbacks?.[el.dataset[dataKey]];
        el.addEventListener(eventType, callbackFunc);
      }
    };
    
    function Init() {
      listening('[data-onclick]', 'onclick', 'click', eventsMap.onclick);
    }
    
    function InitLazy(containerEl, eventsMap) {
      listening('[data-lazy-onclick]', 'lazyOnclick', 'click', eventsMap ?? eventsMap.onclick, containerEl);
    }
    
    return {
      Init,
      InitLazy,
    };
  
  })();