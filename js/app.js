//Create html container
const container = document.body;
//Create scene
const scene = new THREE.Scene()
//Create camera (FOV, ratio, near clip plane distance, far clip plane distance)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//Add sphere
const geometry = new THREE.SphereGeometry(50, 32, 32)
//Create texture
const texture = new THREE.TextureLoader().load('ressources/360/hakone-shrine.jpg')
//la camera se trouve a l'interieur de la sphere donc on a inverser mit l'image 
//sur l'interieur de la sphere, donc on inverse l'image pour qu'elle se soit dans le bon sens
texture.repeat.x = -1;
texture.wrapS = THREE.RepeatWrapping

//Create sphere mesh
const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)


//Create renderer
const renderer = new THREE.WebGLRenderer()
//set size
renderer.setSize(window.innerWidth, window.innerHeight)

//Camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.rotateSpeed = 0.2
controls.enableZoom = false
//Camera position (pour etre au centre de la sphere
camera.position.set(-1, 0, 0)
controls.update()

//Add to container
container.appendChild(renderer.domElement)

//Create tooltips
function addTooltip(pos) {
    let spriteTexture = new THREE.TextureLoader().load('ressources/Icons/info.png');
    let spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture });
    let sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(pos.clone().normalize().multiplyScalar(40))
    sprite.scale.copy(new THREE.Vector3(3, 3, 3))
    console.log(pos)
    scene.add(sprite);
}

addTooltip(new THREE.Vector3(10.748404314539334, 7.268325656239274, 48.12216995482461))
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)

}

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}

function onClick(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    let mousePos = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    )
    let rayCaster = new THREE.Raycaster()
    rayCaster.setFromCamera(mousePos, camera)
    let intersects = rayCaster.intersectObject(sphere)
    if (intersects.length > 0) {
        //addTooltip(intersects[0].point)
    }
}

window.addEventListener('resize', onResize)
container.addEventListener('click', onClick)
animate()