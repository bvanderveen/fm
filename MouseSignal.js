
fm.MouseSignal = function(height) {
  this.height = height;
  this.value = .5;
}

fm.MouseSignal.prototype.mouseMove = function(e) {
  this.value = fm.util.getMouseCoordsForEvent(e).y / this.height * 2 - 1;
  if (!this.value)
    this.value = .5;
}

fm.MouseSignal.prototype.getValue = function() {
  return this.value;
}