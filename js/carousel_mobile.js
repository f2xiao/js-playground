window.addEventListener("load", function () {
  const focus = document.querySelector(".focus");
  const ul = focus.querySelector("ul");
  const ol = focus.querySelector("ol");
  let index = 0;

  const w = focus.offsetWidth;
  console.log(w);
  // 1. set a timer so the pic slides every 2s
  let timer = setInterval(function () {
    index++;
    let translate_x = -index * w;
    ul.style.transition = "all 0.3s";
    ul.style.transform = `translateX(${translate_x}px)`;
  }, 2000);

  // 2. seamless carousel effects
  ul.addEventListener("transitionend", function () {
    if (index >= 3) {
      index = 0;
      ul.style.transition = "none";
      translate_x = -index * w;
      ul.style.transform = `translateX(${translate_x}px)`;
    } else if (index < 0) {
      index = 2;
      ul.style.transition = "none";
      translate_x = -index * w;
      ul.style.transform = `translateX(${translate_x}px)`;
    }
    // 3. the indicator's style changes as well
    ol.querySelector(".current").classList.remove("current");
    ol.children[index].classList.add("current");

    //4. drag the pic
    // when touchstart, get the start x position
    // when touchmove, get the end x position
    let startX = 0;
    let moveX = 0;
    let flag = false;
    ul.addEventListener("touchstart", function (e) {
      startX = e.targetTouches[0].pageX;
      clearInterval(timer);
    });
    ul.addEventListener("touchmove", function (e) {
      moveX = e.targetTouches[0].pageX - startX;
      translate_x = -index * w + moveX;
      ul.style.transition = "none";
      ul.style.transform = `translateX(${translate_x}px)`;
      flag = true;
      e.preventDefault();
    });
    // when touchend, set the pic according to the distance dragged
    // if drags to the right, go to the previous pix
    // if drags to the left, go to the next pic
    ul.addEventListener("touchend", function () {
      if (flag == true) {
        if (Math.abs(moveX) > 50) {
          if (moveX > 0) {
            index--;
          } else if (moveX < 0) {
            index++;
          }
          console.log(index);
          ul.style.transition = "all 0.3s";
          translate_x = -index * w;
          ul.style.transform = `translateX(${translate_x}px)`;
        } else {
          ul.style.transition = "all 0.1s";
          translate_x = -index * w;
          ul.style.transform = `translateX(${translate_x}px)`;
        }
      }
      clearInterval(timer);
      timer = setInterval(function () {
        index++;
        let translate_x = -index * w;
        ul.style.transition = "all 0.3s";
        ul.style.transform = `translateX(${translate_x}px)`;
      }, 2000);
    });
  });
});
