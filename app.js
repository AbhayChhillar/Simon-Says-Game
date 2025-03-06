let btns=["yellow","red","purple","green"];
let keyMappings = { "q": "yellow", "w": "red", "a": "green", "s": "purple" };

let gameSeq=[];
let userSeq=[];

let started= false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("Game started");
        started=true;

        levelUp();
    }

});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },300);
}

function userFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },300);
}

function levelUp(){
    userSeq = [];  
    level++;
    h2.innerText=`Level ${level}`;

    let ranIdx= Math.floor(Math.random()* btns.length);
    let ranColor=btns[ranIdx];
    let ranBtn=document.querySelector(`.${ranColor}`);

    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameFlash(ranBtn);
}

function checkAns(idx){
   if(userSeq[idx]== gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
        setTimeout(levelUp,1000);
    }
   } else{
    h2.innerHTML=`Game Over! Your score was <b> ${level*10}</b> <br> Press any key to Restart`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    });
    reset();
   }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor= btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

// Mobile touch support
for(btn of allBtns){
    btn.addEventListener("touchstart", btnPress, { passive: true });
}

document.addEventListener("keydown", function (event) {
    let key = event.key.toLowerCase();
    if (keyMappings[key]) {
        let btn = document.querySelector(`#${keyMappings[key]}`);
        userFlash(btn);
        userSeq.push(keyMappings[key]);
        checkAns(userSeq.length - 1);
    }
});

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
