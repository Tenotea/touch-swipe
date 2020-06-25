const imBox = document.querySelector('.images')
const Trackers = document.querySelector('.trackers')

// Create start position
let stPos = 0

// Create mouse down watcher
let mouseDown = false
let touchDown = false

// Initialize coordinates
let x1;
let x2;

// Get Number of child element
let imgBoxChildren = imBox.childElementCount

// Create correspomnding trackers
for (let t = 1; t <= imgBoxChildren; t++){
  let newTracker = document.createElement('div')
  newTracker.setAttribute('class', 'tracker')
  Trackers.appendChild(newTracker)
}

// Grab all tracker (including the created ones)
const trackers = document.querySelectorAll('.tracker')

//Collate current view and sizing data
let completeImageBoxSize = 100 * imgBoxChildren
let individualChildPercent = 100 / imgBoxChildren
let limitValue = (imgBoxChildren-1)*individualChildPercent
let individualChildWidth = imBox.getBoundingClientRect().width/imgBoxChildren

console.log(limitValue);

// let currentPosition = 0;
// setInterval( ()=> {
//   currentPosition -= individualChildPercent
//   if(currentPosition < -limitValue) return;
//   imBox.style.transform = `translateX(${currentPosition}%)`
// }, 2000)

// Create transform function
let transform = ()=>{
  imBox.style.transform = `translateX(${stPos}%)`
}

let transformOnMove = (tom)=>{
  imBox.style.transform = `translateX(-${tom}px)`
}


function slideLeft(){
  if(stPos == (-limitValue)) return
  stPos -= individualChildPercent
  transform()
}

function slideRight(){
  if(stPos == 0) return
  stPos += individualChildPercent
  transform()
}

imBox.addEventListener('mousedown', (e)=>{
  console.log('mouse down')
  mouseDown = true
  x1 = e.clientX
})

imBox.addEventListener('touchstart', e => {
  touchDown = true
  x1 = e.changedTouches[0].clientX
})

imBox.addEventListener('mouseup', (e)=>{
  console.log('mouse up');
  mouseDown = false
  x2 = e.clientX
  if(x2 - x1 > 200 ){
    slideRight()
  }
  if(x1 - x2 > 200){
    slideLeft()
  }
})

imBox.addEventListener('touchend', (e)=>{
  x2 = e.changedTouches[0].clientX
  if(x2 - x1 > 200 ){
    slideRight()
  }
  if(x1 - x2 > 200){
    slideLeft()
  }
})

imBox.addEventListener('mousemove', (e)=>{
  if (mouseDown) {
    if(e.clientX < 300 || e.clientX > 800) return
    let moveFrom = stPos == 0 ? 0+1 : (-stPos/individualChildPercent)+1
    let variableTransformValue = (individualChildWidth*moveFrom) - e.clientX
    console.log(variableTransformValue);
    if(moveFrom >= 5) return
    transformOnMove(variableTransformValue)
  }
})

imBox.addEventListener('touchmove', (e)=>{
  if (touchDown) {
    let moveFrom = stPos == 0 ? 0+1 : (-stPos/individualChildPercent)+1
    let variableTransformValue = (individualChildWidth*moveFrom) - e.changedTouches[0].clientX
    if(moveFrom >= 5) return
    transformOnMove(variableTransformValue)
  }
})
