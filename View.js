
fm.View = function(element) {
  var e = document.getElementById(element);
  this.canvas = e;
  this.size = fm.util.getElementSize(e);
  this.ctx = e.getContext('2d');
  
  this.carrier = new fm.SineSignal();
  this.carrier.amplitude = .5;
  this.carrier.freq = 12;
  this.carrier.phase = 0;
  
  var bufferLength = 400;
  
  this.carrierBuffer = new fm.SignalBuffer(bufferLength, this.carrier);
  
  this.message = new fm.SineSignal();
  this.message.amplitude = .5;
  this.message.freq = 2;
  this.message.phase = 0;
  
  //this.message = new fm.MouseSignal(this.size.height);
  //$(e).mousemove(function (event) { self.message.mouseMove(event) });
  
  this.messageBuffer = new fm.SignalBuffer(bufferLength, this.message);
  
  this.messageIntegrated = new fm.TIntegrator(this.messageBuffer);
  this.messageIntegratedBuffer = new fm.SignalBuffer(bufferLength, this.messageIntegrated);
  
  var self = this;
  var fDelta = 2;
  this.fm = new fm.FmSignal(this.carrier, this.messageIntegratedBuffer, fDelta);
  this.fmBuffer = new fm.SignalBuffer(bufferLength, this.fm);
  
  this.balls = new Array();
  
  for (var i = 0; i < this.size.width; i++)
    this.balls[i] = new fm.Ball();
    
    

}
fm.View.prototype.render = function() {
  this.ctx.clearRect(0,0, this.size.width, this.size.height);
  this.ctx.save();
  this.ctx.translate(this.size.width/2, this.size.height/2);
  //this.buffer = this.ctx.createImageData(this.size.width, this.size.height);
  
  var dt = 1 / 100;
  
  this.carrierBuffer.getValue(dt);
  this.fmBuffer.getValue(dt);
  this.ctx.lineWidth = 2;
  
  //this.ctx.fillStyle = "#252";
  this.ctx.strokeStyle = "#f6a";
  //this.renderBuffer(this.carrierBuffer);
  this.renderTracer(this.carrierBuffer);
  
  //this.ctx.strokeStyle = "#22f";
  //this.renderTracer(this.messageIntegratedBuffer);
  
  //this.ctx.fillStyle = "#f07";
  this.ctx.strokeStyle = "#5f0";
  //this.renderBuffer(this.messageBuffer);
  this.renderTracer(this.messageBuffer);
  
  this.ctx.lineWidth = 1;
  //this.ctx.fillStyle = "#f70";
  this.ctx.strokeStyle = "#0fa";
  //this.renderBuffer(this.fmBuffer);
  this.renderTracer(this.fmBuffer);
  
  //this.ctx.putImageData(this.buffer, 0, 0);
  this.ctx.restore();
}

fm.View.prototype.renderTracer = function(signalBuffer) {
  var scaleY = 200;
  
  this.ctx.save();
  //this.ctx.lineCap = 'round';
  for (var i = 0; i < signalBuffer.buffer.length; i++)
  {
    
    var y = Math.round(signalBuffer.buffer[signalBuffer.buffer.length - 1 - i] * scaleY / 2 + scaleY / 2) - 1;
    var x = 0;
    
    //var angle = signalBuffer.buffer.length / Math.PI / 2
    var angle = .2;
    //this.ctx.save();
    this.ctx.translate(
      //1,0);
      i*i*.0005, 0);
      //0,i);
      //1 * Math.cos(i / signalBuffer.buffer.length * fm.util.TWO_PI * 2), 
      //.3 * Math.sin(i / signalBuffer.buffer.length * fm.util.TWO_PI * 2) - 1);
    this.ctx.rotate(-angle);
    
    //this.ctx.save();
    
    if (i == 0)
    {
      var y0 = y;
      var x0 = x;
      continue;
    }
    
    //this.balls[i].render(this.ctx, x * 10, y);
    
    
    this.ctx.beginPath();
    //fm.util.setPixel(this.buffer, this.size.width - i, y, value, value, value);
    
    this.ctx.moveTo(x, y0+1);
      
    this.ctx.lineTo(x, y+1);
    
    //this.ctx.strokeStyle = fm.util.color(i,i,i);
    this.ctx.stroke();
    //this.ctx.restore();

    x0 = x;
    y0 = y;
    //this.ctx.restore();
  } 
    
  this.ctx.restore();
}

fm.View.prototype.renderBufferWaveform = function(buffer) {
  var scaleY = this.size.height;
  
  this.ctx.beginPath();
  
  for (var i = 0; i < this.size.width; i++)
  {
    var y = buffer.buffer[i] * scaleY / 2 + scaleY / 2;
    
    if (i == 0)
      this.ctx.moveTo(i, y);
      
    this.ctx.lineTo(i, y);
  }
  
  this.ctx.stroke();
}