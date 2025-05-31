let deploy = {};
let sound = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback) //when tools stop loading then callback the function
{
    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback)); //call this method whenever you're ready to 
    }                                                                  //update your animation onscreen
    else {
        callback();
    }
}

function loadAssets(callback) {
    function loadDeploy(fileName) {
        assetsStillLoading++;  //increasing the quantity of loading tools

        let deployImage = new Image();
        deployImage.src = "./res/" + fileName; //file source

        deployImage.onload = function () {
            assetsStillLoading--; //when all tools stops loading then start decreasing it
        }
        return deployImage;
    }

    deploy.background = loadDeploy('background.png'); //for loading pool table
    deploy.stick = loadDeploy('stick.png'); //for loading cue stick
    deploy.redBall = loadDeploy('red_ball.png');
    deploy.yellowBall = loadDeploy('yellow_ball.png');
    deploy.blackBall = loadDeploy('black_ball.png');
    deploy.whiteBall = loadDeploy('white_ball.png'); //for loading cue ball
    deploy.blueBall = loadDeploy('blue_ball.png');
    deploy.greenBall = loadDeploy('green_ball.png');
    deploy.greyBall = loadDeploy('grey_ball.png');

    assetsLoadingLoop(callback); //it shows image only when all images get loaded
}

function loadSounds() {
    function loadSound(fileName) {

        let deploySound = new Audio();
        deploySound.src = "./res/sounds/" + fileName;

        return sound;
    }

    sound.background = loadSound('background-music.wav');
    sound.startGame = loadSound('start-game-music.mp3');
    sound.startSplit = loadSound('hit-start.mp3');
}

function getBalldeployImageByColor(color) {
    switch (color) {

        case COLOR.RED:
            return deploy.redBall;

        case COLOR.YELLOW:
            return deploy.yellowBall;

        case COLOR.BLACK:
            return deploy.blackBall;

        case COLOR.BLUE:
            return deploy.blueBall;

        case COLOR.GREEN:
            return deploy.greenBall;

        case COLOR.GREY:
            return deploy.greyBall;

        case COLOR.WHITE:
            return deploy.whiteBall;
    }
}

