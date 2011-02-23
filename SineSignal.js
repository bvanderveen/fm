fm.SineSignal = function() {
}

fm.SineSignal.prototype.getValue = function(dt) {
  this.phase += this.freq * dt;
  
  if (this.phase > fm.util.TWO_PI)
    this.phase -= fm.util.TWO_PI;
  
  return this.amplitude * Math.sin(this.phase);
}