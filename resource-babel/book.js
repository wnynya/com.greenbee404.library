class Book {

  constructor(object) {

    setTimeout(() => {
      document.querySelector(".cover").classList.add("opa0");
    },100);

    this.imageDir = object.imageDirectory;
    this.imageExt = object.imageExtension;

    this.pages = object.pages;
    this.page = new Object();
    this.page.left = 0;
    this.page.right = 1;
    this.lastpage = new Object();
    this.lastpage.left = 0;
    this.lastpage.right = 1;

    this.element = new Object();
    this.element.book = document.querySelector(".book");
    this.element.pages = document.querySelector(".pages");
    this.element.flips = document.querySelector(".flips");
    this.element.pageleft = document.querySelector(".pages .leftpage");
    this.element.pageright = document.querySelector(".pages .rightpage");
    this.element.flipleft = document.querySelector(".flips .leftpage");
    this.element.flipright = document.querySelector(".flips .rightpage");
    this.element.pageleftimage = document.querySelector(".pages .leftpage .image");
    this.element.pagerightimage = document.querySelector(".pages .rightpage .image");
    this.element.flipleftimage = document.querySelector(".flips .leftpage .image");
    this.element.fliprightimage = document.querySelector(".flips .rightpage .image");
    this.element.loaded = document.querySelector(".loaded");
    this.element.range = document.querySelector("#range-page");

    this.e = this.element;

    this.fliptime = 500;

    this.e.pageleft.classList.add("opa0");
    this.e.pagerightimage.style.backgroundImage = "url(" + this.imageDir + this.page.right + "." + this.imageExt + ")";

    this.e.range.setAttribute("max", this.pages);

    var _this = this;
    this.e.pageright.addEventListener("click", (event) => {
      this.flip("next");
    });
    this.e.pageleft.addEventListener("click", (event) => {
      this.flip("prev");
    });

    this.lastrange = 0;
    this.e.range.addEventListener("change", (event) => {
      this.flip("goto", this.e.range.value);
    });

    this.keytime = 0;

    document.addEventListener("keydown", (event) => {
      var key = event.key;
      if (new Date().getTime() - this.keytime < 750) {
        return;
      }
      switch(key) {
        case "ArrowRight": {
          this.keytime = new Date().getTime();
          this.flip("next");
          break;
        }
        case "ArrowLeft": {
          this.keytime = new Date().getTime();
          this.flip("prev");
          break;
        }
      }
    });

  }

  loadImage(page) {
    return;
    var div = document.createElement("div");
    div.style.backgroundImage = "url(" + this.imageDir + page + "." + this.imageExt + ")";
    this.e.loaded.appendChild(div);
  }

  frontCover() {
    this.loadImage(this.page.right);
    var _this = this;
    setTimeout(() => {
      _this.e.flipleft.classList.remove("opa0");
      _this.e.flips.classList.add("torightmid");
      _this.e.flipleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.lastpage.left + "." + _this.imageExt + ")";
      _this.e.pageleft.classList.add("opa0");
    }, 0);
    setTimeout(() => {
      _this.e.flips.classList.remove("torightmid");
      _this.e.flips.classList.add("torightend");
      _this.e.flipleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
    }, this.fliptime / 2);
    setTimeout(() => {
      _this.e.flips.classList.remove("torightend");
      _this.e.flipleft.classList.add("opa0");
      _this.e.pagerightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
      _this.e.pageright.classList.remove("opa0");
    }, this.fliptime);
  }

  nextPage() {
    this.loadImage(this.page.left);
    this.loadImage(this.page.right);
    var _this = this;
    setTimeout(() => {
      _this.e.flipright.classList.remove("opa0");
      _this.e.flips.classList.add("toleftmid");
      _this.e.fliprightimage.style.backgroundImage = "url(" + _this.imageDir + _this.lastpage.right + "." + _this.imageExt + ")";
      _this.e.pagerightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
    }, 0);
    setTimeout(() => {
      _this.e.flips.classList.remove("toleftmid");
      _this.e.flips.classList.add("toleftend");
      _this.e.fliprightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
    }, this.fliptime / 2);
    setTimeout(() => {
      _this.e.flips.classList.remove("toleftend");
      _this.e.flipright.classList.add("opa0");
      _this.e.pageleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
      _this.e.pageleft.classList.remove("opa0");
    }, this.fliptime);
  }

  prevPage() {
    this.loadImage(this.page.left);
    this.loadImage(this.page.right);
    var _this = this;
    setTimeout(() => {
      _this.e.flipleft.classList.remove("opa0");
      _this.e.flips.classList.add("torightmid");
      _this.e.flipleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.lastpage.left + "." + _this.imageExt + ")";
      _this.e.pageleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
    }, 0);
    setTimeout(() => {
      _this.e.flips.classList.remove("torightmid");
      _this.e.flips.classList.add("torightend");
      _this.e.flipleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
    }, this.fliptime / 2);
    setTimeout(() => {
      _this.e.flips.classList.remove("torightend");
      _this.e.flipleft.classList.add("opa0");
      _this.e.pagerightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
      _this.e.pageright.classList.remove("opa0");
    }, this.fliptime);
  }

  backCover() {
    this.loadImage(this.page.left);
    var _this = this;
    setTimeout(() => {
      _this.e.flipright.classList.remove("opa0");
      _this.e.flips.classList.add("toleftmid");
      _this.e.fliprightimage.style.backgroundImage = "url(" + _this.imageDir + _this.lastpage.right + "." + _this.imageExt + ")";
      _this.e.pageright.classList.add("opa0");
    }, 0);
    setTimeout(() => {
      _this.e.flips.classList.remove("toleftmid");
      _this.e.flips.classList.add("toleftend");
      _this.e.fliprightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
    }, this.fliptime / 2);
    setTimeout(() => {
      _this.e.flips.classList.remove("toleftend");
      _this.e.flipright.classList.add("opa0");
      _this.e.pageleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
      _this.e.pageleft.classList.remove("opa0");
    }, this.fliptime);
  }

  flip (direction, n) {

    switch (direction) {

      case "next": {
        if (this.page.left >= this.pages) {
          return;
        }
        this.lastpage.left = this.page.left;
        this.lastpage.right = this.page.right;
        this.page.left += 2;
        this.page.right += 2;
        if (this.page.right - 1 == this.pages) {
          this.backCover();
        }
        else {
          this.nextPage();
        }
        break;
      }
  
      case "prev": {
        if (this.page.right <= 1) {
          return;
        }
        this.lastpage.left = this.page.left;
        this.lastpage.right = this.page.right;
        this.page.left -= 2;
        this.page.right -= 2;
        if (this.page.left + 1 == 1) {
          this.frontCover();
        }
        else {
          this.prevPage();
        }
        break;
      }

      case "goto": {
        n = n * 1;
        if (n < 0) {
          return;
        }
        if (n > this.pages) {
          return;
        }
        this.lastpage.left = this.page.left;
        this.lastpage.right = this.page.right;
        if (n % 2 == 0) {
          this.page.left = n;
          this.page.right = n + 1;
        }
        else {
          this.page.left = n - 1;
          this.page.right = n;
        }
        if (this.lastpage.left < this.page.left) {
          if (this.page.right - 1 == this.pages) {
            this.backCover();
          }
          else {
            this.nextPage();
          }
        }
        else if (this.lastpage.left > this.page.left) {
          if (this.page.left + 1 == 1) {
            this.frontCover();
          }
          else {
            this.prevPage();
          }
        }


        this.lastrange = this.page.left;

        break;
      }
  
  
    }

    this.e.range.value = this.page.left;

  }

}