import { Response, Request } from "express";
import { TicTacToeService } from "../Services/tictactoeService";

export class TicTacToeRouter {
    
    constructor(private tttService: TicTacToeService) { }

    public getBoard(req: Request, res: Response) {
        res.status(200).json(this.tttService.board)
    }
}