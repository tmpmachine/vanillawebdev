let game = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    Start,
    Stop,
  };
  
  let c = null;
  let local = {
    player: {
      x: 150,
    },
    controller: {
      left: false,
      right: false,
      attack: false,
      dash: false,
    }
  };
  let nextFrameRequest = null;
  let oneTime = OneTime();
  let gameObjects = [];
  let gameEnemies = [];
  let elapsed = 0;
  
  function initCanvas() {
    c = $('#canvas').getContext('2d');
  }
  
  function Start() {
    initCanvas();
    attachKeyboardListener();
    
    startAnimation();
  }
  
  function Stop() {
    window.cancelAnimationFrame(nextFrameRequest);
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
  }
  
  function handleKey(evt) {
    if (evt.key == 'd') {
      local.controller.right = (evt.type == 'keydown');
    }
    else if (evt.key == 'a') {
      local.controller.left = (evt.type == 'keydown');
    }
    
    if (evt.key == 'k') {
      local.controller.attack = (evt.type == 'keydown');
    }
    if (evt.key == 'j') {
      local.controller.dash = (evt.type == 'keydown');
    }
  }
  
  function OneTime() {

    let map = {};
    
    function lock(key) {
      if (!map[key]) {
        map[key] = true;
        return true;
      }
      return false;
    }
    
    function release(key) {
      map[key] = false;
    }
    
    function clear() {
      map = {};
    }
    
    return {
      lock,
      release,
      blur,
    };

  }
  
  function updateMovement() {
    
    let speed = 1;
    
    if (local.controller.dash) {
      if (compoSkill.CanDash()) {
        compoSkill.DecreaseDashStamina();
        speed += 0.8;
      }
    } else {
      compoSkill.RestoreDashStamina();
    }
    
    if (local.controller.right) {
      local.player.x += speed;
    }
    if (local.controller.left) {
      local.player.x -= speed;
    }
    
    for (let item of gameObjects) {
      if (!item) continue;

      item.y += 3;
    }
    
    for (let item of gameEnemies) {
      if (!item) continue;
      
      item.y -= 1;
    }
  }
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function checkCollision(rect1, rect2) {
    let {x: x1, y: y1, w1 = 10, h1 = 10} = rect1;
    let {x: x2, y: y2, w2 = 10, h2 = 10} = rect2;
    
    if (
      x1 < x2 + w2 &&
      x1 + w1 > x2 &&
      y1 < y2 + h2 &&
      y1 + h1 > y2
    ) {
      return true;
    }
    
    return false;
  }
  
  function updateAction() {
    if (local.controller.attack) {
      if (oneTime.lock('attack')) {
        shootBullet();
      }
    } else {
      oneTime.release('attack');
    }
  }
  
  function spawnEnemy() {
    const randomNumber = getRandomNumber(10, 300);
    gameEnemies.push({
      index: gameEnemies.length,
      x: randomNumber,
      y: 150,
    });
  }
  
  function shootBullet() {
    
    if (!compoAmmo.HasAmmo()) return;
    
    gameObjects.push({
      index: gameObjects.length,
      x: local.player.x,
      y: 0,
    });
    compoAmmo.Decrease();
  }
  
  function updateCollision() {
    for (let gameObj of gameObjects) {
      if (!gameObj) continue;
      
      for (let enemy of gameEnemies) {
      if (!enemy) continue;
        
        if (checkCollision(gameObj, enemy)) {
          destroyObject(gameObj.index);
          destroyEnemy(enemy.index);
          
          compoScore.Add(10);
        }
        
      }
      
    }
  }
  
  
  function destroyObject(index) {
    gameObjects.splice(index, 1, null);
  }
  
  function destroyEnemy(index) {
    gameEnemies.splice(index, 1, null);
  }
  
  function applyEnemyAttack() {
    for (let item of gameEnemies) {
      if (!item) continue;
      
      if (item.y < 0) {
        destroyEnemy(item.index);
        compoLife.Decrease();
      }
    }
  }
  
  function redraw() {
    
    requestNextFrame();

    if (elapsed % 250 === 0) {
      spawnEnemy();
    }
    
    updateMovement();
    updateCollision();
    updateAction();
    applyEnemyAttack();

    c.clearRect(0,0,c.canvas.width,c.canvas.height);
    c.fillRect(local.player.x, 0, 10, 10);
    
    for (let item of gameObjects) {
      if (!item) continue;
      c.fillRect(item.x, item.y, 10, 10);
    }
    
    for (let item of gameEnemies) {
      if (!item) continue;
      c.fillRect(item.x, item.y, 10, 10);
    }
    
    elapsed++;
    
    if (elapsed % 20 === 0) {
      compoTimer.Increase();
    }
  }
  
  return SELF;
  
})();