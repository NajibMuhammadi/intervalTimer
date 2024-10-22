document.addEventListener("DOMContentLoaded", function () {
    const countdownContainer = document.getElementById("countdownContainer");
    const digitalContainer = document.getElementById("digital");
    const analogContainer = document.getElementById("analog");
    const textContainer = document.getElementById("text__container");
    const digitalDisplay = document.getElementById("digital-timer-display");
    const intervalCheckbox = document.getElementById("intervals");
    const breakCheckbox = document.getElementById("break");
    const startButton = document.getElementById("startTimerBtn");
    const navItems = document.querySelectorAll('.header__nav-item');
    const menuToggle = document.getElementById('menu-toggle');

    const timer = new easytimer.Timer();

    let minutes = 0;
    const animationTarget = { value: minutes };

    anime({
        targets: animationTarget,
        value: [0, 10], 
        round: 1, 
        easing: 'easeInOutQuad',
        duration: 2000, 
        update: function () {
            minutes = animationTarget.value;
            updateMinutesDisplay();
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });

    startButton.addEventListener("click", function () {
        showSection("digital");
        startTimer(minutes);
    });

    document.getElementById("setTimerLink").addEventListener("click", function (event) {
        event.preventDefault();
        showSection("countdownContainer");
    });

    document.getElementById("analogLink").addEventListener("click", function (event) {
        event.preventDefault();
        showSection("analog");
    });

    document.getElementById("digitalLink").addEventListener("click", function (event) {
        event.preventDefault();
        showSection("digital");
    });
    
    document.getElementById("textLink").addEventListener("click", function (event) {
        event.preventDefault();
        showSection("text");
    });
    
    

    document.querySelector(".increase").addEventListener("click", () => {
        minutes += 1;
        updateMinutesDisplay();
    });

    document.querySelector(".decrease").addEventListener("click", () => {
        if (minutes > 0) {
            minutes -= 1;
            updateMinutesDisplay();
        }
    });

    function showSection(section) {
        countdownContainer.style.display = section === "countdownContainer" ? "flex" : "none";
        digitalContainer.style.display = section === "digital" ? "block" : "none";
        analogContainer.style.display = section === "analog" ? "block" : "none";
        textContainer.style.display = section === "text" ? "block" : "none";

        anime({
            targets: `#${section}`,
            opacity: [0, 1],
            scale: [0.8, 1], 
            translateY: [50, 0],  
            easing: 'easeOutExpo', 
            duration: 1000
        });
    }

    function updateMinutesDisplay() {
        const minutesDisplay = document.querySelector(".minutes");
        if (minutesDisplay) {
            minutesDisplay.textContent = minutes;
        }
    }
    
    function startTimer(minutes) {
        let isBreak = false;
    
        timer.start({ countdown: true, startValues: { minutes: minutes } });
    
        timer.addEventListener("secondsUpdated", function () {
            const timeValues = timer.getTimeValues();
            digitalDisplay.textContent = timeValues.toString();
            analogClock(timeValues);
            updateTextTimer(timeValues);
        });
    
        timer.addEventListener("targetAchieved", function () {
            if (intervalCheckbox.checked) { 
                if (breakCheckbox.checked && !isBreak) {
                    isBreak = true;
                    timer.start({ countdown: true, startValues: { minutes: 5 } });
                } else {
                    isBreak = false;
                    timer.start({ countdown: true, startValues: { minutes: minutes } });
                }
            }else {
                window.location.href = "AlarmView.html";
            }
        });
    }

    function analogClock(timeValues) {
        const hoursHand = document.querySelector('.hour__clock');
        const minutesHand = document.querySelector('.minute__clock');
        const secondsHand = document.querySelector('.second__clock');

        const hours = timeValues.hours % 12;
        const minutes = timeValues.minutes;
        const seconds = timeValues.seconds;

        const hoursDegrees = (-hours * 30) - (minutes / 2) + 90; 
        const minutesDegrees = (-minutes * 6) + 90;
        const secondsDegrees = (-seconds * 6) + 87; 

        hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;
        minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;
        secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;
    }

    function updateTextTimer(timeValues) {
        const hours = timeValues.hours % 12;
        const minutes = timeValues.minutes;
        const seconds = timeValues.seconds;

        const textMinutes = [
            "Noll", "En", "Två", "Tre", "Fyra", "Fem", "Sex", "Sju",
            "Åtta", "Nio", "Tio", "Elva", "Tolv", "Tretton", "Fjorton",
            "Femton", "Sexton", "Sjutton", "Arton", "Nitton", "Tjugo",
            "Tjugoett", "Tjugotvå", "Tjugotre", "Tjugofyra", "Tjugofem",
            "Tjugosex", "Tjugosju", "Tjugoåtta", "Tjugonio", "Tretti",
            "Trettioen", "Trettiotvå", "Trettiotre", "Trettiofyra", "Trettiofem",
            "Trettiosex", "Trettiosju", "Trettioåtta", "Trettionio", "Fyrtio",
            "Fyrtioett", "Fyrtiotvå", "Fyrtiotre", "Fyrtiofyra", "Fyrtiofem",
            "Fyrtiosex", "Fyrtiosju", "Fyrtioåtta", "Fyrtionio", "Femti",
            "Femtioen", "Femtioett", "Femtioåtta", "Femtiofem", "Femtiosex",
            "Femtiosju", "Femtioåtta", "Femtionio", "Sextio"
        ];

        let hourText = "";
        if (hours === 1) {
            hourText = "En timme";
        } else if (hours > 1) {
            hourText = `${textMinutes[hours]} timmar`;
        } else {
            hourText = "";
        }

        let minuteText = "";
        if (minutes === 1) {
            minuteText = "En minut";
        } else if (minutes > 1) {
            minuteText = `${textMinutes[minutes]} minuter`;
        } else {
            minuteText = "";
        }

        let secondText = "";
        if (seconds === 1) {
            secondText = "En sekund";
        } else if (seconds > 1) {
            secondText = `${textMinutes[seconds]} sekunder`;
        } else {
            secondText = "";
        }

        let displayText = "";
        if (hourText) {
            displayText =`${hourText} och ${minuteText} och ${secondText} kvar`;
        } else if(minuteText) {
            displayText = `${minuteText} och ${secondText} kvar`;
        } else {
            displayText = `${secondText} kvar`;
        }

        document.querySelector('.text__minute').textContent = displayText;
    }

});


