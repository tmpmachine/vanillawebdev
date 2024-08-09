import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// # local
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );

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
    renderer.render( scene, camera );
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

// # init
function Init() {
    setupRenderer();
    setupScene();
    setupGround();
    setupLight();

    renderer.setAnimationLoop( animate );
}

Init();