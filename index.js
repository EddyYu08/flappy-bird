var bird = {

  skyPosition: 0,
  skyStep: 2,
  birdTop: 220,
  birdStepY: 0,
  startColor: 'blue',
  startFlag: false,
  minTop: 0,
  maxTop: 570,
  init() {
    this.initData();
    this.animate();
    this.handle();
  },
  initData() {
    this.el = document.getElementById('game');
    this.oBird = this.el.getElementsByClassName('bird')[0];
    this.oStart = this.el.getElementsByClassName('start')[0];
    this.oScore = this.el.getElementsByClassName('score')[0];
    this.oMask = this.el.getElementsByClassName('mask')[0];
    this.oEnd = this.el.getElementsByClassName('end')[0];
  },
  animate() {
    var self = this;
    var count = 0;
    this.timer = setInterval(() => {
      count++;
      self.skyMove();
      if (++count % 10 === 0) {
        if (!self.startFlag) {
          self.birdJump();
          self.startBound();
        };
        self.birdFly(count);
      }
      if (self.startFlag) {
        self.birdDrop();
      }
    }, 30);
  },
  birdJump() {
    this.birdTop = this.birdTop === 220 ? 260 : 220;
    this.oBird.style.top = this.birdTop + 'px';
  },
  skyMove() {
    this.skyPosition -= this.skyStep;
    this.el.style.backgroundPositionX = this.skyPosition + 'px';
  },
  startBound() {
    var preColor = this.startColor;
    this.startColor = preColor === 'blue' ? 'white' : 'blue';
    this.oStart.classList.remove('start-' + preColor);
    this.oStart.add('start-' + this.startColor);
  },
  birdDrop() {
    this.birdTop += ++this.birdStepY;
    this.oBird.style.top = this.birdTop + 'px';
    this.judgeKnock();
  },
  birdFly(count) {
    this.oBird.style.backgroundPositionX = count % 3 * -30 + 'px';
  },
  judgeKnock() {
    this.judegBoundary();
    this.judgePipe();
  },
  judegBoundary() {
    if (this.birdTop < this.minTop || this.birdTop > this.maxTop) {
      this.failGame();
    }
  },
  judgePipe() {

  },
  handle() {
    this.handleStart();
  },
  handleStart() {
    var self = this;
    self.oStart.onclick = function () {
      self.startFlag = true;
      self.oBird.style.left = '80px';
      self.oStart.style.display = 'none';
      self.oScore.style.display = 'block';
      self.skyStep = 5;
    }
  },
  failGame() {
    clearInterval(this.timer);
    this.oMask.style.display = 'block';
    this.oEnd.style.display = 'block';
    this.oBird.style.display = 'none';
    this.oScore.style.display = 'none';
  }

};
bird.init();