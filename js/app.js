const cardList=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"]

let secondsCount = 0, gameSeconds = "00", gameMinutes = "0", moveCount=0, cardMatch = 0;
const secondsDiv = document.getElementById("game-seconds");
const minutesDiv = document.getElementById("game-minutes");
const starsDiv = document.querySelectorAll('.stars')[0].children;

const timeCount = (seconds) => {
    return seconds > 9 ? seconds : "0" + seconds; 
}

let timeInterval = setInterval(() => {
    secondsCount++;
    gameSeconds = secondsDiv.innerHTML = timeCount(secondsCount%60);
    gameMinutes = minutesDiv.innerHTML = timeCount(parseInt(secondsCount/60));
}, 1000);

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const shuffling  = () => {
    const card=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
    let shuff = document.querySelectorAll('.card');
    shuff= shuffle(cardList);
    let rem = document.querySelectorAll('.card i');
    for(let i=0;i<card.length;i++) //shuffles the cards 
    {
        rem[i].classList.remove("fa");
        rem[i].classList.remove(card[i]);
        rem[i].classList.add("fa",shuff[i]);
    }
}

let selectedCard = [];

const close = (currentCard, previousCard) => {
    setTimeout(() => {
        currentCard.classList.remove('mismatch','open', 'show', 'animated','rubberBand','disable','fast');
        previousCard.classList.remove('mismatch','open', 'show', 'animated','rubberBand','disable','fast');
    },500);
}

const game = (currentCard) => {
    if (selectedCard.length === 0) {
        currentCard.classList.add('open', 'show', 'disable');
        selectedCard.push(currentCard);
    } 
    else {
        currentCard.classList.add('open','disable')
        if (selectedCard[0].lastElementChild.className === currentCard.lastElementChild.className) {
            currentCard.classList.add('match', 'show', 'animated', 'jello');
            selectedCard[0].classList.add('match', 'show', 'animated', 'jello');
            cardMatch++;
        }
        else {
            currentCard.classList.add('mismatch', 'show', 'animated', 'rubberBand','fast');
            selectedCard[0].classList.add('mismatch', 'show', 'animated', 'rubberBand','fast');
            close(currentCard, selectedCard[0]);
        }
        selectedCard.pop();
        if(cardMatch === 8) setTimeout(gameWon,1000);
    }
}

const resetGame = () => {
    moveCount = gameSeconds = gameMinutes = 0;
    secondsCount = -1;
    secondsDiv.innerHTML = '00';
    minutesDiv.innerHTML = '00';
    document.getElementById('move-count').innerHTML = 0;
    for (let star of starsDiv) {
        star.style.display = 'inline'
    }
}

const gameInit = () => {
    let allCards=document.querySelectorAll('.card');
    let restartGame = document.querySelector('.restart-game');
    allCards.forEach(card => {
        card.addEventListener('click', () => {
            game(card);
            document.getElementById('move-count').innerHTML = ++moveCount;
            stars();
        })
        restartGame.addEventListener('click', () => {
            card.classList.remove('show','open','match','jello','disable','animated');
            selectedCard = [];
        });
    });
}

const stars = () => {
    if(moveCount > 25 && moveCount <= 35) {
        starsDiv[2].style.display = "none";
    }
    else if(moveCount > 35 && moveCount <= 45) {
        starsDiv[1].style.display = "none";
    }
    else if(moveCount > 45) {
        starsDiv[0].style.display = "none";
    }
}

const gameWon = () => {
    let starsWon = document.querySelector('#stars-won');
    starsWon.textContent = moveCount <= 25 ? "with 3 stars" : moveCount > 25 && moveCount <= 35 ? "with 2 stars" : moveCount > 35 && moveCount <= 45 ? "with 1 star" : "with 0 star";
    document.getElementById('total').innerHTML = moveCount;
    if(gameMinutes < 1) document.getElementById("time-taken").innerHTML= gameMinutes + ":" + gameSeconds + " seconds :)";
    else document.getElementById("time-taken").innerHTML= gameMinutes + ":" + gameSeconds + " minutes :)";
    
    let modal = document.querySelector('.modal');
    modal.style.display = "block";
    clearInterval(timeInterval);
}

shuffling();
gameInit();