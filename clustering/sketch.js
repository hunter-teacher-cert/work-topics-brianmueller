let p; // variable to store perceptron object
let training = []; // array to store training data
let trainingData = 2000; // variable to set amount of training data
let count = 0; // counter to iterate through training data

function setup() {
  createCanvas(640, 320);
  // create perceptron object with 3 inputs
  p = new Perceptron(3);
  
  // generate training data
   for(let i = 0; i < trainingData; i++) {
     let x = random(-width/2,width/2);
     let y = random(-height/2, height/2);
     let answer = checkLine(y, f(x));
     // store each Trainer object in array
     training.push(new Trainer(x, y, answer))
   }
}

function draw() {
  background(220);
  
  translate(width/2, height/2);
  // stroke(255, 0, 0);
  // line(0, -height/2, 0, height/2);
  
  // train perceptron with training data
  p.train(training[count].inputs, training[count].answer);
  
  count = (count + 1) % training.length;
  for(let i = 0; i < count; i++){
    stroke(0);
    
    //store result of feedForward
    let guess = p.feedForward(training[i].inputs);
    if(guess > 0) {
      noFill()
    } else {
      fill(0);
    }
    ellipse(training[i].inputs[0], training[i].inputs[1], 8, 8);
  }
  
}

// funtion to generate line to classify training data
function f(x) {
  return 2*x+1;
}

// function to check if point is above or below line
function checkLine(y, yline){
  if(y < yline) {
    return -1;
  } else {
    return 1;
  }
}