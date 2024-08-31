import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let container, stats, clock, gui, mixer, actions, activeAction, previousAction;
let model, face;
const api = { state: 'Walking' };

// # local
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );

  let local = {
    controller: {
      down: false,
      up: false,
      left: false,
      right: false,
      attack: false,
      dash: false,
    },
  };

camera.position.set( -0.5, 27, 35 );
camera.lookAt( 0, 2, 0 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

// # func

function setupRenderer() {
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// # animate
function animate() {
    updateMovements();
    renderer.render( scene, camera );
}

// # movements
function updateMovements() {
  const speed = 0.27;
  const moveDirection = new THREE.Vector3(0, 0, 0);
  let rotationAngle = null;

  if (local.controller.up) {
      moveDirection.z -= 1; // Move forward
      rotationAngle = 0; // Face forward
  }
  
  if (local.controller.down) {
      moveDirection.z += 1; // Move backward
      rotationAngle = Math.PI; // Face backward
  }
  
  if (local.controller.left) {
      moveDirection.x -= 1; // Move left
      rotationAngle = Math.PI / 2; // Face left
  }
  
  if (local.controller.right) {
      moveDirection.x += 1; // Move right
      rotationAngle = -Math.PI / 2; // Face right
  }

  // Handle diagonal movements
  if (local.controller.up && local.controller.right) {
      rotationAngle = -Math.PI / 4; // Face diagonal up-right
  }
  if (local.controller.up && local.controller.left) {
      rotationAngle = Math.PI / 4; // Face diagonal up-left
  }
  if (local.controller.down && local.controller.right) {
      rotationAngle = -(3 * Math.PI) / 4; // Face diagonal down-right
  }
  if (local.controller.down && local.controller.left) {
      rotationAngle = (3 * Math.PI) / 4; // Face diagonal down-left
  }

  // If there's any movement, rotate the model and update its position
  if (moveDirection.length() > 0) {
      if (rotationAngle !== null) {
          model.rotation.y = baseRotation.y + rotationAngle; // Set the model's rotation
      }

      // Normalize and move the model in the direction it is facing
      moveDirection.normalize();
      moveDirection.multiplyScalar(speed);
      model.position.add(moveDirection);
  }
}



function setupLight() {
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
    dirLight.position.set( 0, 20, 10 );
    scene.add( dirLight );
}

function setupScene() {
    scene.background = new THREE.Color( 0xe0e0e0 );
    scene.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );
}

function setupGround() {
    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );

    const grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );
}

const baseRotation = new THREE.Euler(0, Math.PI, 0); // Rotate 180 degrees around the Y-axis to fix mirroring

// # model
function loadModel() {
  return new Promise(resolve => {

    // model
    const loader = new GLTFLoader();
    loader.load( 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb', function ( gltf ) {

        model = gltf.scene;

        // Assuming your model is loaded or created as 'model'
        // model.rotation.copy(baseRotation);

        scene.add( model );
        resolve();
        // createGUI( model, gltf.animations );

    }, undefined, function ( e ) {

        console.error( e );

    } );
  })
}

// # init
async function Init() {
    attachKeyboardListener();
    setupRenderer();
    setupScene();
    setupGround();
    setupLight();
    await loadModel();

    renderer.setAnimationLoop( animate );
}

// # listeners
function attachKeyboardListener() {
  window.addEventListener('keyup', handleKeyEvent);
  window.addEventListener('keydown', handleKeyEvent);
}

  // # control, # keyboard
function handleKeyEvent(evt) {
  
  let key = evt.key.toLowerCase();
  
  if (key == 'd') {
    local.controller.right = (evt.type == 'keydown');
  }
  else if (key == 'a') {
    local.controller.left = (evt.type == 'keydown');
  }
  
  if (key == 'k') {
    local.controller.attack = (evt.type == 'keydown');
  }
  if (key == 'j') {
    local.controller.dash = (evt.type == 'keydown');
  }
  local.controller.dash = evt.shiftKey;
  
  if (key == 'w') {
    local.controller.up = (evt.type == 'keydown');
  }
  if (key == 's') {
    local.controller.down = (evt.type == 'keydown');
  }
}
  

Init();