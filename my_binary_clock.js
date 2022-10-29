// Load fonts
//require("Font7x11Numeric7Seg").add(Graphics);
// position on screen
const X = 1, Y = 35;//42

// timeout used to update every minute
var drawTimeout;

// schedule a draw for the next minute
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, 60000 - (Date.now() % 60000));
}



function draw() {
    // work out how to display the current time
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var shour = h.toString(2).padStart(6,0);
    var sminutes = m.toString(2).padStart(6,0);
    // Reset the state of the graphics library
    g.reset();
    // draw the current time (4x size 7 segment)
    g.setFont("6x8",5);
    //g.setFontAlign(0,0); // align right bottom
    g.drawString(shour, X, Y, true /*clear background*/);
    g.drawString(sminutes, X, Y+48, true);
    // draw the seconds (2x size 7 segment)
    //g.setFont("7x11Numeric7Seg",2);
    //g.drawString(("0"+d.getSeconds()).substr(-2), X+185, Y+100, true /*clear background*/);
    // draw the date, in a normal font
    g.setFont("6x8",2);
    g.setFontAlign(0,1); // align center bottom
    // pad the date - this clears the background if the date were to change length
    var dateStr = "    "+require("locale").month(d, 1)+" "+d.getDate().toString(2).padStart(5,0)+"    ";
    g.drawString(dateStr, g.getWidth()/2, Y+115, true /*clear background*/);
    // queue draw in one minutejavas
}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
draw();
// now draw every second
var secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (on) {
    draw(); // draw immediately, queue redraw
  } else { // stop draw timer
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = undefined;
  }
});
/* Show launcher when middle button pressed
This should be done *before* Bangle.loadWidgets so that
widgets know if they're being loaded into a clock app or not */
Bangle.setUI("clock");
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();



/*
require("Storage").write("pico_bin_clock.info",{
  "id":"pico_bin_clock",
  "name":"Pico Bin",
  "type":"clock",
  "src":"pico_bin_clock.app.js"
});

*/


