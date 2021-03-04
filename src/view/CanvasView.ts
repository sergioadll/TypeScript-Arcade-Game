// Types
import { Brick } from '../sprites/Brick'
import { Ball } from '../sprites/Ball'
import { Paddle } from '../sprites/Paddle'
import { BRICK_IMAGES } from '~/setup';

export class CanvasView {
    public canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null; 
    private scoreDisplay: HTMLObjectElement | null; // div where we render the score
    private start: HTMLObjectElement | null; // start button
    private info: HTMLObjectElement | null; // info element
    private levelButtons: NodeListOf<HTMLObjectElement>| null; //Game level buttons

    constructor(canvasName:string){
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.scoreDisplay = document.querySelector('#score');
        this.start = document.querySelector('#start');
        this.info = document.querySelector('#info');
        this.levelButtons = document.querySelectorAll('.level');
    }

    clear():void {
        this.context?.clearRect(0,0,this.canvas.width, this.canvas.height);       
    }

    initLevelButton(changeLevel: (change:string) =>void):void{      
        this.levelButtons?.forEach(levelButton => {            
            levelButton.addEventListener('click', ()=>changeLevel(levelButton.id));
        });           
    }

    initStartButton(startFunction: (view: CanvasView) =>void):void{
        this.start?.addEventListener('click', ()=>startFunction(this));
    }

    drawScore(score:number):void{
        if (this.scoreDisplay) this.scoreDisplay.innerHTML = `Score: ${score.toString()}`;
    }

    drawInfo(text:string):void{
        if(this.info) this.info.innerHTML = text;
    }

    drawSprite(sprite: Brick | Paddle | Ball):void{
        if (!sprite) return

        this.context?.drawImage(
            sprite.image,
            sprite.pos.x,
            sprite.pos.y,
            sprite.width,
            sprite.height
        )
    }

    drawBricks(bricks: Brick[]):void{
        bricks.forEach(brick => this.drawSprite(brick));
    }

}