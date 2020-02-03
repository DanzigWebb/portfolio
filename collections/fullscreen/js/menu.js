let mMenu = {
  btn: document.querySelector('.m-menu__btn'),
  content: document.querySelector('.main-wrap'),
  menu: document.querySelector('.m-menu'),
  isMob: false,

  init() {
    setTimeout(() => {
      this.open();
    }, 1400);
    this.resizeChecked();
    this.menuClickListener()
  },
  open() {
    this.menu.classList.toggle('active');
    this.content.classList.toggle('active');
    this.whiteClicked()
  },
  // liseners
  resizeChecked() {
    if (window.innerWidth < 768) this.isMob = true
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) this.isMob = true;
      else this.isMob = false;
    })
  },

  menuClickListener() {
    let links = this.menu.querySelectorAll('.m-menu__link');
    this.menu.addEventListener('click', (e) => {
      if (e.target == this.btn) {
        this.open();
      };
    });
    links.forEach(link => {
      link.addEventListener('click', () => {
        if(this.isMob) this.open();
      });
    });
  },
  whiteClicked() {
    if (this.menu.classList.contains('active') & this.isMob) {
      this.content.addEventListener('click', () => {
        this.menu.classList.remove('active');
        this.content.classList.remove('active');
      })
    }
  }

}

mMenu.init()