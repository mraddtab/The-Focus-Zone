
const timerBackground = document.querySelector('#timer-body');
const timerState = document.querySelector('#timer-state');
const timerTime = document.querySelector("#timer-time");
const timerPlay = document.querySelector("#timer-play");
const timerReset = document.querySelector("#timer-reset");
const timerTheme = document.querySelector('#timer-theme');
const timerVid = document.querySelector('#timer-bg');
const timerAudio = document.querySelector('#timer-audio');
const timerVolume = document.querySelector('#timer-volume');
let mins = 25;
let secs = 00;
let paused = true;
let state = 'Work';
let bell = new Audio("../sounds/bell.mp3");
let press = new Audio("../sounds/buttonPress.mp3");
/*  
Function Name: updateCountdown()
Function Summary: Updates the variables mins and secs and calls 
                  timerDone() when complete. Updates the timer 
                  displayed every call.
Inputs: mins, secs, paused.
Outputs: Decrements mins and secs. Updates
*/
function updateCountdown(){
    if(paused == false){
        if(secs != 0){ //0:59
            secs -=1;
        }
        else if(mins == 0 & secs == 0){ //0:0
            timerDone();
        }
        else if(mins != 0 & secs == 0){ //1:00
            mins -=1;
            secs = 59;
        }
        if(secs < 10){
            timerTime.textContent = `${mins}` +':' + '0'+ `${secs}`;
        }
        else{
            timerTime.textContent = `${mins}` +':'+ `${secs}`;
        }
    }
}

/*  
Function Name: timerDone()
Function Summary:Executes when timer reaches 0:00 Updates interface and
                 state variables when timer completes.Behavior is dependent 
                 on the current state timer is in. Plays a sound when called.
Inputs: state
Outputs: Updates background color, buttons color, mins, state and plays a sound.
*/
function timerDone(){
    bell.play();
    if(state == 'Work'){
        state = 'Break';
        mins = 5;
        if(timerTheme.value == 0){
            timerBackground.style.backgroundColor ='#B48291'
            timerPlay.style.color = '#B48291';
            timerReset.style.color = '#B48291';
        }
    }   
    else if(state == 'Break'){
        state = 'Work';
        mins = 25;
        if(timerTheme.value == 0){
            timerBackground.style.backgroundColor = '#623CEA';
            timerPlay.style.color = '#623CEA';
            timerReset.style.color = '#623CEA';
        }
    }
    timerState.textContent = state;
}
/*  
Function Name: pauseTimer()
Function Summary: Pauses the timer by clearing the interval 'ID'
Inputs: None
Outputs: Updates paused, timerBtn's text content and clears the interval.
*/
function pauseTimer(){
    paused = true;
    clearInterval(ID);
    timerPlay.textContent = 'Play';
}
timerPlay.addEventListener('click', () =>{
    press.play();
    if(paused == true){
        timerPlay.style.height = "45px";
        timerPlay.style.marginTop = "5px"
        paused = false;
        ID = setInterval(updateCountdown,1000);
        timerPlay.textContent = 'Pause';
    }
    else if(paused == false){
        timerPlay.style.height = "50px";
        timerPlay.style.marginTop = "0px"
        pauseTimer();
    }
})
timerReset.addEventListener('click', () => {
    pauseTimer();
    press.play();
    timerPlay.style.height = "50px";
    timerPlay.style.marginTop = "0px"
    if(state == "Work"){
        timerTime.textContent = '25:00';
        mins = 25;
    }
    else if(state == 'Break'){
        timerTime.textContent = '5:00';
        mins = 5;
    }
    secs = 0;
})
timerVolume.addEventListener('change', () =>{
    var selection = timerVolume.value;
    timerAudio.volume = selection / 100;
})
/*  
Function Name: changeTheme()
Function Summary: Changes the background video when called
Inputs: timer-theme.value
Outputs: Changes background
*/

timerTheme.addEventListener('change', () => {
    var selection = timerTheme.value;
    if(selection == 0){
        timerVid.src = "";
        timerAudio.src = "";
        if(state == 'Break'){
            timerBackground.style.backgroundColor = '#B48291';
            timerPlay.style.color = '#B48291';
            timerReset.style.color = '#B48291';
            timerTheme.style.color = '#B48291';
        }
        else{
            timerBackground.style.backgroundColor = '#623CEA';
            timerPlay.style.color = '#623CEA';
            timerReset.style.color = '#623CEA';
            timerTheme.style.color = '#623CEA';
        }
    }
    else{
        timerBackground.style.backgroundColor = 'black';
        timerPlay.style.color = 'black';
        timerReset.style.color = 'black';
        timerTheme.style.color = 'black';
        if(selection == 1){
            timerVid.src = "../vids/rain.mp4"
            timerAudio.src = "../sounds/rain.wav"
        }
        else if (selection == 2){
            timerVid.src = "../vids/snow.mp4"
            timerAudio.src = "../sounds/snow.wav"
        }
        else if(selection == 3){
            timerVid.src = "../vids/cafe.mp4"
            timerAudio.src = "../sounds/cafe.mp3"
        }
        else if (selection == 4){
            timerVid.src = "../vids/space.mp4"
            timerAudio.src = "../sounds/space.wav"
        }
    }
    
}, false);
