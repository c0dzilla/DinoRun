function Line(){
	this.startx = 0;
	this.starty = 0;
	this.endx = 0;
	this.endy = 0;
}

Line.prototype.draw = function(ctx, startx, starty, endx, endy){
	this.startx = startx;
	this.starty = starty;
	this.endx = endx;
	this.endy = endy;
	ctx.moveTo(startx, starty);
	ctx.lineTo(endx, endy);
	ctx.stroke();
}