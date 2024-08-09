See [3d/threejs/base-world](/3d/threejs/base-world/) for base world model.

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

function loadModels(src) {
    loader.load(src , function ( gltf ) {
	    scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.error( error );
    });
}

loadModels('path/model.glb');
```