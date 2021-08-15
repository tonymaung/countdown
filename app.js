const inputContainer = document.getElementById('input-container');
const countdownForm  = document.getElementById('countdownform');
const countdown = document.getElementById("countdown");
const dateEl = document.getElementById('date-picker');
const countdownTitleText = document.getElementById("countdown-title");
const resetButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeElement = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeBtn  = document.getElementById("complete-button")
const countDays = 24 * 60 * 60 * 1000;
const countHours = 24 * 60 * 60;
let countdownTitle, countdownDate;
let countdownValue = Date;
let countdownActive;
let days,hours,minutes,seconds;
let saveCountdown = {}
// Set date input min with today's date
const today = new Date().toISOString().split("T")[0];

dateEl.setAttribute("min",today);

// Calculate Difference
function calculateDifference(ms){
    days = Math.floor(ms / (24*60*60*1000));
    hours = Math.floor(ms % (24*60*60*1000)/(60*60*1000));
    minutes = Math.floor((ms % (60*60*1000))/(60*1000));
    sec = Math.floor((ms % (60*1000))/(1000)); 
    return [days,hours,minutes,sec]
}
// Take Values from Form
function updateCountdown (e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    saveCountdown = {
        title : countdownTitle,
        date : countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(saveCountdown));
    if(countdownDate === ''){
        alert("Please select a date for countdown")
        

    }else{
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
    
}
// Reset Values
function resetValues(){
    document.getElementById("title").value = "";
    document.getElementById("date-picker").value = "";
    clearInterval(countdownActive)
    countdown.setAttribute("hidden","")
    inputContainer.removeAttribute("hidden");
    completeElement.hidden = true;
    localStorage.removeItem("countdown")
}
//Display Countdown 
function updateDOM (){ 
    countdownActive = setInterval(()=>{
    const todayValue = new Date().getTime()
    const array = calculateDifference(countdownValue - todayValue);
    
    inputContainer.hidden = true;
    // If 
    if((countdownValue - todayValue)<0){
        
        clearInterval(countdownActive);
        completeInfo.textContent = `${countdownTitle} is completed on ${countdownDate}`
        completeElement.hidden = false;
    }else{
        countdown.removeAttribute("hidden");
        countdownTitleText.textContent = countdownTitle;
        timeElements.forEach((element,index)=>{
        element.textContent = array[index]
    })
    }
    
    },1000)
}
// Restore Prev
function restorePrev(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle  = saveCountdown.title;
        countdownDate   = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
// Event Listener for form submission
countdownForm.addEventListener("submit", updateCountdown);
resetButton.addEventListener("click", resetValues);
completeBtn.addEventListener("click", resetValues);

//run fucntion when load up 
restorePrev();