
const items = document.querySelectorAll('.groud__item');
const toCenter = document.querySelectorAll('.to-center');
const bottle = document.querySelector('.bottle');
const gameElements = document.querySelector('.game__elements');

let circle = 360;
let part = circle / items.length;

let seriesOfAnim = 6 * circle;
let animDuration = 6;

let isAnim = false;
let attempts = 6; // количество попыток
// initialization

// проверка на кол-во попыток в localStorage 
if (localStorage.getItem('attempts') != null) {
  attempts = Number(localStorage.getItem('attempts'))
  let attemptsEl = document.querySelectorAll('.attempts')
  attemptsEl.forEach(el => {
    el.innerText = attempts
  })
}
if (attempts == 0) {
  document.querySelector('main').classList.add('remove')
  bottle.style.opacity = '0'
  document.querySelector('.no-spins').classList.add('active')
}
console.log(localStorage.getItem('attempts'))


createStyles()
init()
rotateBottle()

function init() { // позиционируем элементы по кругу
  const wrap = 1.6; // Размер "холста" для расположения картинок
  const radius = 2; // Радиус круга
  for (let i = 0; i < items.length; i++) {
    let f = 2 / items.length * i * Math.PI;
    let left = wrap + radius * Math.sin(f) + 'rem';
    let top = wrap + radius * Math.cos(f) + 'rem';
    items[i].style.left = left
    items[i].style.top = top;
  }
}


function rotateBottle() {
  let rotations = [];
  for (let i = 0; i < items.length; i++) {
    rotations.push(i)
  }
  bottle.addEventListener('click', function () {
    let lines = document.querySelector('.lines');
    lines.classList.add('active')
    if (!isAnim) {
      isAnim = true
      let random = Math.floor(Math.random() * rotations.length);

      circleToGirl(rotations[random]);
      items[rotations[random]].classList.add('to-center');
      rotations.splice(random, 1);

      setTimeout(() => {
        gameStart()
      }, animDuration * 1000);
    }
  })
}
function circleToGirl(j) {
  bottle.style.transform = `rotate(${-((j) * part) + seriesOfAnim}deg)`
}

function gameStart() {
  let count = 9;
  const countEl = gameElements.querySelector('.game__count span');
  countEl.innerText = count
  let counter = setInterval(() => {
    count--
    countEl.innerText = count
    if (count === 0) {
      clearInterval(counter)
      countEl.innerText = 9
      anotherRotate()
    }
  }, 1000);

  bottle.querySelector('img').style.opacity = '0';
  gameElements.style.display = 'block';

  const dismisListener = function () {
    clearInterval(counter)
    anotherRotate()
    dismisBtn.removeEventListener('click', dismisListener)
  }
  let dismisBtn = gameElements.querySelector('.game__btn--left')
  dismisBtn.addEventListener('click', dismisListener)
  let kissBtn = gameElements.querySelector('.game__btn--right')
  kissBtn.addEventListener('click', function () {
    clearInterval(counter)
    setKiss()
  })
}

function anotherRotate() { // крутим заново
  attemptsMinus() // уменьшаем количество доступных попыток на 1
  isAnim = false;
  items.forEach(item => {
    item.classList.remove('to-center')
  })
  gameElements.style.display = 'none';
  bottle.classList.add('return')
  bottle.style.transform = 'rotate(0)'
  bottle.style.transition = '0s'
  setTimeout(() => {
    bottle.querySelector('img').style.opacity = '1';
    bottle.style.transition = '5s'
  }, 100);
}

function setKiss() { // жмем "поцеловать"
  const gameHeader = gameElements.querySelector('.game__header');
  gameHeader.innerHTML = 'Will she kiss you <br> back?...';
  gameElements.querySelector('.game__control').style.visibility = 'hidden';
  let count = 9;
  gameElements.querySelector('.game__count span').innerText = count
  let counter = setInterval(() => {
    gameElements.querySelector('.game__count span').innerText = count
    count--
    if (count == 1) {
      clearInterval(counter)
      let totalContent = document.querySelector('.total__content');
      totalContent.classList.add('active')
      document.querySelector('.accention').classList.add('active')
    }
  }, 1000);
  // создаем икоку на фотке
  setTimeout(() => {
    (function () {
      let img = document.createElement('img');
      img.src = 'img/medKiss.png';
      img.classList.add('media-kiss');
      items.forEach(item => {
        if (item.classList.contains('to-center')) {
          item.appendChild(img)
        }
      });
    })();
  }, 200);
}

function attemptsMinus() { // уменьшаем кол-во попыток
  attempts <= 0 ? attempts = 0 : attempts--
  localStorage.setItem('attempts', attempts)
  let attemptsEl = document.querySelectorAll('.attempts')
  attemptsEl.forEach(el => {
    el.innerText = attempts
  })
  if (attempts === 0) {
    document.querySelector('main').classList.add('remove')
    bottle.style.opacity = '0'
    document.querySelector('.no-spins').classList.add('active')
  }
}



function createStyles() {
  const styles = `.to-center {position: absolute;left: 60% !important;top: 50% !important;-webkit-transform: translateY(-50%) translateX(-50%);transform: translateY(-50%) translateX(-50%);-webkit-transition-delay: ${animDuration}s;transition-delay: ${animDuration}s}`
  let styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}

