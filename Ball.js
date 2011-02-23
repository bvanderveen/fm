fm.Ball = function() {
}

fm.Ball.prototype.render = function(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, fm.util.TWO_PI,true);
  ctx.fill();
}