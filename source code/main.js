import './style.css'
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//SCENE
const scene = new THREE.Scene();

//CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

//OBJECT
const geometry = new THREE.BoxGeometry(5, 5, 5, 5)
const loader = new THREE.TextureLoader();
    const material = [
        new THREE.MeshBasicMaterial({ map: loader.load('https://i.postimg.cc/x8CYvSqN/scan-04.jpg')}),
        new THREE.MeshBasicMaterial({ map: loader.load('https://i.postimg.cc/T27TRhHV/scan-03.jpg')}),
        new THREE.MeshBasicMaterial({ map: loader.load('https://i.postimg.cc/x8CYvSqN/scan-04.jpg')}), //top
        new THREE.MeshBasicMaterial({ map: loader.load('https://i.postimg.cc/nL4HZk6r/scan-01.jpg')}), //bottom
        new THREE.MeshBasicMaterial({ map: loader.load('https://i.postimg.cc/yYDsWBww/scan-05.jpg')}),
        new THREE.MeshBasicMaterial({ map: loader.load('https://i.postimg.cc/RhDmGbns/scan-06.jpg')}),
        //new THREE.MeshBasicMaterial({ map: loader.load('scan_02.jpg')}),
];


//MESH
const box = new THREE.Mesh ( geometry, material );

//LIGHTING
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);

//HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);


//ADD TO SCENE
box.position.set(0, 0, -5,2)
scene.add(box)
scene.add(pointLight, ambientLight)
//scene.add(lightHelper, gridHelper)

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setX(10);
camera.position.setY(0);
camera.position.setZ(-5);
renderer.render(scene, camera);

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

//BACKGROUND
const bg = new THREE.TextureLoader().load("https://i.postimg.cc/nL4HZk6r/scan-01.jpg");
scene.background = bg;

//SCROLL TO ROTATE CUBE
function rot() {
  const t = document.body.getBoundingClientRect().top;
  
    box.rotation.y = t * 0.004;

}

document.body.onscroll = rot

//ANIMATE
function animate() {
  requestAnimationFrame( animate );

  controls.update();
  
  renderer.render( scene, camera )
}
animate()
