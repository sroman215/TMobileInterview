import { Response, Request } from "express";
import { TicTacToeService } from "../Services/tictactoeService";

export class TicTacToeRouter {
    constructor(private tttService: TicTacToeService) {

    }

    public getBoard(req: Request, res: Response) {
        const board = this.tttService.getBoard();
        res.status(200).json(board)
    }
}