// TO DO: get trial button presses working, and finish trial with the answer selection.

var phase = 0; // start at 0
var trial = 1;
var total_trials = 4;
var between_phase_blank = 500;

// IMAGES //
var sound_on;
var sound_off;
var consent_pic;

// SOUND //
var fulls = [];
var foils = [];
var testing;
var testing123;
var number_fulls = 4;
var number_foils = 4;



var width = 800; // make sure these are the same as specified in createCanvas()
var height = 600;

var tag;
var timestamp;

var playL_x = width/2-200-40;
var playR_x = width/2+200-40;
var play_y = 450;
var play_w = 100;
var play_h = 70;

var left_choice_x = width/2-200-20;  // location of the choice buttons
var left_choice_y = height/2;
var right_choice_x = width/2+200-20;
var right_choice_y = height/2;
var w = 180;
var h = 180;

var left_x = width/2-200; // location of the speaker icons
var left_y = height/2;
var right_x = width/2+200;
var right_y = height/2;

var ok_x = width/2-18;
var ok_y = height/2;
var ok_w = 36;
var ok_h = 36;

var agree_x = 520;
var agree_y = 480;
var agree_w = 100;
var agree_h = 40;
var noagree_x = 560;
var noagree_y = 530;
var noagree_w = 180;


var blue;

var left_playing = false;    // set to true when mouse is released over the play button
var right_playing = false; 
var left_played = false;     // set to true when the clip has finished playing
var right_played = false;   
var both_finished = false;
var left_chosen = false;
var right_chosen = false;
var yes_warning = false;
var no_warning = false;
var soundcheck_clicked = false;
var sc1 = false;
var sc2 = false;
var sc3 = false;
var sc4 = false;
var sc5 = false;
var sc6 = false;
var one_checked = false;
var check_passed = false;

