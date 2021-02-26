import { CanvasView } from './view/CanvasView'
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from './collision';
// Images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";
// Level and colors
import {PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_STARTX, BALL_SPEED, BALL_SIZE, BALL_STARTX, BALL_STARTY} from './setup';
// Helpers
import { createBricks } from "./helpers";


let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over!')
    gameOver = false
}

function setGameWin(view: CanvasView) {
    view.drawInfo('Game Won!')
    gameOver = false
}
function gameLoop(
    view:CanvasView, 
    bricks:Brick[], 
    paddle:Paddle, 
    ball:Ball,
    collision:Collision
    ) {
        view.clear();
        view.drawBricks(bricks);
        view.drawSprite(paddle);
        view.drawSprite(ball);
        // Move Ball
        ball.moveBall();
        
        // Move paddle if it's inside playfield
        if ((paddle.isMovingLeft && paddle.pos.x > 0) || (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width) ){
            paddle.movePaddle();
        }
        
        collision.checkBallCollision(ball, paddle, view);
        const COLLIDING_BRICK = collision.isCollidingWithBricks(ball, bricks);

        if (COLLIDING_BRICK){
            score += 1;
            view.drawScore(score);
        }

        requestAnimationFrame(()=> gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView ) {
    // Reset display
    score = 0;
    view.drawInfo('');
    view.drawScore(0)
    // Create collision instance
    const COLLISION = new Collision();
    // Create All Bricks
    const BRICKS = createBricks()
    // Create the ball
    const BALL = new Ball(
        BALL_SIZE,
        { x: BALL_STARTX, y:BALL_STARTY },
        BALL_SPEED,
        BALL_IMAGE
    )
    // Create the Paddle
    const PADDLE = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5},
        PADDLE_IMAGE
    )

    gameLoop(view, BRICKS, PADDLE, BALL, COLLISION)
    
}

// Create a new view
const VIEW = new CanvasView('#playField');
VIEW.initStartButton(startGame)