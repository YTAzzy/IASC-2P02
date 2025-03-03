import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


/***********
 ** SETUP **
 ***********/
//Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}


/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

// CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/************
 ** MESHES **
 ************/

// Plane / Cave Wall

const caveGeo = new THREE.PlaneGeometry(15.5, 7.5)
const caveMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

const cave = new THREE.Mesh(caveGeo, caveMat)

cave.rotation.y = Math.PI *0.5
cave.receiveShadow = true
scene.add(cave)

// Objects

/*
const torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.2)
const torusKnotMat = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat)
torusKnot.position.set(6, 1, 0)
torusKnot.castShadow = true
scene.add(torusKnot)
*/

// Guard Body
const guardBodyGeometry = new THREE.BoxGeometry( 1, 3, 1 ); 
const guardBodyMaterial = new THREE.MeshNormalMaterial(); 
const guardBody = new THREE.Mesh( guardBodyGeometry, guardBodyMaterial ); 
guardBody.castShadow = true;
guardBody.position.set (15, -12, 0)

scene.add( guardBody )

// Guard Head
const guardHeadGeometry = new THREE.SphereGeometry( 1, 10, 25 ); 
const guardHeadMaterial = new THREE.MeshNormalMaterial(); 
const guardHead = new THREE.Mesh( guardHeadGeometry, guardHeadMaterial ); 

guardHead.castShadow = true;
guardHead.position.set (15, -10, 0)

scene.add( guardHead )


// Cage / Sticks
const cageBarGeo = new THREE.BoxGeometry( 0.5, 10, 1 ); 
const cageBarMat = new THREE.MeshNormalMaterial(); 
const cageBar1 = new THREE.Mesh( cageBarGeo, cageBarMat );
const cageBar2 = new THREE.Mesh( cageBarGeo, cageBarMat );
const cageBar3 = new THREE.Mesh( cageBarGeo, cageBarMat );

cageBar1.castShadow = true;
cageBar2.castShadow = true;
cageBar3.castShadow = true;

cageBar1.position.set (12, -20, -3)
cageBar2.position.set (12, -20, 0)
cageBar3.position.set (12, -20, 3)

scene.add( cageBar1 )
scene.add( cageBar2 )
scene.add( cageBar3 )






/*
* ALL OF THE LIGHTS
*/

//Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(30, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

//D Light Helper
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(dLightHelper)

/**
 * DOM INTERACTION
 */
const domObject = {
    part: 1,
    change1: false,
    change2: false,
    change3: false,
    change4: false
}

// part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}

// part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

// change1
document.querySelector('#change-one').onclick = function() {
    domObject.change1 = true
}
// change2
document.querySelector('#change-two').onclick = function() {
    domObject.change2 = true
}
// change3
document.querySelector('#change-three').onclick = function() {
    domObject.change3 = true
}
// change4
document.querySelector('#change-four').onclick = function() {
    domObject.change4 = true
}

/**
 * UI
 */
/*
//UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('z')
/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // part-one
    if(domObject.part == 1){
        camera.position.set(6,0,0)
        camera.lookAt(0,0,0)
    }

    //part-two
    if(domObject.part == 2){
        camera.position.set(25, 4, -10)
        camera.lookAt(0,0,0)
    }

    //change1
    if(domObject.change1){
        cageBar1.position.set (12, 2, 3)
        cageBar2.position.set (12, 2, -3)
        cageBar3.position.set (12, 2, 0)  
    }

    //change2
    if(domObject.change2){
        guardBody.position.y = -1
        guardHead.position.y = 1
    }

    //change3
    if(domObject.change3){
        cageBar1.position.set (12, -2, -10)
        cageBar2.position.set (12, -1.5, -10)
        cageBar3.position.set (12, -1, -10)
        
        cageBar1.rotation.z = Math.PI/2
        cageBar2.rotation.z = Math.PI/2
        cageBar3.rotation.z = Math.PI/2

        cageBar2.rotation.y = Math.PI/4
        cageBar3.rotation.y = (Math.PI/4)*-1
    }

    //change4
    if(domObject.change4){
        guardBody.position.set(8, 0, -8)
        guardHead.position.set(6, 0, -9.5)
        guardBody.rotation.x = Math.PI/2
        guardBody.rotation.z = (Math.PI/4)*-1

    } else {
        guardBody.position.z = Math.sin(elapsedTime*0.5)*4
        guardHead.position.z = Math.sin(elapsedTime*0.5)*4
        
    }

    // Animation
    

    // Update D Light Helper
    dLightHelper.update()

    //Update Orbit Controls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()