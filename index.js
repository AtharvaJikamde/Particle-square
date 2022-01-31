(function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    function Particle(x, y, radius, color, velocity, radian, circular) {
        Point2D.call(this, x, y);
        this.radius = radius;
        this.color = color;
        this.velocity = velocity || { x: 0, y: 0, radian: 0, circular: new Point2D(0, 0) };
        this.radian = radian;
        this.circular = circular || new Point2D(0, 0);
        this.defined = { x: x, y: y, radian: radian, circular: circular };
        this.max = randomIntFromRange(150, 300);
    }
    Particle.prototype = {
        draw: function () {
            c.fillStyle = this.color;
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, 2 * 3.14159, false);
            c.fill();
            c.closePath();
        },
        update: function () {
            this.x = this.defined.x + Math.cos(this.radian) * this.circular.x;
            this.y = this.defined.y + Math.sin(this.radian) * this.circular.y;
            this.radian += this.velocity.radian;
            this.circular.x += this.velocity.circular.x;
            this.circular.y += this.velocity.circular.y;
            if (this.circular.x > this.max || this.circular.x <= 0)
                this.velocity.circular.x = -this.velocity.circular.x;
            if (this.circular.y > this.max || this.circular.y <= 0)
                this.velocity.circular.y = -this.velocity.circular.y;
            this.draw();
        }
    };
    const canvas = document.createElement("canvas");
    const c = canvas.getContext("2d");
    const particles = [];
    const rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "voilet"];
    function randomFromRange(x, y) {
        return Math.random() * (y - x) + x;
    }
    function randomIntFromRange(x, y) {
        return Math.floor(randomFromRange(x, y));
    }
    function onResize() {
        particles.length = 0;
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        for (let index = 0; index < 200; index++) {
            const x = canvas.width / 2;
            const y = canvas.height / 2;
            const radius = randomIntFromRange(1, 3);
            const velocity = {
                x: 0,
                y: 0,
                radian: randomFromRange(0.001, 0.01),
                circular: new Point2D(2, 2)
            };
            const circular = new Point2D(1, 1);
            let radian = randomFromRange(0, 2 * 3.14159);
            particles.push(
                new Particle(x, y, radius, rainbowColors[randomIntFromRange(0, 7)], velocity, radian, circular)
            );
        }
    }
    function animate() {
        window.requestAnimationFrame(animate);
        c.fillStyle = "rgba(5, 5, 5, 0.05)";
        c.fillRect(0, 0, canvas.width, canvas.height);
        for (let index = 0; index < particles.length; index++) {
            const particle = particles[index];
            particle.update();
        }
    }
    onResize();
    animate();
    window.addEventListener("resize", onResize, false);
    // window.addEventListener("mousemove", function (e) {
    //     for (let index = 0; index < particles.length; index++) {
    //         const particle = particles[index];
    //         particle.defined.x = e.pageX;
    //         particle.defined.y = e.pageY;
    //     }
    // })
    document.body.insertBefore(canvas, document.body.childNodes[0]);
}).call(window);
