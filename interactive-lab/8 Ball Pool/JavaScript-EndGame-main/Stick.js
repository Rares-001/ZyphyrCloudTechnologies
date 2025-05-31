function Stick(positioning, onShoot) {
    this.positioning = positioning;
    this.rotation = 0;
    this.origin = CONSTANTS.stickOrigin.copy();
    this.power = 0;
    this.onShoot = onShoot;
    this.shot = false;
}

Stick.prototype.update = function () {
    if (this.shot) {
        return;
    }

    if (Mouse.left.down) {
        this.increasePower();
    }
    else if (this.power > 0) {
        this.shoot();
    }

    this.updateRotation();
}

Stick.prototype.draw = function () { //to draw stick on canvas
    Canvas.drawImage(deploy.stick, this.positioning, this.origin, this.rotation); //drawing stick
}

Stick.prototype.updateRotation = function () { //to update rotation of stick
    let opposite = Mouse.positioning.y - this.positioning.y; //opposite side of triangle
    let adjacent = Mouse.positioning.x - this.positioning.x; //adjacent side of triangle

    this.rotation = Math.atan2(opposite, adjacent); //to calculate the angle of rotation
}

Stick.prototype.increasePower = function () { //to increase power of stick
    if (this.power > CONSTANTS.maxShotPower) { //to check if power is greater than max power
        return;
    }

    this.power += CONSTANTS.powerInterval; //increasing power by power interval
    this.origin.x += CONSTANTS.originXInterval; //increasing origin x by origin x interval
}

Stick.prototype.shoot = function () { //to shoot the ball
    this.onShoot(this.power, this.rotation); //calling onShoot function
    this.power = 0; //setting power to 0
    this.origin = CONSTANTS.stickShotOrigin.copy();    //setting origin to shot origin
    this.shot = true;  //setting shot to true
}

Stick.prototype.repositioning = function (positioning) { //to reposition the stick
    this.positioning = positioning.copy(); //setting positioning to positioning
    this.origin = CONSTANTS.stickOrigin.copy(); //setting origin to origin
    this.shot = false; //setting shot to false
}

