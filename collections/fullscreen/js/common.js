const vertSlider = {
	content: document.querySelector('.main-wrap'),
	step: document.querySelector('.msect').scrollHeight,
	count: 0,
	fix: true,
	init() {
		this.touchController();
		this.dots.dotListener();
		window.addEventListener('wheel', (e) => {
			if (e.deltaY > 0 & this.fix) {
				this.scrollBot();
			}
			if (e.deltaY < 0 & this.fix) {
				this.scrollTop();
			}
		})
	},
	// methods
	scrollBot() {
		if (this.count == 3) {
			return false
		} else {
			this.fix = false;
			this.count += 1;
			this.content.style.transform = `translateY(-${this.step * this.count}px)`;
			setTimeout(() => this.fix = true, 600);
			this.dots.dotsChecked();
		}
	},
	scrollTop() {
		if (this.count == 0) {
			return false
		} else {
			this.fix = false;
			this.count -= 1;
			this.content.style.transform = `translateY(-${this.step * this.count}px)`;
			setTimeout(() => this.fix = true, 600);
			this.dots.dotsChecked();
		}
	},
	// listeners
	touchController() {
		let initialPoint;
		let finalPoint;
		document.addEventListener('touchstart', (event) => {
			initialPoint = event.changedTouches[0];
		}, false);
		document.addEventListener('touchend', (event) => {
			finalPoint = event.changedTouches[0];
			let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
			let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
			if (xAbs > 20 || yAbs > 20) {
				if (finalPoint.pageY < initialPoint.pageY) {
					/*СВАЙП ВВЕРХ*/
					this.scrollBot()
				}
				else {
					/*СВАЙП ВНИЗ*/
					this.scrollTop()
				}
			}
		}, false);
	},
	// dots
	dots: {
		dot: document.querySelectorAll('.msect-dot'),
		dotsChecked() {
			this.dot.forEach(item => {
				item.classList.remove('active')
			});
			this.dot[vertSlider.count].classList.add('active')
		},
		// clicks
		dotListener() {
			this.dot.forEach((item, i) => {
				item.addEventListener('click', () => {
					vertSlider.count = i;
					vertSlider.content.style.transform = `translateY(-${vertSlider.step * vertSlider.count}px)`;
					setTimeout(() => vertSlider.fix = true, 600);
					this.dotsChecked()
				})
			})
		}
	}
}
vertSlider.init()


