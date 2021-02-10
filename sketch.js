var capture;
var vid;

var margin = 100;
var border = [1140 - margin * 2, 760 - margin * 2];
//var cnv = [1920 / 2, 1080 / 2];
var camOn = -1;
var buttonLive;

var birdImgData = [{
  idx: 1,
  name: 'Little Egret',
  scale: 2.5,
  userNum: 29,
  img: [],
  spriteIdx: [],
  state: [],
  durCounter: [],
  pos: [],
  flip: []
}];

function preload() {
  for (var i = 0; i < birdImgData.length; i++) { //Type

    var idx0 = birdImgData[i].idx - 1;
    var birdString = '00' + birdImgData[i].idx;
    birdString = birdString.slice(birdString.length - 2, birdString.length);

    for (var j = 0; j < birdImgData[i].userNum; j++) { //User

      var userString = '00' + (j + 1);

      userString = userString.slice(userString.length - 2, userString.length);

      var loadedPagesArr = [];

      for (var k = 0; k < birdPreset[idx0].pageNum; k++) { //Page

        var fileString = 'images/' + birdString + '_' + userString + '_' + k + '.png';
        var loadedImg = loadImage(fileString);

        loadedPagesArr.push(loadedImg);

      }

      birdImgData[i].img.push(loadedPagesArr);

      var spriteArrRdm = parseInt(random() * birdPreset[idx0].spriteArr.length);

      var totSec = 0;
      for (b = 0; b < birdImgData[i].userNum; b++) {
        totSec = totSec + b;
      }

      var yAccum = 0;
      for (c = 0; c < j; c++) {
        yAccum = yAccum + c;
      }

      birdImgData[i].spriteIdx.push(spriteArrRdm);
      birdImgData[i].pos.push([
        margin + parseInt(random(0, border[0])),
        margin * 2 + yAccum / totSec * (border[1] - margin)
      ]);
      birdImgData[i].flip.push(parseInt(random(2)) * 2 - 1);

      if (birdPreset[idx0].spriteArr[spriteArrRdm].seq) {
        birdImgData[i].durCounter.push(
          birdPreset[idx0].spriteArr[spriteArrRdm].dur);
        birdImgData[i].state.push(
          birdPreset[idx0].spriteArr[spriteArrRdm].states[0]);
      } else {

        birdImgData[i].durCounter.push(parseInt(random(1, 5) * 3));
        birdImgData[i].state.push(
          birdPreset[idx0].spriteArr[spriteArrRdm].state);
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  
  buttonLive = createButton('LIVE');
  buttonLive.position(10, 10);
  buttonLive.size(60, 60);
  buttonLive.mousePressed(toggleLive);

  var constraints = {
    video: {
      facingMode: {
        exact: "environment"
      }
    },
    audio: false
  };

  capture = createCapture(constraints);
  capture.hide();


  vid = createVideo(
    'vid/fieldRecord.mp4',
    vidLoad
  );

  //vid.size(1920, 1080);
  vid.hide();

}

function toggleLive(){
  camOn = camOn * -1;
}

function vidLoad() {
  vid.loop();
  vid.volume(0);
}

function draw() {
  background(0);//, 100, 200);

  blendMode(BLEND);

  if (camOn > 0) {
    image(capture, 0, 0, width, width * capture.height / capture.width);
    //image(capture, 0, 0, height * capture.width / capture.height, height);
  } else {
    //image(vid, 0, 0, width, width * vid.height / vid.width);
	image(vid, 0, 0, height * vid.width / vid.height, height);
  }

  for (var i = 0; i < birdImgData.length; i++) { //Type
    for (var j = 0; j < birdImgData[i].userNum; j++) { //User

      var idx0 = birdImgData[i].idx - 1;
      var spriteIdx = birdImgData[i].spriteIdx[j];
      var idleDur = parseInt(random(1, 5)) * 3;

      birdImgData[i].durCounter[j] = birdImgData[i].durCounter[j] - 1;

      var dur;
      var frame;

      if (birdPreset[idx0].spriteArr[spriteIdx].seq) {
        dur = birdPreset[idx0].spriteArr[spriteIdx].dur;
        frame = birdPreset[idx0].spriteArr[spriteIdx].start +
          (dur - birdImgData[i].durCounter[j] - 1); //frameCount - 1;

      } else {
        dur = idleDur;
        frame = birdPreset[idx0].spriteArr[spriteIdx].start;
      }

      var cellNum = birdPreset[idx0].cellNum;
      var cellSize = birdPreset[idx0].dimension / birdPreset[idx0].cellNum;
      var page = parseInt((frame) / pow(cellNum, 2)) % birdPreset[idx0].pageNum;

      var pageFrame = frame % pow(cellNum, 2);
      var frameX = (pageFrame % cellNum) * cellSize;
      var frameY = (parseInt(pageFrame / cellNum)) * cellSize;
      var size =
        birdPreset[idx0].size * birdImgData[i].scale *
        (0.5 + j / birdImgData[i].userNum);

      var pos = birdImgData[i].pos[j];

      if (birdPreset[idx0].spriteArr[spriteIdx].flip) {
        if (dur - birdImgData[i].durCounter[j] - 1 == parseInt(dur / 2)) {
          birdImgData[i].flip[j] = birdImgData[i].flip[j] * -1;
        }
      }

      push();
      translate(pos[0], pos[1]);
      translate(-size * birdPreset[idx0].anchor * birdImgData[i].flip[j], -size / 2);
      scale(birdImgData[i].flip[j], 1) //birdImgData[i].flip[j], 1);

      //blendMode(MULTIPLY);
      image(birdImgData[i].img[j][page], 0, 0, size, size, frameX, frameY, 480, 480);

      pop();

      if (birdPreset[idx0].spriteArr[spriteIdx].velocity) {

        var localFrame = dur - birdImgData[i].durCounter[j] - 1;
        var vel = birdPreset[idx0].spriteArr[spriteIdx].velocity;

        if (localFrame >= vel[1] && localFrame <= vel[2]) {

          pos[0] = pos[0] - parseInt(birdPreset[idx0].spriteArr[spriteIdx].velocity[0] / 4 / (vel[2] - vel[1]) * size / 480) * birdImgData[i].flip[j];

        }

        birdImgData[i].pos[j] = pos;

      }

      if (birdImgData[i].durCounter[j] == 0) {

        if (birdPreset[idx0].spriteArr[spriteIdx].seq) {
          birdImgData[i].state[j] = birdPreset[idx0].spriteArr[spriteIdx].states[1];
        }

        if (((pos[0] < margin && birdImgData[i].flip[j] > 0) ||
            (pos[0] > width - margin && birdImgData[i].flip[j] < 0)) &&
          birdImgData[i].state[j] == 1 &&
          birdImgData[i].spriteIdx[j] !== 3) {

          birdImgData[i].spriteIdx[j] = 3;

          birdImgData[i].durCounter[j] =
            birdPreset[idx0].spriteArr[3].dur;

        } else {

          var chancePoolArr = [];
          var totChance = 0;

          for (var s = 0; s < birdPreset[idx0].spriteArr.length; s++) {

            var state;
            if (birdPreset[idx0].spriteArr[s].seq) {
              state = birdPreset[idx0].spriteArr[s].states[0];
            } else {
              state = birdPreset[idx0].spriteArr[s].state;
            }

            if (state == birdImgData[i].state[j]) {
              totChance = totChance + birdPreset[idx0].spriteArr[s].chance;
              chancePoolArr.push({
                idx: s,
                accumChance: totChance
              })
            }

          }

          var rdmChance = parseInt(random() * totChance);

          for (var c = 0; c < chancePoolArr.length; c++) {

            var prevChance;
            if (c == 0) {
              prevChance = 0;
            } else {
              prevChance = chancePoolArr[c - 1].accumChance;
            }

            if (rdmChance >= prevChance && rdmChance < chancePoolArr[c].accumChance) {
              birdImgData[i].spriteIdx[j] = chancePoolArr[c].idx;

              if (birdPreset[idx0].spriteArr[chancePoolArr[c].idx].seq) {
                birdImgData[i].durCounter[j] = birdPreset[idx0].spriteArr[chancePoolArr[c].idx].dur;
              } else {
                birdImgData[i].durCounter[j] = idleDur;
              }
              break;
            }

          }

        }
      }
    }
  }

  push();
  noFill();
  stroke(255);
  //text(windowWidth + ' ' + windowHeight, 100, 100); 
  //rect(margin, margin, border[0], border[1]);
  pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}