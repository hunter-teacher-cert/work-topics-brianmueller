import Scene from '../src/Scene.js'
import Sphere from '../src/Sphere.js'
import Material from '../src/Material.js'
import Vector3 from '../src/Vector3.js'
import RenderPlanner from '../src/RenderPlanner.js'

// document.getElementById("startButtonId").addEventListener('click', () => {
//     startRendering();
// });

// -------------------------------
// create scene
var scene = new Scene();

// add background sphere
scene.add(
    new Sphere(new Vector3(0.0, -10004, -20), 10000,
               new Material(new Vector3(0.2, 0.2, 0.2), 0, 0, new Vector3()))
);

// add spheres
var sphere1 = new Sphere(
    new Vector3(0, 0, -20), // center
    4, // radius
    new Material(
        new Vector3(1.0, 0.0, 0.0), // color
        0, // reflection
        0,  // transparency
        new Vector3() // emissionColor (lights only)
    )
);
scene.add(sphere1);

// var sphere2 = new Sphere(new Vector3(5, -1, -15), 2,
//                          new Material(new Vector3(0.9, 0.76, 0.46), 1, 0, new Vector3()));
// scene.add(sphere2);

// var sphere3 = new Sphere(new Vector3(5, 0, -25), 3,
//                          new Material(new Vector3(0.65, 0.77, 0.97), 1, 0, new Vector3()));
// scene.add(sphere3);

// var sphere4 = new Sphere(new Vector3(-5.5, 0, -15), 3,
//                          new Material(new Vector3(0.9, 0.9, 0.9), 1, 0, new Vector3()));
// scene.add(sphere4);

// bg light
var lightBG = new Sphere(
                new Vector3(0, 20, -30), // center
                3, // radius
                new Material(
                    new Vector3(), // color
                    0, // reflection
                    0, // transparency
                    new Vector3(0,0,0) // emissionColor (lights only)
                ) 
            );
scene.add(lightBG);


// main light
var light1 = new Sphere(
    new Vector3(0, 10, 10), // center
    1, // radius
    new Material(
        new Vector3(), // color
        0, // reflection
        0, // transparency
        new Vector3(1, 1, 1)
    )
);
scene.add(light1);

// -------------------------------
// -------------------------------
var backgroundColor = new Vector3(2.0, 2.0, 2.0);

// get canvas
var resultDiv = document.getElementById("resultDiv");
var canvas = document.getElementById("resultCanvas");
var ctx = canvas.getContext('2d');
var canvasWidth  = canvas.width;
var canvasHeight = canvas.height;

var startTime = Date.now();
var frameCount = 0;

// var create render planner
var bufferPieces = [];
var workerCount = 8;
var renderPlanner = new RenderPlanner(workerCount, scene, backgroundColor, canvasWidth, canvasHeight);
renderPlanner.onUpdateReceived = function(sectionStart, sectionHeight, buf8)
{
    // collect buffer for a single screen update
    bufferPieces.push({
        "buffer": buf8,
        "start": sectionStart,
        "height": sectionHeight
    });

    if(renderPlanner.isRunning() == false)
    {
        // rendering is completed update screen!
        for(var i=0; i<bufferPieces.length; i++) {
            var piece = bufferPieces[i];

            var imageData = ctx.getImageData(0, piece.start, canvasWidth, piece.height);
            imageData.data.set(piece.buffer);
            ctx.putImageData(imageData, 0, piece.start);
        }

        bufferPieces = [];

        // update scene data!
        setTimeout(function(){
            // light1.center = new Vector3(10*Math.sin(Date.now()/2000), 10, -30);
            // sphere1.center = new Vector3(0, 5*Math.sin(Date.now()/1000), -20);
            // sphere2.center = new Vector3(5, -1*Math.sin(Date.now()/500), -15);
            // sphere3.center = new Vector3(5, 6*Math.cos(Date.now()/1000), -25);
            // sphere4.center = new Vector3(-5.5, 3*Math.cos(Date.now()/1000), -15);

            // BEGIN CUSTOM CODE
            
            // SPHERE
            let sphereX = document.querySelector('#sphereX').value;
            let sphereY = document.querySelector('#sphereY').value;
            let sphereZ = document.querySelector('#sphereZ').value;
            let sphereRad = document.querySelector('#sphereRad').value;
            let sphereR = document.querySelector('#sphereR').value;
            let sphereG = document.querySelector('#sphereG').value;
            let sphereB= document.querySelector('#sphereB').value;
            // let sphereReflection = document.querySelector('#sphereReflection').value;
            // let sphereTransparency = document.querySelector('#sphereTransparency').value;
            sphere1.center = new Vector3(sphereX, sphereY, sphereZ);
            sphere1.radius = sphereRad;
            sphere1.radius2 = sphereRad*sphereRad;
            sphere1.material = new Material(new Vector3(sphereR,sphereG,sphereB), 1.0, 0.5, new Vector3());

            // LIGHT
            let lightX = document.querySelector('#lightX').value;
            let lightY = document.querySelector('#lightY').value;
            let lightZ = document.querySelector('#lightZ').value;
            // let lightRad = document.querySelector('#lightRad').value;
            let lightR = document.querySelector('#lightR').value;
            let lightG = document.querySelector('#lightG').value;
            let lightB= document.querySelector('#lightB').value;
            // let lightReflection = document.querySelector('#lightReflection').value;
            // let lightTransparency = document.querySelector('#lightTransparency').value;
            light1.center = new Vector3(lightX, lightY, lightZ);
            // light1.radius = lightRad;
            // light1.radius2 = lightRad*lightRad;
            light1.material = new Material(new Vector3(), 0, 0, new Vector3(lightR,lightG,lightB));

            // END CUSTOM CODE

            renderPlanner.updateScene();
            renderPlanner.start();

            frameCount++;
            var currentTime = Date.now();
            if(currentTime - startTime > 1000){
                resultDiv.innerHTML = "Worker Count: " + workerCount + " FPS = " + frameCount;
                startTime = currentTime;
                frameCount = 0;
            }
        },0);

    }
};

function startRendering() {
    // start
    renderPlanner.initialize();
    renderPlanner.start();
}

startRendering();