right_answer = 0; // will reset to a random number between 1-6 in setup()


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function preload() {
  for (i=1; i <= number_fulls; i++) {
    fulls[i] = loadSound('assets/full'+i+'.mp3');
    foils[i] = loadSound('assets/foil'+i+'.mp3');
  }
  testing = loadSound('assets/testing.mp3');
  testing123 = loadSound('assets/testing123.mp3');
  sound_on = loadImage("assets/soundon.png"); 
  sound_off = loadImage("assets/soundoff.png");
  consent_pic = loadImage("assets/consent.png");
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(800, 600);
  background(255);
  textFont("Helvetica");
  imageMode(CENTER);
  rectMode(CENTER);
  blue = color(13,126,222);
  right_answer = int(random(1,7)); // random number between 1-6, including both 1 and 6...
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function draw() {
  background(255);

  //coords();
  //fill(0); text(phase,500,600);

  //text(phase,700,50);
  //text(str(tag),700,100);
  //text(millis() - timestamp,700,80);
  
  if (phase==-2) {
    tag = 'sorry';
    soundSorry();
  }

  if (phase==-1) {
    noStroke(); fill(0);
    text("screening fail - redirect to a compensation HIT...",20,30);
  }

  if (phase==0) {
    tag = 'consent';
    displayConsent();
    
  }

  if (phase==1) {
    tag = 'sound1';
    soundCheck1();
  }
  
  if (phase==2) {
    if ( testing123.isPlaying() == false && millis() - timestamp > between_phase_blank ) {
      phase++;
    }
  }

  if (phase==3) {
    tag = 'sound2';
    soundCheck2();    
  }

  if (phase==4) {
    if ( check_passed == true ) { phase++; } else { phase = -2; }
  }

  if (phase==5) {
    tag = 'passed';
    soundCongrats();
  }

  if (phase==6) {
    tag = 'instructions1';
    instructions1();
  }

  if (phase==7) {
    background(255);
    if ( millis() - timestamp > between_phase_blank ) {
      phase++;
    }
  }

  if (phase==8) {
    tag = 'trials';
    displayTrial();
  }
  
  if (phase==9) {
    tag = 'trial_break';
    if ( millis() - timestamp > between_phase_blank ) {
      if ( trial <= total_trials ) { phase--; }
      if ( trial > total_trials ) { phase++; }
    }
  }

  if (phase==10) {
    textSize(30); noStroke(); fill(0);
    text("K, that's the demo so far...",20,50);
  }


}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mousePressed() {

  return false;
}

function mouseReleased() {

  if (tag == 'consent') {
    if ( overButton(noagree_x, noagree_y, noagree_w, agree_h) == true ) {
      phase--;
    }
    if ( overButton(agree_x, agree_y, agree_w, agree_h) == true ) {
      phase++;
    }
    timestamp = millis();
  }

  if (tag == 'sound1') {
    if ( overButton(150,336,100+20,100+20) == true ) { // sound icon button
      soundcheck_clicked = true;
      if (testing123.isPlaying() == false ) { testing123.play(); }
      if ( yes_warning == true ) { yes_warning = false; }
    }
    if ( overButton(527,276,80,40) == true && soundcheck_clicked == false ) { // yes button
      yes_warning = true;
    }
    if ( overButton(527,394,80,40) == true ) { // yes button
      no_warning = true;
    }
    if ( overButton(527,570,200,40) == true && no_warning == true ) { // still not working button
      phase = phase-2;
    }
    if ( overButton(527,276,80,40) == true && soundcheck_clicked == true ) {
      phase++;
      timestamp = millis();
    }
  }

  if (tag == 'sound2') {
    if ( overButton(60,200,20,20) == true ) { sc1 = true; sc2 = false; sc3 = false; sc4 = false; sc5 = false; sc6 = false; }
    if ( overButton(60,270,20,20) == true ) { sc1 = false; sc2 = true; sc3 = false; sc4 = false; sc5 = false; sc6 = false; }
    if ( overButton(60,340,20,20) == true ) { sc1 = false; sc2 = false; sc3 = true; sc4 = false; sc5 = false; sc6 = false; }
    if ( overButton(60,410,20,20) == true ) { sc1 = false; sc2 = false; sc3 = false; sc4 = true; sc5 = false; sc6 = false; }
    if ( overButton(60,480,20,20) == true ) { sc1 = false; sc2 = false; sc3 = false; sc4 = false; sc5 = true; sc6 = false; }
    if ( overButton(60,550,20,20) == true ) { sc1 = false; sc2 = false; sc3 = false; sc4 = false; sc5 = false; sc6 = true; }

    if ( overButton(120,200,60,60) == true && right_answer == 1 ) { testing.play(); }
    if ( overButton(120,270,60,60) == true && right_answer == 2 ) { testing.play(); }
    if ( overButton(120,340,60,60) == true && right_answer == 3 ) { testing.play(); }
    if ( overButton(120,410,60,60) == true && right_answer == 4 ) { testing.play(); }
    if ( overButton(120,480,60,60) == true && right_answer == 5 ) { testing.play(); }
    if ( overButton(120,550,60,60) == true && right_answer == 6 ) { testing.play(); }  

    if ( sc1 || sc2 || sc3 || sc4 || sc5 || sc6 == true ) {
      if ( overButton(400, 375, play_w+20, play_h) == true ) {
        if ( sc1 == true && right_answer == 1) { check_passed = true; }
        if ( sc2 == true && right_answer == 2) { check_passed = true; }
        if ( sc3 == true && right_answer == 3) { check_passed = true; }
        if ( sc4 == true && right_answer == 4) { check_passed = true; }
        if ( sc5 == true && right_answer == 5) { check_passed = true; }
        if ( sc6 == true && right_answer == 6) { check_passed = true; }
        phase++;
      } 
    }
  }

  if (tag == 'passed') {
    if ( overButton(width/2,height/2,300,60) == true ) {
      phase++;
      timestamp = millis();
    }
  }
  
  if (tag == 'instructions1') {
    if ( overButton(width/2,500,100,50) == true ) {
      phase++;
      timestamp = millis();
    }
  }





  if (tag == 'trials') {
    if (left_played == false && right_played == false && overButton(playL_x, play_y, play_w, play_h) == true) { 
      // play whatever's supposed to be on the LEFT button now
      fulls[trial].play(); // randomize R L later according to boolean
    }

    if (left_played == false && right_played == false && overButton(playR_x, play_y, play_w, play_h) == true) { 
      // play whatever's supposed to be on the RIGHT button now
      foils[trial].play(); // randomize R L later according to boolean
    }

    if (right_played == false && left_played == true && left_playing == false && overButton(playR_x, play_y, play_w, play_h) == true) { // right is not playing (first)
      // play whatever's supposed to be on the RIGHT button now
      foils[trial].play(); // randomize R L later according to boolean
    }

    if (left_played == false && right_played == true && right_playing == false && overButton(playL_x, play_y, play_w, play_h) == true) { // left is not playing (first)
      // play whatever's supposed to be on the LEFT button now
      fulls[trial].play(); // randomize R L later according to boolean
    }

    if (both_finished == true && overButton(left_choice_x, left_choice_y, w, h) == true) {
      left_chosen = true; right_chosen = false;
    }
    if (both_finished == true && overButton(right_choice_x, right_choice_y, w, h) == true) {
      right_chosen = true; left_chosen = false;
    }

    if (left_chosen | right_chosen == true && overButton(ok_x, ok_y, ok_w, ok_h) == true) {
      // record choice
      trial++;
      phase++;
      left_playing = false;    // set to true when mouse is released over the play button
      right_playing = false; 
      left_played = false;     // set to true when the clip has finished playing
      right_played = false;   
      both_finished = false;
      left_chosen = false;
      right_chosen = false;
      timestamp = millis();
    }
  }
  return false;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function displayConsent() {
  image(consent_pic,width/2,height/2);
  basicButton(agree_x, agree_y, agree_w, agree_h, "I agree", color(0), 26);
  basicButton(noagree_x, noagree_y, noagree_w, agree_h, "I do not agree", color(0), 26);
}

function soundCheck1() {
  textSize(30); noStroke(); fill(0);
  text("Sound Check",20,50);
  textSize(20);
  text("First, we need to make sure that the sound on your computer is working.",20,120);
  //text("IMPORTANT: you can not do this HIT unless your sound is working.",20,146);
  text("1) Click on this sound icon:",20,210)
  text("2) Did you hear anything?",410,210)
  image(sound_on,150,336,100,100);
  basicButton(150,336,100+20,100+20, "", blue, 0);  // sound icon button
  textSize(30);
  basicButton(527,276,80,40, "YES", blue, 0); // yes button
  basicButton(527,394,80,40, "NO", blue, 0); // no button

  if ( yes_warning == true ) {
    fill("#8E0D0D"); textSize(20); noStroke();
    text("Click on the icon first!",530,333);
  }
  if ( no_warning == true ) {
    fill("#8E0D0D"); textSize(20); noStroke();
    text("Make sure your speaker is on and try again. \nIf you still can't get your sound working, \n click on the button below.",530,460);
    fill(0); noStroke();
    basicButton(527,570,200,40, "It's still not working...", blue, 20); // still not working button
  }
}

function soundCheck2() {
  textSize(30); noStroke(); fill(0);
  text("Sound Check",20,50);
  textSize(20);
  text("Click on each icon below.  Only one of them will play a sound.",20,120);
  text("Check the box next to the icon that played the sound.",20,150);

  //text(str(sc1),500,500);
  //text(right_answer,500,550);

  
  image(sound_on,120,200,50,50); basicButton(120,200,60,60,"",blue,0);
  image(sound_on,120,270,50,50); basicButton(120,270,60,60,"",blue,0);
  image(sound_on,120,340,50,50); basicButton(120,340,60,60,"",blue,0);
  image(sound_on,120,410,50,50); basicButton(120,410,60,60,"",blue,0);
  image(sound_on,120,480,50,50); basicButton(120,480,60,60,"",blue,0);
  image(sound_on,120,550,50,50); basicButton(120,550,60,60,"",blue,0);

  checkBox(60,200,20,20,sc1);
  checkBox(60,270,20,20,sc2);
  checkBox(60,340,20,20,sc3);
  checkBox(60,410,20,20,sc4);
  checkBox(60,480,20,20,sc5);
  checkBox(60,550,20,20,sc6);

  if (sc1 || sc2 || sc3 || sc4 || sc5 || sc6 == true) {
    fill(0);
    basicButton(400, 375, play_w+20, play_h, "Done", blue, 40);
  }

}

function soundSorry() {
  textSize(30); noStroke(); fill(0);
  text("Sorry, you did not pass sound check.",20,50);
  textSize(20);
  text("(redirect to partial compensation)",20,120);
}

function soundCongrats() {
  textSize(30); noStroke(); fill(0); textAlign(CENTER);
  text("Congrats, you passed the sound check!",width/2,50);
  basicButton(width/2,height/2,300,60,"Start the Experiment",blue,30);
}

function instructions1() {
  textSize(30); noStroke(); fill(0);
  text("Instructions",20,50);
  textSize(20);
  text("(Something along the lines of: We're gonna show you two music clips. Pay attention \nto the melody, one was played by a human and the other one is computer generated.\nThis task will repeat several times.  Each time, try to figure out which one is the \nhuman one.)",20,120);
  basicButton(width/2,500,100,50,"Begin",blue,30);
}


function displayTrial() {

  //text("left_chosen " +left_chosen,20,140);
  //text("right_chosen " +right_chosen,20,180);
  
  textSize(30); noStroke(); fill(0);
  noStroke();
  if (both_finished == false && left_chosen == false && right_chosen == false) {
    text("Listen to both of the clips and try to figure out which one \nis played by a human.",20,50);
  } else {
    text("Now make your choice. Which clip is human?",20,50);
    basicButton(left_choice_x, left_choice_y, w, h, "", blue, 30);
    basicButton(right_choice_x, right_choice_y, w, h, "", blue, 30);
  }
  textSize(40);
  textAlign(CENTER,CENTER);

  image(sound_off,left_x,left_y);
  image(sound_off,right_x,right_y);

  if ( fulls[trial].isPlaying() == true ) {
    left_playing = true;
    left_played = true; // this stays on until the trial is finished
  } else { left_playing = false; }

  if ( foils[trial].isPlaying() == true ) {
    right_playing = true;
    right_played = true; // this stays on until the trial is finished
  } else { right_playing = false; }
 
  // nothing has been played yet
  if (left_played == false && right_played == false) { 
    basicButton(playL_x, play_y, play_w, play_h, "play", blue, 40);
    basicButton(playR_x, play_y, play_w, play_h, "play", blue, 40);
  }

   // whenever one starts playing, show the play icon
  if (left_playing == true) { image(sound_on,left_x,left_y); }
  if (right_playing == true) { image(sound_on,right_x,right_y); }

  if (right_played == false) { // right is not playing (first)
    if (left_playing == true) { // if left is playing first
      noStroke();
      text("play",playR_x, play_y); // still show "play" text for other
    }
    if (left_played == true && left_playing == false ) { // if left played first and stopped
      basicButton(playR_x, play_y, play_w, play_h, "play", blue, 40); // put button back for other
    }
  }

  if (left_played == false) { // left is not playing (first)
    if (right_playing == true) { // if right is playing first
      noStroke();
      text("play",playL_x, play_y); // still show "play" text for other
    }
    if (right_played == true && right_playing == false ) { // if right played first and stopped
      basicButton(playL_x, play_y, play_w, play_h, "play", blue, 40); // put button back for other
    }
  }

  if (left_played == true && right_played == true && left_playing == false && right_playing == false) {
    //basicButton(width/2, height/2, play_w, play_h, "Next", blue, 30);
    both_finished = true;
  }

  if (left_chosen == true) {
    stroke(blue);
    strokeWeight(7);
    ownRect(left_choice_x, left_choice_y, w, h);
  }
  if (right_chosen == true) {
    stroke(blue);
    strokeWeight(7);
    ownRect(right_choice_x, right_choice_y, w, h);
  }

  if (left_chosen | right_chosen == true) {
    basicButton(ok_x, ok_y, ok_w, ok_h, "ok", color(0), 20);
  }
  
}

function basicButton(x, y, w, h, button_text, strokecol, sizetext) {
  textAlign(CENTER,CENTER);
  noStroke();
  textSize(sizetext);
  text(button_text,x,y);
  stroke(strokecol);
  if ( overButton(x, y, w, h) == true ) {
    strokeWeight(2);
    ownRect(x, y, w, h);
    if ( mouseIsPressed == true ) {
      strokeWeight(7);
      ownRect(x, y, w, h);
    }
  }
}

function overButton(x, y, w, h) {
  if (mouseX >= x-(w/2) && mouseX <= x+(w/2) && 
    mouseY >= y-(h/2) && mouseY <= y+(h/2)) { 
    return true;
  } else { 
    return false;
  }
}

function checkBox(x, y, w, h, check_boolean) {
  noFill(); stroke(0); strokeWeight(2);
  rect(x, y, w, h);
  if ( overButton(x,y,w,h ) == true) { 
    fill(blue);
    rect(x, y, w, h); 
  }
  if ( check_boolean == true ) {
    fill(blue); 
    rect(x, y, w, h);
  }
  fill(0);
}



function ownRect(x, y, w, h) { // makes a rectangle of lines so the fill() function can't apply, as it does in rect()
  line(x-(w/2), y-(h/2), x+(w/2), y-(h/2)); // top line
  line(x-(w/2), y+(h/2), x+(w/2), y+(h/2)); // bottom line
  line(x-(w/2), y-(h/2), x-(w/2), y+(h/2)); // left line
  line(x+(w/2), y-(h/2), x+(w/2), y+(h/2)); // right line
}

function coords() {
  textSize(12);
  noStroke();
  fill(0);
  text(mouseX+", "+mouseY,mouseX-30,mouseY-20);
}








