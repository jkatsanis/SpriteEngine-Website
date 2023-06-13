let move_speed = 7;
let ship 
let img
let ship_props
let game_state
let message
let background

function initSpaceShooter()
{
    console.log("Amogus")
    ship = document.querySelector('.ship');
    img = document.getElementById('ship-1');
    
    ship.style.left = "600px";
    
    ship_props = ship.getBoundingClientRect();
    game_state = 'Start';
    message = document.getElementById("message");
    
    background = document.querySelector('.background');
    
    document.addEventListener("keydown", (e)=>{
    
        if (e.key === 'Enter' && game_state !== "Play")
        {
            game_state = "Play";
            message.style.display = "none";
            play();
        }
    })
}

function play(){
    let rocks = [];
    let gameRunning = true;
    document.addEventListener('keydown', function(event) {
        if (!gameRunning)
        {
            return;
        }
        if (event.key === 'ArrowLeft') {
            moveSpaceship(-20);
        } else if (event.key === 'ArrowRight') {
            moveSpaceship(20);
        }
    });

    function moveSpaceship(amount) {
        let currentLeft = parseInt(ship.style.left) || 0;
        let newLeft = currentLeft + amount;

        // Limit spaceship movement within game container
        if (newLeft >= 0 && newLeft <= (background.offsetWidth - ship.offsetWidth)) {
            ship.style.left = newLeft + 'px';
        }
    }

    function createRock() {
        let rock = document.createElement('div');
        rock.className = 'rock';
        rock.style.left = Math.floor(Math.random() * (background.offsetWidth - 20)) + 'px';
        rock.style.top = '-20px';
        background.appendChild(rock);
        rocks.push(rock);

        // Move the rock
        let rockInterval = setInterval(function() {
            let currentTop = parseInt(rock.style.top);
            let newTop = currentTop + 3;

            // Check if the rock collides with the spaceship
            if (isCollision(rock, ship)) {
                clearInterval(rockInterval);
                background.removeChild(rock);
                let index = rocks.indexOf(rock);
                if (index !== -1) {
                    rocks.splice(index, 1);
                }
                endGame();
            } else if (newTop > background.offsetHeight) {
                clearInterval(rockInterval);
                background.removeChild(rock);
                let index = rocks.indexOf(rock);
                if (index !== -1) {
                    rocks.splice(index, 1);
                }
            } else {
                rock.style.top = newTop + 'px';
            }
        }, 10);
    }

    function endGame() {
        gameRunning = false;
        let gameOverScreen = document.getElementById('gameOverScreen');
        gameOverScreen.style.display = 'block';
    }


    function isCollision(element1, element2) {
        let rect1 = element1.getBoundingClientRect();
        let rect2 = element2.getBoundingClientRect();

        return (
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top &&
            rect1.left < rect2.right &&
            rect1.right > rect2.left
        );
    }


    // Start generating rocks
    setInterval(function() {
        if (gameRunning) {
            createRock();
        }
    }, 300);
}