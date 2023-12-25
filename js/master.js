const c = document.getElementById("my-canvas");
const ctx = c.getContext("2d");
let mappedImage = [];
window.addEventListener("load", () => {
  c.width = 426;
  c.height = 640;

  let particlesArray = [];
  const numberOfParticles = 5000;

  ctx.drawImage(myImage, 0, 0, c.width, c.height);
  let pixels = ctx.getImageData(0, 0, c.width, c.height);
  ctx.clearRect(0, 0, c.width, c.height);

  for (let y = 0; y < c.height; y++) {
    let row = [];
    for (let x = 0; x < c.width; x++) {
      const red = pixels.data[y * 4 * c.width + x * 4];
      const green = pixels.data[y * 4 * c.width + x * 4 + 1];
      const blue = pixels.data[y * 4 * c.width + x * 4 + 2];
      const cell = calculateRelativeBrightness(red, green, blue);
      row.push(cell);
    }
    mappedImage.push(row);
  }

  function calculateRelativeBrightness(red, green, blue) {
    return (
      Math.sqrt(
        red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
      ) / 100
    );
  }

  function init() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  init();

  function handleParticles() {
    particlesArray.forEach((e) => {
      e.update();
      ctx.globalAlpha = e.speed * 0.5;
      e.draw();
    });
  }

  function animate() {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalAlpha = 0.2;
    handleParticles();
    requestAnimationFrame(animate);
  }
  animate();
});
