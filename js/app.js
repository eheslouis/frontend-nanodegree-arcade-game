// Enemies our player must avoid
/**
* @description Represents an Enemy
* @constructor
*/
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init(Math.floor(Math.random() * 200) + 500);
};

/**
* @description initialise the parameters of the ennemy
*/
Enemy.prototype.init = function(x){
    this.x = x;
    //randomly select one of the stone row
    this.y = Math.floor(Math.random() * 3) * 80 + 60;
    this.speed = (Math.random() * 5) * 40 + 50;
};

/**
* @description Update the enemy's position
* @param dt a time delta between ticks
*/
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //if the ennemy x is out of the screen, reset the ennemy's parameters
    if (this.x > 700)
    {
        this.init(0);
    } else
    {
        this.x = this.x + this.speed * dt;
    }
};

/**
* @description Draw the enemy on the screen
*/
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/**
* @description Represents the player
* @constructor
*/
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.init();
};

/**
* @description initialise the parameters of the player
*/
Player.prototype.init = function(){
    this.x = 202;
    this.y = 380;
};

/**
* @description check the position of the player against the ennemies
*/
Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x - 50 <= allEnemies[i].x)  && (this.x + 50 >= allEnemies[i].x) && (this.y+12>=allEnemies[i].y) && (this.y+6<=allEnemies[i].y)) {
            this.init();
        }
    };

};

/**
* @description Draw the player on the screen
*/
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Handle the input from the user
*/
Player.prototype.handleInput = function(key)
{
    if (key == 'left')
    {
        if (this.x > 0)
        {
            this.x = this.x - 101;
        }
    } else if (key == 'right')
    {
        if (this.x < 400)
        {
            this.x = this.x + 101;
        }
    } else if (key == 'up')
    {
        if (this.y > 83)
        {
            this.y = this.y - 83;
        } else
        {
            this.init();
        }
    } else
    {
        if (this.y < 380)
        {
            this.y = this.y + 83;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy, new Enemy, new Enemy, new Enemy];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
