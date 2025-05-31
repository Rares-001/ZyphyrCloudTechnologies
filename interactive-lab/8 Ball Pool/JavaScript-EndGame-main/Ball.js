function Ball(positioning, color) {
    this.positioning = positioning;
    this.velocity = new Vector2();
    this.isMoving = false;
    this.deployImage = getBalldeployImageByColor(color);
    this.color = color;
    this.visibility = true;
}


Ball.prototype.update = function (delta) { //delta is the time between two frames
    if (!this.visibility) { //If the ball is not visible, then it is not moving
        return; //So we don't need to update it
    }

    this.positioning.addTo(this.velocity.mult(delta)); //Update position based on velocity
    this.velocity = this.velocity.mult(1 - CONSTANTS.frictionEnergyLoss); //Apply friction energy loss to velocity

    if (this.velocity.length() < CONSTANTS.minVelociyLength) { //If the velocity is too small, then we set it to zero
        this.velocity = new Vector2(); //If the velocity is too small, then we set it to zero
        this.isMoving = false; //And the ball is not moving
    }
}

Ball.prototype.draw = function () { //Draw the ball on the canvas
    if (!this.visibility) { //If the ball is not visible, then we don't need to draw it
        return; //So we return
    }

    Canvas.drawImage(this.deployImage, this.positioning, CONSTANTS.ballOrigin); //Draw the ball image on the canvas
}

Ball.prototype.shoot = function (power, rotation) { //Shoot the ball with a given power and rotation 
    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation)); //Set the velocity based on the power and rotation 
    this.isMoving = true; //The ball is moving now

}

Ball.prototype.collideWithBall = function (ball) { //Collide with another ball 
    if (!this.visibility || !ball.visibility) { //If one of the balls is not visible, then we don't need to collide them 
        return; //So we return
    }


    //Find a normal vector
    const n = this.positioning.subtract(ball.positioning); //Find the vector between the two balls 

    //Find distanceance
    const distance = n.length(); //Find the distanceance between the two balls 

    if (distance > CONSTANTS.ballDiameter) { //If the distanceance is greater than the diameter of the balls, then they are not colliding
        return; //So we return
    }

    //Find min. translation distanceance
    const minimumTranslationDistanceance = n.mult((CONSTANTS.ballDiameter - distance) / distance); //Find the minimum translation distanceance to push the balls apart

    //Push-pull balls apart
    this.positioning = this.positioning.add(minimumTranslationDistanceance.mult(1 / 2)); //Move the balls apart based on the minimum translation distanceance
    ball.positioning = ball.positioning.subtract(minimumTranslationDistanceance.mult(1 / 2)); //Move the balls apart based on the minimum translation distanceance

    //Find unit normal vector
    const un = n.mult(1 / n.length()); // Find unit normal vector 

    //Find unit tangent vector
    const ut = new Vector2(-un.y, un.x); //Find unit tangent vector

    //Project velocities onto the unit normal and unit tangent vectors.
    const velocityFirstNormalVector = un.dot(this.velocity); //Project the velocity of the first ball onto the unit normal vector
    const velocityFirstTangentVector = ut.dot(this.velocity); //Project the velocity of the first ball onto the unit tangent vector
    const velocitySecondNormalVector = un.dot(ball.velocity); //Project the velocity of the second ball onto the unit normal vector
    const velocitySecondTangentVector = ut.dot(ball.velocity); //Project the velocity of the second ball onto the unit tangent vector

    //Find new normal velocities
    let velocityFirstNormalVectorTag = velocitySecondNormalVector; //Find the new normal velocity of the first ball
    let velocitySecondNormalVectorTag = velocityFirstNormalVector; //Find the new normal velocity of the second ball

    //Convert the scalar normal and tangential velocities into vectors
    velocityFirstNormalVectorTag = un.mult(velocityFirstNormalVectorTag); //Convert the scalar normal velocity of the first ball into a vector
    const velocityFirstTangentVectorTag = ut.mult(velocityFirstTangentVector); //Convert the scalar tangential velocity of the first ball into a vector
    velocitySecondNormalVectorTag = un.mult(velocitySecondNormalVectorTag); //Convert the scalar normal velocity of the second ball into a vector
    const velocitySecondTangentVectorTag = ut.mult(velocitySecondTangentVector); //Convert the scalar tangential velocity of the second ball into a vector

    //Update velocities
    this.velocity = velocityFirstNormalVectorTag.add(velocityFirstTangentVectorTag); //Update the velocity of the first ball
    ball.velocity = velocitySecondNormalVectorTag.add(velocitySecondTangentVectorTag); //Update the velocity of the second ball

    this.isMoving = true; //The first ball is moving now
    ball.isMoving = true;
}






Ball.prototype.handleBallInPocket = function () { //Handle the ball when it is in a pocket

    if (!this.visibility) { //If the ball is not visible, then we don't need to handle it
        return; //So we return
    }

    let inPocket = CONSTANTS.pockets.some(pocket => { //Check if the ball is in a pocket or not
        score = score + 100;
        console.log(score);
        return this.positioning.distanceFrom(pocket) < CONSTANTS.pocketRadius; //If the ball is in a pocket, then return true

    }); //If the ball is not in a pocket, then return false 

    if (!inPocket) { //If the ball is not in a pocket, then we don't need to handle it
        return; //So we return
    }

    this.visibility = false; //The ball is not visible now
    this.isMoving = false; //The ball is not moving now

}








Ball.prototype.collideWithTable = function (table) { //Collide with the table 
    if (!this.isMoving || !this.visibility) { //If the ball is not moving or not visible, then we don't need to collide it with the table
        return; //So we return
    }
    let collided = false; //If the ball collided with the table or not

    if (this.positioning.y <= table.TopY + CONSTANTS.ballRadius) { //If the ball collided with the top of the table
        this.positioning.y = table.TopY + CONSTANTS.ballRadius; //Set the position of the ball to the top of the table
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y); //Set the velocity of the ball to the opposite direction
        collided = true; //The ball collided with the table
    }

    if (this.positioning.x >= table.RightX - CONSTANTS.ballRadius) { //If the ball collided with the right side of the table
        this.positioning.x = table.RightX - CONSTANTS.ballRadius; //Set the position of the ball to the right side of the table
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y); //Set the velocity of the ball to the opposite direction
        collided = true; //The ball collided with the table
    }

    if (this.positioning.y >= table.BottomY - CONSTANTS.ballRadius) { //If the ball collided with the bottom of the table
        this.positioning.y = table.BottomY - CONSTANTS.ballRadius; //Set the position of the ball to the bottom of the table
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y); //Set the velocity of the ball to the opposite direction
        collided = true; //The ball collided with the table
    }

    if (this.positioning.x <= table.LeftX + CONSTANTS.ballRadius) { //If the ball collided with the left side of the table
        this.positioning.x = table.LeftX + CONSTANTS.ballRadius; //Set the position of the ball to the left side of the table
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y); //Set the velocity of the ball to the opposite direction
        collided = true; //The ball collided with the table
    }

    if (collided) { //If the ball collided with the table
        this.velocity = this.velocity.mult(1 - CONSTANTS.collisionEnergyLoss); //Reduce the velocity of the ball
    }
}

