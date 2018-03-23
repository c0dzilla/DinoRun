window.onload = initialSetup();

function initialSetup(){

	var name = document.getElementById('name');
	name.addEventListener("keyup", function(event){
		if (event.keyCode == 13){
			playGame();
		}
	});

	name.focus();

}

function playGame(){

	var name = document.getElementById('name');
	var alert = document.getElementById('alert');
	var playButton = document.getElementById('play_button');
	var play = document.getElementById('play');
	var gameName = document.getElementById('game_name');
	var nameInput = document.getElementById('name_input');
	var username = document.getElementById('username');
	var scoreBox = document.getElementById('scores');
	var score = document.getElementById('present_score');
	
	if (!name.value){
		alert.innerHTML = "Please Enter Username!";
		return;
	}

	else{
		username.innerHTML = name.value;
	}

	playButton.addEventListener('click', startGame);
	play.focus();

	playButton.style.zIndex = 1;
	nameInput.style.zIndex = -1;
	username.style.zIndex = 1;
	alert.innerHTML = "Use Spacebar to Jump<br>Press p to pause game at any instant";

}

function startGame(){

	var playButton = document.getElementById('play_button');
	var gameName = document.getElementById('game_name');
	var nameInput = document.getElementById('name_input');
	var username = document.getElementById('username');
	var name = document.getElementById('name');
	var scoreBox = document.getElementById('scores');
	var score = document.getElementById('present_score');
	var alert = document.getElementById('alert');

	playButton.style.zIndex = -1;
	gameName.style.zIndex = -1;
	nameInput.style.zIndex = -1;
	scoreBox.style.zIndex = 1;
	alert.style.zIndex = -1;
	username.style.zIndex = 1;

	alert.innerHTML = "";

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var ground = new Line(); 
	ground.draw(ctx, 0, 0.75*canvas.height, canvas.width, 0.75*canvas.height);
	var hero = new Hero(583, 86, 8, 1, 15, 5, 0, 0, "./images/spritesheet_run.png", 38);
	hero.draw(ctx, 0.1*canvas.width, ground.endy - hero.height - 1);
	var obstacle = new Obstacle(49, 51, 5, 0, 0, 0, "./images/fire.png");
	obstacle.draw(ctx, canvas.width, ground.endy - obstacle.height - 1);

	hero.move(ctx, canvas);
	obstacle.move(ctx, canvas);
	hero.updateScore(score);
	obstacle.checkCollision(hero);
	hero.accelerate(true, true);
	obstacle.accelerate(true, true);

	document.addEventListener('keydown', function(event){
		eventHandler(event, ctx, hero, obstacle);
	});

}

function eventHandler(event, ctx, hero, obstacle) {

//	Spacebar to jump	
	if (event.keyCode == 32) {
		event.preventDefault();
		if (!hero.pause && !hero.ongoingJump) {
			console.log(1);
			hero.jump(ctx, hero.posy, false);	
		}
	}

//	Pressing 'p' to pause game
	if (event.keyCode == 80) {
		hero.pauseToggle();
		obstacle.pauseToggle();
	}
}
