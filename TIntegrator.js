
fm.TIntegrator = function(signal) {
  this.signal = signal;
  this.phase = 3/2;
  this.gain = 2;
  this.reset();
}

fm.TIntegrator.prototype.reset = function() {
  this.Fn = 0;
  this.fn0 = this.signal.getValue(0);
}

fm.TIntegrator.prototype.getValue = function(dt) {
  var fn = this.signal.getValue(dt);
  this.Fn += this.gain * dt * (this.phase * fn + (1 - this.phase) * this.fn0);
  this.fn0 = fn;
  return this.Fn;
}