import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Game } from "../../../../api/Models/Game";
import { Move } from "../../../../api/Models/Move";

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {

  message = '';
  currentPlayerTurn: number = 0;
  winner: number;

  value = '';
  public personMap: Map<number, string> = new Map([
    [0, 'X'],
    [1, 'O']
])

  constructor(private http: HttpClient) {

  }

  public async clickButton() {
    await this.getGame();
  }

  public async getGame() {
    const val: Game = <Game>await this.http.get('/api/ttt/game').toPromise()
    this.currentPlayerTurn = val.playerCurrentMove;
    this.message = JSON.stringify(val)
  }

  public async makeMove(xLocation: number, yLocation: number) {
    try {
      const reqObj: Move = {personId: this.currentPlayerTurn, xLocation: xLocation, yLocation: yLocation}
      const val: Game = <Game>await this.http.post('/api/ttt/makemove', reqObj).toPromise(); 
      this.currentPlayerTurn = val.playerCurrentMove;
      if (val.winner) {
        this.winner = val.playerLastMove;
      }
      this.message = JSON.stringify(val)  
    } catch (err) {
      console.log(err.error)
      this.message = err.error 
    }
  }

  public async clearButton() {
    const val: Game = <Game>await this.http.delete('/api/ttt/').toPromise()
    this.currentPlayerTurn = val.playerCurrentMove;
    this.winner = undefined;
    this.message = JSON.stringify(val)
  }

  async evaluate() {
    const reqObj: any = {val: 24};
    const val: string = <string>await this.http.post('/api/checkwriter', reqObj).toPromise(); 
    this.value = val;
    console.log(val)
  }

}
