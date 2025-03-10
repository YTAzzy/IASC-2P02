import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
**********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

// Resizing
window.addEventListener('resize', () =>
{
    // Update Sizes
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight,
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    // Update Camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0, 10, -20)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** LIGHTS **
 ************/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/************
 ** MESHES **
 ************/
// Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const drawCube = (height, color) =>
{
    // Create Cube Material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    // Create Cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    // Position Cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height - 10

    // Randomize Cube Rotation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI

    // Add Cube to Scene
    scene.add(cube)
}

/*******
** UI **
********/
// UI
//const ui = new dat.GUI()

/*******************
 ** TEXT ANALYSIS **
 *******************/
// Source Text (The lyrics to Stupid (Can't run from the urge) by underscores)
// I tried to make it more readable but it ended up breaking it for some reason, idk
const sourceText = "Good luck Stupid, stupid, stupid girl just travelled \'cross the country Just to do exactly what she does at home Uh, stupid, stupid, stupid girl is tweaking at the party \'Cause she already forgot that she just smoked I need you just a little bit and nothing more (and nothing more) Uh, I don\'t feel much of anything, it\'s such a bore (For sure, for sure) There\'s nothing more that I can do, baby I feel you, call me back (I\'ve given up) So helpless when it comes to you, baby Uh, I\'m fiending for it bad You can take the girl out of this town But you can\'t take this town out of the girl (ah) It\'s the same old world (ah) You can take her to the city Dress her up and make her pretty Even she can\'t run from the urge (So stupid, so stupid, stupid) (So stupid, so stupid, stupid) Let me see you move now, baby (So stupid, so stupid, stupid) Even she can\'t run from the urge (So stupid, so stupid, stupid) Stupid, stupid, stupid girl keeps leaving every month or so And coming back with nothing to report Stupid, stupid, stupid girl still acts like she\'s nineteen And won\'t tell anyone she's turning twenty-four I know this isn\'t fixin\' it, it\'s still my fault (it\'s still my fault) I mean, I mean, I tasted just a little bit, I want it all (good call, good call) There\'s nothing more that I can do, baby I feel you, call me back (I\'ve given up) So helpless when it comes to you, baby Uh, I\'m fiending for it bad You can take the girl out of this town But you can\'t take this town out of the girl (ah) It\'s the same old world (ah) You can take her to the city, dress her up and make her pretty Even she can\'t run from the urge (So stupid, so stupid, stupid) You don\'t understand My life depends on making it work with what I\'ve got If I go for it, I might forget that you\'re there, you\'re there Let me see you move now, baby (So stupid, so stupid, stupid) (So stupid, so stupid, stupid) You can take the girl out of this town But you can\'t take this town out of the girl (ah) It\'s the same old world (let me see you move now, baby) You can take her to the city Dress her up and make her pretty Even she can\'t run from the urge (So stupid, so stupid, stupid)"

// Variables
let parsedText, tokenizedText

// Parse and Tokenize sourceText
const tokenizeSourceText = () =>
{
    // Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) =>
{
    for (let i = 0; i < tokenizedText.length; i++){
        if (tokenizedText[i] === term){
            const height = (100/ tokenizedText.length) * i * 0.2
            for(let a = 0; a < 100; a++){
                drawCube(height, color)
            }
        }
    }
}

tokenizeSourceText()
findSearchTermInTokenizedText("she", "red")
findSearchTermInTokenizedText("can\'t", "orange")
findSearchTermInTokenizedText("run", "yellow")
findSearchTermInTokenizedText("from", "green")
findSearchTermInTokenizedText("the", "blue")
findSearchTermInTokenizedText("urge", "purple")
findSearchTermInTokenizedText("stupid", "palevioletred")





/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()
    
    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()