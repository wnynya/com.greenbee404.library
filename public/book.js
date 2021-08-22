"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function () {
  function Book(object) {
    var _this2 = this;

    _classCallCheck(this, Book);

    setTimeout(function () {
      document.querySelector(".cover").classList.add("opa0");
    }, 100);

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

    this.e.pageright.addEventListener("click", function (event) {
      _this2.flip("next");
    });
    this.e.pageleft.addEventListener("click", function (event) {
      _this2.flip("prev");
    });

    this.lastrange = 0;
    this.e.range.addEventListener("change", function (event) {
      _this2.flip("goto", _this2.e.range.value);
    });

    this.keytime = 0;

    document.addEventListener("keydown", function (event) {
      var key = event.key;
      if (new Date().getTime() - _this2.keytime < 750) {
        return;
      }
      switch (key) {
        case "ArrowRight":
          {
            _this2.keytime = new Date().getTime();
            _this2.flip("next");
            break;
          }
        case "ArrowLeft":
          {
            _this2.keytime = new Date().getTime();
            _this2.flip("prev");
            break;
          }
      }
    });
  }

  _createClass(Book, [{
    key: "loadImage",
    value: function loadImage(page) {
      return;
      var div = document.createElement("div");
      div.style.backgroundImage = "url(" + this.imageDir + page + "." + this.imageExt + ")";
      this.e.loaded.appendChild(div);
    }

    // 맨 앞 페이지

  }, {
    key: "frontCover",
    value: function frontCover() {
      this.loadImage(this.page.right);
      var _this = this;
      setTimeout(function () {
        _this.e.flipleft.classList.remove("opa0");
        _this.e.flips.classList.add("torightmid");
        _this.e.flipleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.lastpage.left + "." + _this.imageExt + ")";
        _this.e.pageleft.classList.add("opa0");
      }, 0);
      setTimeout(function () {
        _this.e.flips.classList.remove("torightmid");
        _this.e.flips.classList.add("torightend");
        _this.e.flipleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
      }, this.fliptime / 2);
      setTimeout(function () {
        _this.e.flips.classList.remove("torightend");
        _this.e.flipleft.classList.add("opa0");
        _this.e.pagerightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
        _this.e.pageright.classList.remove("opa0");
      }, this.fliptime);
    }

    // 다음 페이지 (책 중간)

  }, {
    key: "nextPage",
    value: function nextPage() {
      this.loadImage(this.page.left);
      this.loadImage(this.page.right);
      var _this = this;
      setTimeout(function () {
        _this.e.flipright.classList.remove("opa0");
        _this.e.flips.classList.add("toleftmid");
        _this.e.fliprightimage.style.backgroundImage = "url(" + _this.imageDir + _this.lastpage.right + "." + _this.imageExt + ")";
        _this.e.pagerightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
      }, 0);
      setTimeout(function () {
        _this.e.flips.classList.remove("toleftmid");
        _this.e.flips.classList.add("toleftend");
        _this.e.fliprightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
      }, this.fliptime / 2);
      setTimeout(function () {
        _this.e.flips.classList.remove("toleftend");
        _this.e.flipright.classList.add("opa0");
        _this.e.pageleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
        _this.e.pageleft.classList.remove("opa0");
      }, this.fliptime);
    }

    // 이전 페이지 (책 중간)

  }, {
    key: "prevPage",
    value: function prevPage() {
      this.loadImage(this.page.left);
      this.loadImage(this.page.right);
      var _this = this;
      setTimeout(function () {
        _this.e.flipleft.classList.remove("opa0");
        _this.e.flips.classList.add("torightmid");
        _this.e.flipleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.lastpage.left + "." + _this.imageExt + ")";
        _this.e.pageleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
      }, 0);
      setTimeout(function () {
        _this.e.flips.classList.remove("torightmid");
        _this.e.flips.classList.add("torightend");
        _this.e.flipleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
      }, this.fliptime / 2);
      setTimeout(function () {
        _this.e.flips.classList.remove("torightend");
        _this.e.flipleft.classList.add("opa0");
        _this.e.pagerightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.right + "." + _this.imageExt + ")";
        _this.e.pageright.classList.remove("opa0");
      }, this.fliptime);
    }

    // 맨 뒤 페이지

  }, {
    key: "backCover",
    value: function backCover() {
      this.loadImage(this.page.left);
      var _this = this;
      setTimeout(function () {
        _this.e.flipright.classList.remove("opa0");
        _this.e.flips.classList.add("toleftmid");
        _this.e.fliprightimage.style.backgroundImage = "url(" + _this.imageDir + _this.lastpage.right + "." + _this.imageExt + ")";
        _this.e.pageright.classList.add("opa0");
      }, 0);
      setTimeout(function () {
        _this.e.flips.classList.remove("toleftmid");
        _this.e.flips.classList.add("toleftend");
        _this.e.fliprightimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
      }, this.fliptime / 2);
      setTimeout(function () {
        _this.e.flips.classList.remove("toleftend");
        _this.e.flipright.classList.add("opa0");
        _this.e.pageleftimage.style.backgroundImage = "url(" + _this.imageDir + _this.page.left + "." + _this.imageExt + ")";
        _this.e.pageleft.classList.remove("opa0");
      }, this.fliptime);
    }

    // 책장 넘기기

  }, {
    key: "flip",
    value: function flip(direction, n) {

      /**
       * direction: "next", "prev", "goto"
       * next: 다음 페이지 한장
       * prev: 이전 페이지 한장
       * goto: n 번 페이지로 이동
       */
      switch (direction) {

        case "goto":
          {
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
            } else {
              this.page.left = n - 1;
              this.page.right = n;
            }

            if (this.lastpage.left < this.page.left) {
              if (this.page.right - 1 == this.pages) {
                this.backCover();
              } else {
                this.nextPage();
              }
            } else if (this.lastpage.left > this.page.left) {
              if (this.page.left + 1 == 1) {
                this.frontCover();
              } else {
                this.prevPage();
              }
            }

            this.lastrange = this.page.left;

            break;
          }

        case "next":
          {
            this.flip("goto", this.page.left + 2);
            break;
          }

        case "prev":
          {
            this.flip("goto", this.page.right - 2);
            break;
          }

      }

      this.e.range.value = this.page.left;
    }
  }]);

  return Book;
}();