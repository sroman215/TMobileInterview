import { Response, Request } from "express";
import { Move } from "../Models/Move";
import { TicTacToeService } from "../Services/tictactoeService";

export class TicTacToeRouter {
    
    constructor(private tttService: TicTacToeService) { }

    public getGame(req: Request, res: Response) {
        res.status(200).json(this.tttService.game)
    }

    public makeMove(req: Request, res: Response) {
        const opts: Move = <Move> req.body;
        try {
            const game = this.tttService.placeMove(opts.personId, opts.xLocation, opts.yLocation)
            res.status(200).json(game)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    public resetGame(req: Request, res: Response) {
        res.status(200).json(this.tttService.startGame())
    }
}