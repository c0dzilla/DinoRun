window.onload = initialSetup();

function initialSetup(){

	var playButton = document.getElementById('play');
	playButton.addEventListener('click', startGame);

	var name = document.getElementById('name');
	name.addEventListener("keyup", function(event){
		if (event.keyCode == 13){
			startGame();
		}
	});

	var name = document.getElementById('name');
	name.focus();

}

function startGame(){

	var playButton = document.getElementById('play_button');
	var gameName = document.getElementById('game_name');
	var nameInput = document.getElementById('name_input');
	var username = document.getElementById('username');
	var name = document.getElementById('name');
	var scoreBox = document.getElementById('scores');
	var instructions = document.getElementById('instructions');
	var score = document.getElementById('present_score');
	var alert = document.getElementById('alert');

	if (!name.value){
		alert.style.zIndex = 1;
		return;
	}

	username.innerHTML = name.value;

	playButton.style.zIndex = -1;
	gameName.style.zIndex = -1;
	nameInput.style.zIndex = -1;
	instructions.style.zIndex = -1;
	scoreBox.style.zIndex = 1;
	alert.style.zIndex = -1;
	username.style.zIndex = 1;

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var ground = new Line(); 
	ground.draw(ctx, 0, 0.75*canvas.height, canvas.width, 0.75*canvas.height);
	var hero = new Hero(583/8, 86, 583, 86, 15, 5, 0, 0, "./images/spritesheet_run.png", 38);
	hero.draw(ctx, 0.1*canvas.width, ground.endy - hero.height - 1);
	var obstacle = new Obstacle(49, 51, 5, 0, 0, 0, "./images/fire.png");
	obstacle.draw(ctx, canvas.width, ground.endy - obstacle.height - 1);

	hero.move(ctx, canvas);
	obstacle.move(ctx, canvas);
	hero.updateScore(score);
	obstacle.checkCollision(hero);
	hero.accelerate(true, true);
	obstacle.accelerate(true, true);
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

	if (event.keyCode == 38 && hero.ongoingJump == 0){
		hero.jump(ctx, hero.posy, 0);
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
