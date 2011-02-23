
fm.SignalBuffer = function(length, signal) {
  this.signal = signal;
  this.buffer = new Array();
  for (var i = 0; i < length; i++)
    this.buffer[i] = 0;
}

fm.SignalBuffer.prototype.getValue = function(dt) {
  //console.log("buffer value")
  var val = this.signal.getValue(dt);
  this.buffer.shift();
  this.buffer.push(val);
  return val;
}