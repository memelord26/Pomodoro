const bells = new Audio("./sounds/bells.mp3");
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const session = document.querySelector(".minutes");
let myInterval;
let state =  true;
let isPaused = false;
let totalSeconds;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state) {
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector(".minutes");
            const secondDiv = document.querySelector(".seconds");

            if (isPaused) return; //do nothing while paused

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = "0" + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                clearInterval(myInterval);

                state = true; //allow for new session
                isPaused = false;

                //change button icon back to play
                startBtn.firstElementChild.classList.remove("fa-pause");
                startBtn.firstElementChild.classList.add("fa-play");
            }
        };
        myInterval = setInterval(updateSeconds, 1000);

        bells.play(); //start timer

        //change icon to pause
        startBtn.firstElementChild.classList.remove("fa-play");
        startBtn.firstElementChild.classList.add("fa-pause");
    } else {
        //toggle pause / resume
        isPaused = !isPaused;

        if (isPaused) {
            //change icon to play
            startBtn.firstElementChild.classList.remove("fa-pause");
            startBtn.firstElementChild.classList.add("fa-play");
        } else {
            //change icon to pause
            startBtn.firstElementChild.classList.remove("fa-play");
            startBtn.firstElementChild.classList.add("fa-pause");
        }
        //alert("Session has aleady started!");
    }
};

startBtn.addEventListener("click", appTimer);

//reset button functionality
resetBtn.addEventListener("click", () => {
    clearInterval(myInterval);
    state = true;
    isPaused = false;

    //reset time to 25:00
    totalSeconds = 25 * 60;
    document.querySelector(".minutes").textContent = "25";
    document.querySelector(".seconds").textContent = "00";

    //ensure start button shows play icon
    startBtn.firstElementChild.classList.remove("fa-pause");
    startBtn.firstElementChild.classList.add("fa-play");
});