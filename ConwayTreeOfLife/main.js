import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import {ConwayEngine} from 'ConwayEngine'
const scene = new THREE.Scene();

scene.position.z = 100;
scene.position.y = 800;

const width = window.innerWidth;
const height= window.innerHeight;
const size = 6;
const gridside = 64;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

const camera = new THREE.OrthographicCamera(width/ -2,width/2, height / 2,height/-2, 0, 1000);
camera.position.z = 400;
camera.position.y = 1000;
camera.rotation.x = -Math.PI/4;

let pointer = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let pointerPress = false;

//LIGHT ==============================================================================
const point = new THREE.PointLight(0xFFFFFF,20000);
point.position.y = -200;
point.position.x = Math.cos(Math.PI/2)*6*32;
point.position.y = Math.sin(Math.PI/2)*6*32;
point.castShadow  = true;
scene.add(point);

//GRID ==============================================================================
const gridGeo = new THREE.PlaneGeometry( gridside*size, gridside*size);
const grid = new THREE.Mesh(gridGeo,new THREE.MeshBasicMaterial( {visible: false} ));
grid.rotation.x = -Math.PI/2;
grid.rotation.z = -Math.PI*0.25;
//grid.position.y=size;
scene.add(grid);

//GAME OF LIFE PART ==============================================================================
const cubeGeo = new THREE.BoxGeometry(size,size,size);
const cubeMaterial = new THREE.MeshStandardMaterial( { color: 0xFFFFFF,roughness: 1} );
var engine = new ConwayEngine(gridside,gridside);
var offset = engine.w/2*-1;
var generations = [];
var geoArray;
const matrix = new THREE.Matrix4();

function tower(){
	if(geoArray) geoArray.dispose();
	generations.forEach((x,i)=>{
		x.position.y-=size;
		//x.rotation.y+=0.01;
		//x.rotation.x+=0.01;
	});

	var voxel;
	if(!pointerPress){
		engine.update();
	}

	const geometries = [];
	for(var i = 0; i < engine.board.length;i++){
		var denormalize = {x:(i%engine.w),y:Math.floor(i/engine.w)};
		if(engine.board[i]){
			matrix.makeTranslation((offset+denormalize.x)*size,0,(offset+denormalize.y)*size);	
			geometries.push(cubeGeo.clone().applyMatrix4(matrix));
		}
	}
	if(geometries.length>0)
		geoArray = BufferGeometryUtils.mergeGeometries(geometries);
	voxel = new THREE.Mesh(geoArray,cubeMaterial);
	voxel.rotation.y = 3.14/4;
	scene.add(voxel);

	generations.push(voxel);
	if(generations.length > 160*(4/size)){
		scene.remove(generations.shift());
	}
}

//RENDERING PART ==============================================================================
let composer, renderPass, saoPass, unrealBloomPass;
composer = new EffectComposer( renderer );
renderPass = new RenderPass( scene, camera );
unrealBloomPass = new UnrealBloomPass(new THREE.Vector2( width, height));
unrealBloomPass.threshold = 0;
unrealBloomPass.strength = 0.6;
unrealBloomPass.radius = 0.2;
const outputPass = new OutputPass();

composer.addPass( renderPass );
composer.addPass( unrealBloomPass);
composer.addPass( outputPass );

// LOOP ==============================================================================
var time = 0;
function animate() {
	time++;
	if(Math.floor(time%2) == 0)
	tower();

	requestAnimationFrame( animate );
	composer.render();
}
animate();

// EVENT ==============================================================================
function pointRaycast(event){
	if(pointerPress){
		pointer.set( ( event.clientX / width) * 2 - 1, - ( event.clientY / height) * 2 + 1 );
		raycaster.setFromCamera( pointer, camera );

		const intersects = raycaster.intersectObjects([grid], false );
		if(intersects.length){
			var y = Math.floor((intersects[0].uv.x)*gridside);
			var x = Math.floor((intersects[0].uv.y)*gridside);
			engine.addPoint(x,y);
		}
	}
}

window.addEventListener("pointermove",(event)=>{
	pointRaycast(event);
});

window.addEventListener("pointerdown",(event)=>{
	pointerPress = true
	pointRaycast(event);
});
window.addEventListener("pointerup",()=>{pointerPress = false});