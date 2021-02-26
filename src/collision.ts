// Types
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Ball } from './sprites/Ball';
import { CanvasView } from './view/CanvasView';
import { lastIndexOf } from '*.png';

export class Collision {
    // Check ball collision with each brick
    isCollidingWithBrick(ball: Ball, brick: Brick): boolean{
        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.pos.x > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y +ball.height > brick.pos.y
        ) { 
            return true;
        } else {
            return false;
        }
    }
    // Check ball collision with all bricks
    isCollidingWithBricks(ball: Ball, bricks: Brick[]):boolean{
        let colliding = false;

        bricks.forEach((brick, i)=>{
            if (this.isCollidingWithBrick(ball, brick)){
                ball.changeYDirection();

                if (brick.energy === 1){
                    bricks.splice(i,1);
                    console.log("Brick Destroyed");
                    
                }else{
                    brick.energy -=1
                }
                colliding = true;
            }
        });

        return colliding;
    }
    //Check ball collision with wals and paddle
    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void{
        // 1. Check ball collision with paddle
        if ( 
            ball.pos.x + ball.width > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y // if all this is true, then the ball has collided with the paddle
            ){
                ball.changeYDirection();
            }
        // 2. Check Ball Collision with walls
        // Ball Movement x constraints
        if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0){
            ball.changeXDirection();
        }
        // 3. Check Ball movement y Constraints
        if (ball.pos.y < 0){
            ball.changeYDirection();
        }
    }
}