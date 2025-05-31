const CONSTANTS =
{
    //Game World
    ballsParams: [
        [new Vector2(1122, 513), COLOR.RED],
        [new Vector2(1156, 493), COLOR.YELLOW],
        [new Vector2(1156, 533), COLOR.BLACK],
        [new Vector2(1190, 474), COLOR.RED],
        [new Vector2(1190, 513), COLOR.BLUE],
        [new Vector2(1190, 552), COLOR.GREEN],
        [new Vector2(1226, 454), COLOR.GREY],
        [new Vector2(1226, 493), COLOR.RED],
        [new Vector2(1226, 533), COLOR.YELLOW],
        [new Vector2(1226, 572), COLOR.BLACK],
        [new Vector2(1262, 435), COLOR.RED],
        [new Vector2(1262, 474), COLOR.BLUE],
        [new Vector2(1262, 513), COLOR.GREEN],
        [new Vector2(1262, 552), COLOR.GREY],
        [new Vector2(1262, 591), COLOR.GREY],
        [new Vector2(723, 513), COLOR.WHITE]
    ],
    delta: 1 / 177,

    //Stick
    maxShotPower: 8000,
    powerInterval: 120,
    originXInterval: 5,
    stickOrigin: new Vector2(1000, 12), // x orizzonatel - y verticale
    stickShotOrigin: new Vector2(1000, 12),

    //Ball
    whiteBallInitialPos: new Vector2(413, 413),
    ballOrigin: new Vector2(25, 25),
    ballDiameter: 38,
    ballRadius: 19,
    minVelociyLength: 5,
    frictionEnergyLoss: 0.016,
    collisionEnergyLoss: 0.02,

    //Table
    pocketRadius: 50,
    pockets: [
        new Vector2(242, 183),
        new Vector2(965, 184),
        new Vector2(1700, 184),
        new Vector2(242, 900),
        new Vector2(965, 900),
        new Vector2(1700, 900)
    ]
}