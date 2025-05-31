let score = 0;
function GameWorld() //it will contain all physical objects and will update them from time to time
{
    let score = 0;
    this.balls = CONSTANTS.ballsParams.map(params => new Ball(...params));

    this.table = {
        TopY: 170,
        BottomY: 900,
        LeftX: 210,
        RightX: 1700
    }

    this.whiteBall = this.balls.find(ball => ball.color === COLOR.WHITE);

    this.stick = new Stick(
        this.whiteBall.positioning.copy(),
        this.whiteBall.shoot.bind(this.whiteBall)
    );
}



GameWorld.prototype.update = function () //to update the objects in each animation frame 
{
    this.handleCollisions();

    this.stick.update(); //for updating positioning of stick
    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].update(CONSTANTS.delta);
    }

    if (!this.ballsisMoving() && this.stick.shot) {
        this.stick.repositioning(this.whiteBall.positioning);
    }

    if (this.ballsisMoving()) {
        score = score + 1;
        console.log(score);
    }
}

GameWorld.prototype.handleCollisions = function () {
    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].handleBallInPocket();
        this.balls[i].collideWithTable(this.table);

        for (let j = i + 1; j < this.balls.length; j++) {
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWithBall(secondBall);
        }
    }
}

GameWorld.prototype.draw = function () //to draw updated objects on canvas
{
    Canvas.drawImage(deploy.background, new Vector2()); //drawing pool table

    for (let i = 0; i < this.balls.length; i++) {    // loop for adding the balls on table 
        this.balls[i].draw();
    }

    this.stick.draw();  //drawing stick
}

GameWorld.prototype.ballsisMoving = function () {
    let ballsisMoving = false;

    for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].isMoving) {
            ballsisMoving = true;
            break;
        }
    }
    return ballsisMoving;
}



GameWorld.prototype.score = function () {
    let score = 0;
    for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].color !== COLOR.WHITE && this.balls[i].inPocket) {
            score = score + 100;
        }
    }
    Console.log(score);
    return score;
}

const numVal = document.querySelector('#num-val');
numVal.innerHTML = this.score();