const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"), 
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000), 
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    document.getElementById("final-score").textContent = state.values.result;

    document.getElementById("game-over").classList.remove("hidden");
}
}

function playSound() {
    const audio = new Audio("./assets/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition=randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
} 
function restartGame() {
    // Oculta a tela de game over
    document.getElementById("game-over").classList.add("hidden");

    // Reinicia valores
    state.values.result = 0;
    state.view.score.textContent = 0;

    state.values.currentTime = 60;
    state.view.timeLeft.textContent = 60;

    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}


function init() {
    addListenerHitBox();
}

init();
