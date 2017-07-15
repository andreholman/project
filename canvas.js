// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

console.log("w="+canvas.width)
console.log("h="+canvas.height)

// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

var colors = [
	'#2185C5',
	'#7ECEFD',
	// '#2C3E50',  used for bg
	'#FFF6E5',
	'#FF7F66'
];

var gravity = 1;
var friction = 80; // 100 = infinite bouncing - can be described as bounciness
var bounce = false;
var balls = []; // Array of balls
var count = Math.round(canvas.width / 10.75) // Number of balls to push to array

// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;

	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Ball(x, y, dy, dx, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy * friction/100;
			bounce = true;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius + this.dx > canvas.width) {
			this.dx = -this.dx;
		}

		if (this.x - this.radius + this.dx < 0) {
			this.dx = -this.dx;
		}

		this.x += this.dx;
		this.y += this.dy;

		bounce = false;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}


// Implementation
function init() {
	balls = [];
	var count = Math.round(canvas.width / 10.75)
	for (var i = 0; i < count; i++) {
		var radius = randomIntFromRange(10, 20);
		var x = randomIntFromRange(radius, canvas.width - radius);
		var y = randomIntFromRange(0-(canvas.height/2), canvas.height/2); // Place balls high enough to bounce a good amount
		var startvelocity = 0 + (Math.random()*3);
		var dx = (Math.random() * 10) - 5;
		balls.push(new Ball(x, y, startvelocity, dx, radius, randomColor(colors)))
	}
}
// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	// EVERYTHING UNDER HERE GETS SHOWN
	for (var i = 0; i < balls.length; i++) {
		balls[i].update();
	}
}

init();
animate();
console.log("ready")