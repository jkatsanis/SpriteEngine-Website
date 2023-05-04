let move_speed = 7, grativy = 0.35;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');

let bird_props = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {

    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipePiece').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        game_state = 'Play';
        message.innerHTML = " ";
        score_title.innerHTML = 'Points : ';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move() {
        if (game_state == 'Play') {


            let pipePiece = document.querySelectorAll('.pipePiece');
            pipePiece.forEach((element) => {
                let pipePiece_props = element.getBoundingClientRect();
                bird_props = bird.getBoundingClientRect();

                if (pipePiece_props.right <= 0) {
                    element.remove();
                } else {
                    if (bird_props.left < pipePiece_props.left + pipePiece_props.width && bird_props.left + bird_props.width > pipePiece_props.left && bird_props.top < pipePiece_props.top + pipePiece_props.height && bird_props.top + bird_props.height > pipePiece_props.top) {
                        game_state = 'End';
                        message.innerHTML = 'Game Over'+ '<br>Press Enter To Restart';
                        message.classList.add('messageStyle');
                        return;
                    } else {
                        if (pipePiece_props.right < bird_props.left && pipePiece_props.right + move_speed >= bird_props.left && element.increase_score == '1') {
                            score_val.innerHTML = +score_val.innerHTML + 1;
                        }
                        element.style.left = pipePiece_props.left - move_speed + 'px';
                    }
                }
            });
            requestAnimationFrame(move);
        }
    }
    requestAnimationFrame(move);

    let birdY = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        birdY = birdY + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp'){
                img.src = 'pictures/Terence_bird_AB2-removebg-preview.png';
                birdY = -10.5;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp'){
                img.src = 'pictures/Terence_bird_AB2-removebg-preview.png';
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + birdY + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipeGape = 0;

    let pipe_gap = 55;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipeGape > 115){
            pipeGape = 0;

            let pipePosition = Math.floor(Math.random() * 45);
            let pipeHtml = document.createElement('div');
            pipeHtml.className = 'pipePiece';
            pipeHtml.style.top = pipePosition - 50 + 'rem';
            pipeHtml.style.left = '100vw';

            document.body.appendChild(pipeHtml);
            let pipePiece = document.createElement('div');
            pipePiece.className = 'pipePiece';
            pipePiece.style.top = pipePosition + pipe_gap + 'vh';
            pipePiece.style.left = '100vw';
            pipePiece.increase_score = '1';

            document.body.appendChild(pipePiece);
        }
        pipeGape++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
