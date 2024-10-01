let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startTimer() {
  if (!isRunning) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateTime, 1);
    isRunning = true;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
  }
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  let milliseconds = Math.floor((updatedTime % 1000));
  let seconds = Math.floor((updatedTime / 1000) % 60);
  let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
  let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);

  milliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;

  display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    isRunning = false;
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
  }
}

function resetTimer() {
  clearInterval(tInterval);
  isRunning = false;
  difference = 0;
  lapCounter = 1;
  display.innerHTML = "00:00:00.000";
  lapsList.innerHTML = "";
  startBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';
}

function addLap() {
  if (isRunning) {
    const lapTime = display.innerHTML;
    const li = document.createElement('li');
    li.innerText = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(li);
    lapCounter++;
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
