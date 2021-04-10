import { Game } from "../Models/Game";
import * as __ from "lodash";

export class TicTacToeService {

    public defaultPosition: string = '-';
    public boardSize: number = 3;
    public board: Array<Array<string>> = new Array(3);
    public currentPlayerTurn: number = 0;
    public lastPlayerTurn: number= 1;
    public personMap: Map<number, string> = new Map([
        [0, 'X'],
        [1, 'O']
    ])

    private readonly verticalWinningCombos = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    private readonly horizontalWinningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    private readonly diagonalWinningCombos = [[0, 4, 8], [2, 4, 6]];
    private readonly winningCombos = [...this.verticalWinningCombos, ...this.horizontalWinningCombos, ...this.diagonalWinningCombos]

    constructor() {
        this.resetBoard();
    }

    public get game(): Game {
        return {
            board: this.board,
            winner: this.checkForWinner(),
            playerLastMove: this.lastPlayerTurn,
            playerCurrentMove: this.currentPlayerTurn 
        }
    }

    public startGame(): Game {
        this.resetBoard();
        this.currentPlayerTurn = 0;
        return this.game
    }

    public placeMove(personId: number, xloc: number, yloc: number): Game {
        if (this.game.winner) {
            throw new Error('Game already won. Start a new game to continue')
        }

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
        this.lastPlayerTurn = personId

        return this.game
    }

    
    public checkForWinner(player: number = this.lastPlayerTurn): boolean {
        const flatBoard = __.flatten(this.board)
        const playerPiece = this.personMap.get(player)
        const playerLocs = (flatBoard.map( (position, index) => position == playerPiece ? index : -1)).filter( (x: number) => x != -1)

        for (const combo of this.winningCombos) {
            const isWinner = combo.every(x => playerLocs.includes(x))
            if (isWinner) {
                return true;
            }
        }
        return false;
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