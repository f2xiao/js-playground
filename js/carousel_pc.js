window.addEventListener("load", function () {
  const box = document.querySelector(".box");
  const boxWidth = box.offsetWidth;
  const ul = box.querySelector("ul");
  const lis = ul.querySelector("li");
  const arrow_r = box.querySelector(".arrow-r");
  const arrow_l = box.querySelector(".arrow-l");
  //1. when mouseenter the box, show the arrows; when mouseleave, hide the arrows
  box.addEventListener("mouseenter", function () {
    arrow_r.style.display = "block";
    arrow_l.style.display = "block";
  });
  box.addEventListener("mouseleave", function () {
    arrow_r.style.display = "none";
    arrow_l.style.display = "none";
  });
  //2. Dynamically add the circles according to the numbers of pics
  const circles = box.querySelector(".circles");
  for (let i = 0; i < ul.children.length; i++) {
    const li = document.createElement("li");
    circles.appendChild(li);
    li.setAttribute("data", i);
    //4. When click on the circle, slide to the pic with the same number
    li.addEventListener("click", function () {
      for (let i = 0; i < circles.children.length; i++) {
        circles.children[i].className = "";
      }
      li.className = "current";
      animate(ul, -li.getAttribute("data") * boxWidth);
    });
  }
  //set the first circle with class current
  circles.children[0].className = "current";

  ul.appendChild(ul.children[0].cloneNode(true));
  let num = 0;
  let circle = 0;
  function changeCircle() {
    for (let i = 0; i < circles.children.length; i++) {
      // i < 5
      circles.children[i].className = "";
    }
    circles.children[circle].className = "current";
  }
  console.log(ul.children.length);
  //5.when click the right arrow, shows the next pic
  arrow_r.addEventListener("click", function () {
    if (num == ul.children.length - 1) {
      // num = 4
      num = 0;
      ul.style.left = 0;
    }
    num++; // num = 0 initially, after clicking, num increments to 1,2,3,4
    animate(ul, -num * boxWidth);
    circle++;
    if (circle == circles.children.length) {
      circle = 0;
    }
    changeCircle();
  });

  //6. when click the left arrow, show the previous pic
  arrow_l.addEventListener("click", function () {
    if (num == 0) {
      // num = 4
      num = ul.children.length - 1;
      ul.style.left = -num * boxWidth + "px";
    }
    num--; // num = 0 initially, after clicking, num increments to 1,2,3,4
    animate(ul, -num * boxWidth);
    circle--;
    if (circle < 0) {
      circle = circles.children.length - 1;
    }
    changeCircle();
  });
});
