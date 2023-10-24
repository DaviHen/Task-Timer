const addItemOnListInput = document.getElementById("addItemInput");
const addItemOnListBtn = document.getElementById("addItem");
const removeListItemBtn = document.getElementById("removeListItemBtn");

addItemOnListBtn.addEventListener("click", addItemOnList);

addItemOnListInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addItemOnList();
    }
});

let uniqueId = 0;

function addItemOnList(){
    let listInputValue = addItemOnListInput?.value;

    if(!listInputValue){
        alert("Você precisa adicionar algo na lista")
    } else{
        uniqueId++
        createListItem(listInputValue, uniqueId)
        addItemOnListInput.value = "";
        addItemOnListInput.focus();
    }
}

function createListItem(itemValue, uniqueId){
    let _li = document.createElement("li");
    let _input = document.createElement("input");
    let _label = document.createElement("label");
    let _button = document.createElement("button");
    let _i = document.createElement("i");

    // Input
    _input.type = "checkbox";
    _input.name = "checkbox";
    _input.id = "checkboxBtn" + uniqueId;

    // Label
    _label.setAttribute("for", `checkboxBtn${uniqueId}`)
    _label.innerText = itemValue;

    // Button
    _button.setAttribute("id", "removeListItemBtn");
    _button.setAttribute("title", "Remover item");
    // I
    _i.className = "fa-solid fa-trash-can";
    _button.appendChild(_i);

    // Li
    _li.classList.add("liItems")
    _li.appendChild(_input)
    _li.appendChild(_label)
    _li.appendChild(_button)

    // Add Item on List
    let ul = document.getElementsByClassName("ulList")[0];
    ul.appendChild(_li)
    
    _button.addEventListener("click", (e) => deleteItem(e))
}

function deleteItem(event){
    let father = event.target.parentElement;
    let liItem = father.parentElement;
    liItem.remove()
}

// Timer


let timerDisplay = document.getElementsByClassName("timerDisplay")[0];

// Start/Pause, Restart and Edit Buttons
const startPausetimerBtn = document.getElementById("pausePlayBtn");
const restartTimerBtn = document.getElementById("restartBtn");
const editTimerBtn = document.getElementById("editTimerBtn");

startPausetimerBtn.addEventListener("click", startPauseTimer);
restartTimerBtn.addEventListener("click", restartTimer);
editTimerBtn.addEventListener("click", editTimer);

// Items that will show up when editTimerBtn is pressed

const timerEditor = document.getElementById("timerEditor");
const timerEditorBgBlur = document.getElementsByClassName("timerEditorBgBlur")[0];

// Close editor
const closeTimerEditorBtn = document.getElementsByClassName("closeTimerEditor")[0];
closeTimerEditorBtn.addEventListener("click", closeTimerEditor);

// Finish Editing
const finishEditingTimerBtn = document.getElementById("finishEditingTimer");
finishEditingTimerBtn.addEventListener("click", setUpTimer);


let timerRunning = false;

function startPauseTimer(){
    if(!timerRunning){
        timerRunning = true;
        startCountDown();
    } else {
        timerRunning = false;
        clearTimeout(timerTimeOut);
    }

    console.log(totalSeconds)
}


let timerTimeOut;
let progressBar = document.getElementById("progressBar");

function startCountDown() {
    let timeArray = timerDisplay.textContent.split(":");
    hours = parseInt(timeArray[0]);
    minutes = parseInt(timeArray[1]);
    seconds = parseInt(timeArray[2]);

    if (hours === 0 && minutes === 0 && seconds === 0) {
        // O temporizador atingiu 00:00:00
        timerRunning = false;
        clearTimeout(timerTimeOut);
        timerDisplay.innerHTML = "00:00:00";

        playAlarmSound();

        alert("O tempo acabou!");
        return;
    }

    let progressBarValue = (totalSeconds - (hours * 3600 + minutes * 60 + seconds));
    let perc = Math.round( ( progressBarValue / totalSeconds) * 100);
    perc += 10;
    progressBar.style.width = `${perc > 100 ? perc = 100 : perc}%`;

    // Decrementar um segundo
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
    }

    // Atualizar o visor do temporizador
    timerDisplay.innerHTML = `${(hours < 10 ? "0" + hours : hours)}:${(minutes < 10 ? "0" + minutes : minutes)}:${(seconds < 10 ? "0" + seconds : seconds)}`;

    // Continuar a contagem regressiva
    if (timerRunning) {
        timerTimeOut = setTimeout(startCountDown, 1000);
    }

}


function playAlarmSound() {
    const alarmAudio = document.getElementById("alarmAudio");
    alarmAudio.play();
}

function restartTimer(){
    timerRunning = false;
    clearTimeout(timerTimeOut);
    timerDisplay.innerHTML = "00:00:00"
    progressBar.style.width = "0%";
}

function editTimer(){
    // Show menu
    let hoursInput = document.getElementById("hoursInput");
    let minutesInput = document.getElementById("minutesInput");
    let secondsInput = document.getElementById("secondsInput");

    timerEditorBgBlur.style.display = "block";
    timerEditor.style.display = "flex";
    hoursInput.focus();

    hoursInput.addEventListener("input", () => {
        if(hoursInput.value.length == 2){
            minutesInput.focus();
        }
    });

    minutesInput.addEventListener("input", () => {
        if(minutesInput.value.length == 2){
            secondsInput.focus();
        }
    });
}

let totalSeconds;

function setUpTimer(){
    // Utilizar operador de coalescência nula.
    let studyHours = document.getElementById("hoursInput")?.value ?? "00";
    let studyMinutes = document.getElementById("minutesInput")?.value ?? "00";
    let studySeconds = document.getElementById("secondsInput")?.value ?? "00";
    
    // Dar uma olhada se pode ser simplificado o código.
    timerDisplay.innerHTML = `${( (studyHours < 10 && studyHours >= 0) && studyHours.length < 2 ? "0" + studyHours : studyHours)}:${( (studyMinutes < 10 && studyMinutes >= 0) && studyMinutes.length < 2 ? "0" + studyMinutes: studyMinutes)}:${( (studySeconds < 10 && studySeconds >= 0) && studySeconds.length < 2 ? "0" + studySeconds: studySeconds)}`;
    
    
    closeTimerEditor();
    
    totalSeconds = (Number(studyHours) * 3600) + (Number(studyMinutes) * 60) + Number(studySeconds);
    
}


function closeTimerEditor(){
    timerEditor.style.display = "none";
    timerEditorBgBlur.style.display = "none";
}