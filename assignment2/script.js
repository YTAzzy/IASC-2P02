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
scene.background = new THREE.Color('DimGray')

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
const drawCube = (height, params) =>
{
    // Create Cube Material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color),
        transparent: params.seeThrough,
        opacity: params.opacity
    })

    // Create Cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    //Scale Cube
    cube.scale.x = params.width
    cube.scale.y = params.height
    cube.scale.z = params.depth

    // Position Cube

    // Special space out as height increases if statement!!!
    if (params.spaceOutWithHeight){
        cube.position.x = (Math.random() - 0.5) * (params.diameter + height)
        cube.position.z = (Math.random() - 0.5) * (params.diameter + height)
    } else{
        cube.position.x = (Math.random() - 0.5) * params.diameter
        cube.position.z = (Math.random() - 0.5) * params.diameter
    }
    
    cube.position.y = height - 10

    // Randomize Cube Rotation
    if(params.random){
        cube.rotation.x = Math.random() * 2 * Math.PI
        cube.rotation.z = Math.random() * 2 * Math.PI
        cube.rotation.y = Math.random() * 2 * Math.PI
    }
    

    // Add Cube to group
    params.group.add(cube)
}

/// TorusKnot for You

const TKnotGeo = new THREE.TorusKnotGeometry(.25, .1, 20, 4)
const drawTKnot = (height, params) =>
    {
        // Create TKnot Material
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(params.color),
            transparent: params.seeThrough,
            opacity: params.opacity
        })
    
        // Create TKnot
        const TKnot = new THREE.Mesh(TKnotGeo, material)
    
        //Scale TKnot
        TKnot.scale.x = params.width
        TKnot.scale.y = params.height
        TKnot.scale.z = params.depth
    
        // Position TKnot
        TKnot.position.x = (Math.random() - 0.5) * params.diameter
        TKnot.position.z = (Math.random() - 0.5) * params.diameter
        TKnot.position.y = height - 10
    
        // Randomize TKnot Rotation
        if(params.random){
            TKnot.rotation.x = Math.random() * 2 * Math.PI
            TKnot.rotation.z = Math.random() * 2 * Math.PI
            TKnot.rotation.y = Math.random() * 2 * Math.PI
        }
        
    
        // Add TKnot to group
        params.group.add(TKnot)
    }


// Spheres for Unknown

const sphereGeometry = new THREE.SphereGeometry(0.5, 10, 4)
const drawSphere = (height, params) =>
    {
        // Create sphere Material
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(params.color),
            transparent: params.seeThrough,
            opacity: params.opacity
        })
    
        // Create sphere
        const sphere = new THREE.Mesh(sphereGeometry, material)
    
        //Scale sphere
        sphere.scale.x = params.width
        sphere.scale.y = params.height
        sphere.scale.z = params.depth
    
        // Position sphere
        sphere.position.x = (Math.random() - 0.5) * params.diameter
        sphere.position.z = (Math.random() - 0.5) * params.diameter
        sphere.position.y = height - 10
    
        // Randomize sphere Rotation
        if(params.random){
            sphere.rotation.x = Math.random() * 2 * Math.PI
            sphere.rotation.z = Math.random() * 2 * Math.PI
            sphere.rotation.y = Math.random() * 2 * Math.PI
        }
        
    
        // Add sphere to group
        params.group.add(sphere)
    }
    


/*******
** UI **
********/
// UI
const ui = new dat.GUI()

let preset = {}

// Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)
const group4 = new THREE.Group()
scene.add(group4)

