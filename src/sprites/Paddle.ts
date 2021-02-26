import { Vector } from '../types'

export class Paddle {
    private paddleImage: HTMLImageElement = new Image();
    private moveLeft: boolean; // it´s initialized here bc we will need to change it's value
    private moveRight: boolean;

    constructor(
        private speed:number,
        private paddleWidth:number,
        private paddleHeight:number,
        private position: Vector,
        image: string 
    ){
        this.speed = speed;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.position = position;
        this.paddleImage.src = image;
        this.moveLeft = false;
        this.moveRight = false;

        //Event Listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    // Getters
    get width(): number{
        return this.paddleWidth;
    }
    get height():number{
        return this.paddleHeight;
    }
    get pos():Vector{
        return this.position;
    }
    get image():HTMLImageElement{
        return this.paddleImage;
    }
    get isMovingLeft():boolean{
        return this.moveLeft;
    }
    get isMovingRight():boolean{
        return this.moveRight;
    }

    movePaddle():void{
        if (this.moveLeft) this.pos.x -= this.speed;
        if (this.moveRight) this.pos.x += this.speed;
    }

    handleKeyUp = (e:KeyboardEvent):void=>{
        if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = false;
        if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight= false;
    }

    handleKeyDown = (e:KeyboardEvent):void=>{
        if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = true;
        if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight= true;
    }





}