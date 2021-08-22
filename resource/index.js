
var bookdata = {
  "book-censura-librorum": {
    title: "CENSURA LIBRORUM",
    bg: "rgb(0,0,255)",
    fg: "white"
  },
  "book-how-to-be-a-detective": {
    title: "명탐정을 꿈꾸는 당신이 알아야 할 것",
    bg: "black",
    fg: "white"
  },
  "book-taste-of-x": {
    title: "Taste of x",
    bg: "rgb(0,0,255)",
    fg: "yellow"
  },
  "book-the-things-that-make-lyric-poetry-summer": {
    title: "여름 - the things that make lyric poetry",
    bg: "#D7DADD",
    fg: "rgb(0,0,255)"
  },
  "book-the-things-that-make-lyric-poetry-winter": {
    title: "겨울 - the things that make lyric poetry",
    bg: "#F0EAEA",
    fg: "rgb(0,0,255)"
  },
  "book-web-prison": {
    title: "WEB Prison",
    bg: "rgb(0,0,255)",
    fg: "white"
  }
};

function gotoBook(id) {
  var i = id.replace(/^book-/, "");
  var url = "https://library.greenbee404.com/" + i;
  document.querySelector(".goto").style.pointerEvents = "all";
  document.querySelector(".header").classList.add("opa0");
  document.querySelector(".gradient").classList.add("opa0");
  document.querySelector(".books").classList.add("opa0");
  document.querySelector("body").style.backgroundColor = bookdata[id].bg;
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector(".goto .image img").src = document.querySelector("#" + id + " .cover img").src;
  document.querySelector(".goto .title h1").innerHTML = bookdata[id].title;
  document.querySelector(".goto .title h1").style.color = bookdata[id].fg;
  document.querySelector(".goto").classList.remove("opa0");
  setTimeout(() => {
    document.querySelector(".goto").classList.add("opa0");
  }, 1500);
  setTimeout(() => {
    window.location.href = url;
  }, 2000);
}

for (var book of document.querySelectorAll(".books .book")) {
  book.addEventListener("click", event => {
    var target = event.target;
    while (!target.classList.contains("book")) {
      target = target.parentElement;
    }
    var id = target.id;
    console.log(id);
    gotoBook(id);
  });
}