var scaleFactor = 30;   //how much the lines are scaled up by, answers are unaffected
var initX = 50;         //initial X offset 
var initY = 300;        //initial Y offset 

var pointCounter = 0; //amount of points

var angleA = 0;     //Angles to be randomly generated
var angleB = 0;
var angleC = 0;

var lineA = 0;      //lines to be exrapolated from angles
var lineB = 0;
var lineC = 0;

var ansA = 0;       //final answers to display and compare to user answers
var ansB = 0;
var ansC = 0;

var Aon = 0;        //indicators of which angle is displaying at the moment
var Bon = 0;
var Con = 0;

var userAns = 0;    //the user's answer

var checkAns = 0;   //the correct answer

var wrong = 0;      //if they've been wring that turn, don't give them points

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function display (string) {  //ask user for the answer
    if (string == 'a') {
        drawA();
        checkAns = ansA;
    }
    if (string == 'b') {
        drawB();
        checkAns = ansB;
    }
    if (string == 'c') {
        drawC();
        checkAns = ansC;
    }
    document.getElementById('question').innerHTML = "Find the side length of " + string; //only for debugging + "  (" + checkAns + ')';
}

function dtr (degree) { //degrees to radians
    var pi = Math.PI;
    return degree * (pi/180);
}

function getRand (highest) {
    var calcnum = Math.floor(Math.random() * highest + 1);
    return calcnum;
}

function newGame () {
    if (confirm ("Are you sure you want to reset everything?")) {
        pointCounter = 0;
        newQuestion();
    }
}

function newQuestion () {
    do {
        angleA = getRand(70);
        angleB = getRand(70);
        angleC = 180 - angleB - angleA;

        if (angleC > 90) {
            angleC = 90;
            angleB = getRand(20) + 50;
            angleA = 180 - angleC - angleB;
        }
        calcLines();
    } while (lineB > 250);
}

function calcLines () {
    lineA = getRand(5) + 2;
    lineB = Math.sin(dtr(angleB))*lineA/Math.sin(dtr(angleA));
    lineC = Math.sin(dtr(angleC))*lineA/Math.sin(dtr(angleA));
    lineA = lineA * scaleFactor;
    lineB = lineB * scaleFactor;
    lineC = lineC * scaleFactor;
    ansA = Math.round(lineA / (scaleFactor / 10));
    ansB = Math.round(lineB / (scaleFactor / 10));
    ansC = Math.round(lineC / (scaleFactor / 10));
}

function drawTriangle () {
    newQuestion();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(initX + lineA, initY);
    ctx.lineTo(initX, initY);
    ctx.lineTo(initX + lineB * Math.cos(dtr(angleC)), initY - lineB * Math.sin(dtr(angleC)));
    ctx.closePath();
    ctx.stroke();
    ctx.font="50px Verdana";
    if (pointCounter < 10) {
        ctx.fillText(pointCounter, 280, 50);
        ctx.font="25px Verdana";
        ctx.fillText("Score:", 190, 50);
    } else {
        ctx.fillText(pointCounter, 250, 50);
        ctx.font="25px Verdana";
        ctx.fillText("Score:", 160, 50);
    }
    drawMarks();
    if (angleC == 90) {
        ctx.beginPath();
        ctx.moveTo(initX, initY - 10);
        ctx.lineTo(initX + 10, initY - 10);
        ctx.lineTo(initX + 10, initY);
        ctx.stroke();
    }
    //  document.getElementById('debug').innerHTML = ansA + ' ' + ansB + ' ' + ansC; //debugger
}

function drawMarks () {
    var decideType = getRand(2);
    var decideWhat = getRand(3);

    drawAngles(decideType);
    if (decideType == 1) {
        if (Aon == 1) {
            display('a');
            drawLineB();
            drawLineC();
        } else if (Bon == 1) {
            display('b');
            drawLineC();
            drawLineA();
        } else if (Con == 1) {
            display('c');
            drawLineB();
            drawLineA();
        }
    } else {
        if (Aon == 1 && Bon == 1) {
            drawLineA();
            display('b');
        } else if (Bon == 1 && Con == 1) {
            drawLineB();
            display('c');
        } else if (Con == 1 && Aon == 1) {
            drawLineC();
            display('a');
        }
    }
}

function drawAngles (amount) {
    if (amount == 2) {
        var chooser = getRand(3);
        if (chooser == 1) {
            drawAngleA();
            Aon = 1;
            drawAngleB();
            Bon = 1;
            Con = 0;
        } else if (chooser == 2) {
            Aon = 0;
            drawAngleB();
            Bon = 1;
            drawAngleC();
            Con = 1;
        } else {
            Bon = 0;
            drawAngleC();
            Con = 1;
            drawAngleA();
            Aon = 1;
        }
    } else if (amount == 1) {
        chooser = getRand(3);
        if (chooser == 1) {
            drawAngleA();
            Aon = 1;
            Bon = 0;
            Con = 0;
        } else if (chooser == 2) {
            Aon = 0;
            drawAngleB();
            Bon = 1;
            Con = 1;
        } else {
            Aon = 0;
            Bon = 0;
            drawAngleC();
            Con = 1;
        }
    }
}

function drawAngleA () {
    ctx.font="15px Verdana";
    ctx.fillText(angleA + '°', initX + lineB * Math.cos(dtr(angleC)), initY - lineB * Math.sin(dtr(angleC)) - 5);
}

function drawAngleB () {
    ctx.font="15px Verdana";
    ctx.fillText(angleB + '°', initX + lineA + 5, initY);
}

function drawAngleC () {
    if (angleC != 90) {
        ctx.font="15px Verdana";
        ctx.fillText(angleC + '°', initX - 30, initY);
    }
}

function drawLineA () {
    ctx.font="20px Verdana";
    ctx.fillText(ansA, initX + lineA / 2 - 15, initY + 20);
}

function drawLineB () {
    ctx.font="20px Verdana";
    ctx.fillText(ansB, initX - 30 + (lineB * Math.cos(dtr(angleC)))/2, initY - (lineB * Math.sin(dtr(angleC)))/2);
}

function drawLineC () {
    ctx.font="20px Verdana";
    ctx.fillText(ansC, initX + (lineB * Math.cos(dtr(angleC))) + (((initX + lineA) - (initX + lineB * Math.cos(dtr(angleC)))) / 2) + 5,  initY - (lineB * Math.sin(dtr(angleC)))/2);
}

function drawA () {
    ctx.font="20px Verdana";
    ctx.fillText('a', initX + lineA / 2 - 15, initY + 20);
}

function drawB () {
    ctx.font="20px Verdana";
    ctx.fillText('b', initX - 30 + (lineB * Math.cos(dtr(angleC)))/2, initY - (lineB * Math.sin(dtr(angleC)))/2);
}

function drawC () {
    ctx.font="20px Verdana";
    ctx.fillText('c', initX + (lineB * Math.cos(dtr(angleC))) + (((initX + lineA) - (initX + lineB * Math.cos(dtr(angleC)))) / 2) + 5,  initY - (lineB * Math.sin(dtr(angleC)))/2);
}

function checkAnswer () {
    userAns = parseInt(document.getElementById('answer').value);
    if (userAns == checkAns) {
        alert("You are right!");
        if (wrong != 1) {
            pointCounter += 1;
            drawTriangle();
        } else {
            drawTriangle();
            wrong = 0;
        }
    } else {
        alert("You were wrong, try again");
        wrong = 1;
    }
    document.getElementById('answer').value = "";
    document.getElementById('answer').blur();
}

drawTriangle();    //initially draw triangle when site is loaded
