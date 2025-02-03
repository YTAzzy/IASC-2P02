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
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(-2, 3, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/************
 ** MESHES **
 ************/
 // Torus
const torusGeometry = new THREE.TorusGeometry(3, 0.4, 15, 50)
const torusMaterial = new THREE.MeshNormalMaterial(1)
const torus = new THREE.Mesh(torusGeometry, torusMaterial)

scene.add(torus)

const planeGeometry = new THREE.PlaneGeometry(10, 10, 75, 75)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)


/**
 * UI
 */

//UI
const ui = new dat.GUI()

//UI Object
const uiObject = {
    speed: 1,
    distance: 1,
    scale: 1,
    rotate: 0,
    play: false
}


//Plane UI
const planeFolder = ui.addFolder('Plane')
planeFolder.add(planeMaterial, 'wireframe')

//Torus UI
const torusFolder = ui.addFolder('Torus')

torusFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Speed')

torusFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Distance')

torusFolder   
    .add(uiObject, 'scale')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Scale')

torusFolder
    .add(uiObject, 'rotate')
    .min(0)
    .max(10)
    .step(0.1)
    .name('Rotation')

torusFolder
    .add (uiObject, 'play')
    .name('Animate')

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate Torus
    if (uiObject.play){
        torus.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
        torus.rotation.y = elapsedTime * uiObject.rotate
    }
    torus.scale.x = uiObject.scale
    torus.scale.y = uiObject.scale
    torus.scale.z = uiObject.scale

    //Update Orbit Controls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()