fm.util = fm.util || {};

fm.util.TWO_PI = Math.PI * 2;

fm.util.getElementSize = function(e) {
    var width = e.getAttribute("width"); 
    var height = e.getAttribute("height"); 
        
    return { width: width, height: height };
}

fm.util.getMouseCoordsForEvent = function(event)
{
    if (event.offsetX) return { x : event.offsetX, y : event.offsetY };
    
    var clientRect = event.currentTarget.getBoundingClientRect();
    
    return { x : event.clientX - clientRect.left, y : event.clientY - clientRect.top };
}

fm.util.createBuffer = function(ctx, width, height) {
  var imageData = ctx.createImageData(width, height);  
}

fm.util.setPixel = function(imageData, x, y, r, g, b, a) {
  var pixel = fm.util.convertToPixel(imageData, x, y);
  // curious design decision
  imageData.data[pixel] = r;
  imageData.data[pixel + 1] = g;
  imageData.data[pixel + 2] = b;
  imageData.data[pixel + 3] = a || 255;
}

fm.util.color = function(r,g,b,a) {
  
  a = a || 255;
  return (["rgba(", r, ",", g, ",", b, ",", a, ")"]).join("");
}

fm.util.convertToPixel = function(imageData, x, y) {
  return y * imageData.width * 4 + x * 4;
}

fm.util.grey = function(value) {
  return Math.round(0xff * value);
}