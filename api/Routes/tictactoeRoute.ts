import { Response, Request } from "express";
import { TicTacToeService } from "../Services/tictactoeService";

export class TicTacToeRouter {
    
    constructor(private tttService: TicTacToeService) { }

    public getGame(req: Request, res: Response) {
        res.status(200).json(this.tttService.game)
    }

    public makeMove(req: Request, res: Response) {
        try {
            const game = this.tttService.placeMove(0, 0, 0)
            res.status(200).json(game)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}