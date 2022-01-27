const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const TIE = 0;
const WON = 1;
const LOST = 2;

let isPlaying = false;

const rockBtn = document.getElementById("btn-rock");
const paperBtn = document.getElementById("btn-paper");
const scissorsBtn = document.getElementById("btn-scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

rockBtn.addEventListener('click', () => {
    console.log('clcik');
    play(ROCK);
});

paperBtn.addEventListener('click', () => {
    play(PAPER);
});

scissorsBtn.addEventListener('click', () => {
    play(SCISSORS);
});

const play = ( userOpt ) => {

    resultText.className="";
    
    if( isPlaying ) return;

    isPlaying = true;

    userImg.src = `img/${ userOpt }.svg`;
    userImg.setAttribute("alt", userOpt);

    resultText.innerHTML = "Choosing...";

    const interval = setInterval(() => {
        const machineOpt = calcMachineOpt();
        machineImg.src = `img/${ machineOpt }.svg`;
        machineImg.setAttribute("alt", machineOpt);
    }, 200);

    setTimeout(() => {
        clearInterval(interval);

        const machineOption = calcMachineOpt();
        const result = calcResult(userOpt, machineOption);
        machineImg.src = `img/${ machineOption }.svg`;
        machineImg.setAttribute("alt", machineOption);

        switch( result ) {
            case TIE:
                resultText.innerHTML = "You have tied!";
                resultText.classList.add("tie");
                break;
            case WON:
                resultText.innerHTML = "You win! ^_^";
                resultText.classList.add("winner");
                break;
            case LOST:
                resultText.innerHTML = "You lost! :(";
                resultText.classList.add("loser");
                break;
        }

        isPlaying = false;

    }, 2000);
}

const calcMachineOpt = () => {
    const number = Math.floor(Math.random() * 3);
    switch( number ) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

const calcResult = (userOpt, machineOpt) => {
    if(userOpt === machineOpt) {
        return TIE;
    } else if ( userOpt === ROCK ) {
        if(machineOpt === PAPER) return LOST;
        if(machineOpt === SCISSORS) return WON;
    } else if( userOpt === PAPER) {
        if(machineOpt === SCISSORS) return LOST;
        if(machineOpt === ROCK) return WON;
    } else if( userOpt === SCISSORS ) {
        if(machineOpt === ROCK) return LOST;
        if(machineOpt === PAPER) return WON;
    }

}

