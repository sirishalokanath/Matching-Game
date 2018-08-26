const cardList=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"] //List of cards

let sec = 0;
let second;
let minute;
let match=0;

function time( secs )  //to pad 0 in secs
{
    return secs > 9 ? secs : "0" + secs; 
}

let set = setInterval( function()  //function for time
{
    sec++;
    second = document.getElementById("seconds").innerHTML=time(sec%60);
    minute = document.getElementById("minutes").innerHTML=time(parseInt(sec/60));
}, 1000);

function shuffle(array)   //Shuffle the list of cards within an array
{
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

hide(); //function that hides the popup initially

function hide() //hide function call
{
    let hidden = document.querySelector(".popup");
    hidden.style.visibility = "hidden";
}

shuffling();//shuffles the icons

function shuffling()//shuffle function for shuffling the cards
{
    const card=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"]
    let shuff = document.querySelectorAll('.card');
    shuff= shuffle(cardList);
    console.log(shuff);
    let rem = document.querySelectorAll('.card i');
    for(let i=0;i<card.length;i++) //shuffles the cards 
    {
        rem[i].classList.remove("fa");
        rem[i].classList.remove(card[i]);
        rem[i].classList.add("fa",shuff[i]);
    }
    console.log(rem)
}

const $moves = document.getElementById('moves');

game();//begining of the game

function game()//performs the game
{
    
    let list=document.querySelectorAll('.card');
    let reset = document.querySelector('.restart');
    let openCard=[];
    let open;
    initial(); 
    for(let i=0;i<list.length;i++)
    {
        
        list[i].addEventListener('click', function () 
        {
           
            if(openCard.length === 0)
            {
                openCard.push(this);
                list[i].classList.add('open','show','disable');
                count();
                stars();
                console.log(openCard)
            }
            else if(openCard.length==1)
            {
                openCard.push(this);
                list[i].classList.add('open','show','disable');
                open = openCard;
                count();
                stars();
                if(this.innerHTML==openCard[0].innerHTML)   //checks whether the cards do match or not
                {
                    list[i].classList.add('match')
                    openCard[0].classList.add('match')
                    this.classList.add('animated', 'jello');
                    openCard[0].classList.add('animated', 'jello');
                    openCard = [];
                    match+=1;
                    if(match===8)
                    {
                        setTimeout(won,1000);
                    }
                    console.log(match);
                    
                }
                else  //if cards won't match
                {
                    console.log(openCard[0])
                    console.log(openCard[1])
                    list[i].classList.add('mismatch','animated', 'rubberBand','fast');
                    openCard[0].classList.add('mismatch','animated', 'rubberBand','fast');    
                    setTimeout(close,500);
                    openCard = [];
                    function close()
                    {
                        list[i].classList.remove('mismatch','open','show','animated','rubberBand','disable','fast');
                        open[0].classList.remove('mismatch','open','show','animated', 'rubberBand','disable','fast');
                    } 
                   
                }
            
            } 
        });
        reset.addEventListener('click',function()  //event when a restart button is clicked
        {
            initial();
            list[i].classList.remove('show','open','match','jello','disable','animated');
            openCard[0].classList.remove('show','open','match','jello','disable','animated');
            openCard=[];
            
        });
    }
    
}

function initial()//initialization 
{
    sec=-1;
    move = 0;
    match = 0;
    document.getElementById('moves').innerHTML = move;
    const star = document.querySelectorAll('.fa-star');
    for(let i=0;i<star.length;i++)
    {
        star[i].style.visibility = "visible";
    }
}

function count() //counts the number of moves
{
  $moves.innerHTML = ++move;
}

function stars()//displays the stars based on the moves
{
    const star1 = document.querySelector('.first');
    const star2 = document.querySelector('.second');
    const star3 = document.querySelector('.third');
    if(move>25)
    {
        star3.style.visibility = "hidden";
    }
    if(move>40)
    {
        star2.style.visibility = "hidden";
    }
    if(move>50)
    {
        star1.style.visibility = "hidden";
    }
}

function won()//function call when the player has won the game and a popup to display the scores
{
    //displays the stars based on moves
    let disp = document.querySelector('#sCount');
    if(move<=25)  
    {
        disp.textContent = "with 3 stars";
    }
    else if(move>25 && move<=40)
    {
        disp.textContent = "with 2 stars";
    }
    else if(move>40 && move<=50)
    {
        disp.textContent = "with 1 star";
    }
    else
    {
        disp.textContent = "with 0 star";
    }
    
    document.getElementById('total').innerHTML = move; //displays the total number of moves
    
    if(minute<1) //displays the total number of time taken to finish the game
    {
        document.getElementById("timings").innerHTML= minute + ":" + second + " seconds :)";
    }
    else
    {
        document.getElementById("timings").innerHTML= minute + ":" + second + " minutes :)";
    }
    
    let hide = document.querySelector('.opaque');
    hide.style.opacity = "0.05";
    let pop = document.querySelector('.popup');
    pop.style.visibility = "visible";
    pop.classList.add("win");
    clearInterval(set); //stops the timer in background when the game is complete
}