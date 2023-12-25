class Particle {
  constructor() {
    this.x = Math.random() * c.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random();
    this.positionX = Math.floor(this.x);
    this.positionY = Math.floor(this.y);
  }
  update() {
    this.positionX = Math.floor(this.x);
    this.positionY = Math.floor(this.y);
    this.speed = mappedImage[this.positionY][this.positionX];

    // for black point max speed
    let mvt = 2.5 - this.speed + this.velocity;

    this.y += mvt;
    if (this.y >= c.height) {
      this.y = 0;
      this.x = Math.random() * c.width;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}
