const input = document.getElementById("secondsInput");
const startBtn = document.getElementById("startBtn");
const display = document.getElementById("timerDisplay");
const alarm = document.getElementById("alarmSound");
let countdown;

function notify() {
    if(Notification.permission === "granted") new Notification("⏰ Timer finished!");
    else if(Notification.permission !== "denied")
        Notification.requestPermission().then(p => { if(p==="granted") new Notification("⏰ Timer finished!"); });
}

startBtn.onclick = () => {
    clearInterval(countdown);
    let seconds = parseInt(input.value);
    if(isNaN(seconds) || seconds <=0) return;

    display.textContent = seconds + "s";

    countdown = setInterval(() => {
        seconds--;
        display.textContent = seconds + "s";
        display.style.transform = `scale(${1 + seconds/100})`;

        if(seconds <=0) {
            clearInterval(countdown);
            display.textContent = "Time's up!";
            alarm.play();
            notify();
        }
    },1000);
};
