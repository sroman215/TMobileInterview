import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private http: HttpClient) {

  }

  public async clickButton() {
    const val = await this.http.get('/api').toPromise()
    console.log(val)
  }
}
