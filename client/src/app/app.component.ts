import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
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
