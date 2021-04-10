import { Game } from "../Models/Game";
import * as __ from "lodash";

export class TicTacToeService {

    public defaultPosition: string = '-';
    public boardSize: number = 3;
    public board: Array<Array<string>> = new Array(3);
    public currentPlayerTurn: number = 0;
    public personMap: Map<number, string> = new Map([
        [0, 'X'],
        [1, 'O']
    ])

    constructor() {
        this.resetBoard();
    }

    public startGame(): Game {
        this.resetBoard();
        this.currentPlayerTurn = 0;

        return {
            board: this.board,
            winner: undefined,
            playerLastMove: undefined,
            playerCurrentMove:  this.currentPlayerTurn
        }
    }

    public placeMove(personId: number, xloc: number, yloc: number): Game {
        if (personId != this.currentPlayerTurn) {
            throw new Error (`Player ${personId} is trying to cheat `)
        }
        
        const personPiece = this.personMap.get(personId);
        if (!personPiece) {
            throw new Error(`Cannot find person with PersonId ${personId}`)
        }

        const boardEl = this.board[yloc][xloc];
        if (boardEl != this.defaultPosition) {
            throw new Error(`Cannot place piece at position (${xloc}, ${yloc}) because piece already placed`)
        }

        if (!(this.isValidPosition(xloc) || this.isValidPosition(yloc))) {
            throw new Error (`Invalid board position provided`)
        }

        this.board[yloc][xloc] = personPiece
        this.currentPlayerTurn = 1 - personId; // Kind of hacky way to toggle

        return {
            board: this.board,
            winner: this.checkForWinner(),
            playerLastMove: personId,
            playerCurrentMove: this.currentPlayerTurn 
        }
    }

    
    public checkForWinner(): number | null {
        for (const row of this.board) {
            const filledRow = row.filter(x => x != this.defaultPosition);
            if (filledRow.length == 3 && (new Set(filledRow)).size == 1) {
                console.log('Win by horizontal row')
            }    
        }
        return;
    }

    private isValidPosition(position: number) {
        return __.inRange(position, 0, this.boardSize);
    }
    
    public displayBoard() {
        console.log(this.board[0])
        console.log(this.board[1])
        console.log(this.board[2])
    }

    public resetBoard() {
        for (let i=0; i < this.boardSize; i++) {
            this.board[i] = new Array(this.boardSize)
            for (let j=0; j < this.boardSize; j++) {
                this.board[i][j]= this.defaultPosition;
            }
        }
    }
}