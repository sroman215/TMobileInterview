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

  constructor(private http: HttpClient) {

  }

  public async clickButton() {
    await this.getGame();
  }

  public async getGame() {
    const val: Game = <Game>await this.http.get('/api/ttt/game').toPromise()
    this.message = JSON.stringify(val)
  }

  public async makeMove() {
    const reqObj: Move = {personId: 0, xLocation: 1, yLocation: 1}
    const val: Game = <Game>await this.http.post('/api/ttt/makemove', reqObj).toPromise(); 
    this.message = JSON.stringify(val)  
  }

  public async clearButton() {
    const val: Game = <Game>await this.http.delete('/api/ttt/').toPromise()
    this.message = JSON.stringify(val)
  }

}
