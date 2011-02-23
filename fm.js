$(document).ready(function() { 
  var fmview = new fm.View('fmcanvas');
  setInterval(function () {
    fmview.render();
  }, 1000 / 30);
});

var fm = fm || {};