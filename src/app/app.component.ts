import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clase-cinco-a';
  public flag:boolean =true
  onOcultar(){
    this.flag=!this.flag
  }
}
