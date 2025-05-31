function Canvas2D() //function constructor has similar kind of object
{
    this._canvas = document.getElementById('screen'); //connects the _canvas variable to the html canvas. 
    this._canvasContext = this._canvas.getContext('2d'); //this refers to the "owner" of the function
}                                                        // getContext is used to draw a 2D figure

Canvas2D.prototype.clear = function () {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

Canvas2D.prototype.drawImage = function (image, positioning, origin, rotation = 0) { //default value of rotation is 0
    if (!positioning) { //if positioning is not defined
        positioning = new Vector2(); //Objects of the same type are created by calling 
    }                             //the constructor function with the new keyword.
    if (!origin) { //if origin is not defined
        origin = new Vector2(); //Objects of the same type are created by calling
    }

    // five steps to draw an image
    this._canvasContext.save(); //save the current state of the canvas
    this._canvasContext.translate(positioning.x, positioning.y); //translate the canvas to the position of the object
    this._canvasContext.rotate(rotation); //rotate the canvas to the rotation of the object
    this._canvasContext.drawImage(image, -origin.x, -origin.y); //draw the image at the origin of the object
    this._canvasContext.restore(); //restore the state of the canvas
}
let Canvas = new Canvas2D();

