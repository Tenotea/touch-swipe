const imBox = document.querySelector('.images');
const trackers = document.querySelectorAll('.tracker');
let p = 0;
let xP1 = 0;
let xP2 = 0;
let xm1 = 0;
let xm2 = 0;

function clearBackground(s){
  s.forEach( t => {
    t.style.backgroundColor = 'white'
  })
}

function transform(){
  imBox.style.transform = 'translateX(' + p + '%)'
}

function setPosition(){
  clearBackground(trackers)
  let tp = p == 0 ? 0 : p/-20
  trackers[tp].style.backgroundColor = '#3d3d3d'
}

function slideBack(){
  if(p == 0) return
  p+=20;
 transform()
}

function slideFront(){
  if(p == -80) return
  p-=20;
 transform()
}

imBox.addEventListener('mousedown', (e)=>{
  xP1 = e.clientX
})

imBox.addEventListener('mouseup', (e)=>{
  xP2 = e.clientX
  setPosition()
  if(xP2 - xP1 > 50){
    slideBack()
  }
  if(xP2 - xP1 < -50){
    slideFront()
  }
  setPosition()
})

imBox.addEventListener('touchstart', (e)=> {
  xm1 = e.changedTouches[0].clientX
})

imBox.addEventListener('touchend', (e)=> {
  xm2 = e.changedTouches[0].clientX
  if(xm2 - xm1 > 50){
    slideBack()
  }
  if(xm2 - xm1 < -50){
    slideFront()
  }
  setPosition()
})

document.addEventListener('keyup', (e) => {
  if(e.key === 'ArrowRight'){
    slideFront()
  }
  if(e.key === 'ArrowLeft'){
    slideBack()
  }
  setPosition()
})

trackers.forEach( (tracker, i) => {
  tracker.addEventListener('click', e =>{
    clearBackground(trackers)
    tracker.style.backgroundColor = '#3d3d3d'
    p = -20*i
    transform()
  })
})
