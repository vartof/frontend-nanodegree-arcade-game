/*
 * This file contains the functionality specific to our game
 *
 * Two classes are defined in here:
 *
 * An enemy, which is depicted as bugs on the screen, running
 * from left to right, and which our player must avoid
 *
 * Our player, the hero of the story, who starts at the bottom
 * of the screen and must find his way up to the water, without
 * hitting any bugs
 */

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';

	// Set the Enemy's initial location
	this.x = x;
	this.y = y;

	// Enemy's speed
	this.speed = speed;

	// Set width and height
	this.width = imageWidth;
	this.height = imageHeight;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt;

	// Once the enemy moves out of the canvas
	// send it back to the beginning
	if (this.x > 550) {
		this.x = -550;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Our player
var Player = function() {
	// The image/sprite for our player, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/char-boy.png';

	// Set width and height
	this.width = imageWidth;
	this.height = imageHeight;

	this.reset();
};

// Reset player's position
Player.prototype.reset = function() {

	// x location
	this.x = imageWidth * 2;

	// Offset the player's y location
	this.y = offset + imageHeight * 5;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle Input to Player
Player.prototype.handleInput = function(allowedKeys) {
	if (allowedKeys == 'left') {
		if (this.x > 0) {
			this.x -= imageWidth;
		}
	} else if (allowedKeys == 'up') {
		if (this.y <= imageHeight) {
			this.reset();
		} else {
			this.y -= imageHeight;
		}
	} else if (allowedKeys == 'right') {
		if (this.x < imageWidth * 4) {
			this.x += imageWidth;
		}
	} else if (allowedKeys == 'down') {
		if (this.y <= offset + imageHeight * 4) {
			this.y += imageHeight;
		}
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var imageHeight = 83;
var imageWidth = 101;
var offset = -33;

var player = new Player();
var allEnemies = [
	new Enemy(-150, imageHeight + offset, getRandomInt(50, 100)),
	new Enemy(-150, imageHeight + offset, getRandomInt(100, 300)),
	new Enemy(-150, imageHeight * 2 + offset, getRandomInt(50, 100)),
	new Enemy(-150, imageHeight * 2 + offset, getRandomInt(100, 300)),
	new Enemy(-150, imageHeight * 3 + offset, getRandomInt(50, 100)),
	new Enemy(-150, imageHeight * 3 + offset, getRandomInt(100, 300))
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37 : 'left',
		38 : 'up',
		39 : 'right',
		40 : 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

// Courtesy of Mozilla: Returns a random integer
// between min (included) and max (excluded)
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
