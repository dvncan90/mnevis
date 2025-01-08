
  gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  markers: true,
});
const canvas = document.querySelector("#page2>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

const frameCount = 241;
const currentFrame = (index) =>
  `https://kozarkar.github.io/heart-animation/image_${(index + 1)
    .toString()
    .padStart(4, "0")}.webp`;

const images = [];
const sequence = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(sequence, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.01,
    start: `10% top`,
    end: `1200% top`,
    trigger: "#page2",
  },
  onUpdate: render
});

images[0].onload = render;

function render() {
  scaleImage(images[sequence.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    images[sequence.frame],
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

ScrollTrigger.create({
  trigger: "#main",
  pin: true,
  start: `top top`,
  end: `1200% 100%`
});
