var turn;

var statP1;
var statP2;
var statDraw;

var blocks = new Array();
var playerOne;
var playerTwo;
var winner;

var playerInput = "playerInput";
var spanStatP1 = "playerOneStat";
var spanStatP2 = "playerTwoStat";
var spanStatDraw = "drawStat";
var pOneInput = 'nameOne';
var pTwoInput = 'nameTwo';
var gameStat = "gameStat";
var result = "result";

var pOneName = "playerOneName";
var pTwoName = "playerTwoName";

var cross = "cross.png";
var circle = "circle.png";

var invalidMove = true;
var isDraw = false;

function check(player){
	console.log(player);
	if(checkVertical(player)){
		console.log("vertical done");
		endGame();
	}
	else if(checkHorizontal(player) ){
		console.log("horizontal done");
		endGame();
	} 
	else if(checkDiagonal(player)){
		console.log("diagonal done");
		endGame();
	}
	else if(turn >= 8){
		console.log("turn complete");
		endGame();
	}
	else {
		console.log("yet to complete");
	}
}

function checkHorizontal(player){
	winner = 0;
	var status = false;
	for(var i = 0; i < 3; i++){
		var count = 0;
		for(var j = 0; j < 3; j++){
			var blockIndex = "" + i + j;
			if(blocks[blockIndex] != player){
				break;
			}
			else {
				count++;
			}
		}
		if(count == 3) {
			winner = player;
			status = true;
			break;
		}
	}
	return status;
}

function checkVertical(player){
	winner = 0;
	var status = false;
	for(var i = 0; i < 3; i++){
		var count = 0;
		for(var j = 0; j < 3; j++){
			var blockIndex = "" + j + i;
			if(blocks[blockIndex] != player){
				break;
			}
			else {
				count++;
			}
		}
		if(count == 3) {
			winner = player;
			status = true;
			break;
		}
	}
	return status;
}

function checkDiagonal(player){
	winner = 0;
	var status = false;
	var count1 = 0;
	var count2 = 0;
	var j = 0, k = 2;
	for(var i = 0; i < 3; i++){
		var blockIndexBack = "" + i + i;
		var blockIndexFront = "" + j + k;
		if(blocks[blockIndexBack] == player){
			count1++;
		}
		
		if(blocks[blockIndexFront] == player){
			count2++;
		}
		k--;
		j++;
	}
	if(count1 == 3 || count2 == 3) {
		winner = player;
		status = true;
	}
	return status;
}

function playerInputShow() {
	document.getElementById(gameStat).style.display="none";
	document.getElementById(playerInput).style.display="table";
}

function playerInputHide() {
	document.getElementById(pOneInput).value = "";
	document.getElementById(pTwoInput).value = "";
	document.getElementById(playerInput).style.display="none";
	document.getElementById(gameStat).style.display="table";
}

function newGame(){
	clearStat();
	setPlayer();
	startSet();
	playerInputHide();
}

function clearResult(){
	document.getElementById("result").innerHTML = "";
	document.getElementById("result").style.display = "none";
}

function startSet(){
	invalidMove = false;
	isDraw = false;
	refresh();
	clearResult();
}

function refresh(){
	turn = 0;
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			var blockIndex = ""+ i + j;
			blocks[blockIndex] = 0;
			resetBlock(blockIndex);
		}
	}
}

function updateStat(){
	if(winner == 1){
		statP1++;
	}
	else if(winner == 2){
		statP2++;
	}
	else{
		statDraw++;
	}

	document.getElementById(spanStatP1).innerHTML = statP1;
	document.getElementById(spanStatP2).innerHTML = statP2;
	document.getElementById(spanStatDraw).innerHTML = statDraw;
}

function clearStat(){
	statP1 = 0;
	statP2 = 0;
	statDraw = 0;

	document.getElementById(spanStatP1).innerHTML = statP1;
	document.getElementById(spanStatP2).innerHTML = statP2;
	document.getElementById(spanStatDraw).innerHTML = statDraw;
}

function resetBlock(id){
	document.getElementById(id).style.background = "#F15BFF";
}

function setPlayer(){
	playerOne = document.getElementById(pOneInput).value;
	playerTwo = document.getElementById(pTwoInput).value;
	document.getElementById(pOneName).innerHTML=playerOne;
	document.getElementById(pTwoName).innerHTML=playerTwo;
}

function move(id){
	if(invalidMove == false){
		if(blocks[id] == 0){
			if(turn%2 == 0){
				changeBG(id,cross);
				blocks[id] = 1;
				check(1);
			}
			else {
				changeBG(id,circle);
				blocks[id] = 2;
				check(2);
			}
			turn++;
		}
	}
}

function changeBG(id, img){
	document.getElementById(id).style.background = "purple url("+img+") no-repeat";
}

function endGame(){
	updateStat();
	announce();
}

function announce(){
	var str;
	if(winner == 1){
		str = "Winner is " + playerOne;
	}
	else if(winner == 2){
		str = "Winner is " + playerTwo;
	}
	else {
		str = "Draw";
	}

	document.getElementById(result).style.display = "block";
	document.getElementById(result).innerHTML = str;
	invalidMove = true;
}