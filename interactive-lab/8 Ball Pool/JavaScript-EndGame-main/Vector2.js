function Vector2(x = 0, y = 0) { //default value of x and y is 0
    this.x = x;
    this.y = y;
}

// define a new method for Vector2 objects that adds another vector to the vector
Vector2.prototype.add = function (vector) { //add the vector
    return new Vector2(this.x + vector.x, this.y + vector.y); //return a new vector
}

// define a new method for Vector2 objects that returns a copy of the vector
Vector2.prototype.copy = function () { //copy the vector
    return new Vector2(this.x, this.y); //return a new vector
}

Vector2.prototype.addTo = function (vector) { //add the vector
    this.x += vector.x;
    this.y += vector.y;
}

Vector2.prototype.mult = function (scalar) { //multiply the vector
    return new Vector2(this.x * scalar, this.y * scalar); //return a new vector
}

Vector2.prototype.subtract = function (vector) { //subtract the vector
    return new Vector2(this.x - vector.x, this.y - vector.y); //return a new vector
}

// define a new method for Vector2 objects that returns the dot product of the vector
Vector2.prototype.dot = function (vector) { //dot product of the vector
    return this.x * vector.x + this.y * vector.y; //return a new vector
}

// define a new method for Vector2 objects that returns the length of the vector 
Vector2.prototype.length = function () { //length of the vector
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); //return a new vector
}

Vector2.prototype.distanceFrom = function (vector) { //distance from the vector
    return this.subtract(vector).length(); //return a new vector
}