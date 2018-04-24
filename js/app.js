// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 30) {
        stop();
        displayEndgame();   
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const PLAYER_INITIAL_X = 200;
const PLAYER_INITIAL_Y = 400;

const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    // has reached water
    if (this.y < 0) {
        this.reset();
        score.increment();
    }
};

Player.prototype.reset = function() {
    this.x = PLAYER_INITIAL_X;
    this.y = PLAYER_INITIAL_Y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input) {
    const colWidth = ctx.canvas.width / 5;
    const rowHeight = ctx.canvas.height / 7;
    switch(input) {
        case 'right':
            if (((this.x + 50.5) + colWidth) < ctx.canvas.width)
                this.x += colWidth;
            break;
        case 'left':
            if (((this.x + 50.5) - colWidth) > 0)
                this.x -= colWidth;
            break;
        case 'down':
            if (((this.y + 85.5) + rowHeight) < 500)
                this.y += rowHeight;
            break;
        case 'up':
            if (((this.y + 85.5) - rowHeight) > 0)
                this.y -= rowHeight;
            break;
        default:
            break;
    }
}

const Score = function(initial) {
    this.score = initial;
}

Score.prototype.render = function() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+this.score, 8, 20);
}

Score.prototype.increment = function() {
    this.score++;
}

Score.prototype.reset = function() {
    this.score = 0;
}

Score.prototype.value = function() { 
    return this.score;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyPosition = [50, 150, 230];
setInterval(function() {
    allEnemies.push(new Enemy(-10, enemyPosition[Math.floor(Math.random()*enemyPosition.length)], 100));
}, 1500);
const allEnemies = [];
const player = new Player(200, 400);

const score = new Score(0);

function displayEndgame() {
    document.getElementById('score').innerHTML = score.value();
    document.getElementById('game-over').style.display = 'block';
}

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

document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('game-over').style.display = 'none';
    init();
});
