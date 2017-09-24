window.onload = initialSetup();

function initialSetup(){

	var playButton = document.getElementById('play');
	playButton.addEventListener('click', startGame);

}

function startGame(){

	var playButton = document.getElementById('play_button');
	var gameName = document.getElementById('game_name');
	var nameInput = document.getElementById('name_input');
	var username = document.getElementById('username');
	var name = document.getElementById('name');
	var instructions = document.getElementById('instructions');

	playButton.style.zIndex = -1;
	gameName.style.zIndex = -1;
	nameInput.style.zIndex = -1;
	instructions.style.zIndex = -1;

	if (name.value){
		username.innerHTML  = name.value;
	}
	else{
		username.innerHTML = "Codzilla";
	}

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.moveTo(0, 0.7*canvas.height);
	ctx.lineTo(canvas.width, 0.7*canvas.height);
	ctx.stroke();
	var hero = new Hero(128, 128, 0.1*canvas.width, 0.55*canvas.height, 128, 128, "images/hero.png", 38);
	hero.draw(ctx, hero.posx, hero.posy);
	var obstacle = new Obstacle(64, 64, 0.5*canvas.width, 0.6*canvas.height, "images/obstacle.png");
	obstacle.draw(ctx, obstacle.posx, obstacle.posy);
/*	
	var elements = {};

	var hero = new gameElements(canvas.width, canvas.height, 0.1*canvas.width, 0.55*canvas.height, true);
	hero.setImage(ctx, "images/hero.png");
	hero.setSpeed(0.05*canvas.width, 0.005*canvas.height);
	var ground = new gameElements(canvas.width, 1, 0, 0.7*canvas.height, false);
	ground.draw(ctx, false);
	var obstacle = new gameElements(canvas.width, canvas.height, 0.5*canvas.width, 0.6*canvas.height, true);
	obstacle.setImage(ctx, "images/obstacle.png");

	elements["hero"] = hero;
	elements["ground"] = ground;
	elements["obstacle"] = obstacle;
*/
	document.addEventListener('keydown', function(event){
		eventHandler(event, ctx, hero);
	});

}

function eventHandler(event, ctx, hero){

	if (event.keyCode == 38 && ongoingEvent == 0){
		ongoingEvent = 1;
		hero.jump(ctx, hero.posy);
		/*var initialHeight = elements["hero"].posy;
		var jumpState = setInterval(function(){executeJump(jumpState, ctx, elements, initialHeight);}, 1);
	*/}

}

/*function executeJump(state, ctx, elements, initialHeight){

	if (initialHeight - elements["hero"].posy > 0.5*initialHeight){
		switchState(state, ctx, elements, initialHeight);
	}
	else{
		jump(ctx, elements, "hero");
	}

}

function switchState(state, ctx, elements, initialHeight){

	clearInterval(state);
	var descentState = setInterval(function(){executeDescent(descentState, ctx, elements, initialHeight);}, 1);

}

function executeDescent(state, ctx, elements, initialHeight){

	if (initialHeight <= elements["hero"].posy){
		endState(state);
	}
	else{
		descend(ctx, elements, "hero");
	}

}

function endState(state){

	clearInterval(state);
	ongoingEvent = 0;

}

function jump(ctx, elements, character){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	elements["ground"].draw(ctx, false);
	elements["obstacle"].draw(ctx, true);
	elements[character].posy -= elements[character].speedy;
	if (elements[character].isImage){
		elements[character].draw(ctx, true);
	}

}

function descend(ctx, elements, character){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	elements["ground"].draw(ctx, false);
	elements[character].posy += elements[character].speedy;
	if (elements[character].isImage){
		elements[character].draw(ctx, true);
	}

}
*/
var ongoingEvent = 0;
