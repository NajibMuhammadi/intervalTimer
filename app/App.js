const timerImage = document.querySelector('.alarmIcon');
anime({
    targets: timerImage,
    opacity: [0, 1],
    scale: [
        { value: 1.2, duration: 1000 }, 
        { value: 1, duration: 1000 }    
    ],
    easing: 'easeInOutQuad', 
    loop: true,
});

