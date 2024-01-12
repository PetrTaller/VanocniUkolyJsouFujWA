let winned = false;
var hex = document.getElementById("hex");
var winColor;
var congrats = document.getElementById("congrats");
var newGame = document.getElementById("newGame");
var numberOfButtons =5;
function generateButtons(number) {
var buttons = document.getElementById("buttons");
var RightColor = RndNum(number);
for (var i = 1; i <= number; i++) {
var button = document.createElement("button");
button.className = "button";
button.setAttribute("onclick", "buttonClick(this)");
var randomColor = getRandomColor();
button.style.backgroundColor = randomColor;
buttons.appendChild(button);
if(i == RightColor){
button.id = "win";
winColor = randomColor;
hex.textContent = winColor;
}
}
}
function buttonClick(button) {
    if(winned == false){
    if(button.id == "win"){
        winned = true;
        win();
    }else{
        button.remove();
    }
    }
}
function RndNum(number) {
return Math.floor(Math.random() * (number))+1;
}
function getRandomColor() {
var letters = "0123456789ABCDEF";
var color = "#";
for (var i = 0; i < 6; i++) {
color += letters[Math.floor(Math.random() * 16)];
}
return color;
}
function win(){
    congrats.textContent = "Congratulations!";
    hex.style.color = winColor;
    congrats.style.color = winColor;
    var buttons = document.querySelectorAll(".button:not(#win)");
    buttons.forEach(function(button) {
    button.remove();
});
var newGame = document.createElement("button");
newGame.className = "newGame";
newGame.setAttribute("id", "newGame");
newGame.setAttribute("onclick", "Reset()");
newGame.style.color = "black";
newGame.textContent = "New Game";
newGameButton.appendChild(newGame);
var winButton = document.createElement("win");
winButton.disabled = true;
}
function Diff(button){
    if(button.id == "diff1"){
        numberOfButtons = 5;
    }
    if(button.id == "diff2"){
        numberOfButtons = 7;
    }
    if(button.id == "diff3"){
        numberOfButtons = 11;
    }
    Reset();
}
function Reset(){
    var buttons = document.querySelectorAll(".button");
    buttons.forEach(function(button) {
    button.remove();});
    hex.style.color = "#4b4b4b";
    congrats.remove();
    generateButtons(numberOfButtons);
    var newGameButton = document.getElementById("newGame");
    newGameButton.remove();
    winned = false;
}
generateButtons(numberOfButtons);
