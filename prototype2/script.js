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
 // testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial(1)
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

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
    play: false
}


//Plane UI
const planeFolder = ui.addFolder('Plane')
planeFolder.add(planeMaterial, 'wireframe')

//Sphere UI
const sphereFolder = ui.addFolder('Sphere')

sphereFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Speed')

sphereFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Distance')

sphereFolder   
    .add(uiObject, 'scale')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Scale')

sphereFolder
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

    //Animate Sphere
    if (uiObject.play){
        testSphere.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
    }
    testSphere.scale.x = uiObject.scale
    testSphere.scale.y = uiObject.scale
    testSphere.scale.z = uiObject.scale

    //Update Orbit Controls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()