const uiObj = {
    sourceText: "You know the distance never made a difference to me I swam a lake of fire, I'd have walked across the floor of any sea Ignored the vastness between all that can be seen And all that we believe So I thought you were like an angel to me Funny how true colours shine in darkness and in secrecy If there were scarlet flags, they washed out in the mind of mе Where a blindin' light shone on you еvery night And either side of my sleep Where you were held frozen like an angel to me It ain't the being alone (Sha-la-la) It ain't the empty home, baby (Sha-la-la) You know I'm good on my own (Sha-la-la) Sha-la-la, baby, you know, it's more the being unknown So much of the livin', love, is the being unknown You called me angel for the first time, my heart leapt from me You smile now, I can see its pieces still stuck in your teeth And what's left of it, I listen to it tick Every tedious beat Going unknown as any angel to me Do you know I could break beneath the weight Of the goodness, love, I still carry for you? That I'd walk so far just to take The injury of finally knowin' you? It ain't the being alone (Sha-la-la) It ain't the empty home, baby (Sha-la-la) You know I'm good on my own (Sha-la-la) Sha-la-la, baby, you know, it's more the being unknown And there are some people, love, who are better unknown",
    saveSourceText() {
        saveSourceText()
    },
    term1: {
        term: 'you',
        color: '#d1a7b1',
        diameter: 10,
        width: 1,
        height: 1,
        depth: 1,
        random: true,
        seeThrough: false,
        spaceOutWithHeight: false,
        opacity: 1.0,
        nShapes: 100,
        group: group1
    } ,
    term2: {
        term: 'angel',
        color: '#6e0281',
        diameter: 10,
        width: 1,
        height: 1,
        depth: 1,
        random: true,
        seeThrough: false,
        spaceOutWithHeight: true,
        opacity: 1.0,
        nShapes: 100,
        group: group2
    },

    term3: {
        term: 'unknown',
        color: '#505050',
        diameter: 20,
        width: 5,
        height: 1,
        depth: 5,
        random: false,
        seeThrough: true,
        spaceOutWithHeight: false,
        opacity: 0.5,
        nShapes: 250,
        group: group3
    },
    term4: {
        term: 'me',
        color: '#92010a',
        diameter: 20,
        width: 1,
        height: 1,
        depth: 1,
        random: true,
        seeThrough: true,
        spaceOutWithHeight: false,
        opacity: 0.8,
        nShapes: 100,
        group: group4
    },

    saveTerms() {
        saveTerms()
    }, 
    rotateCamera: false
}

//UI Functions
const saveSourceText = () =>
{
    // UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()
    cameraFolder.show()

    // Text Analysis
    tokenizeSourceText(uiObj.sourceText)
}

const saveTerms = () =>
{
    // UI
    preset = ui.save
    visualizeFolder.hide()
    cameraFolder.show()

    // Text Analysis

    //NOTE: MAKE INDIVIDUAL METHODS FOR EACH DIFFERENT SHAPE TYPE (You=TorusKnot, Unknown=Sphere, no random rotation)
    findSearchTermInTokenizedTextKnot(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedTextSphere(uiObj.term3)
    findSearchTermInTokenizedText(uiObj.term4)
}

// Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj, 'saveSourceText')
    .name("Save")


// Terms and Visual Folders
const termsFolder = ui.addFolder("Search Terms")
const cameraFolder = ui.addFolder("Camera")
const visualizeFolder = ui.addFolder("Visualize")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visibility")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term 1 Colour")

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2")

termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visibility")

termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term 2 Colour")

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")
    
termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visibility")

termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term 3 Colour")

termsFolder
    .add(uiObj.term4, 'term')
    .name("Term 4")

termsFolder
    .add(group4, 'visible')
    .name("Term 4 Visibility")

termsFolder
    .addColor(uiObj.term4, 'color')
    .name("Term 4 Colour")

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name('Turntable')

// Terms camera and Visualize folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()

/*******************
 ** TEXT ANALYSIS **
 *******************/
// Variables
let parsedText, tokenizedText

// Parse and Tokenize sourceText
const tokenizeSourceText = (sourceText) =>
{
    // Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (params) =>
{
    for (let i = 0; i < tokenizedText.length; i++){
        if (tokenizedText[i] === params.term){
            const height = (100/ tokenizedText.length) * i * 0.2
            for(let a = 0; a < params.nShapes; a++){
                drawCube(height, params)
            }
        }
    }
}

// Special find search term for Unknown
const findSearchTermInTokenizedTextSphere = (params) =>
    {
        for (let i = 0; i < tokenizedText.length; i++){
            if (tokenizedText[i] === params.term){
                const height = (100/ tokenizedText.length) * i * 0.2
                for(let a = 0; a < params.nShapes; a++){
                    drawSphere(height, params)
                }
            }
        }
    }

// Special find search term for Angel
const findSearchTermInTokenizedTextKnot = (params) =>
    {
        for (let i = 0; i < tokenizedText.length; i++){
            if (tokenizedText[i] === params.term){
                const height = (100/ tokenizedText.length) * i * 0.2
                for(let a = 0; a < params.nShapes; a++){
                    drawTKnot(height, params)
                }
            }
        }
    }

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

    //Rotate Camera
    if(uiObj.rotateCamera){
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 5
        camera.lookAt(0, 0, 0)
    }
    
    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()
