scoreleftWrist=0;
scorerightWrist=0;

function setup(){
    canvas=createCanvas(600,550);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log ("poseNet is Initialized");
}



song="";
function preload(){
    song1= loadSound("a mere watan.mp3");
    song2= loadSound("khulke-jeene-ka.mp3");
}

leftWristX=0;
rightWristY=0;
rightWristX=0;
leftWristY=0;

function gotPoses(results){
     if(results.length > 0){
         console.log (results);
         scorerightWrist=results[0].pose.keypoints[10].score;
         scoreleftWrist=results[0].pose.keypoints[9].score;
         leftWristX= results[0].pose.leftWrist.x;
         leftWristY= results[0].pose.leftWrist.y;
         console.log ("left wrist X = "+ leftWristX + "left wrist Y = " + leftWristY);

         rightWristX= results[0].pose.rightWrist.x;
         rightWristY= results[0].pose.rightWrist.y;
         console.log ("right wrist X = "+ rightWristX + "right wrist Y = " + rightWristY);
     }
}

function draw(){
    image(video,0,0,600,550);
    
    fill('#78ffy');
    stroke('#FF0000');
    
    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.play();
        document.getElementById("play_button").innerHTML= "Song: A mere Watan ke logo";
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song2.play();
        document.getElementById("play_button").innerHTML= "Song: Khulke jeene ka tarika";
    }

}