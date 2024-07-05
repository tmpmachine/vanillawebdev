let game = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Start,
  };
  
  let c = null;
  let nextFrameRequest = null;
  
  let local = {
    player: {
      x: 150,
    },
    controller: {
      left: false,
      right: false,
    }
  };
  
  function initCanvas() {
    c = $('#canvas').getContext('2d');
  }
  
  function Start() {
    initCanvas();
    attachKeyboardListener();
    startAnimation();
  }
  
  function startAnimation() {
    requestNextFrame();
  }
  
  function requestNextFrame() {
    nextFrameRequest = window.requestAnimationFrame(redraw);
  }
  
  function attachKeyboardListener() {
    window.addEventListener('keyup', handleKey);
    window.addEventListener('keydown', handleKey);
    window.addEventListener('blur', handleBlur);
  }
  
  function handleBlur() {
    for (let key in local.controller) {
      local.controller[key] = false;
    }
  }
  
  function handleKey(evt) {
    if (evt.key == 'd') {
      local.controller.right = (evt.type == 'keydown');
    }
    else if (evt.key == 'a') {
      local.controller.left = (evt.type == 'keydown');
    }
  }
  
  function updateMovement() {
    let speed = 2;
    
    if (local.controller.right) {
      local.player.x += speed;
    }
    if (local.controller.left) {
      local.player.x -= speed;
    }
  }

  function redraw() {
    requestNextFrame();

    updateMovement();

    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    c.fillRect(local.player.x, 50, 10, 10);
  }
  
  return SELF;
  
})();