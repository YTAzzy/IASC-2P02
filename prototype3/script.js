import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


/***********
 ** SETUP **
 ***********/
//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')

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
    antialias: true
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

const torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.2)
const torusKnotMat = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat)
torusKnot.position.set(6, 1, 0)
torusKnot.castShadow = true
scene.add(torusKnot)

/*
* ALL OF THE LIGHTS
*/

//Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

//D Light Helper
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(dLightHelper)

/**
 * UI
 */

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

    // Animation
    torusKnot.rotation.y = elapsedTime

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