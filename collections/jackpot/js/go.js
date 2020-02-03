window.onload = () => {
  generateLamps(); // генерация лампочек
  document.addEventListener('mousemove', parallax);
  if (document.body.scrollWidth < 481) fixedHeight();
};

const generateLamps = () => {
  const inner = document.querySelector('.main__table');
  const navigate = ['top', 'right', 'bot', 'left'];
  const validNumOfImages = (index) => navigate[index] === 'left' || navigate[index] === 'right' ? 10 : 6;
  let navigateCount = 0;
  let lampsCount = 0;
  const generateLapsContent = () => {
    switch (navigateCount) {
      case 0:
        generateLine(validNumOfImages(navigateCount), navigate[navigateCount]);
      case 1:
        generateLine(validNumOfImages(navigateCount), navigate[navigateCount]);
      case 2:
        generateLine(validNumOfImages(navigateCount), navigate[navigateCount]);
      case 3:
        generateLine(validNumOfImages(navigateCount), navigate[navigateCount]);
      default:
        break;
    };
  };
  const generateLine = (num, className) => {
    const lapsLine = document.createElement('div');
    lapsLine.classList.add('laps');
    lapsLine.classList.add(className);
    let count = 0;
    while (count < num) {
      const lamp = document.createElement('img');
      lamp.src = 'img/lamp.png';
      lamp.classList.add('lamp');
      lamp.setAttribute('data-index', lampsCount)
      lapsLine.appendChild(lamp);
      count += 1;
      lampsCount += 1;
    };
    inner.appendChild(lapsLine);
    navigateCount += 1;
  };
  generateLapsContent();
};

const parallax = (e) => {
  let parallaxOffsetX = e.clientX;
  let parallaxOffsetY = e.clientY;
  const layers = document.querySelectorAll('.money__wrapper');
  layers.forEach(item => {
    const layerSpeed = item.getAttribute('data-number');
    item.style.transform = `translate3d(${parallaxOffsetX / layerSpeed}px, ${parallaxOffsetY / layerSpeed}px, 0)`
  });
}

const fixedHeight = () => {
  setInterval(() => {
    document.querySelector('.main').style.height = window.innerHeight + 'px'
  }, 200);
}

