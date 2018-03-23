function Hero(width, height, totalColumns, totalRows, speedx, speedy, accelerationx, accelerationy, src, jumpCode){
	this.width = width;
	this.height = height;
	this.posx = 0;
	this.posy = 0;
	this.speedx = speedx;
	this.speedy = speedy;
	this.accelerationx = accelerationx;
	this.accelerationy = accelerationy;
	this.src = src;
	this.image = new Image();
	this.image.src = src;
	this.jumpCode = jumpCode;
	this.ongoingJump = false;
	this.score = 0;
	this.row = 0;
	this.column = 0;
	this.currentFrame = 0;
	this.totalRows = totalRows;
	this.totalColumns = totalColumns;
	this.frameWidth = width/totalColumns;
	this.frameHeight = height/totalRows;
	this.pause = false;
}

Hero.prototype.draw = function(ctx, posx, posy){
	this.posx = posx;
	this.posy = posy;
	if (this.image.complete){
		ctx.drawImage(this.image, this.column*this.frameWidth, this.row*this.frameHeight, this.frameWidth, this.frameHeight, this.posx, this.posy, this.frameWidth, this.frameHeight);
	}
	else{
		this.image.onload = ()=> {
			ctx.drawImage(this.image, this.column*this.frameWidth, this.row*this.frameHeight, this.frameWidth, this.frameHeight, this.posx, this.posy, this.frameWidth, this.frameHeight);
		}
	}
}

Hero.prototype.changeSpeed = function(speedx, speedy){
	this.speedx = speedx;
	this.speedy = speedy;
}

Hero.prototype.jump = function(ctx, initialHeight, maxheightReached){
	this.ongoingJump = true;
	if (!this.pause) {
		if (!maxheightReached){
			ctx.clearRect(this.posx, this.posy, this.frameWidth, this.frameHeight);
			this.posy = this.posy - this.speedy;
			this.draw(ctx, this.posx, this.posy);
			if (initialHeight - this.posy >= 1.5*this.height){			
				maxheightReached = true;
			}
		}
		else{
			ctx.clearRect(this.posx, this.posy, this.frameWidth, this.frameHeight);
			this.posy = this.posy + this.speedy;
			this.draw(ctx, this.posx, this.posy);
			if (this.posy == initialHeight){
				this.ongoingJump = false;
			}
		}
	}
	if (this.ongoingJump){
		window.requestAnimationFrame( ()=> {
			this.jump(ctx, initialHeight, maxheightReached);
		});
	}
}

Hero.prototype.move = function(ctx, canvas){
	window.requestAnimationFrame( ()=> {
		this.move(ctx, canvas);
	});
	if (!this.ongoingJump && !this.pause){
		this.currentFrame = this.currentFrame + this.speedx;
		this.row = (Math.floor(this.currentFrame/this.width)) % this.totalRows;
		this.column = (Math.floor(this.currentFrame/this.frameWidth)) % this.totalColumns;
		ctx.clearRect(this.posx, this.posy, this.frameWidth, this.frameHeight);
		this.draw(ctx, this.posx, this.posy);
	}
}

Hero.prototype.updateScore = function(score){
	var intervalFunction = setInterval( ()=> {
		if (!this.pause) {
			this.score++;
			score.innerHTML = "Score: " + this.score;
		}
	}, 100);
}

Hero.prototype.accelerate = function(ifx, ify){
	var intervalFunction = setInterval( ()=> {
		if (!this.pause) {
			this.speedx += this.accelerationx;
			this.speedy += this.accelerationy;
		}
	}, 1);
}

Hero.prototype.checkJumpStatus = function() {
	return this.ongoingJump;
}

Hero.prototype.pauseToggle = function() {
	this.pause = this.pause^true;
}