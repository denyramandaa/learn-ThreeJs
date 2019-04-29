var container = document.getElementById( 'container' );
document.body.appendChild( container );
var scene, camera, renderer, controls;

var WIDTH  = container.offsetWidth;
var HEIGHT = container.offsetHeight;

var SPEED = 0.01;
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( '#b9c9d6' );
    initMesh();
    initCamera();
    initLights();
    initRenderer();
    myControl();
    container.appendChild( renderer.domElement );
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
    
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

var obj_color, ambientLight, hemiLight, light;
function initLights() {
    obj_color	  = '#FAFAFA',
    ambientLight  = new THREE.AmbientLight( '#EEEEEE' ),
    hemiLight     = new THREE.HemisphereLight( obj_color, obj_color, 0 ),
    light         = new THREE.PointLight( obj_color, 1, 100 );
	hemiLight.position.set( 0, 50, 0 );
	light.position.set( 0, 20, 10 );
	scene.add( ambientLight );
	scene.add( hemiLight );
	scene.add( light );
}

var mesh = null;
var texture;
function initMesh() {
    var loader = new THREE.JSONLoader();
    texture = new THREE.TextureLoader().load( 'assest/textures/uv.jpg' );
    loader.load('assest/object/apaja.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.7;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        mesh.rotation.x = -0.5;
        scene.add(mesh);
    });
}

//control
var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = container.offsetWidth / 2;
var windowHalfY = container.offsetHeight / 2;

// document.getElementById("container").addEventListener( 'mousedown', onDocumentMouseDown, false );
// document.getElementById("container").addEventListener( 'touchstart', onDocumentTouchStart, false );
// document.getElementById("container").addEventListener( 'touchmove', onDocumentTouchMove, false );

function onWindowResize() {
	windowHalfX = container.offsetWidth / 2;
	windowHalfY = container.offsetHeight / 2;

	camera.aspect = container.offsetWidth / container.offsetHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( container.offsetWidth, container.offsetHeight );
}

// function onDocumentMouseDown( event ) {
// 	event.preventDefault();
// 	document.getElementById("container").addEventListener( 'mousemove', onDocumentMouseMove, false );
// 	document.getElementById("container").addEventListener( 'mouseup', onDocumentMouseUp, false );
// 	document.getElementById("container").addEventListener( 'mouseout', onDocumentMouseOut, false );
// 	mouseXOnMouseDown = event.clientX - windowHalfX;
// 	targetRotationOnMouseDown = targetRotation;
// }

// function onDocumentMouseMove( event ) {
// 	mouseX = event.clientX - windowHalfX;
// 	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
// }

// function onDocumentMouseUp( event ) {
// 	document.getElementById("container").removeEventListener( 'mousemove', onDocumentMouseMove, false );
// 	document.getElementById("container").removeEventListener( 'mouseup', onDocumentMouseUp, false );
// 	document.getElementById("container").removeEventListener( 'mouseout', onDocumentMouseOut, false );
// }

// function onDocumentMouseOut( event ) {
// 	document.getElementById("container").removeEventListener( 'mousemove', onDocumentMouseMove, false );
// 	document.getElementById("container").removeEventListener( 'mouseup', onDocumentMouseUp, false );
// 	document.getElementById("container").removeEventListener( 'mouseout', onDocumentMouseOut, false );
// }

// function onDocumentTouchStart( event ) {
// 	if ( event.touches.length === 1 ) {
// 		event.preventDefault();
// 		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
// 		targetRotationOnMouseDown = targetRotation;
// 	}
// }

// function onDocumentTouchMove( event ) {
// 	if ( event.touches.length === 1 ) {
// 		event.preventDefault();
// 		mouseX = event.touches[ 0 ].pageX - windowHalfX;
// 		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
// 	}
// }

// var controltarget;
// function rangeControler(){
// 	// $(document.body).on('change input', '.xRot', function(e) {
// 	$(".control-area").on('change input', '#control', function(){
// 		controltarget = $("#control").val();
// 		mesh.rotation.y += ( targetRotation - mesh.rotation.y ) * 0.7;
// 	});
// }

function myControl(){
	
	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 5.0;
	controls.zoomSpeed = 3.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = true;
	controls.staticMoving = false;
	controls.dynamicDampingFactor = 0.2;
}


function render() {
    requestAnimationFrame(render);
	controls.update();
    onWindowResize();
	
	// mesh.rotation.y += ( targetRotation - mesh.rotation.y ) * 0.7;
 //   rangeControler();
    renderer.render(scene, camera);
}

init();
render();