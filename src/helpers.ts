import { Brick } from './sprites/Brick';
import{
    BRICK_IMAGES,
    LEVEL,
    STAGE_COLS,
    STAGE_PADDING,
    BRICK_WIDTH,
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_ENERGY
} from './setup';


export function createBricks(level:number):Brick[] {
    return LEVEL[level].reduce((acc, element, i)=>{
        if (element === 0) return acc; 
        
        let row = Math.floor(((i + 0.99999) / (STAGE_COLS))); // if index = 9, then row must be 0, not 1.
        //if ((i+1)%10) row= row-1; other possible solution
        
        
        const col = i % STAGE_COLS;

        const x = STAGE_PADDING + col*(BRICK_WIDTH + BRICK_PADDING);
        const y = STAGE_PADDING + row *(BRICK_HEIGHT + BRICK_PADDING);


        const nBrick = new Brick(BRICK_WIDTH,BRICK_HEIGHT, {x,y}, BRICK_ENERGY[element], BRICK_IMAGES[element])
        return [...acc, nBrick];
        
    }, [] as Brick[])
}