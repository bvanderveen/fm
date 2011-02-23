
fm.FmSignal = function(carrier, modulator, fDelta) {
  this.carrier = carrier;
  this.modulator = modulator;
  this.fDelta = fDelta;
  
  this.twoPi_fDelta = fm.util.TWO_PI * fDelta;
  this.phase = 0;
}

fm.FmSignal.prototype.getValue = function(dt) {
  var Fn = this.modulator.getValue(dt);
  
  this.phase += this.carrier.freq * dt * (1 + this.fDelta * Fn);
  
  if (this.phase > fm.util.TWO_PI)
    this.phase -= fm.util.TWO_PI;
    
  return this.carrier.amplitude * Math.cos(this.phase + Math.PI / 2);
}