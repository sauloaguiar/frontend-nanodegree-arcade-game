const PLAYER_INITIAL_X = 200;
const PLAYER_INITIAL_Y = 398;

const ENEMY_START_X = -10;
const ENEMY_DISPLAY_INTERVAL = 1000;
const ENEMY_INITAL_SPEED = 300;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 171;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
    if ((this.x + this.width/2) < (player.x + player.width/2) + player.width/2 &&
        ((this.x + this.width/2) + this.width/2) > (player.x + player.width/2) && 
        (this.y + this.height/2) < ((player.y + player.height/2) + player.height/2) &&
        ((this.y + this.height/2) + this.height/2) > (player.y + player.height/2)) {
            Engine.stop();
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
const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.width = 101;
    this.height = 171;
}

Player.prototype.update = function() {
    // player has reached water
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
            if (((this.x + this.width) + colWidth) < ctx.canvas.width)
                this.x += colWidth;
            break;
        case 'left':
            if (((this.x + this.width) - colWidth) > 0)
                this.x -= colWidth;
            break;
        case 'down':
            if (((this.y + this.height) + rowHeight) < ctx.canvas.height)
                this.y += rowHeight;
            break;
        case 'up':
            if (((this.y + this.height) - rowHeight) > 0)
                this.y -= rowHeight;
            break;
        default:
            break;
    }
}

const Score = function() {
    this.score = 1;
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
    this.score = 1;
}

Score.prototype.value = function() { 
    return this.score;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyDefaultPositions = [50, 138, 225];

// Interval to put enemies on the map
setInterval(function() {
    allEnemies.push(
        new Enemy(
            ENEMY_START_X, 
            enemyDefaultPositions[Math.floor(Math.random()*enemyDefaultPositions.length)],
            ENEMY_INITAL_SPEED)
    );
}, ENEMY_DISPLAY_INTERVAL);


function getEnemySpeed() {
    return ENEMY_INITAL_SPEED * (score.value() * 1.1);
}

function getEnemyInterval() {
    return ENEMY_DISPLAY_INTERVAL * (score.value() * 1.5);
}

const allEnemies = [];
const player = new Player(PLAYER_INITIAL_X, PLAYER_INITIAL_Y);
const score = new Score();

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

// Display dialog with player achievement
function displayEndgame() {
    document.getElementById('score').innerHTML = score.value();
    document.getElementById('game-over').style.display = 'flex';
}

// Sets up handler to reset the game
document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('game-over').style.display = 'none';
    Engine.init();
});


