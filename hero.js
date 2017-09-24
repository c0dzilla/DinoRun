/*function gameElements(width, height, posx, posy, isImage){

	if (!isImage){
		this.width = width;
		this.height = height;
		this.isImage = false;
	}

	else{
		this.isImage = true;
	}

	this.posx = posx;
	this.posy = posy;

}

gameElements.prototype.setSpeed = function(speedx, speedy){
	this.speedx = speedx;
	this.speedy = speedy;
}

gameElements.prototype.draw = function(ctx, isImage){

	if (isImage){
		ctx.drawImage(this.image, this.posx, this.posy);
	}
	else{
		ctx.moveTo(this.posx, this.posy);
		ctx.fillRect(this.posx, this.posy, this.width, this.height);
	}

}

gameElements.prototype.setImage = function(ctx, src){
	this.image = new Image();
	var that = this;
	this.image.onload = function(){
		that.draw(ctx, true);
	}
	this.image.src = src;
}
*/
function Hero(width, height, posx, posy, speedx, speedy, src, jumpCode){
	this.width = width;
	this.height = height;
	this.posx = posx;
	this.poxy = posy;
	this.speedx = speedx;
	this.speedy = speedy;
	this.src = src;
	this.image = new Image();
	this.image.src = src;
	this.jumpCode = jumpCode;
}

Hero.prototype.draw = function(ctx, posx, posy){
	this.posx = posx;
	this.posy = posy;
	var that = this;
	this.image.onload = function(){
		ctx.drawImage(that.image, that.posx, that.posy);
	}
}

Hero.prototype.changeSpeed = function(speedx, speedy){
	this.speedx = speedx;
	this.speedy = speedy;
}

Hero.prototype.jump = function(ctx, initialHeight){
	var that = this;
	var ascend = setInterval(function(){
		if (that.posy >= 2*initialHeight){
			stopAscend();
			startDescend();
		}
		else{
			ctx.clearRect(that.posx, that.posy, that.posx + that.width, that.posy + that.height);
			that.posy = that.posy + that.speedy;
			ctx.drawImage(that.image, that.posx, that.posy);
		}
	}, 1);

	function stopAscend(){
		clearInterval(ascend);
	}

	function startDescend(){
		var descend = setInterval(function(){
			if (that.posy == initialHeight){
				stopDescend();
			}
			else{
				ctx.clearRect(that.posx, that.posy, that.posx + that.width, that.posy + that.height);
				that.posy = that.posy - that.speedy;
				ctx.drawImage(that.image, that.posx, that.posy);
			}
		}, 1);

		function stopDescend(){
			clearInterval(descend);
		}
	}
}