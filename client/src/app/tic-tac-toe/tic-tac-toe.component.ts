import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
    const val: any = await this.http.get('/api').toPromise()
    console.log(val)
    this.message = val.message
  }

  public clearButton() {
    this.message = ''
  }

}
