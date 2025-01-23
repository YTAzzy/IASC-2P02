import * as THREE from "three"

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('violet')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** MESHES **
 ************/
 // testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial(1)
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

// sphere2

const sphere2Geometry = new THREE.SphereGeometry(1)
const sphere2Material = new THREE.MeshNormalMaterial(1)
const Sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material)

scene.add(Sphere2)


// testCube
const cubeGeometry = new THREE.BoxGeometry(1)
const cubeMaterial = new THREE.MeshNormalMaterial(1)
const testCube = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(testCube)

//torus
const geometry = new THREE.TorusGeometry( 2, 0.2, 16, 50 ); 
const material = new THREE.MeshNormalMaterial(1); 
const torus = new THREE.Mesh( geometry, material ); 

scene.add( torus );

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate testSphere
    const sphereDistance = 3
    testSphere.position.y = Math.sin(elapsedTime) * sphereDistance
    testSphere.position.x = Math.cos(elapsedTime) * sphereDistance

    const testSphereScale = 0.5
    testSphere.scale.x = testSphereScale
    testSphere.scale.y = testSphereScale
    testSphere.scale.z = testSphereScale

    //animate Sphere2
    const sphere2Distance = 3
    Sphere2.position.y = Math.sin(-elapsedTime) * sphere2Distance
    Sphere2.position.x = Math.cos(elapsedTime) * sphere2Distance

    const Sphere2Scale = 0.5
    Sphere2.scale.x = Sphere2Scale
    Sphere2.scale.y = Sphere2Scale
    Sphere2.scale.z = Sphere2Scale

    //Animate testCube
    const cubeRotSpeed = 1
    testCube.rotation.x = elapsedTime * cubeRotSpeed
    testCube.rotation.y = elapsedTime * cubeRotSpeed
    testCube.rotation.z = elapsedTime * cubeRotSpeed
    
    const cubeScale = 2
    testCube.scale.x = Math.sin(elapsedTime) * cubeScale
    testCube.scale.y = Math.sin(elapsedTime) * cubeScale
    testCube.scale.z = Math.sin(elapsedTime) * cubeScale

    //Animate Torus
    const TorusRotSpeed = 1.5
    torus.rotation.y = elapsedTime * TorusRotSpeed

    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()